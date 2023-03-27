const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
    const walletPrivateKey = process.env.TEST_ACCOUNT_PRIVATE_KEY;
    const walletPrivateKeyPassword =
        process.env.TEST_ACCOUNT_PRIVATE_KEY_PASSWORD;

    // load wallet
    const wallet = new ethers.Wallet(
        walletPrivateKey // private key of the wallet
    );
    const encryptedJsonKey = await wallet.encrypt(
        walletPrivateKeyPassword,
        walletPrivateKey
    );
    fs.writeFileSync("./.encryptedKey.json", encryptedJsonKey);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
