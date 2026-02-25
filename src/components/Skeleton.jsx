const ShimmerBlock = ({ className }) => (
  <div className={`bg-gray-200 rounded animate-pulse ${className}`} />
);

const BannerSkeleton = () => (
  <div className='bg-primary rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-6'>
    <div className='flex flex-col gap-2 min-w-[140px]'>
      <ShimmerBlock className='h-3 w-16 !bg-gray-600' />
      <ShimmerBlock className='h-6 w-32 !bg-gray-600' />
    </div>

    <div className='hidden sm:block w-px h-10 bg-gray-600' />

    <div className='flex flex-col gap-2'>
      <ShimmerBlock className='h-3 w-16 !bg-gray-600' />
      <ShimmerBlock className='h-4 w-36 !bg-gray-600' />
    </div>

    <div className='hidden sm:block w-px h-10 bg-gray-600' />

    <div className='flex flex-col gap-2'>
      <ShimmerBlock className='h-3 w-14 !bg-gray-600' />
      <ShimmerBlock className='h-4 w-44 !bg-gray-600' />
    </div>

    <div className='hidden sm:block w-px h-10 bg-gray-600' />

    <div className='flex flex-col gap-2'>
      <ShimmerBlock className='h-3 w-16 !bg-gray-600' />
      <ShimmerBlock className='h-4 w-28 !bg-gray-600' />
    </div>
  </div>
);

const MapSkeleton = () => (
  <div className='bg-gray-100 rounded-2xl border border-gray-lines overflow-hidden flex flex-col'>
    {/* Location label */}
    <div className='p-4 flex items-center gap-2'>
      <ShimmerBlock className='h-4 w-4 rounded-full' />
      <ShimmerBlock className='h-4 w-56' />
    </div>
    {/* Map area */}
    <div className='flex-1 min-h-70 bg-gray-200 animate-pulse' />
  </div>
);

const GeoDetailRow = () => (
  <div className='flex items-start gap-3 py-3'>
    <ShimmerBlock className='h-5 w-5 rounded-full shrink-0 mt-1' />
    <div className='flex flex-col gap-1.5 flex-1'>
      <ShimmerBlock className='h-3 w-20' />
      <ShimmerBlock className='h-4 w-36' />
    </div>
  </div>
);

const GeoDetailsSkeleton = () => (
  <div className='bg-white rounded-2xl border border-gray-lines p-6'>
    {/* Header */}
    <ShimmerBlock className='h-5 w-28 mb-4' />

    {/* Detail rows */}
    <div className='divide-y divide-gray-lines'>
      {Array.from({ length: 8 }).map((_, i) => (
        <GeoDetailRow key={i} />
      ))}
    </div>
  </div>
);

const Skeleton = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6'>
      <div className='flex flex-col gap-6'>
        <BannerSkeleton />
        <MapSkeleton />
      </div>
      <GeoDetailsSkeleton />
    </div>
  );
};

export default Skeleton;
