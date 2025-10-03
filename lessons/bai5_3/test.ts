import { ethers } from "ethers";

async function main() {
  const provider = new ethers.JsonRpcProvider(
    "https://eth-sepolia.public.blastapi.io"
  );

  const abi = [
    "function getCount() public view returns (uint)",
    "function increment() public",
  ];
  const contractAddress = "0x69561d568b555efaD1bc556eb8052ECca343b344"; // Replace with your contract address

  const contract = new ethers.Contract(contractAddress, abi, provider);

  const count = await contract.getCount();
  console.log("Current count is:", count.toString());
}

main().catch(console.error);
