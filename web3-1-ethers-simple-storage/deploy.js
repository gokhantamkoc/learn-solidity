const ethers = require("ethers");
const fs = require("fs-extra");

async function deployContractWithContractFactory(wallet) {
     console.log("Let's deploy with contract factory!");
     // initialize contract
     const abi = fs.readFileSync(
          "./SimpleStorage_sol_SimpleStorage.abi",
          "utf8"
     );
     const binary = fs.readFileSync(
          "./SimpleStorage_sol_SimpleStorage.bin",
          "utf8"
     );

     const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

     const contract = await contractFactory.deploy();
     // console.log("Here is the deployment transaction");
     // console.log(contract.deployTransaction);

     await contract.deployTransaction.wait(1);
     // console.log("Here is the transaction receipt");
     // console.log(transactionReceipt);
     const favoriteNumber = await contract.getFavoriteNumberByName("Gökhan");
     console.log(favoriteNumber);

     return contract;
}

async function deployContractWithTransactionData(wallet) {
     console.log("Let's deploy with only transaction data!");
     const nonce = await wallet.getTransactionCount();
     const tx = {
          nonce: nonce,
          gasPrice: 20000000000,
          gasLimit: 1000000,
          to: null,
          value: 0,
          data: "0x608060405234801561001057600080fd5b5033600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610b69806100616000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80636f760f41146100515780639e7a13ad1461006d578063a883ba141461009e578063c235eb6d146100ba575b600080fd5b61006b600480360381019061006691906105b1565b6100ea565b005b6100876004803603810190610082919061060d565b610173565b6040516100959291906106c8565b60405180910390f35b6100b860048036038101906100b391906105b1565b61022f565b005b6100d460048036038101906100cf91906106f8565b6103f9565b6040516100e19190610741565b60405180910390f35b600060405180604001604052808381526020018481525090806001815401808255809150506001900390600052602060002090600202016000909190919091506000820151816000015560208201518160010190816101499190610968565b5050508060018360405161015d9190610a76565b9081526020016040518091039020819055505050565b6000818154811061018357600080fd5b90600052602060002090600202016000915090508060000154908060010180546101ac9061078b565b80601f01602080910402602001604051908101604052809291908181526020018280546101d89061078b565b80156102255780601f106101fa57610100808354040283529160200191610225565b820191906000526020600020905b81548152906001019060200180831161020857829003601f168201915b5050505050905082565b60008080549050905060005b818110156103d057600080828154811061025857610257610a8d565b5b90600052602060002090600202016040518060400160405290816000820154815260200160018201805461028b9061078b565b80601f01602080910402602001604051908101604052809291908181526020018280546102b79061078b565b80156103045780601f106102d957610100808354040283529160200191610304565b820191906000526020600020905b8154815290600101906020018083116102e757829003601f168201915b5050505050815250509050846040516020016103209190610a76565b60405160208183030381529060405280519060200120816020015160405160200161034b9190610a76565b60405160208183030381529060405280519060200120036103bc5783816000018181525050806000838154811061038557610384610a8d565b5b90600052602060002090600202016000820151816000015560208201518160010190816103b29190610968565b50905050506103d0565b5080806103c890610aeb565b91505061023b565b50816001846040516103e29190610a76565b908152602001604051809103902081905550505050565b600060018260405161040b9190610a76565b9081526020016040518091039020549050919050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6104888261043f565b810181811067ffffffffffffffff821117156104a7576104a6610450565b5b80604052505050565b60006104ba610421565b90506104c6828261047f565b919050565b600067ffffffffffffffff8211156104e6576104e5610450565b5b6104ef8261043f565b9050602081019050919050565b82818337600083830152505050565b600061051e610519846104cb565b6104b0565b90508281526020810184848401111561053a5761053961043a565b5b6105458482856104fc565b509392505050565b600082601f83011261056257610561610435565b5b813561057284826020860161050b565b91505092915050565b6000819050919050565b61058e8161057b565b811461059957600080fd5b50565b6000813590506105ab81610585565b92915050565b600080604083850312156105c8576105c761042b565b5b600083013567ffffffffffffffff8111156105e6576105e5610430565b5b6105f28582860161054d565b92505060206106038582860161059c565b9150509250929050565b6000602082840312156106235761062261042b565b5b60006106318482850161059c565b91505092915050565b6106438161057b565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610683578082015181840152602081019050610668565b60008484015250505050565b600061069a82610649565b6106a48185610654565b93506106b4818560208601610665565b6106bd8161043f565b840191505092915050565b60006040820190506106dd600083018561063a565b81810360208301526106ef818461068f565b90509392505050565b60006020828403121561070e5761070d61042b565b5b600082013567ffffffffffffffff81111561072c5761072b610430565b5b6107388482850161054d565b91505092915050565b6000602082019050610756600083018461063a565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806107a357607f821691505b6020821081036107b6576107b561075c565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b60006008830261081e7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826107e1565b61082886836107e1565b95508019841693508086168417925050509392505050565b6000819050919050565b600061086561086061085b8461057b565b610840565b61057b565b9050919050565b6000819050919050565b61087f8361084a565b61089361088b8261086c565b8484546107ee565b825550505050565b600090565b6108a861089b565b6108b3818484610876565b505050565b5b818110156108d7576108cc6000826108a0565b6001810190506108b9565b5050565b601f82111561091c576108ed816107bc565b6108f6846107d1565b81016020851015610905578190505b610919610911856107d1565b8301826108b8565b50505b505050565b600082821c905092915050565b600061093f60001984600802610921565b1980831691505092915050565b6000610958838361092e565b9150826002028217905092915050565b61097182610649565b67ffffffffffffffff81111561098a57610989610450565b5b610994825461078b565b61099f8282856108db565b600060209050601f8311600181146109d257600084156109c0578287015190505b6109ca858261094c565b865550610a32565b601f1984166109e0866107bc565b60005b82811015610a08578489015182556001820191506020850194506020810190506109e3565b86831015610a255784890151610a21601f89168261092e565b8355505b6001600288020188555050505b505050505050565b600081905092915050565b6000610a5082610649565b610a5a8185610a3a565b9350610a6a818560208601610665565b80840191505092915050565b6000610a828284610a45565b915081905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610af68261057b565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610b2857610b27610abc565b5b60018201905091905056fea264697066735822122052bf08d2b3516df7114b011a21d899c0f4da12202be40d1a5c71f6f606b232b264736f6c63430008130033",
          chainId: 1337,
     };
     const sentTxResponse = await wallet.sendTransaction(tx);
     await sentTxResponse.wait(1);
     console.log(sentTxResponse);
}

