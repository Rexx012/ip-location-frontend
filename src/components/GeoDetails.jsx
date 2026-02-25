import {
  Globe,
  Building2,
  Map,
  Earth,
  Router,
  Mailbox,
  AlarmClock,
  MapPin,
} from 'lucide-react';

const GeoDetailsStyles = ({ label, value, icon }) => {
  return (
    <div className='flex items-center gap-3 border-b border-gray-lines pb-2'>
      <div>{icon}</div>
      <div className='flex flex-col '>
        <span className='text-xs text-primary-text/50'>{label}</span>
        <span className='text-md font-semibold font-family-mono '>
          {value || 'N/A'}
        </span>
      </div>
    </div>
  );
};

const GeoDetails = ({ GEO_DATA }) => {
  const { ip, city, region, country, loc, org, postal, timezone } = GEO_DATA;

  const details = [
    { label: 'IP Address', value: ip, icon: <Globe /> },
    { label: 'City', value: city, icon: <Building2 /> },
    { label: 'Region', value: region, icon: <Map /> },
    { label: 'Country', value: country, icon: <Earth /> },
    { label: 'Organization', value: org, icon: <Router /> },
    { label: 'Postal', value: postal, icon: <Mailbox /> },
    { label: 'Timezone', value: timezone, icon: <AlarmClock /> },
    { label: 'Coordinates', value: loc, icon: <MapPin /> },
  ];

  return (
    <div className='p-5 border border-gray-lines rounded-xl flex flex-col gap-5 self-start'>
      <h1 className='font-family-mono font-medium text-lg'>Geo Details</h1>
      {details.map((detail) => (
        <GeoDetailsStyles
          key={detail.label}
          label={detail.label}
          value={detail.value}
          icon={detail.icon}
        />
      ))}
    </div>
  );
};

export default GeoDetails;
