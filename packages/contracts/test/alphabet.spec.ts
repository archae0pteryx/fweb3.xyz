import { expect } from 'chai'
import { ethers } from 'hardhat'
import fs from 'fs'
describe('Alphabet', function () {
  it('creates svg word with letters', async function () {
    const AlphabetFactory = await ethers.getContractFactory('Alphabet')
    const alphabet = await AlphabetFactory.deploy()
    await alphabet.deployed()

    const s = await alphabet.createNFT('RIMRAF')
    const paths = s.match(/<path.*?\/>/g)
    expect(paths.length).to.equal(31)

  })
})
