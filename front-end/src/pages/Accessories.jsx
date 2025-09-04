import { useEffect, useState } from 'react';
import theme1 from '/junglecard.png';
import theme2 from '/mysticcard.png';
import theme3 from '/aquacard.png';
import theme4 from '/capyjungle.png';
import theme5 from '/capymystic.png';
import theme6 from '/capyaqua.png';
import { Link, useSearchParams } from 'react-router-dom';
import { createCard } from '../../node-api/server-api';
import Navbar from '../components/Nav';

function Accessories() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedName, setSelectedName] = useState('');

  const handleImageClick = (imageSrc, name) => {
    console.log(name);
    setSelectedImage(imageSrc);
    setSelectedName(name);
  };

  const handleThemeSelect = (themeSrc) => {
    setSelectedTheme(themeSrc);
  };

  const applyTheme = async () => {
    if (selectedTheme) {
      setSelectedImage(selectedTheme);
      console.log(selectedTheme);
    }
    try {
      let theme = '';
      if (selectedTheme.includes('jungle')) {
        theme = 'jungle';
      } else if (selectedTheme.includes('aqua')) {
        theme = 'aqua';
      } else {
        theme = 'mystic';
      }

      await createCard({
        name:
          'Suifren-' +
          theme +
          '-' +
          Math.round(Math.random() * 10000).toString(),
        theme,
        user: localStorage.getItem('user_id'),
        cardImgUrl: selectedTheme,
        baseImgUrl: selectedImage,
      });
      alert('Theme applied and card saved!');
    } catch (error) {
      console.log(error);
    }
  };

  const PlaceholderCard = () => (
    <div className=' rounded-2xl shadow-md bg-slate-700 ml-[50px] w-[240px] text-white border-8 border-yellow-100 border-double h-[350px] flex items-center justify-center'>
      <p>First Select a Card</p>
    </div>
  );

  const Card = ({ src, name, level, width, height }) => (
    <div>
      <div
        className={`w-[${width}] h-[${height}] ml-[20px] mt-[0px]  flex flex-col items-center relative scale-[0.8] cursor-pointer `}
        onClick={() => handleImageClick(src, name)}
      >
        <img
          src={src}
          alt='Bear'
          className='bg-yellow-500 hover:bg-yellow-600 cursor-pointer rounded-2xl'
          width={100}
        />
        <div className='text-center w-full text-white font-bold'>
          <p>{name}</p>
          {/* <p>Level {level}</p> */}
        </div>
      </div>
    </div>
  );

  const ThemeDetails = () => {
    if (selectedTheme === theme1) {
      return (
        <p className='text-3xl font-[handlee]'>
          <p>This is Jungle theme!</p>
          <p>
            <Link to={'/evolution'}>
              <button className='bg-green-600 text-white rounded-md px-2 py-1 hover:bg-green-700 my-4'>
                Evolve your cards
              </button>
            </Link>
          </p>
        </p>
      );
    } else if (selectedTheme === theme2) {
      return (
        <p className='text-3xl font-[handlee]'>
          <p>This is Mystic theme!</p>
          <Link to={'/evolution'}>
            <button className='bg-green-600 text-white rounded-md px-2 py-1 hover:bg-green-700 my-4'>
              Evolve your cards
            </button>
          </Link>
        </p>
      );
    } else if (selectedTheme === theme3) {
      return (
        <p className='text-3xl font-[handlee]'>
          <p>This is Aqua theme!</p>
          <Link to={'/evolution'}>
            <button className='bg-green-600 text-white rounded-md px-2 py-1 hover:bg-green-700 my-4'>
              Evolve your cards
            </button>
          </Link>
        </p>
      );
    } else {
      return (
        <p className='font-semibold text-2xl ml-[-20px]'>
          <p className='text-xl font-[handlee]'>
            Welcome to the Dress-up and Theme Page!{' '}
          </p>
          <Link to={'/evolution'}>
            <button className='bg-green-600 text-white rounded-md px-2 py-1 hover:bg-green-700 my-4'>
              Evolve your cards
            </button>
          </Link>
        </p>
      ); // If no theme is selected, don't display details
    }
  };

  const [queryParams] = useSearchParams();
  let NFTs = queryParams.get('nfts');
  NFTs = JSON.parse(NFTs);

  useEffect(() => {}, [selectedName]);

  return (
    <div className='w-full h-screen bg-[url(war23.png)] bg-cover bg-no-repeat overflow-y-hidden'>
      <div className='acc-page bg-red-00 flex flex-col p-0 m-0 w-[100%]  h-[100vh] text-white '>
        {/* <div className="w-[100%] m-0 h-[60px] p-0 z-50 flex flex-row justify-between navbar-component">
          <div className="w-[150px] h-[85%] bg-red-500 my-auto"></div>

          <span className="flex justify-between w-[60%] px-4 py-1">
            {Array.from({ length: 6 }).map((_, index) => (
              <span
                key={index}
                className="w-[80px] h-[90%] bg-yellow-500 rounded-lg"
              ></span>
            ))}
          </span>
        </div> */}
        <Navbar />
        <div>
          <h1 className='text-3xl ml-[55px] p-4 font-bold '>Current NFTs:</h1>{' '}
        </div>
        <div className='flex w-[100%] mt-[0px] p-0 h-[100%]'>
          <div className='w-[80%] p-0 h-[85vh] bg-yellow-00 overflow-y-hidden '>
            <div className='options-container flex w-[100%] h-[190px] overflow-x-auto p-4 bg-red-00 ml-[0px] no-scrollbar'>
              {NFTs.map((item) => (
                <Card
                  key={item.data.ObjectId}
                  src={item.data.display.data.image_url}
                  name={item.data.type.split('::')[3].toUpperCase()}
                  level={'1'}
                  width={'150px'}
                  height={'209px'}
                />
              ))}
            </div>
            <h1 className='text-3xl bg-green-00 font-medium ml-[65px] underline '>
              Preview:
            </h1>
            <div className='w-[100%] flex justify-between items-center'>
              {selectedImage ? (
                <div className='mt-[-30px]'>
                  <Card
                    src={selectedImage}
                    name={'Capybara'}
                    level={'1'}
                    width={'300px'}
                    height={'718px'}
                  />
                </div>
              ) : (
                <PlaceholderCard />
              )}

              {
                <div className='w-[55%] fit h-[438px] flex justify-center items-center  theme-details text-slate-800'>
                  <ThemeDetails />
                </div>
              }
            </div>
          </div>
          <div className='w-[20%] h-[90vh] mt-[-70px] bg-cyan-400 theme-wrapper p-0 flex flex-col justify-between items-center no-scrollbar'>
            <h2 className='text-xl font-bold mb-4'>Select Theme:</h2>
            <div className='theme-options flex flex-col items-center'>
              <img
                src={
                  selectedName.toLowerCase().includes('capy') ? theme4 : theme1
                }
                alt='Theme 1'
                className={`cursor-pointer mb-2 ${
                  selectedTheme ===
                  (selectedName.toLowerCase().includes('capy')
                    ? theme4
                    : theme1)
                    ? 'border-[8px] border-green-700'
                    : 'border-[8px] border-gray-300'
                }`}
                onClick={() =>
                  handleThemeSelect(
                    selectedName.toLowerCase().includes('capy')
                      ? theme4
                      : theme1
                  )
                }
              />
              <img
                src={
                  selectedName.toLowerCase().includes('capy') ? theme5 : theme2
                }
                alt='Theme 2'
                className={`cursor-pointer mb-2 ${
                  selectedTheme ===
                  (selectedName.toLowerCase().includes('capy')
                    ? theme5
                    : theme2)
                    ? 'border-[8px] border-green-700'
                    : 'border-[8px]  border-gray-300'
                }`}
                onClick={() =>
                  handleThemeSelect(
                    selectedName.toLowerCase().includes('capy')
                      ? theme5
                      : theme2
                  )
                }
              />
              <img
                src={
                  selectedName.toLowerCase().includes('capy') ? theme6 : theme3
                }
                alt='Theme 3'
                className={`cursor-pointer mb-2 ${
                  selectedTheme ===
                  (selectedName.toLowerCase().includes('capy')
                    ? theme6
                    : theme3)
                    ? 'border-[8px]  border-green-700'
                    : 'border-[8px]  border-gray-300'
                }`}
                onClick={() =>
                  handleThemeSelect(
                    selectedName.toLowerCase().includes('capy')
                      ? theme6
                      : theme3
                  )
                }
              />

              <button
                className={`mb-96 px-4 py-2  rounded-md ${
                  selectedImage
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-300 cursor-not-allowed text-black'
                }`}
                disabled={!selectedImage}
                onClick={applyTheme}
              >
                Apply Theme
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accessories;
