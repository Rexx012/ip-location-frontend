import { LogOut } from 'lucide-react';

const HomePageHeader = ({ handleLogout }) => {
  return (
    <div className='flex justify-between items-center'>
      <h1 className='main-heading'>See the location of any IP address. </h1>

      <button
        className='flex items-center gap-2 cursor-pointer hover:text-black transition-colors'
        onClick={handleLogout}
      >
        <LogOut /> <span className='hidden md:inline'>Logout</span>
      </button>
    </div>
  );
};

export default HomePageHeader;
