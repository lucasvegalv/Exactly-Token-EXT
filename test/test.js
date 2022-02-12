const { expect } = require("chai");
const { deployContract } = require("ethereum-waffle");
const { ethers } = require("hardhat");

describe("Exactly Token", function() {

  let exactlyToken; 
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    const ExactlyToken = await hre.ethers.getContractFactory("ExactlyToken");
    exactlyToken = await ExactlyToken.deploy();
    await exactlyToken.deployed();

    [owner, addr1, addr2] = await ethers.getSigners();

  });

  describe("Initialization", function() {
    it("Should initialize the contract and set the initial supply in the owner's account", async function () {
      const ownerBalance = await exactlyToken.balanceOf(owner.address);
      expect(ethers.utils.formatEther(ownerBalance) === 100);
    });
  })

  describe("Total Supply", function () {
    it("Should give us the contract total supply", async function () {
      const totalSupply = await exactlyToken.totalSupply();
      expect(ethers.utils.formatEther(totalSupply) === 100);
    })
  })

  describe("Transfer", function ()  {
    it("Should be able to transfer tokens", async function () {
      await exactlyToken.transfer(addr1.address, ethers.utils.parseEther("50"));
      expect(await exactlyToken.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("50"));
    });

  })

  describe("Allowance, Approval and Transfer From", function () {
    it("Should let us transfer another's address token", async function () {
      await exactlyToken.allowance(owner.address, addr1.address);
      await exactlyToken.approve(addr1.address, ethers.utils.parseEther("100"));
      await exactlyToken.connect(addr1).transferFrom(owner.address, addr2.address, ethers.utils.parseEther("100"));
      
      expect (await exactlyToken.balanceOf(addr2.address)).to.equal(ethers.utils.parseEther("100"));
      expect (await exactlyToken.balanceOf(owner.address)).to.equal(ethers.utils.parseEther("0"));
    });

  })
})