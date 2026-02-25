import Ellipse from '../assets/Ellipse.svg';

const BannerDataStyles = ({ label, value, className = '' }) => {
  return (
    <div className='flex flex-col gap-1 relative z-10'>
      <span className='text-xs text-white/40'>{label}</span>
      <span
        className={`text-sm font-medium text-white ${className} font-family-mono`}
      >
        {value || 'N/A'}
      </span>
    </div>
  );
};

const ActiveIPBanner = ({ IP_DATA }) => {
  const { ip, city, region, timezone, country } = IP_DATA;

  const stats = [
    { label: 'LOCATION', value: `${city}, ${country}` },
    { label: 'REGION', value: region },
    { label: 'TIMEZONE', value: timezone },
  ];

  return (
    <div className='bg-primary p-6 sm:p-10 rounded-xl flex flex-col sm:flex-row sm:items-center gap-6 sm:justify-between relative overflow-hidden'>
      <img
        src={Ellipse}
        alt=' '
        className='absolute -top-3 -right-5 pointer-events-none'
      />
      <img
        src={Ellipse}
        alt=''
        className='absolute -bottom-15 -right-5 w-32 pointer-events-none'
      />
      <div>
        <BannerDataStyles
          label='ACTIVE IP'
          value={ip}
          className='font-bold! text-2xl!'
        />
      </div>
      <div className='flex flex-wrap gap-x-10 gap-y-4 sm:gap-x-20'>
        {stats.map((stat) => (
          <BannerDataStyles
            key={stat.label}
            label={stat.label}
            value={stat.value}
          />
        ))}
      </div>
    </div>
  );
};

export default ActiveIPBanner;
