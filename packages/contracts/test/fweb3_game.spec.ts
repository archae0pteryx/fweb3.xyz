import { Fweb3Game2, Fweb3Token } from './../typechain-types'

import { expect } from 'chai'
import { ethers } from 'hardhat'

let fweb3Game: Fweb3Game2, fweb3Token: Fweb3Token, owner, user

describe('Fweb3Game', () => {
  beforeEach(async () => {
    ;[owner, user] = await ethers.getSigners()
    const TokenFactory = await ethers.getContractFactory('Fweb3Token')
    fweb3Token = await TokenFactory.deploy()
    await fweb3Token.deployed()

    const GameFactory = await ethers.getContractFactory('Fweb3Game2')
    fweb3Game = await GameFactory.deploy(fweb3Token.address)

    await fweb3Game.deployed()
  })
  it('Compiles', async () => {
    expect(true)
  })
})
