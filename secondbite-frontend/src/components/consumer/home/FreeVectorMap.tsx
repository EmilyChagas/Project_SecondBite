import { useState, useRef, useEffect } from 'react';
import Map, {
  Marker,
  NavigationControl,
  GeolocateControl,
  FullscreenControl,
  ScaleControl,
  type MapRef,
  type MarkerEvent,
} from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

import type { Marketer } from '../../../interfaces/auth';
import { MarketerPopup } from './map/MarketerPopup';
import { MapPinIcon } from '../../icons/MapPinIcon';

interface FreeVectorMapProps {
  marketers: Marketer[];
  height?: string;
}

export const FreeVectorMap = ({ marketers, height = 'h-112.5' }: FreeVectorMapProps) => {
  const mapRef = useRef<MapRef>(null);

  const [selectedMarketer, setSelectedMarketer] = useState<Marketer | null>(null);

  const initialViewState = {
    longitude: marketers[0]?.longitude || -46.633308,
    latitude: marketers[0]?.latitude || -23.55052,
    zoom: 12,
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;

          mapRef.current?.flyTo({
            center: [longitude, latitude],
            zoom: 13.5,
            duration: 2000,
            essential: true,
          });
        },
        error => {
          console.log('Permissão de localização negada ou indisponível:', error.message);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
      );
    }
  }, []);

  const handleMarkerClick = (e: MarkerEvent<MouseEvent>, marketer: Marketer) => {
    e.originalEvent.stopPropagation();
    setSelectedMarketer(marketer);

    if (marketer.longitude && marketer.latitude) {
      mapRef.current?.flyTo({
        center: [marketer.longitude, marketer.latitude],
        zoom: 13.5,
        duration: 1000,
        padding: { top: 150 },
        essential: true,
      });
    }
  };

  return (
    <div className={`${height} w-full rounded-xl overflow-hidden shadow relative bg-gray-100`}>
      <Map
        ref={mapRef}
        initialViewState={initialViewState}
        mapStyle="https://tiles.openfreemap.org/styles/positron"
        style={{ width: '100%', height: '100%' }}
        maxZoom={18}
        minZoom={5}
      >
        <GeolocateControl position="top-left" trackUserLocation={true} />
        <NavigationControl position="top-left" showCompass={false} />
        <FullscreenControl position="top-left" />
        <ScaleControl />

        {marketers.map(marketer => {
          if (!marketer.latitude || !marketer.longitude) return null;

          return (
            <Marker
              key={marketer.id}
              longitude={marketer.longitude}
              latitude={marketer.latitude}
              anchor="bottom"
              onClick={e => handleMarkerClick(e, marketer)}
            >
              <div className="text-consumer hover:scale-110 transition-transform cursor-pointer drop-shadow-md pb-1">
                <MapPinIcon className="size-8" />
              </div>
            </Marker>
          );
        })}

        {selectedMarketer && <MarketerPopup marketer={selectedMarketer} onClose={() => setSelectedMarketer(null)} />}
      </Map>
    </div>
  );
};
