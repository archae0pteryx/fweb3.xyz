import prisma from './client'

const CONTENT = [
  {
    html: '<h1>Onboarding into Web3</h1>\n<p>Onboarding into the web3 space is a great way to get yourself familiar with the technology and understand the potential it has for the future. Web3 is a decentralized internet that promises to revolutionize the way we use the internet. Here are some of the benefits of getting onboarded into web3:</p>\n<ul>\n<li>Increased privacy: Web3 provides a more secure, private way of using the internet, allowing users to control their data and be in charge of their own information.</li>\n<li>Reduced censorship: By being decentralized, web3 allows users to access and share information without being censored by governments or other authorities.</li>\n<li>Increased transparency: Decentralized networks make it easier to track data and ensure transparency in transactions.</li>\n<li>Improved security: No single entity controls web3, which means that users’ data is less vulnerable to malicious attacks.</li>\n</ul>\n<p>By playing this game you can learn how to connect a wallet and understand what an NFT is. A wallet is necessary to store cryptocurrencies and tokens, while an NFT (non-fungible token) is a unique digital asset, like a collectible or a piece of artwork. Onboarding into web3 is an exciting way to explore the potential of this revolutionary technology and get yourself familiar with the new tools and concepts.</p>\n',
    title: 'About Page',
    type: 'ABOUT_PAGE',
    prompt:
      'Write a couple of paragraphs in markdown explaining the difference between web2 and web3. Emphasize the benefits of web3 and how it is different from web2. Summarize by explaining how this game will help you learn how to connect a wallet and understand what an NFT is, what ERC20 tokens are, and elude the rest is a mystery',
  },
  {
    html: '<p>Installing a web3 wallet is the first step to getting started with Ethereum. A web3 wallet is a type of software wallet that lets users securely store, send, and receive Ether, tokens, and other digital assets on the Ethereum network.</p>\n<p>To install a web3 wallet, you first need to choose a wallet provider. Popular wallet providers include MetaMask, Trust Wallet, and Coinbase Wallet. Once you choose a wallet provider, you need to download the mobile app or browser extension, create an account, and set up your wallet.</p>\n<p>It is important to remember to keep your seed phrase safe and secure. Your seed phrase is a 12-word recovery phrase used to backup and restore your wallet. You should store it in a secure place, like a password manager or a secure storage device. It is also important to keep your seed phrase private; do not share it with anyone.</p>\n<p>For more information on how to install a web3 wallet, check out the following resources:</p>\n<ul>\n<li><a href="https://trustwallet.com/help/guides/how-to-install-a-web3-wallet/">Trust Wallet: How to Install a Web3 Wallet</a></li>\n<li><a href="https://metamask.io/install.html">MetaMask: Installing the MetaMask Wallet</a></li>\n<li><a href="https://support.coinbase.com/customer/en/portal/articles/2888397-get-started-with-your-web3-wallet">Coinbase Wallet: Get Started With Your Web3 Wallet</a></li>\n</ul>\n',
    title: 'Instructions',
    type: 'INSTRUCTION_PAGE',
    prompt:
      'Write a couple paragraphs in markdown about how to install a web3 wallet. Emphasise the importance of keeping the seed phrase safe and secure. Provide a few links about how to do this.',
  },
]

export async function seedContent() {
  try {
    await prisma.content.createMany({
      data: CONTENT,
    })
    console.log('seeded content')
  } catch (err) {
    console.error(err)
  }
}
