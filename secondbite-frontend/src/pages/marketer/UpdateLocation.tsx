import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../hooks/queries/useAuth';
import { useUpdateMarketer } from '../../hooks/mutations/useUpdateMarketer';
import { LocationPickerMap } from '../../components/shared/LocationPickerMap';
import { Button } from '../../components/ui/Button';
import { Spinner } from '../../components/ui/Spinner';
import { CaretLeftIcon } from '../../components/icons/CaretLeftIcon';
import { MapPinIcon } from '../../components/icons/MapPinIcon';
import type { Marketer } from '../../interfaces/auth';

const UpdateLocation = () => {
  const { userAuth } = useAuth();
  const marketer = userAuth as Marketer;
  const navigate = useNavigate();

  const { mutate, isPending } = useUpdateMarketer();

  const [selectedLocation, setSelectedLocation] = useState({
    lat: marketer?.latitude || 0,
    lng: marketer?.longitude || 0,
  });

  const handleSaveLocation = () => {
    if (!marketer) return;

    const payload = {
      name: marketer.name,
      email: marketer.email,
      cnpj: marketer.cnpj,
      phone: marketer.phone || '',
      address: marketer.address || '',
      stallName: marketer.stallName || '',
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };

    mutate(
      { marketerData: payload, id: marketer.id },
      {
        onSuccess: () => {
          navigate('/feirante/perfil');
        },
      },
    );
  };

  return (
    <div className="min-h-screen pb-32 bg-[#F8FAFC]">
      <div className="bg-white padding-x py-4 border-b border-b-primary/20 flex items-center relative">
        <Link to="/feirante/perfil" className="absolute left-4 p-2 -ml-2 active:opacity-60 transition-opacity">
          <CaretLeftIcon className="size-6 text-primary" />
        </Link>
        <h1 className="text-center font-semibold text-xl flex-1">Localização da Banca</h1>
      </div>

      <div className="padding-x py-6 max-w-lg mx-auto">
        <div className="bg-white p-4 rounded-xl border border-primary/20 shadow-sm mb-6 flex gap-4 items-start">
          <div className="bg-marketer/10 p-3 rounded-full text-marketer">
            <MapPinIcon className="size-6" />
          </div>
          <div>
            <h2 className="font-semibold text-primary mb-1">Ajuste o endereço</h2>
            <p className="text-sm text-gray-500">
              Arraste o mapa para posicionar o pino exatamente onde a sua banca fica montada na feira. Isso ajuda os
              consumidores a te encontrarem.
            </p>
          </div>
        </div>

        {marketer && (
          <LocationPickerMap
            initialLat={marketer.latitude}
            initialLng={marketer.longitude}
            onLocationSelect={(lat, lng) => setSelectedLocation({ lat, lng })}
          />
        )}

        <div className="mt-8">
          <Button
            onClick={handleSaveLocation}
            disabled={isPending || selectedLocation.lat === 0}
            roleButton="bg-marketer"
            className="w-full py-4 flex justify-center items-center gap-2 text-lg shadow-lg shadow-marketer/20"
          >
            {isPending ? (
              <>
                <Spinner className="size-6 border-white border-t-transparent" /> Salvando...
              </>
            ) : (
              'Salvar Localização'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateLocation;
