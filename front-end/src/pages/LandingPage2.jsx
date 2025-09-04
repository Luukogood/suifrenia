import { useEffect } from 'react';

const LandingPage2 = () => {
  useEffect(() => {
    if (
      !localStorage.getItem('wallet_addr') ||
      !localStorage.getItem('user_id')
    ) {
      window.location.pathname = '/login';
    }
  }, []);
  return <div>LandingPage2</div>;
};

export default LandingPage2;
