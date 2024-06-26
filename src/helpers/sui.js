import 'dotenv/config';
import { getFaucetHost, requestSuiFromFaucetV0 } from '@mysten/sui/faucet';

import config from "../../config.json" assert { type: "json" };
import { DEVNET, TESTNET } from "../constants.js";
import { getAddress, getClient, getKeypair, mistToSui } from "../utils/suiUtils.js";


export const faucet = async () => {
  if(config.network == DEVNET || config.network == TESTNET) {
    console.log("Requesting Sui from faucet.");

    const address = getAddress();

    await requestSuiFromFaucetV0({
      host: getFaucetHost(config.network),
      recipient: address
    });
    
  } else {
    console.log("Faucet is only available on devnet and testnet.");
  }
}

export const balance = async () => {
  const address = getAddress();
  const client = getClient();

  const coinBalance = await client.getBalance({ owner: address });
  const convertedBalance = mistToSui(coinBalance.totalBalance)

  console.log(`Current balance: ${convertedBalance} $SUI`);
}

export const address = async () => {
  const address = getAddress();
  console.log(`Your address is: ${address}`);
}
