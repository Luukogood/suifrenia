import { Link } from 'react-router-dom';
import food from '/food.png';
import coin from '/coin.png';
import logo from '/suifrenia-logo.png';
import { useAccountBalance, useWallet } from '@suiet/wallet-kit';
import { useEffect } from 'react';

function Navbar() {
  const links = [
    { url: 'nfts', name: 'NFTs' },
    { url: `accessories?nfts=${localStorage.getItem('nfts')}`, name: 'Dress Up' },
    { url: `evolution`, name: 'Evolution' },
    { url: 'mappage', name: 'Battle Map' },
  ];

  const wallet = useWallet();
  const { error, loading, balance } = useAccountBalance();

  return (
    <div>
      <div className='w-[100%] m-0 h-[60px] py-1 z-50 flex flex-row justify-between navbar-component text-white'>
        <Link to={'/'}>
          <div className='w-[150px] flex justify-between items-center cursor-pointer'>
            <img src={logo} alt='' width={60} />
            <h1 className='text-5xl font-bold font-[handlee] text-black'>
              SuiFrenia
            </h1>
          </div>
        </Link>
        <span className='flex justify-between w-[60%] px-4 py-1'>
          <span className='w-[80px] h-[90%] bg-gradient-to-r from-[#4e1818] to-[#713838] rounded-lg flex items-center justify-evenly '>
            <img src={food} alt='' className='w-[30px] h-[30px]' />
            <p>{localStorage.getItem('food-coin')}</p>
          </span>
          <span className='w-[80px] h-[90%] bg-gradient-to-r from-[#4e1818] to-[#713838] rounded-lg flex items-center justify-evenly '>
            <img src={coin} alt='' className='w-[30px] h-[30px]' />
            <p>{localStorage.getItem('game-coin')}</p>
          </span>
          {links.map((link, index) => (
            <Link
              to={`/${link.url}`}
              key={index}
              className='w-[90px] h-[90%] bg-gradient-to-r from-amber-900 to-[#4e1818] rounded-lg flex items-center justify-center hover:from-red-800 hover:to-amber-700'
            >
              <span className='w-full h-full flex items-center justify-center'>
                {link.name}
              </span>
            </Link>
          ))}
          <div className='border-2 bg-amber-600 px-1 rounded-xl flex items-center'>
            <p>{(Number.parseInt(balance) / 10 ** 9).toFixed(3)} SUI</p>{' '}
          </div>
          <Link
            to='/login'
            onClick={() => {
              localStorage.removeItem('WK__LAST_CONNECT_WALLET_NAME');
              wallet.disconnect();
            }}
            className='hover:opacity-80'
          >
            LogOut
            <span>
              <img
                className='inline mx-2'
                src='/logout.png'
                alt='logout'
                width={50}
              />
            </span>
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Navbar;
