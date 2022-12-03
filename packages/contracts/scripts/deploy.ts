import { ethers } from 'hardhat'

async function _deployToken() {
  const [admin, user1] = await ethers.getSigners()
  const adminAddress = await admin.getAddress()
  const net = await ethers.getDefaultProvider().getNetwork()
  console.log(`Deploying to network: ${net.name} (${net.chainId})`)
  console.log('Deploying contracts with the account:', adminAddress)

  const Fweb3TokenFactory = await ethers.getContractFactory('Fweb3Token')
  const fweb3Token = await Fweb3TokenFactory.deploy()
  await fweb3Token.deployed()

  console.log('Token deployed to:', fweb3Token.address)
  return fweb3Token.address
}

;(async () => {
  try {
    const addr = await _deployToken()

    const WrappedTokenFactory = await ethers.getContractFactory('WrappedFweb3Token')
    const wrappedToken = await WrappedTokenFactory.deploy(addr)
    await wrappedToken.deployed()

    console.log('WrappedFweb3 deployed to:', wrappedToken.address)

  } catch (err) {
    console.error(err)
  }
})()
