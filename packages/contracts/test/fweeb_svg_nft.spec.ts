import { expect } from 'chai'
import { ethers } from 'hardhat'
import { FweebNFT } from '../typechain-types'
import { Signer } from 'ethers'

let fweebNft: FweebNFT, admin: Signer, user: Signer

describe('Fweeb NFT', () => {
  beforeEach(async () => {
    ;[admin, user] = await ethers.getSigners()
    const FweebFactory = await ethers.getContractFactory('FweebNFT')
    fweebNft = await FweebFactory.deploy()
    await fweebNft.deployed()
  })
  it('Creates an NFT', async function () {
    const userAddress = await user.getAddress()
    fweebNft.safeMint(userAddress, 'RIMRAF')
    const res = await fweebNft.tokenURI(0)
    const baseJson = Buffer.from(res, 'base64').toString()
    const svgData = JSON.parse(baseJson).image
    expect(svgData)
  })
})
