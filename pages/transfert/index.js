import React, { useState } from "react";
import sendTokens from "../lib/sendToken";

const Index = () => {
  const [transactionResult, setTransactionResult] = useState(null);

  const handleSendTokens = async () => {
    const privateKey = "5f26696798c76a4ba6384a4fd266439f9b8801290eada130d6627742e54a93ee";
    const receipt = await sendTokens(privateKey);
    setTransactionResult(receipt);
  };

  return (
    <div>
      <h1>Envoi de jetons sur Binance Smart Chain Testnet</h1>
      <button onClick={handleSendTokens}>Envoyer des jetons</button>
      {transactionResult && (
        <div>
          <h2>Résultat de la transaction</h2>
          <pre>{JSON.stringify(transactionResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Index;