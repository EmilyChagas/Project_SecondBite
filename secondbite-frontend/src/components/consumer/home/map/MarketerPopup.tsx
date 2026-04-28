import { Popup } from 'react-map-gl/maplibre';
import { useNavigate } from 'react-router'; // Ajuste o import do react-router
import type { Marketer } from '../../../../interfaces/auth';
import { NavigationArrowIcon } from '../../../icons/NavigationArrowIcon';
import { CloseIcon } from '../../../icons/CloseIcon';
import { StorefrontIcon } from '../../../icons/StorefrontIcon';
import { ClockIcon } from '../../../icons/ClockIcon';
import { CaretRightIcon } from '../../../icons/CaretRightIcon';

interface MarketerPopupProps {
  marketer: Marketer;
  onClose: () => void;
}

export const MarketerPopup = ({ marketer, onClose }: MarketerPopupProps) => {
  const navigate = useNavigate();

  function handleNavigate(e: React.MouseEvent) {
    e.stopPropagation();
    if (!marketer.latitude || !marketer.longitude) return;

    const url = `https://www.google.com/maps/dir/?api=1&destination=${marketer.latitude},${marketer.longitude}`;
    window.open(url, '_blank');
  }

  function handleGoToProfile(e: React.MouseEvent) {
    e.stopPropagation();
    navigate(`/feirante/${marketer.id}`);
  }

  if (!marketer.latitude || !marketer.longitude) return null;

  return (
    <Popup
      anchor="bottom"
      longitude={marketer.longitude}
      latitude={marketer.latitude}
      onClose={onClose}
      closeOnClick={false}
      className="z-40"
      maxWidth="280px"
      closeButton={false}
      offset={15}
    >
      <div className="relative p-1">
        <button
          onClick={e => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute -top-3 -right-3 p-1.5 bg-white text-gray-700 active:text-red-400 rounded-full border border-gray-100 shadow-md active:scale-95 transition-all z-10 cursor-pointer"
          aria-label="Fechar"
        >
          <CloseIcon className="size-4" />
        </button>

        <div className="flex items-start gap-3 mb-3 pr-4">
          <div className="bg-consumer/10 text-consumer p-2 rounded-full shrink-0">
            <StorefrontIcon className="size-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-800 text-base leading-tight truncate">
              {marketer.stallName || marketer.name}
            </h3>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mt-1 truncate">
              Resp: {marketer.name}
            </p>
          </div>
        </div>

        {marketer.operatingSchedule && (
          <div className="flex items-start gap-1.5 mb-4 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1.5 rounded-lg border border-emerald-100/50">
            <ClockIcon className="size-4 shrink-0 mt-0.5" />
            <span className="line-clamp-2">{marketer.operatingSchedule}</span>
          </div>
        )}

        <div className="flex gap-2 mt-2">
          <button
            onClick={handleGoToProfile}
            className="flex-1 bg-consumer active:opacity-60 text-white py-2.5 px-3 rounded-xl flex items-center justify-center gap-1 font-bold transition-opacity text-sm shadow-sm shadow-consumer/20 cursor-pointer"
          >
            Ver Banca
            <CaretRightIcon className="size-4" />
          </button>

          <button
            onClick={handleNavigate}
            className="bg-gray-100 active:bg-gray-200 text-gray-700 py-2.5 px-3 rounded-xl flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
            title="Traçar rota no mapa"
          >
            <NavigationArrowIcon className="size-5" />
          </button>
        </div>
      </div>
    </Popup>
  );
};
