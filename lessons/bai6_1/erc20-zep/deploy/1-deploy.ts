import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("====================");
  console.log("Network:", hre.network.name);
  console.log("====================");

  console.log("Deploying TokenANDD with initial supply...");

  const initialSupply = ethers.parseEther("1000"); // 1000 ANDD tokens

  await deploy("TokenANDD", {
    contract: "TokenANDD",
    args: [initialSupply],
    from: deployer,
    log: true,
    autoMine: true,
    skipIfAlreadyDeployed: false,
  });

  console.log("TokenANDD deployed successfully!");
};

func.tags = ["TokenANDD"];
export default func;
