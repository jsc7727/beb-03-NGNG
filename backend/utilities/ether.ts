import { providers, Wallet, utils, Contract } from "ethers";
const provider = new providers.JsonRpcProvider('http://localhost:7545');
const artifact = require("./../../contract2/build/contracts/NgngToken.json");
const artifact2 = require("./../../contract2/build/contracts/NgngNFT.json");

const chalk = require("chalk")
export const createWallet = () => {
    const signer = Wallet.createRandom();
    return signer?._signingKey()?.privateKey;
}

export const transferToken = (privateKey: string) => {
    const wallet = new Wallet(privateKey, provider);
    const contract = new Contract(process.env.ERC20_ADDRESS, artifact.abi, wallet);
    (async function () {
        let recipient = process.env.address2;
        let transaction = await contract.transfer(recipient, "ngng NFT token uri");
        let result = await transaction.wait();

        //You can inspect transaction on Etherscan
        console.log(`https://rinkeby.etherscan.io/tx/${result.transactionHash}`);

        //You can inspect the token transfer activity on Etherscan
        console.log(`https://rinkeby.etherscan.io/token/${contract.address}`);

        //You can also inpect token balances on a single account
        console.log(`https://rinkeby.etherscan.io/token/${contract.address}?a=${recipient}`);


    })();

}

export const transferNFT = () => {

}


export const getBalance = (privateKey: string) => {
    const wallet = new Wallet(privateKey, provider);
    const OwnerWallet = new Wallet(process.env.OWNER_PRIVATE_KEY, provider);
    const contract = new Contract(process.env.ERC20_ADDRESS, artifact.abi, OwnerWallet);

    (async function () {
        let balance = await contract.balanceOf(wallet.address);
        let result = await balance.wait();
        return result;
    })();
}

export const mintToken = (privateKey: string, amount: null | string = null) => {
    const wallet = new Wallet(privateKey, provider);
    const OwnerWallet = new Wallet(process.env.OWNER_PRIVATE_KEY, provider);
    const contract = new Contract(process.env.ERC20_ADDRESS, artifact.abi, OwnerWallet);
    // const newAmount = utils.par(amount || "100");
    (async function () {
        let transaction = await contract.mintToken(wallet.address, (amount || "100"));
        let result = await transaction.wait();
        //You can inspect transaction on Etherscan
        console.log(`https://rinkeby.etherscan.io/tx/${result.transactionHash}`);
        //You can inspect the token transfer activity on Etherscan
        console.log(`https://rinkeby.etherscan.io/token/${contract.address}`);
        //You can also inpect token balances on a single account
    })();
}

export const mintNFT = (privateKey: string) => {
    const Owner = new Wallet(process.env.OWNER_PRIVATE_KEY, provider);
    const recipient = new Wallet(privateKey, provider);
    const contract = new Contract(process.env.ERC20_ADDRESS, artifact2.abi, Owner);
    (async function () {
        let recipientAddress = recipient.address;
        let transaction = await contract.mintNFT(recipientAddress, "ngng NFT token uri");
        let result = await transaction.wait();

        //You can inspect transaction on Etherscan
        console.log(`https://rinkeby.etherscan.io/tx/${result.transactionHash}`);

        //You can inspect the token transfer activity on Etherscan
        console.log(`https://rinkeby.etherscan.io/token/${contract.address}`);

        //You can also inpect token balances on a single account
        console.log(`https://rinkeby.etherscan.io/token/${contract.address}?a=${recipient}`);

    })();
}

