import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const provider = new ethers.JsonRpcProvider("https://eth-sepolia.public.blastapi.io");

  const { TESTNET_PRIVATE_KEY: privateKey } = process.env;
  if (!privateKey) {
    throw new Error("Please set your TESTNET_PRIVATE_KEY in a .env file");
  }
  const wallet = new ethers.Wallet(privateKey, provider);

  const abi = [
    "function mint(address to) public returns (uint256)",
    "function balanceOf(address owner) public view returns (uint256)",
    "function ownerOf(uint256 tokenId) public view returns (address)",
  ];
  const contractAddress = "0x6B7fC243462a27791f258c07887D8C1529B4e5af"; // Replace with your contract address
  const contract = new ethers.Contract(contractAddress, abi, wallet);

  /**
   * Mint a NFT to deployer
   */
  const mintTx = await contract.mint(wallet.address);
  await mintTx.wait();
  console.log(`Minted a new NFT to ${wallet.address}`);

  /**
   * Check the balance of deployer
   */
  const balance = await contract.balanceOf(wallet.address);
  console.log(`Deployer owns ${balance} NFT(s)`);
}

main().catch(console.error);
