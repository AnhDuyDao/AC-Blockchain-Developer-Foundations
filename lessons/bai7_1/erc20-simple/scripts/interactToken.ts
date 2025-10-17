import { ethers } from "hardhat";
import { MyToken } from "../typechain";

async function main() {
  const [deployer, addr1] = await ethers.getSigners();

  const token: MyToken = await ethers.getContract("MyToken");

  console.log(`Token address: ${await token.getAddress()}`);

  const name = await token.name();
  console.log(`Token name: ${name}`);

  const totalSupply = await token.totalSupply();
  console.log(`Total supply: ${ethers.formatEther(totalSupply)} MTK`);

  const mintToken = await token.mint(deployer.address, ethers.parseEther("1000"));
  await mintToken.wait();
  console.log(`Minted 1000 MTK to deployer: ${deployer.address}`);

  const balance = await token.balanceOf(deployer.address);
  console.log(`Deployer balance: ${ethers.formatEther(balance)} MTK`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
