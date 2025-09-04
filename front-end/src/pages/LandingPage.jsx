import React from "react";
import land1 from "../../public/1.png";
import land2 from "../../public/2.png";
import land3 from "../../public/3.png";
import land4 from "../../public/4.png";
import land5 from "../../public/5.png";
import land6 from "../../public/6.png";
import land7 from "../../public/7.png";
import { FaHeart, FaYoutube } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import { FaRegCopyright } from "react-icons/fa6";

import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <div className='flex flex-col justify w-screen overflow-x-hidden no-scrollbar h-screen content center bg-violet-950'>
      <div>
        <img src={land1} alt='' />
      </div>

      <div>
        <img src={land2} alt='' />
      </div>
      <div>
        <img src={land3} alt='' />
      </div>
      <div>
        <img src={land4} alt='' />
      </div>
      <div>
        <img src={land5} alt='' />
      </div>
      <div>
        <img src={land6} alt='' />
      </div>
      <div>
        <img src={land7} alt='' />
      </div>

      <div className='fixed top-4 right-[20px] '>
        <Link to={'/login'}>
          <button className='bg-gradient-to-r text-[15px] md:text-2xl w-[100px] font-[handlee] from-[#f0d040] to-[#cd8f09] md:w-[200px] h-[50px] rounded-lg font-bold market-cards hover:from-yellow-600 hover:to-amber-500 shadow-2xl hover:shadow-amber-500 shadow-amber-400'>
            PLAY NOW!
          </button>
        </Link>
      </div>
      <div className='w-[90%] md:w-[70%] h-[200px] bg-violet-950 m-auto flex flex-col justify-center items-center mb-[50px]'>
        <div className='flex justify-evenly w-[100%] h-[200px] items-center footer'>
          <a href='https://youtube.com' target='_blank'>
            <FaYoutube className='footer-icons' />
          </a>
          <a href='https://telegram.com' target='_blank'>
            <FaTelegramPlane className='footer-icons' />
          </a>
          <a href='https://twitter.com/SuiFrenia' target='_blank'>
            <FaXTwitter className='footer-icons' />
          </a>
          <a
            href='https://www.canva.com/design/DAGGtgs5Pfk/5W8HpCJuqk5XtVtCmrxGzA/edit'
            target='_blank'
          >
            <IoDocumentText className='footer-icons' />
          </a>
        </div>
        <div className='text-[#fff131] text-lg'>
          <span className='flex justify-center items-center'>
            <FaRegCopyright className='mx-2' /> SuiFrenia 2024{' '}
          </span>
          <span className='flex justify-center items-center'>
            Made with 💖 by
            100xEngineers{' '}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
