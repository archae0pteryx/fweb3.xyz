import { expect } from 'chai'
import { ethers } from 'hardhat'
import { Fweb3Token, WrappedFweb3Token } from '../typechain-types'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

let fweb3Token: Fweb3Token, wrappedToken: WrappedFweb3Token, owner: SignerWithAddress, user: SignerWithAddress, governor: Fweb3Governor

const TEN_ETH = ethers.utils.parseEther('10')
const FIVE_ETH = ethers.utils.parseEther('5')

describe('Governor', function () {
  beforeEach(async () => {
    ;[owner, user] = await ethers.getSigners()
    const Fweb3TokenFactory = await ethers.getContractFactory('Fweb3Token')
    fweb3Token = await Fweb3TokenFactory.deploy()
    await fweb3Token.deployed()

    const WrappedTokenFactory = await ethers.getContractFactory('WrappedFweb3Token')
    wrappedToken = await WrappedTokenFactory.deploy(fweb3Token.address)
    await wrappedToken.deployed()

    const GovernorFactory = await ethers.getContractFactory('Fweb3Governor')
    governor = await GovernorFactory.deploy(wrappedToken.address, 120960)
    await governor.deployed()

    /* Act */

    await fweb3Token.transfer(user.address, TEN_ETH)
    // await fweb3Token.transfer(wrappedToken.address, TEN_ETH)

    const userFweb3Contract = fweb3Token.connect(user)
    const userWrappedContract = wrappedToken.connect(user)

    // await fweb3Token.transfer(wrappedToken.address, TEN_ETH)

    await userFweb3Contract.approve(wrappedToken.address, FIVE_ETH)
    await userWrappedContract.depositFor(user.address, FIVE_ETH)
  })

  it('Should deploy transfer approve and wrap fweb3', async function () {
    governor.connect(user)
    await governor.propose([], [], [], "I am a description")

    const userFweb3TokenBal = await fweb3Token.balanceOf(user.address)
    const userWrapperbal = await wrappedToken.balanceOf(user.address)
    console.log({
      start_user_fweb3_bal: ethers.utils.formatEther(userFweb3TokenBal),
      start_user_wrapped_bal: ethers.utils.formatEther(userWrapperbal),
    })
  })
})
