import { MapPinIcon } from '../../../icons/MapPinIcon';

interface MapPinProps {
  onClick: () => void;
}

export const MapPinMarker = ({ onClick }: MapPinProps) => {
  return (
    <div
      onClick={e => {
        e.stopPropagation();
        onClick();
      }}
      className="cursor-pointer transition-transform duration-200 group"
    >
      <MapPinIcon className="text-green-600 size-8 fill-green-600 drop-shadow-lg group-hover:text-green-800" />
      <div className="w-4 h-1 bg-black/20 rounded-full mx-auto blur-[1px]" />
    </div>
  );
};
