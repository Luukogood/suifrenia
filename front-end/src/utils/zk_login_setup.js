import { SuiClient } from '@mysten/sui.js/client';
import { genAddressSeed, getExtendedEphemeralPublicKey } from '@mysten/zklogin';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import {
  generateNonce,
  generateRandomness,
  jwtToAddress,
  getZkLoginSignature,
} from '@mysten/zklogin';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { stringToBigInt } from './misc';
import { toBigIntBE } from 'bigint-buffer';
import { fromB64 } from '@mysten/bcs';
import { Buffer } from 'buffer';
import { MIST_PER_SUI } from '@mysten/sui.js/utils';
import { TransactionBlock } from '@mysten/sui.js/transactions';

const FULLNODE_URL = 'https://fullnode.mainnet.sui.io';
const suiClient = new SuiClient({ url: FULLNODE_URL });

const { epoch, epochDurationMs, epochStartTimestampMs } = await suiClient.getLatestSuiSystemState();

// Gnerating Ephemeral key pair - public and private keys
const ephemeralKeyPair = new Ed25519Keypair();
sessionStorage.setItem('eph_pvt_key', ephemeralKeyPair.getSecretKey());
sessionStorage.setItem(
  'eph_pub_key',
  ephemeralKeyPair.getPublicKey().toBase64()
);

const maxEpoch = Number(epoch) + 2;
const randomness = generateRandomness();
export const nonceGenerator = () => {
  return generateNonce(ephemeralKeyPair.getPublicKey(), maxEpoch, randomness);
};

const nonce = nonceGenerator();

const extendedEphemeralPublicKey = getExtendedEphemeralPublicKey(
  ephemeralKeyPair.getPublicKey()
);

export const getSuiAddress = async (jwt, userSalt, nonce) => {
  const zkLoginUserAddress = jwtToAddress(jwt, stringToBigInt(userSalt));
  localStorage.setItem('wallet_addr', zkLoginUserAddress);
  const ephemeralPublicKeyArray = fromB64(extendedEphemeralPublicKey);
  const zkp = await axios.post('https://prover-dev.mystenlabs.com/v1', {
    jwt: jwt,
    extendedEphemeralPublicKey: toBigIntBE(
      Buffer.from(ephemeralPublicKeyArray)
    ).toString(),
    maxEpoch: maxEpoch,
    jwtRandomness: randomness,
    salt: userSalt,
    keyClaimName: 'sub',
    nonce,
  });
  console.log('zkp: ', zkp);

  // await assembleZkLoginSignature(jwt, zkLoginUserAddress, userSalt, zkp);

  return zkLoginUserAddress;
};

const assembleZkLoginSignature = async (
  jwt,
  zkLoginUserAddress,
  userSalt,
  zkp
) => {
  // Assemble zkLogin signature

  const txb = new TransactionBlock();
  const decodedJwt = jwtDecode(jwt);

  // Transfer 1 SUI to 0xfa0f...8a36.
  const [coin] = txb.splitCoins(txb.gas, [MIST_PER_SUI * 1n]);
  txb.transferObjects(
    [coin],
    '0xfa0f8542f256e669694624aa3ee7bfbde5af54641646a3a05924cf9e329a8a36'
  );
  txb.setSender(zkLoginUserAddress);

  const { bytes, signature: userSignature } = await txb.sign({
    suiClient,
    signer: ephemeralKeyPair,
  });

  // Generate addressSeed using userSalt, sub, and aud (JWT Payload)
  // as parameters for obtaining zkLoginSignature
  const addressSeed = genAddressSeed(
    BigInt(userSalt),
    'sub',
    decodedJwt.sub,
    decodedJwt.aud
  ).toString();

  console.log('Address seed : ', addressSeed);

  const partialZkLoginSignature = zkp;

  // partialZkLoginSignature()
  const zkLoginSignature = getZkLoginSignature({
    inputs: {
      ...partialZkLoginSignature,
      addressSeed,
    },
    maxEpoch,
    userSignature,
  });

  console.log('zkLogin sign : ', zkLoginSignature);

  // Execute transaction
  const executed_transaction = suiClient.executeTransactionBlock({
    transactionBlock: bytes,
    signature: zkLoginSignature,
  });
  console.log(executed_transaction);
};
