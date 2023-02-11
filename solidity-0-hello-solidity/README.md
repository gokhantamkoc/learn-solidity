# **Lesson 0: Hello Solidity**

## **Creating a Solidity Project with Hardhat**

The most powerful tool to create a solidity development environment is `npm`. Therefore, I will always prepare the lessons with NPM projects.

Before starting to create a solidity project, you complete these requirements:

1. Install `node.js`. (Instructions can be found [here](https://nodejs.org/en/)). `npm` will be automatically available.
2. Test your installation with opening your favorite terminal and executing `npm --version` command. You should see smth like below, if your installation is successful:

```shell
$ npm --version
X.Y.Z
```

Now let's start creating a npm project:
1. Create an empty folder and name it `hello-solidity`. This is folder is the project placeholder.
2. Open a terminal in your `hello-solidity` folder. 
3. Execute `npm init -y` and `npm` creates a npm project for you. Under `hello-solidity` you should see file named `package.json`.

```json
{
  "name": "hello-solidity",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```
4. Let's install `hardhat` for solidity development. Run `npx hardhat` command. This is `hardhat`'s `init` command.
5. `hardhat` will ask you which type of project to create. Select `Create an empty hardhat.config.js` option. When you executed the command, you should have a new file in your project called `hardhat.config.js`.

```javascript
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
};
```
6. Your `solidity` project initialization is not complete. `hardhat` just added a config file. Run `npm install --save-dev hardhat`.
7. You are halfway done. Let's create some folders under `hello-solidity`.
	- contracts
	- scripts
	- test
8. After creating your folders. Let's add more `npm` packages.

```shell
$ npm install --save-dev @nomiclabs/hardhat-waffle @nomiclabs/hardhat-ethers ethereum-waffle chai  ethers solidity-coverage
```

> **NOTE:** Packages' (you add at step 8) explanations can be found [here](#hardhat-plugins)

9. Let's modify `package.json` to use `hardhat` features. Go to `scripts` section. Add below commands:

```
"build": "hardhat compile"
```

> **WARNING**: Your `package.json` may have these commands. Replace them with above commands or you CANNOT use `hardhat` features.

10. Let's activate the installed `hardhat` plugins. Modify `hardhat.config.js`:

```javascript
require("@nomiclabs/hardhat-waffle");
require('solidity-coverage');
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.5",
};
```

11. Let's implement the `helloworld.sol`.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
contract HelloWorldContract {
	string private name;
	address private owner;

	constructor() {
		owner = msg.sender;
		name = "solidity";
	}

	modifier onlyOwner() {
		require(msg.sender == owner);
		_;
	}

	function changeName(string memory _name) public {
		name = _name;
	}

	function getName() public view returns (string memory) {
		return string.concat("Hello ", name);
	}

	function destroyContract() public onlyOwner payable {
		address payable payableAddr = payable(address(this));
		selfdestruct(payableAddr);
	}
}
```

12. Now you can build the npm project to produce a deployable smart contract. Run `npm run build`. Under `hello-solidity` project folder you should see the `artifacts` folder:

```
-> artifacts/
	-> build-info/
		-> db75b867543ec1561a70e7e372c24de7.json
	-> contracts/
		-> HelloWorldContract.sol/
			-> HelloWorldContract.dbg.json
			-> HelloWorldContract.json
```

In the next lesson, you will develop a smart contract and its test cases.
