/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Greeter, GreeterInterface } from "../Greeter";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_greeting",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "greet",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_greeting",
        type: "string",
      },
    ],
    name: "setGreeting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001057380380620010578339818101604052810190620000379190620002e2565b620000676040518060600160405280602281526020016200103560229139826200008060201b620001c71760201c565b80600090816200007891906200057e565b5050620006f2565b62000122828260405160240162000099929190620006b7565b6040516020818303038152906040527f4b5c4277000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506200012660201b60201c565b5050565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620001b8826200016d565b810181811067ffffffffffffffff82111715620001da57620001d96200017e565b5b80604052505050565b6000620001ef6200014f565b9050620001fd8282620001ad565b919050565b600067ffffffffffffffff82111562000220576200021f6200017e565b5b6200022b826200016d565b9050602081019050919050565b60005b83811015620002585780820151818401526020810190506200023b565b60008484015250505050565b60006200027b620002758462000202565b620001e3565b9050828152602081018484840111156200029a576200029962000168565b5b620002a784828562000238565b509392505050565b600082601f830112620002c757620002c662000163565b5b8151620002d984826020860162000264565b91505092915050565b600060208284031215620002fb57620002fa62000159565b5b600082015167ffffffffffffffff8111156200031c576200031b6200015e565b5b6200032a84828501620002af565b91505092915050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200038657607f821691505b6020821081036200039c576200039b6200033e565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620004067fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82620003c7565b620004128683620003c7565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b60006200045f6200045962000453846200042a565b62000434565b6200042a565b9050919050565b6000819050919050565b6200047b836200043e565b620004936200048a8262000466565b848454620003d4565b825550505050565b600090565b620004aa6200049b565b620004b781848462000470565b505050565b5b81811015620004df57620004d3600082620004a0565b600181019050620004bd565b5050565b601f8211156200052e57620004f881620003a2565b6200050384620003b7565b8101602085101562000513578190505b6200052b6200052285620003b7565b830182620004bc565b50505b505050565b600082821c905092915050565b6000620005536000198460080262000533565b1980831691505092915050565b60006200056e838362000540565b9150826002028217905092915050565b620005898262000333565b67ffffffffffffffff811115620005a557620005a46200017e565b5b620005b182546200036d565b620005be828285620004e3565b600060209050601f831160018114620005f65760008415620005e1578287015190505b620005ed858262000560565b8655506200065d565b601f1984166200060686620003a2565b60005b82811015620006305784890151825560018201915060208501945060208101905062000609565b868310156200065057848901516200064c601f89168262000540565b8355505b6001600288020188555050505b505050505050565b600082825260208201905092915050565b6000620006838262000333565b6200068f818562000665565b9350620006a181856020860162000238565b620006ac816200016d565b840191505092915050565b60006040820190508181036000830152620006d3818562000676565b90508181036020830152620006e9818462000676565b90509392505050565b61093380620007026000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063a41368621461003b578063cfae321714610057575b600080fd5b61005560048036038101906100509190610485565b610075565b005b61005f610135565b60405161006c919061054d565b60405180910390f35b6101226040518060600160405280602381526020016108db602391396000805461009e9061059e565b80601f01602080910402602001604051908101604052809291908181526020018280546100ca9061059e565b80156101175780601f106100ec57610100808354040283529160200191610117565b820191906000526020600020905b8154815290600101906020018083116100fa57829003601f168201915b505050505083610263565b80600090816101319190610785565b5050565b6060600080546101449061059e565b80601f01602080910402602001604051908101604052809291908181526020018280546101709061059e565b80156101bd5780601f10610192576101008083540402835291602001916101bd565b820191906000526020600020905b8154815290600101906020018083116101a057829003601f168201915b5050505050905090565b61025f82826040516024016101dd929190610857565b6040516020818303038152906040527f4b5c4277000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610302565b5050565b6102fd83838360405160240161027b9392919061088e565b6040516020818303038152906040527f2ced7cef000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610302565b505050565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61039282610349565b810181811067ffffffffffffffff821117156103b1576103b061035a565b5b80604052505050565b60006103c461032b565b90506103d08282610389565b919050565b600067ffffffffffffffff8211156103f0576103ef61035a565b5b6103f982610349565b9050602081019050919050565b82818337600083830152505050565b6000610428610423846103d5565b6103ba565b90508281526020810184848401111561044457610443610344565b5b61044f848285610406565b509392505050565b600082601f83011261046c5761046b61033f565b5b813561047c848260208601610415565b91505092915050565b60006020828403121561049b5761049a610335565b5b600082013567ffffffffffffffff8111156104b9576104b861033a565b5b6104c584828501610457565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156105085780820151818401526020810190506104ed565b60008484015250505050565b600061051f826104ce565b61052981856104d9565b93506105398185602086016104ea565b61054281610349565b840191505092915050565b600060208201905081810360008301526105678184610514565b905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806105b657607f821691505b6020821081036105c9576105c861056f565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026106317fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826105f4565b61063b86836105f4565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b600061068261067d61067884610653565b61065d565b610653565b9050919050565b6000819050919050565b61069c83610667565b6106b06106a882610689565b848454610601565b825550505050565b600090565b6106c56106b8565b6106d0818484610693565b505050565b5b818110156106f4576106e96000826106bd565b6001810190506106d6565b5050565b601f8211156107395761070a816105cf565b610713846105e4565b81016020851015610722578190505b61073661072e856105e4565b8301826106d5565b50505b505050565b600082821c905092915050565b600061075c6000198460080261073e565b1980831691505092915050565b6000610775838361074b565b9150826002028217905092915050565b61078e826104ce565b67ffffffffffffffff8111156107a7576107a661035a565b5b6107b1825461059e565b6107bc8282856106f8565b600060209050601f8311600181146107ef57600084156107dd578287015190505b6107e78582610769565b86555061084f565b601f1984166107fd866105cf565b60005b8281101561082557848901518255600182019150602085019450602081019050610800565b86831015610842578489015161083e601f89168261074b565b8355505b6001600288020188555050505b505050505050565b600060408201905081810360008301526108718185610514565b905081810360208301526108858184610514565b90509392505050565b600060608201905081810360008301526108a88186610514565b905081810360208301526108bc8185610514565b905081810360408301526108d08184610514565b905094935050505056fe4368616e67696e67206772656574696e672066726f6d202725732720746f2027257327a26469706673582212208408deb2bfd1539c96256f2ffaea113fdeb66b92339012ee2386e4f3bcd0577564736f6c634300081100334465706c6f79696e67206120477265657465722077697468206772656574696e673a";

export class Greeter__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _greeting: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Greeter> {
    return super.deploy(_greeting, overrides || {}) as Promise<Greeter>;
  }
  getDeployTransaction(
    _greeting: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_greeting, overrides || {});
  }
  attach(address: string): Greeter {
    return super.attach(address) as Greeter;
  }
  connect(signer: Signer): Greeter__factory {
    return super.connect(signer) as Greeter__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GreeterInterface {
    return new utils.Interface(_abi) as GreeterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Greeter {
    return new Contract(address, _abi, signerOrProvider) as Greeter;
  }
}
