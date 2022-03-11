import { GameTaskState, ERC20GameTasks, WalletTXGameTasks } from "../types";
import { NextApiRequest } from "next";
import {
  POLYGON_API_KEY,
  GENESYS_ADDRESS,
  FWEB3_FAUCET_ADDRESS,
  MATIC_FAUCET_ADDRESS,
  SWAP_ROUTER_ADDRESS,
  POLL_ADRESS,
  BURN_ADDRESS,
  WON_GAME_STATE,
} from "../constants";
import {
  fetchERC20Txs,
  fetchNftsTxs,
  fetchTrophyTransactions,
  fetchWalletsTxs,
  fetchWalletTokenBalance,
} from "./api";

export const validateRequest = (req: NextApiRequest): boolean => {
  if (req.method !== "GET") {
    throw new Error("Unsupported request method");
  } else if (!req?.query?.wallet_address) {
    throw new Error("Missing request params");
  } else if (!POLYGON_API_KEY) {
    throw new Error("missing api key");
  }
  return true;
};

export const checkHasWonGame = async (
  walletAddress: string
): Promise<GameTaskState> => {
  const rawResult = await fetchTrophyTransactions(walletAddress);
  _checkStatus(rawResult);
  const { result: trophyTxs } = rawResult;
  const tokenBalance = await _walletBalance(walletAddress);
  const trophy =
    trophyTxs.filter((tx) => tx.from === GENESYS_ADDRESS)[0] || null;

  if (!trophy) {
    return;
  }

  return {
    ...WON_GAME_STATE,
    tokenBalance,
    hasWonGame: true,
    trophyId: trophy.tokenID,
  };
};

export const _walletBalance = async (
  walletAddress: string
): Promise<number> => {
  const rawResult = await fetchWalletTokenBalance(walletAddress);
  _checkStatus(rawResult);
  const { result: walletBalance } = rawResult;
  return walletBalance;
};

export const _checkHasMintedNTF = async (
  walletAddress: string
): Promise<boolean> => {
  const rawResult = await fetchNftsTxs(walletAddress);
  _checkStatus(rawResult);
  const { result: nftsTx } = rawResult;
  return nftsTx.filter((tx) => tx.from === GENESYS_ADDRESS).length >= 1;
};

export const currentWalletGameState = async (
  walletAddress: string
): Promise<GameTaskState> => {
  const walletTxCompletedItems = await _checkWalletTxCompletedItems(
    walletAddress
  );
  const erc20CompletedItems = await _checkERC20CompletedItems(walletAddress);
  const tokenBalance = await _walletBalance(walletAddress);
  return {
    ...walletTxCompletedItems,
    ...erc20CompletedItems,
    tokenBalance,
    hasEnoughTokens: tokenBalance >= 100,
    hasMintedNFT: await _checkHasMintedNTF(walletAddress),
  };
};

const _checkWalletTxCompletedItems = async (
  walletAddress: string
): Promise<WalletTXGameTasks> => {
  const rawResult = await fetchWalletsTxs(walletAddress);
  _checkStatus(rawResult);
  const { result: walletsTxs } = rawResult;
  return {
    hasUsedFweb3Faucet: _checkHasUsedFweb3Faucet(walletsTxs),
    hasUsedMaticFaucet: _checkHasUsedMaticFaucet(walletsTxs),
    hasSwappedTokens: _checkHasSwappedTokens(walletsTxs),
    hasDeployedContract: _checkHasDeployedContract(walletsTxs),
    hasVotedInPoll: _checkHasVotedInPoll(walletsTxs),
  };
};

// FIX ME check both matic and fweb3 faucets
const _checkHasUsedFweb3Faucet = (walletsTxs) => {
  return walletsTxs.filter((tx) => tx.to === FWEB3_FAUCET_ADDRESS).length >= 1;
};

const _checkHasUsedMaticFaucet = (walletsTxs) => {
  return walletsTxs.filter((tx) => tx.to === MATIC_FAUCET_ADDRESS).length >= 1;
};

const _checkHasSwappedTokens = (walletsTxs) => {
  return walletsTxs.filter((tx) => tx.from === SWAP_ROUTER_ADDRESS).length >= 1;
};
const _checkHasDeployedContract = (walletsTxs) => {
  return walletsTxs.filter((tx) => tx.to === "").length >= 1;
};

const _checkHasVotedInPoll = (walletsTxs) => {
  return walletsTxs.filter((tx) => tx.to === POLL_ADRESS).length >= 1;
};

const _checkERC20CompletedItems = async (
  walletAddress: string
): Promise<ERC20GameTasks> => {
  const rawResult = await fetchERC20Txs(walletAddress);
  _checkStatus(rawResult);
  const { result: erc20Txs } = rawResult;
  return {
    hasSentTokens: _validateHasSentTokens(erc20Txs, walletAddress),
    hasBurnedTokens: _validateHasBurnedTokens(erc20Txs, walletAddress),
  };
};

const _validateHasSentTokens = (txs, walletAddress: string): boolean => {
  const found = txs.filter((tx) => {
    return (
      tx.value &&
      tx.from === walletAddress &&
      parseInt(tx.value) >= 100 * 10 ** 18
    );
  });
  return found.length >= 1;
};

const _validateHasBurnedTokens = (txs, walletAddress) => {
  const found = txs.filter((tx) => {
    return (
      tx.value &&
      tx.from === walletAddress &&
      tx.to === BURN_ADDRESS &&
      parseInt(tx.value) > 0
    );
  });
  return found.length >= 1;
};

const _checkStatus = ({ status, message, result }) => {
  if (status !== "1") {
    console.error(
      `Polygon API status failure: \n[message]: ${message}\n[result]: ${result}`
    );
    throw new Error(message);
  }
};