async function interactWithContract(contract) {
     if (contract === null) {
          console.log("Contract is null");
          return;
     }
     console.log("Contract Interaction");
     const txResponse = await contract.addPerson("Gökhan", "4");
     const gokhanFavoriteNumber = await contract.getFavoriteNumberByName(
          "Gökhan"
     );
     console.log(`Gökhan's favorite number is ${gokhanFavoriteNumber}`);
     console.log(txResponse);
}

async function main() {
     // test network http://127.0.0.1:7545
     let testNetwork = "http://127.0.0.1:7545";
     walletPrivateKey =
          "398eddb834dfa5d722665e431a6ee9841b9afee6e8ebca4a415349cd51cf4339";

     // initialize provider
     const provider = new ethers.providers.JsonRpcProvider(testNetwork);

     // load wallet
     const wallet = new ethers.Wallet(
          walletPrivateKey, // private key of the wallet
          provider
     );

     const deployWith = "CONTRACT_FACTORY";

     console.log("Deploying contract, please wait...");
     if (deployWith === "CONTRACT_FACTORY") {
          let contract = await deployContractWithContractFactory(wallet);
          await interactWithContract(contract);
     } else {
          deployContractWithTransactionData(wallet);
     }
}

main()
     .then(() => process.exit(0))
     .catch((error) => {
          console.error(error);
          process.exit(1);
     });
