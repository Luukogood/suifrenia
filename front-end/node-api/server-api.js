import axios from 'axios';

export const loginUser = async (loginData) => {
  const res = await axios.post(
    `${import.meta.env.VITE_APP_SERVER_URL}/api/users/login`,
    loginData
  );
  return res;
};

export const updateWalletAddress = async (address, user_id) => {
  const res = await axios.post(
    `${import.meta.env.VITE_APP_SERVER_URL}/api/users/update/wallet-address`,
    {
      _id: user_id,
      walletAddress: address,
    }
  );
  return res;
};

export const createCard = async (cardDetails) => {
  const res = await axios.post(
    `${import.meta.env.VITE_APP_SERVER_URL}/api/cards/`,
    cardDetails
  );
  return res;
};

export const getCardCollection = async () => {
  const res = await axios.get(
    `${
      import.meta.env.VITE_APP_SERVER_URL
    }/api/cards?user_id=${localStorage.getItem('user_id')}`
  );
  return res;
};

export const feedCards = async (cardDetails) => {
  const res = await axios.put(
    `${import.meta.env.VITE_APP_SERVER_URL}/api/cards/${cardDetails.id}`,
    cardDetails
  );
  return res;
};

export const addCardToBattleDeck = async (card_id) => {
  const res = await axios.post(
    `${import.meta.env.VITE_APP_SERVER_URL}/api/users/add/battle-deck`,
    { card: card_id, user_id: localStorage.getItem('user_id') }
  );
  return res;
};

export const fetchBattleDeck = async (user_id) => {
  const res = await axios.get(
    `${
      import.meta.env.VITE_APP_SERVER_URL
    }/api/users/get/battle-deck?user_id=${user_id || localStorage.getItem('user_id')}`
  );
  return res;
};

export const fetchOpponents = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_APP_SERVER_URL}/api/users/`
  );
  return res;
};
