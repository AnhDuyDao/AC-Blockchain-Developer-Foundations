import { expect } from "chai";
import { ethers } from "hardhat";
import { MyMintableToken } from "../typechain";

describe("MyToken", () => {
  let token: MyMintableToken;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("MyMintableToken");
    token = await Token.deploy();
    await token.waitForDeployment();
  });

  describe("Deployment", () => {
    it("Should set the right owner", async () => {
      expect(await token.owner()).to.equal(owner.address);
    });
  });

  describe("Access Control", () => {
    it("Should mintable by owner only", async () => {
      const mintAmount = ethers.parseEther("1000");
      await token.mint(owner.address, mintAmount);
      const ownerBalance = await token.balanceOf(owner.address);
      expect(ownerBalance).to.equal(mintAmount);

      const mintAddr1Tx = token.connect(addr1).mint(addr1.address, mintAmount);
      await expect(mintAddr1Tx).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
    });
  });
});
