import Map, { Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapPinIcon } from '../icons/MapPinIcon';
import { NavigationArrowIcon } from '../icons/NavigationArrowIcon';
import { useReverseGeocode } from '../../hooks/queries/useReverseGeocode';

interface StaticMapProps {
  latitude: number;
  longitude: number;
}

export function StaticMap({ latitude, longitude }: StaticMapProps) {
  const { data: geocodedAddress, isPending } = useReverseGeocode(latitude, longitude);

  const handleOpenMaps = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`, '_blank');
  };

  return (
    <div className="flex flex-col gap-3 w-full mt-2">
      <div className="h-40 w-full rounded-2xl overflow-hidden border border-gray-200 relative shadow-inner bg-gray-100">
        <Map
          initialViewState={{ longitude, latitude, zoom: 15 }}
          mapStyle="https://tiles.openfreemap.org/styles/positron"
          style={{ width: '100%', height: '100%' }}
        >
          <Marker longitude={longitude} latitude={latitude} anchor="bottom">
            <div className="text-consumer hover:scale-110 transition-transform cursor-pointer pb-2">
              <MapPinIcon className="size-9 drop-shadow-md" />
            </div>
          </Marker>
        </Map>
      </div>

      <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-start gap-1.5">
          <MapPinIcon className="size-4 shrink-0 text-gray-400 mt-0.5" />
          {isPending ? (
            <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mt-1"></div>
          ) : geocodedAddress ? (
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              <span className="text-gray-400 uppercase text-[9px] tracking-wider font-bold block mb-0.5">
                Localização Exata pelo GPS
              </span>
              {geocodedAddress}
            </p>
          ) : (
            <p className="text-xs text-gray-400 font-medium">Não foi possível carregar a rua exata.</p>
          )}
        </div>
      </div>

      <button
        onClick={handleOpenMaps}
        className="w-full cursor-pointer py-3 bg-white border border-gray-200 shadow-sm active:bg-gray-50 text-gray-700 font-bold rounded-xl text-sm transition-colors active:scale-95 flex justify-center items-center gap-2"
      >
        <NavigationArrowIcon className="size-4" />
        Traçar rota no Google Maps
      </button>
    </div>
  );
}
