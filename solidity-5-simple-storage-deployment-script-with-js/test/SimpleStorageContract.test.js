const { expect, util } = require("chai");

describe("SimpleStorageContract", () => {
	it("should return a person's favorite number", async () => {
		const SimpleStorageContract = await ethers.getContractFactory("SimpleStorageContract");
		const simpleStorageContract = await SimpleStorageContract.deploy();
		await simpleStorageContract.deployed();
		await simpleStorageContract.addPerson("Gokhan", 4);
		result = await simpleStorageContract.getFavoriteNumberByName("Gokhan");
		expect(result.toString()).equal("4");
	});
	it("should change a person's favorite number", async () => {
		const SimpleStorageContract = await ethers.getContractFactory("SimpleStorageContract");
		const simpleStorageContract = await SimpleStorageContract.deploy();
		await simpleStorageContract.deployed();
		await simpleStorageContract.addPerson("Gokhan", 2);
		result = await simpleStorageContract.getFavoriteNumberByName("Gokhan");
		expect(result.toString()).equal("2");
		await simpleStorageContract.updatePerson("Gokhan", 4);
		result = await simpleStorageContract.getFavoriteNumberByName("Gokhan");
		expect(result.toString()).equal("4");
	});
});