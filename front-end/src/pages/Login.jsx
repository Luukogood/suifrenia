import { GoogleLogin } from '@react-oauth/google';
import { useEffect, useState } from 'react';
import { getSuiAddress, nonceGenerator } from '../utils/zk_login_setup';
import { useNavigate } from 'react-router-dom';
import { ConnectButton, useWallet } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
import { loginUser } from '../../node-api/server-api';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const navigate = useNavigate();
  const [jwt, setJwt] = useState('');
  const [userSalt, setUserSalt] = useState(localStorage.getItem('salt') || '');
  const [nonce, setNonce] = useState('');

  const responseMessage = async (response) => {
    console.log('Google login response: ', response);
    console.log('salt: ', userSalt);
    localStorage.setItem('salt', userSalt);
    setJwt(response.credential);
    const decodedJwt = jwtDecode(response.credential);
    const suiAdd = await getSuiAddress(response.credential, userSalt, nonce);
    console.log('sui Add : ', suiAdd);
    try {
      const resp = await loginUser({
        email: decodedJwt.email,
        name: decodedJwt.name,
        imageUrl: decodedJwt.picture,
        walletAddress: suiAdd,
      });
      console.log('Zklogin : ', resp.data);
      localStorage.setItem('user_id', resp.data._id);
      localStorage.setItem('game-coin', resp.data.gameCoin);
      localStorage.setItem('food-coin', resp.data.foodCoin);
      navigate('/nfts');
    } catch (error) {
      console.log(error);
    }
  };
  const errorMessage = (error) => {
    console.log('Google login error: ', error);
  };

  const wallet = useWallet();

  const handleWalletConnect = async () => {
    if (wallet.status === 'connected') {
      const walletAddress = await wallet.account;
      localStorage.setItem('wallet_addr', walletAddress.address);
      try {
        const resp = await loginUser({
          walletAddress: walletAddress.address,
        });
        console.log('Sui wallet login : ', resp.data);
        localStorage.setItem('user_id', resp.data._id);
        localStorage.setItem('game-coin', resp.data.gameCoin);
        localStorage.setItem('food-coin', resp.data.foodCoin);
        navigate('/nfts');
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    // generating nonce for google oauth flow
    const res = nonceGenerator();
    setNonce(res);
  }, []);

  useEffect(() => {
    if (wallet.connected) handleWalletConnect();
  }, [wallet.connected]);

  return (
    <div className='w-full h-screen bg-gray-950 bg-[url("/login-bg2.jpeg")] bg-no-repeat bg-cover flex items-center justify-center'>
      <div className='text-center text-white border-4 border-yellow-600 w-[48%] rounded-2xl bg-gradient-to-r from-yellow-700 to-yellow-500 bg-opacity-60 filter p-4 glass'>
        <h1 className='text-6xl flex items-center justify-center'>
          Login to{' '}
          <img
            className='inline'
            src='/logo.png'
            width={100}
            alt='sui-frenia'
          />
          <span className='bg-white px-2 rounded-2xl'>
            <span className='bg-gradient-to-r from-red-600 to-amber-800 bg-clip-text text-transparent font-[handlee] font-extrabold'>
              <u>SuiFrenia</u>
            </span>
          </span>
        </h1>
        <p className='text-2xl font-[handlee] my-4'>
          Let&apos;s dive into world of SuiFrens!
        </p>
        <input
          className='rounded-lg text-lg py-1 px-3 w-72 mt-4 text-black'
          type='text'
          placeholder='Enter salt (Remember this) '
          value={userSalt}
          onChange={(e) => setUserSalt(e.target.value)}
        />
        <p>You can&apos;t afford to forget the salt!</p>
        <div className='w-80 text-center mx-auto py-6 flex justify-center'>
          <GoogleLogin
            onSuccess={responseMessage}
            onError={errorMessage}
            nonce={nonce}
          />
        </div>
        ---------------------OR---------------------
        <div className='my-4 flex justify-center'>
          <ConnectButton label='Connect your wallet' />
        </div>
        <span className='text-center mx-auto'>
          Wallet status : {wallet.status}
          {wallet.account && wallet.account.address}
        </span>
      </div>
    </div>
  );
};

export default Login;
