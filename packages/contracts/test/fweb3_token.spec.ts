import { expect } from 'chai'
import { ethers } from 'hardhat'
import { Fweb3Token, WrappedFweb3Token } from '../typechain-types'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

let fweb3Token: Fweb3Token, wrappedToken: WrappedFweb3Token, owner: SignerWithAddress, user: SignerWithAddress

describe('Fweb3Token', function () {
  beforeEach(async () => {
    ;[owner, user] = await ethers.getSigners()
    const Fweb3TokenFactory = await ethers.getContractFactory('Fweb3Token')
    fweb3Token = await Fweb3TokenFactory.deploy()
    await fweb3Token.deployed()

    const WrappedTokenFactory = await ethers.getContractFactory('WrappedFweb3Token')
    wrappedToken = await WrappedTokenFactory.deploy(fweb3Token.address)
    await wrappedToken.deployed()
  })

  it('Should deploy transfer approve and wrap fweb3', async function () {
    const TEN_ETH = ethers.utils.parseEther('10')
    const FIVE_ETH = ethers.utils.parseEther('5')

    const userWrappedContract = wrappedToken.connect(user)
    const userFweb3Contract = fweb3Token.connect(user)

    await fweb3Token.transfer(user.address, TEN_ETH)
    await fweb3Token.transfer(wrappedToken.address, TEN_ETH)

    const userBal = await fweb3Token.balanceOf(user.address)
    const wrappedBal = await wrappedToken.balanceOf(user.address)

    await userFweb3Contract.approve(wrappedToken.address, FIVE_ETH)
    await userWrappedContract.depositFor(user.address, FIVE_ETH)


    const userBal2 = await fweb3Token.balanceOf(user.address)
    const wrappedBal2 = await wrappedToken.balanceOf(user.address)

    expect(userBal2).to.equal(userBal.sub(FIVE_ETH))
    expect(wrappedBal2).to.equal(wrappedBal.add(FIVE_ETH))

  })
})
