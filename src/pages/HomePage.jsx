import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';

import HomePageHeader from '../components/HomePageHeader';
import SomethingWentWrong from '../components/SomethingWentWrong';
import Skeleton from '../components/Skeleton';

import SearchBar from '../components/SearchBar';
import ActiveIPBanner from '../components/ActiveIPBanner';
import GeoDetails from '../components/GeoDetails';
import Map from '../components/Map';

const HomePage = () => {
  const [IP_DATA, setIP_DATA] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('ipHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const handleDeleteHistory = (ipsToDelete) => {
    setHistory((prev) => {
      const newHistory = prev.filter((ip) => !ipsToDelete.includes(ip));
      localStorage.setItem('ipHistory', JSON.stringify(newHistory));
      return newHistory;
    });
    fetchIPData(); // Revert to logged-in user's IP
  };

  const fetchIPData = useCallback(async (ipAddress = '') => {
    try {
      setLoading(true);
      setError(null);

      const url = ipAddress
        ? `https://ipinfo.io/${ipAddress}/json`
        : 'https://ipinfo.io/json';

      const response = await axios.get(url);
      setIP_DATA(response.data);

      if (ipAddress) {
        setHistory((prev) => {
          const newHistory = [
            ipAddress,
            ...prev.filter((ip) => ip !== ipAddress),
          ].slice(0, 10);
          localStorage.setItem('ipHistory', JSON.stringify(newHistory));
          return newHistory;
        });
      }
    } catch (err) {
      console.error('Error fetching IP data:', err);
      setError(
        err.message || 'Failed to fetch IP data. Please try again later.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIPData();
  }, [fetchIPData]);

  useEffect(() => {
    const hasWristband = localStorage.getItem('isAuthenticated');
    if (hasWristband !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');

    navigate('/');
  };
  return (
    <main className='min-h-screen px-5 lg:px-30 py-20 flex flex-col gap-5'>
      <HomePageHeader handleLogout={handleLogout} />
      <SearchBar
        onSearch={fetchIPData}
        history={history}
        onDeleteHistory={handleDeleteHistory}
      />

      {error && <SomethingWentWrong onRetry={fetchIPData} />}
      {loading && !error && <Skeleton />}

      {!loading && !error && IP_DATA && (
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6'>
          <div className='flex flex-col gap-6'>
            <ActiveIPBanner IP_DATA={IP_DATA} />
            <Map IP_DATA={IP_DATA} />
          </div>
          <GeoDetails GEO_DATA={IP_DATA} />
        </div>
      )}
    </main>
  );
};

export default HomePage;
