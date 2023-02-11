async function main() {
	const contractName = "HelloWorldContract"
	const HelloWorldContract = await ethers.getContractFactory(contractName);
	const helloWorldContractDeployment = await HelloWorldContract.deploy();
	console.log(contractName + " deployed to: " + helloWorldContractDeployment.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});