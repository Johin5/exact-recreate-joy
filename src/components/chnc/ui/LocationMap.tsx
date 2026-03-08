import { MapContainer, TileLayer, Marker, Popup, useMap, Polygon, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression } from 'leaflet';
import { useEffect } from 'react';

const createBrandIcon = () => {
  return L.divIcon({
    className: 'custom-brand-marker',
    html: `<div style="
      background-color: #34CC32;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

interface LocationData {
  id: string;
  name: string;
  lat: number;
  lon: number;
  geojson?: any;
}

interface LocationMapProps {
  center?: [number, number];
  zoom?: number;
  className?: string;
  locations?: LocationData[];
  onMapReady?: (map: L.Map) => void;
}

function MapUpdater({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 });
  }, [center, zoom, map]);
  return null;
}

function MapInstanceReporter({ onMapReady }: { onMapReady: (map: L.Map) => void }) {
  const map = useMap();
  useEffect(() => {
    onMapReady(map);
  }, [map, onMapReady]);
  return null;
}

export default function LocationMap({
  center = [19.0760, 72.8777],
  zoom = 11,
  className = "h-full w-full",
  locations = [],
  onMapReady
}: LocationMapProps) {
  return (
    <div className={className}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        touchZoom={true}
        dragging={true}
        doubleClickZoom={true}
        style={{ height: '100%', width: '100%', background: '#f8fafc' }}
        className="z-0"
        zoomControl={false}
      >
        <MapUpdater center={center} zoom={zoom} />
        {onMapReady && <MapInstanceReporter onMapReady={onMapReady} />}

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {locations.map((loc) => (
          <div key={loc.id}>
            <Marker position={[loc.lat, loc.lon]} icon={createBrandIcon()}>
              <Popup className="font-sans text-xs">
                <span className="font-bold">{loc.name}</span>
              </Popup>
            </Marker>

            {loc.geojson ? (
              <Polygon
                positions={loc.geojson}
                pathOptions={{
                  color: '#34CC32',
                  fillColor: '#34CC32',
                  fillOpacity: 0.15,
                  weight: 3,
                  opacity: 1
                }}
              />
            ) : (
              <Circle
                center={[loc.lat, loc.lon]}
                radius={2000}
                pathOptions={{
                  color: '#34CC32',
                  fillColor: '#34CC32',
                  fillOpacity: 0.15,
                  weight: 3,
                  opacity: 1
                }}
              />
            )}
          </div>
        ))}
      </MapContainer>
    </div>
  );
}
