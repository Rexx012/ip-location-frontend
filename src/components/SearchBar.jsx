import { Search, X, Clock, Trash2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const SearchBar = ({ onSearch, history = [], onDeleteHistory }) => {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter history based on input
  const filtered = inputValue.trim()
    ? history.filter((ip) => ip.includes(inputValue.trim()))
    : history;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = inputValue.trim();

    if (trimmedInput === '') return;

    const ipv4Regex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!ipv4Regex.test(trimmedInput)) {
      setInputError('Please enter a valid IPv4 address.');
      return;
    }
    setInputError('');
    setIsOpen(false);
    onSearch(trimmedInput);
  };

  const handleClear = () => {
    setInputValue('');
    setInputError('');
  };

  const handleSelectIP = (ip) => {
    setInputValue(ip);
    setIsOpen(false);
    setInputError('');
    onSearch(ip);
  };

  const handleToggle = (ip, e) => {
    e.stopPropagation();
    setSelectedItems((prev) =>
      prev.includes(ip) ? prev.filter((item) => item !== ip) : [...prev, ip],
    );
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDeleteHistory(selectedItems);
    setSelectedItems([]);
  };

  return (
    <div className='relative' ref={wrapperRef}>
      <div className='flex flex-col gap-2 w-full'>
        <form
          onSubmit={handleSubmit}
          className={`flex items-center gap-3 w-full border ${inputError ? 'border-red-500' : 'border-gray-lines'} rounded-2xl px-4 py-3 lg:py-1.5 transition-colors`}
        >
          <Search size={20} className='text-gray-lines shrink-0' />
          <input
            type='text'
            placeholder='Enter an IP address — e.g. 8.8.8.8'
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            className='flex-1 bg-transparent focus:outline-none text-sm placeholder-gray-lines'
          />
          {inputValue && (
            <button
              type='button'
              onClick={handleClear}
              className='text-gray-500 hover:text-primary transition-colors  text-sm shrink-0 cursor-pointer'
            >
              Clear
            </button>
          )}
          <button
            type='submit'
            className='hidden lg:block bg-primary text-white px-5 py-2 rounded-xl font-medium hover:opacity-90 transition-all  shrink-0 whitespace-nowrap cursor-pointer'
          >
            Look up IP
          </button>
        </form>
        {inputError && (
          <span className='text-red-500 text-xs px-3 font-medium'>
            {inputError}
          </span>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && filtered.length > 0 && (
        <div className='absolute top-full left-0 right-0 mt-2 bg-white border border-gray-lines rounded-xl shadow-lg z-50 overflow-hidden'>
          <div className='flex items-center justify-between px-4 pt-3 pb-2'>
            <span className='text-xs font-medium text-gray-400 uppercase tracking-wide'>
              Recent Searches
            </span>
            {selectedItems.length > 0 && (
              <button
                onClick={handleDelete}
                className='text-xs flex items-center gap-1 text-red-500 hover:text-red-600 transition-colors cursor-pointer font-medium'
              >
                <Trash2 size={12} /> Delete ({selectedItems.length})
              </button>
            )}
          </div>
          <ul className='max-h-48 overflow-y-auto'>
            {filtered.map((ip) => (
              <li
                key={ip}
                onClick={() => handleSelectIP(ip)}
                className='flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors'
              >
                <input
                  type='checkbox'
                  checked={selectedItems.includes(ip)}
                  onChange={(e) => handleToggle(ip, e)}
                  onClick={(e) => e.stopPropagation()}
                  className='cursor-pointer w-3.5 h-3.5 accent-black shrink-0'
                />
                <Clock size={14} className='text-gray-400 shrink-0' />
                <span className='text-sm font-family-mono'>{ip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
