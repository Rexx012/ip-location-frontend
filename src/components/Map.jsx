import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { MapPin } from 'lucide-react';

const iconMarkup = renderToStaticMarkup(
  <div className='text-gray-800 drop-shadow-md'>
    <MapPin size={36} strokeWidth={2.5} />
  </div>,
);

const customPinIcon = L.divIcon({
  html: iconMarkup,
  className: '',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

const RecenterMap = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 13, { animate: true });
  }, [lat, lng, map]);
  return null;
};

const MapComponent = ({ IP_DATA }) => {
  if (!IP_DATA || !IP_DATA.loc) return null;

  const [lat, lng] = IP_DATA.loc.split(',').map(Number);
  const { city, region, country } = IP_DATA;

  return (
    <div className='relative h-135 rounded-xl overflow-hidden z-0 border border-gray-lines bg-[#f3f4f6]'>
      <div className='absolute top-4 left-4 z-500 bg-white px-4 py-2 rounded-full shadow-sm flex items-center gap-2 border border-gray-200'>
        <MapPin size={16} className='text-gray-800' />
        <span className='text-xs font-medium text-gray-800 font-family-mono'>
          {city}, {region}, {country}
        </span>
      </div>

      <MapContainer
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={true}
        className='w-full h-full'
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
        />

        <Marker position={[lat, lng]} icon={customPinIcon} />
        <RecenterMap lat={lat} lng={lng} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
