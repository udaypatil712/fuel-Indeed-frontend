import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
// import { set } from "mongoose";
import { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "350px",
};

export default function LocationPicker({ onSelect }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.GOOGLE_MAP_KEY,
  });
  const [markerPos, setMarkerPos] = useState(null);
  const [center, setCenter] = useState({ lat: 20.5937, lng: 78.9629 }); //center point of india

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCenter({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  }, []);

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onClick={(e) => {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();

          setMarkerPos({ lat, lng });

          onSelect({ lat, lng });
        }}
      >
        {markerPos && <Marker position={markerPos} />}
      </GoogleMap>
    </>
  );
}
