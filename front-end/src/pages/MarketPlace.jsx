import React from 'react';
import ReactDOM from 'react-dom';
import 'tailwindcss/tailwind.css';
import food from '/marketfood.png';
import coin from '/marketcoin.png';
import nft from '/marketnft.png';
import map1 from '/bgmap4.png';

// const Box = ({ id }) => {
//   return (
//     <div className="w-40 h-40 border-2 border-gray-700 flex flex-col items-center justify-center m-4">
//       <p>Box {id}</p>
//       <button
//         className="mt-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//         onClick={() => alert(`Button in Box ${id} clicked!`)}
//       >
//         Click Me
//       </button>
//     </div>
//   );
// };

const Marketplace = () => {
  return (
    <div
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-photo/old-brown-crumpled-paper-texture-background-vintage-wallpaper_118047-8897.jpg')",

        backgroundSize: 'cover',
        // backgroundPosition: "center",
        backgroundRepeat: 'no-repeat',
        // width: "100%",
        height: '100vh',
      }}
    >
      <div className='w-[100%] m-0 h-[60px] p-0 z-50 bg-slate-700 text-center '>
        <h5>NAVBAR</h5>
      </div>
      <div className='flex flex-wrap justify-center mt-12 market-cards'>
        <div
          className='bg-red-00 w-[23vw] bg-cover rounded-2xl h-[570px] m-4 relative'
          style={{
            backgroundImage: `url(${food})`,
          }}
        >
          <div className='absolute  bottom-[10%]  w-[90%] flex justify-evenly items-center m-4'>
            <p className='text-[30px] font-bold'>50</p>
            <button className='text-[30px] font-medium px-2 bg-gradient-to-r from-green-500 to-green-800 w-[100px] rounded-[16px] text-center border-2 border-black flex items-center justify-center -pb-1'>
              <p className='translate-y-1'>BUY</p>
            </button>
          </div>
        </div>
        <div
          className='bg-red-00 w-[23vw] bg-cover rounded-2xl h-[570px] m-4 relative'
          style={{
            backgroundImage: `url(${coin})`,
          }}
        >
          <div className='absolute bottom-[10%] w-[90%] flex justify-evenly items-center m-4'>
            <p className='text-[30px] font-bold'>100</p>
            <button className='text-[30px] font-medium px-2 bg-gradient-to-r from-green-500 to-green-800 w-[100px] rounded-[16px] text-center border-2 border-black flex items-center justify-center -pb-1'>
              <p className='translate-y-1'>BUY</p>
            </button>
          </div>
        </div>
        <div
          className='bg-red-00 w-[23vw] bg-cover rounded-2xl h-[570px] m-4 relative'
          style={{
            backgroundImage: `url(${nft})`,
          }}
        >
          <div className='absolute bottom-[10%] w-[90%] flex justify-evenly items-center m-4'>
            <p className='text-[30px] font-bold'>200</p>
            <button className='text-[30px] font-medium px-2 bg-gradient-to-r from-green-500 to-green-800 w-[100px] rounded-[16px] text-center border-2 border-black flex items-center justify-center -pb-1'>
              <p className='translate-y-1'>BUY</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ReactDOM.render(
//   <Marketplace />,
//   document.getElementById('root')
// );
export default Marketplace;
