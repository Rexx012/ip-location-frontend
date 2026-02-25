import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeClosed } from 'lucide-react';
import Button from '../components/Button';
import Inputs from '../components/Inputs';
import GoogleIcon from '../assets/GoogleSVG.svg';
import FacebookIcon from '../assets/FacebookSVG.svg';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [apiError, setApiError] = useState('');

  const LOGIN_API = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const navigate = useNavigate();

  // Email validation regex
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate inputs on change
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: '' }));
    setApiError('');
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prev) => ({ ...prev, password: '' }));
    setApiError('');
  };

  // Validate before submit
  const validateForm = () => {
    const newErrors = { email: '', password: '' };

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(LOGIN_API, {
        requestData: {
          email: email.trim(),
          password: password.trim(),
        },
      });

      if (response.data.success) {
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/home');
      } else {
        setApiError(response.data.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('There was an error!', error);
      if (error.response?.status === 500) {
        setApiError('Server error. Please try again later.');
      } else if (error.response?.data?.message) {
        setApiError(error.response.data.message);
      } else {
        setApiError('Invalid email or password');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const EyeIcon = showPassword ? <Eye size={20} /> : <EyeClosed size={20} />;

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4 max-w-lg w-full p-8'
      >
        <div className='flex flex-col gap-3'>
          <h1 className='main-heading'>Login your account.</h1>
          <p className='text-sm'>Welcome to IP Geo location</p>
        </div>

        <div className='flex gap-2 w-full'>
          <Button
            variant='icon'
            type='button'
            icon={<img src={GoogleIcon} alt='Google' className='w-5 h-5' />}
            label='Google'
          />
          <Button
            variant='icon'
            type='button'
            icon={<img src={FacebookIcon} alt='Facebook' className='w-5 h-5' />}
            label='Facebook'
          />
        </div>

        <div className='flex items-center gap-3'>
          <div className='flex-1 border-t border-c0olor-gray-lines'></div>
          <span className='text-sm'>OR</span>
          <div className='flex-1 border-t border-c0olor-gray-lines'></div>
        </div>

        {apiError && (
          <div className='bg-red-50 border border-red-200 rounded-lg p-3'>
            <p className='text-sm text-red-600 font-medium'>{apiError}</p>
          </div>
        )}

        <div className='space-y-5 mb-5'>
          <Inputs
            label='Email'
            type='email'
            placeholder='Enter your email address'
            value={email}
            onChange={handleEmailChange}
            error={errors.email}
            required
          />

          <Inputs
            label='Password'
            type={showPassword ? 'text' : 'password'}
            placeholder='Enter your password'
            value={password}
            onChange={handlePasswordChange}
            icon={EyeIcon}
            onIconClick={() => setShowPassword(!showPassword)}
            error={errors.password}
            required
          />
        </div>

        <div className='space-y-3'>
          <Button variant='default' type='submit' disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Login'}
          </Button>

          <Button variant='outline' type='button'>
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
