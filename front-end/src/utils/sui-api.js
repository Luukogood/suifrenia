import axios from 'axios';

export const fetchNFTsFromWallet = async (wallet_addr) => {
  const resp = await axios.get(
    'https://sui-testnet-endpoint.blockvision.org/v2/sui/account/nfts',
    {
      params: {
        account: wallet_addr,
      },
      headers: { Accept: 'application/json', Authorization: '' },
    }
  );
  console.log(resp.data);
  return resp.data;
};

fetchNFTsFromWallet(
  '0xe335d84c489084474aac4322fb9ac5173369d27487c404558e99c7c5ec608075'
);

export const fetchSuiFrensNfts = async (walletAddress, StructType, limit) => {
  const response = await axios.post('https://fullnode.mainnet.sui.io:443', {
    jsonrpc: '2.0',
    id: 1,
    method: 'suix_getOwnedObjects',
    params: [
      walletAddress,
      {
        filter: {
          MatchAll: [
            {
              StructType,
            },
            {
              AddressOwner: walletAddress,
            },
          ],
        },
        options: {
          showType: true,
          showOwner: true,
          showPreviousTransaction: true,
          showDisplay: true,
          showContent: true,
          showBcs: false,
          showStorageRebate: false,
        },
      },
      null,
      limit,
    ],
  });
  return response;
};
