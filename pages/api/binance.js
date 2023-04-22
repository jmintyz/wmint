import axios from 'axios';
import crypto from 'crypto';

function createSignature(timestamp, secretKey) {
  const query = `timestamp=${timestamp}`;
  return crypto
    .createHmac('sha256', secretKey)
    .update(query)
    .digest('hex');
}

const API_KEY = process.env.NEXT_PUBLIC_BINANCE_API_KEY;
const SECRET_KEY = process.env.NEXT_PUBLIC_BINANCE_SECRET_KEY;

const instance = axios.create({
  baseURL: 'https://api.binance.com',
  headers: {
    'X-MBX-APIKEY': API_KEY,
  },
});

async function getAccountBalances() {
  const timestamp = Date.now();
  const signature = createSignature(timestamp, SECRET_KEY);

  const { data: accountData } = await instance.get('/api/v3/account', {
    params: {
      timestamp,
      signature,
    },
  });

  return accountData.balances;
}


async function getAllPricesInUSDT() {
    const { data: allPrices } = await instance.get('/api/v3/ticker/price');
    const filteredPrices = allPrices.filter((price) => price.symbol.endsWith('USDT'));
    return filteredPrices;
  }

async function getEURUSDTPrice() {
    const { data: allPrices } = await instance.get('/api/v3/ticker/price');
    const eurUsdtPrice = allPrices.find((price) => price.symbol === 'EURUSDT');
    return parseFloat(eurUsdtPrice.price);
  }
  
  export default async function handler(req, res) {
    try {
      const [balances, pricesInUSDT, eurUsdtPrice] = await Promise.all([
        getAccountBalances(),
        getAllPricesInUSDT(),
        getEURUSDTPrice(),
      ]);
  
      res.status(200).json({ balances, pricesInUSDT, eurUsdtPrice });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération des soldes' });
    }
  }
