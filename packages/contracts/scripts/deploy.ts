import { ethers } from 'hardhat'

;(async () => {
  try {
    const [admin, user1] = await ethers.getSigners()
    const adminAddress = await admin.getAddress()
    const user1Address = await user1.getAddress()
    console.log('Deploying contracts with the account:', adminAddress)

    const FweebFactory = await ethers.getContractFactory('FweebNFT')
    const fweebNft = await FweebFactory.deploy()
    await fweebNft.deployed()

    console.log('FweebNFT deployed to:', fweebNft.address)
    fweebNft.safeMint(user1Address, 'RIMRAF')
  } catch (err) {
    console.error(err)
  }
})()
