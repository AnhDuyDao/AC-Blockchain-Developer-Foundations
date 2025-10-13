import { expect } from "chai";
import { ethers } from "hardhat";
import { TokenANDD } from "../typechain";

describe("TokenANDD", () => {
  let token: TokenANDD;
  let owner: any;
  let user1: any;
  let user2: any;
  // parseEther() convert ether to wei 1ETH = 10^18 wei
  const initialSupply = ethers.parseEther("1000");

  beforeEach(async () => {
    // getSigners() get 20 accounts in hardhat locak network
    [owner, user1, user2] = await ethers.getSigners();
    console.log("owner: ", owner.address);
    console.log("addr1: ", user1.address);
    console.log("addr2: ", user2.address);

    const Token = await ethers.getContractFactory("TokenANDD");
    token = await Token.deploy(initialSupply);
    await token.waitForDeployment();
  });

  describe("Deployment", () => {
    it("Should assign total supply to the deployer", async () => {
      const expectedSupply = initialSupply;
      const ownerBalance = await token.balanceOf(owner.address);
      expect(ownerBalance).to.equal(expectedSupply);
    });

    it("Should set correct name and symbol", async () => {
      const name = await token.name();
      const symbol = await token.symbol();

      expect(name).to.equal("Andy");
      expect(symbol).to.equal("ANDD");
    });
  });

  describe("Transfer", () => {
    it("Should transfer tokens between accounts", async () => {
      const transferAmount = ethers.parseEther("100");
      const senderBalanceInit = await token.balanceOf(owner.address);

      await token.transfer(user1.address, transferAmount);

      const senderBanlanceFinal = await token.balanceOf(owner.address);
      const receiverBalance = await token.balanceOf(user1.address);

      expect(receiverBalance).to.equal(transferAmount);
      expect(senderBanlanceFinal).to.equal(senderBalanceInit - transferAmount);
    });
  });
});
