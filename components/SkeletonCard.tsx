import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SkeletonCard() {
  return (
    <div className="py-4 bg-[#f9f9f9] rounded-lg px-4">
      <SkeletonTheme baseColor="#cfcfcf" highlightColor="#EEEEEE">
        <Skeleton className="my-2" height={16} width={80} />
        <Skeleton className="my-4" height={16} width={150} />
        <Skeleton className="my-4" height={16} width={60} />
        <Skeleton className="my-4" height={16} width={40} />
      </SkeletonTheme>
    </div>
  );
}

export default SkeletonCard;
