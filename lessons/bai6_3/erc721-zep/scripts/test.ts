import { ethers } from "hardhat";
import { MyNFT } from "../typechain";
async function main() {
  const [deployer, user1] = await ethers.getSigners();
  console.log("Using account: ", deployer.address);
  console.log("User 1:", user1.address);

  const myNFT: MyNFT = await ethers.getContract("MyNFT");
  console.log("MyNFT deployed to:", await myNFT.getAddress());

  // Mint a new NFT to user1
  const mintToUser1Tx = await myNFT.mint(user1.address);
  await mintToUser1Tx.wait();
  console.log(`Minted a new NFT to ${user1.address}`);

  // Check the balance of user1
  const balance = await myNFT.balanceOf(user1.address);
  console.log(`User1 owns ${balance} NFT(s)`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
