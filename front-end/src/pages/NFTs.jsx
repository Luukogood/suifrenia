
import { useEffect, useState } from 'react';
import { fetchSuiFrensNfts } from '../utils/sui-api';
import { Link } from 'react-router-dom';
import Navbar from '../components/Nav';

const NFTs = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [NFTs, SetNFTs] = useState([]);

  // const walletAddress = localStorage.getItem('wallet_addr');
  const walletAddress =
    '0x5be5fe79e9449a61d7ee04c553787657cef20717ab4fcc1c377d251b7bcb4d03';
  const bullshark_nft_type = import.meta.env.VITE_APP_BULLSHARK_NFT_TYPE;
  const capy_nft_type = import.meta.env.VITE_APP_CAPY_NFT_TYPE;

  const makeRpcCall = async () => {
    setLoading(true);
    setError(null);

    try {
      const response1 = await fetchSuiFrensNfts(
        walletAddress,
        bullshark_nft_type,
        10
      );
      const response2 = await fetchSuiFrensNfts(
        walletAddress,
        capy_nft_type,
        10
      );

      console.log(response1.data, response2.data)

      if (response1.data.error) {
        setError(response1.data.error.message);
      } else {
        if (response2.data.error) {
          setError(response2.data.error.message);
        } else {
          setData(response2.data.result);
          console.log(data);
          SetNFTs([
            ...response1.data.result.data,
            ...response2.data.result.data,
          ]);
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      localStorage.setItem('nfts', JSON.stringify(NFTs))
    }
  };

  useEffect(() => {
    makeRpcCall();
  }, []);

  return (
    <div className='w-full h-screen bg-black text-white'>
      <h2 className='text-center font-[handlee] text-5xl pt-3 mb-8 underline'>
        Your Current NFT Collection 😎
      </h2>
      {loading && <p className='text-center text-lg'>Fetching your NFTs...</p>}
      {error && <p>Error: {error}</p>}
      <div className='flex justify-center items-center gap-7 flex-wrap my-7'>
        {NFTs.length
          ? NFTs.map((item) => {
              return (
                <div
                  key={item.data.objectId}
                  className='border-4 rounded-2xl border-yellow-600 cursor-pointer bg-yellow-400 hover:bg-amber-400 hover:scale-110 duration-300 transition-transform'
                >
                  <img
                    src={item.data.display.data.image_url}
                    width={150}
                    alt='NFT image'
                    className='m-7'
                  />
                </div>
              );
            })
          : !loading && (
              <div>
                You don&apos;t have any SuiFrens NFT in your wallet. Kindly purchase
                them from{' '}
                <a
                  href='https://suifrens.com'
                  type='_blank'
                  className='text-blue-600 underline'
                >
                  suifrens.com
                </a>{' '}
                to continue to game!
              </div>
            )}
      </div>
      <div className='text-center my-6 flex justify-center gap-10'>
        <button
          className='bg-amber-500 rounded-xl px-4 py-2 text-xl hover:bg-yellow-600'
          onClick={makeRpcCall}
        >
          Refresh Wallet
        </button>
        {NFTs.length && !loading ? (
          <Link to={`/accessories?nfts=${JSON.stringify(NFTs)}`}>
            <button className='bg-orange-500 rounded-xl px-4 py-2 text-xl hover:bg-orange-600'>
              Continue
            </button>
          </Link>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default NFTs;
