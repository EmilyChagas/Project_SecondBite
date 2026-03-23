import { useState, useEffect, useCallback } from 'react';
import Map, { NavigationControl, GeolocateControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapPinIcon } from '../icons/MapPinIcon';

interface LocationPickerProps {
  onLocationSelect: (lat: number, lng: number) => void;
  error?: string;
  initialLat?: number;
  initialLng?: number;
}

export function LocationPickerMap({ onLocationSelect, error, initialLat, initialLng }: LocationPickerProps) {
  const [viewState, setViewState] = useState({
    latitude: initialLat || -23.55052,
    longitude: initialLng || -46.633308,
    zoom: initialLat ? 16 : 14,
  });

  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    if (!initialLat && !initialLng && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setViewState(prev => ({ ...prev, latitude, longitude, zoom: 16 }));
          onLocationSelect(latitude, longitude);
        },
        err => console.warn('Localização negada ou indisponível:', err.message),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMoveEnd = useCallback(() => {
    setIsMoving(false);
    onLocationSelect(viewState.latitude, viewState.longitude);
  }, [viewState.latitude, viewState.longitude, onLocationSelect]);

  return (
    <div className="flex flex-col gap-1 w-full">
      <div
        className={`h-[400px] w-full rounded-xl overflow-hidden border relative shadow-sm transition-colors ${error ? 'border-red-500' : 'border-primary/20'}`}
      >
        <Map
          {...viewState}
          onMove={evt => {
            setViewState(evt.viewState);
            setIsMoving(true);
          }}
          onMoveEnd={handleMoveEnd}
          mapStyle="https://tiles.openfreemap.org/styles/positron"
          style={{ width: '100%', height: '100%' }}
        >
          <GeolocateControl
            position="top-left"
            onGeolocate={e => {
              setViewState(prev => ({ ...prev, latitude: e.coords.latitude, longitude: e.coords.longitude }));
              onLocationSelect(e.coords.latitude, e.coords.longitude);
            }}
          />
          <NavigationControl position="top-left" showCompass={false} />
        </Map>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none flex flex-col items-center z-10">
          <div
            className={`text-marketer transition-transform duration-200 ${isMoving ? '-translate-y-2 scale-110' : 'translate-y-0 scale-100'}`}
          >
            <MapPinIcon className="size-8" />
          </div>
          <div
            className={`w-3 h-1 bg-black/30 rounded-full blur-[1px] transition-all duration-200 ${isMoving ? 'scale-75 opacity-50' : 'scale-100 opacity-100'}`}
          />
          <div
            className={`absolute -top-8 bg-black/80 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap transition-opacity duration-200 ${isMoving ? 'opacity-0' : 'opacity-100'}`}
          >
            Mova o mapa para ajustar
          </div>
        </div>
      </div>
      {error && <span className="text-xs text-red-500 font-medium ml-1 pt-2">{error}</span>}
    </div>
  );
}
