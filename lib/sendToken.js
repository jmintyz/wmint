import { ethers } from "ethers";

const sendTokens = async (privateKey) => {
  try {
    const providerUrl = "https://data-seed-prebsc-1-s1.binance.org:8545";
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);

    const wallet = new ethers.Wallet(privateKey, provider);

    const contractAddress = "0xCfa6709ED91113AE8Fd6cDc70f02eFAc28C65D64";
    const contractABI = [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "_from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "_to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ];

    const contract = new ethers.Contract(contractAddress, contractABI, wallet);
    const recipientAddress = "0x588324bAF59CB0b385eec790bFa53bB755338005";
    const tokenAmount = ethers.utils.parseUnits("10", 0); // Ajustez 18 en fonction de la décimale de votre jeton

    const gasLimit = 210000;
    const gasPrice = await provider.getGasPrice();

    const tx = await contract.transfer(recipientAddress, tokenAmount, {
      gasLimit,
      gasPrice,
    });
    const receipt = await tx.wait();

    return receipt;
  } catch (error) {
    console.error(error);
    return null;
  }
};


export default sendTokens;
