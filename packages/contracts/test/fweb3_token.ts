import { expect } from "chai";
import { ethers } from "hardhat";

describe("Fweb3Token", function () {
  it("Should deploy and send tokens", async function () {
    const [_, user] = await ethers.getSigners();
    const TokenFactory = await ethers.getContractFactory("Fweb3Token");
    const token = await TokenFactory.deploy();
    await token.deployed();

    expect(await token.name()).to.equal("Fweb3Token");
    expect(await token.symbol()).to.equal("FWEB3");
    expect(await token.decimals()).to.equal(18);
    expect(await token.totalSupply()).to.equal(ethers.utils.parseEther("1000000"));

    // send tokens to user
    await token.transfer(user.address, ethers.utils.parseEther("10"));
    expect(await token.balanceOf(user.address)).to.equal(ethers.utils.parseEther("10"));

  });
});
