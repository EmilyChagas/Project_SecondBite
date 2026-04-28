import { useMarketersLocations } from '../../../hooks/queries/useMarketers';
import { FreeVectorMap } from '../home/FreeVectorMap';

export const MarketersMap = () => {
  const { data: marketers } = useMarketersLocations();
  return (
    <div className="absolute bottom-19.25 left-0 right-0">
      <FreeVectorMap height="h-[calc(100vh-130px)]" marketers={marketers || []} />
    </div>
  );
};
