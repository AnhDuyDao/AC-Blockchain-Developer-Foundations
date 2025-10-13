import { ethers } from "hardhat";
import { TokenANDD } from "../typechain";

async function main() {
  const [deployer, user1] = await ethers.getSigners();
  console.log("Using account: ", deployer.address);
  console.log("User 1:", user1.address);

  const token: TokenANDD = await ethers.getContract("TokenANDD");
  const name = await token.name();
  const symbol = await token.symbol();
  const totalSupply = await token.totalSupply();

  console.log(`Token symbol: ${symbol}`);
  console.log(`Token total supply: ${ethers.formatEther(totalSupply)}`);
  console.log(`Token name: ${name}`);

  console.log(`Transfer 10 tokens to ${user1.address}`);
  const tx = await token.transfer(user1.address, ethers.parseEther("10"));
  await tx.wait();
  console.log("Transfer completed");
  console.log("New balance of user1:", ethers.formatEther(await token.balanceOf(user1.address)));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
