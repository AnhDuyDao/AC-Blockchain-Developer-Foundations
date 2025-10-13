import { ethers } from "ethers";

async function main() {
  const provider = new ethers.JsonRpcProvider(
    "https://eth-sepolia.public.blastapi.io"
  );

  const abi = ["function balanceOf(address) view returns (uint256)"];
  const contractAddress = "0xCc505Bf83e33923635fB054f4b73228EEAadFE8e"; // Replace with your contract address
  const contract = new ethers.Contract(contractAddress, abi, provider);

  /**
   * Get the current balance of deployer
   */
  const deployerAddress = "0xe895aa5b6d93ee7d9a6e0800d3f824068ccfb90a";
  const balanceOfDeployer = await contract.balanceOf(deployerAddress);
  console.log(
    `💰 Balance of ${deployerAddress}: ${ethers.formatEther(
      balanceOfDeployer
    )} ANDD`
  );
}

main().catch(console.error);
