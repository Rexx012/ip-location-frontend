import Button from './Button';
import ErrorImg from '../assets/ErrorImg.png';

const SomethingWentWrong = ({ onRetry }) => {
  return (
    <div className='flex flex-col items-center justify-center gap-6 max-w-sm mx-auto py-40'>
      <img src={ErrorImg} alt='Error' />

      <div className='flex flex-col items-center gap-2 text-center'>
        <h1 className='main-heading '>Something went wrong</h1>
        <p className='text-sm '>
          Sorry, we can't process your request at the moment. Please try again
          or check back later.
        </p>
      </div>

      <Button variant='default' onClick={onRetry}>
        Try Again
      </Button>
    </div>
  );
};

export default SomethingWentWrong;
