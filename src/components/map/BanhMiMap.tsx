"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { getAllShops, getSuburbById } from "@/lib/data";
import Link from "next/link";

const customIcon = new Icon({
  iconUrl: "/marker-icon.svg",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export function BanhMiMap() {
  const shops = getAllShops();

  return (
    <MapContainer
      center={[-33.8688, 151.2093]}
      zoom={11}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {shops.map((shop) => {
        const suburb = getSuburbById(shop.suburbId);
        return (
          <Marker key={shop.id} position={[shop.lat, shop.lng]} icon={customIcon}>
            <Popup>
              <div className="text-center">
                <Link href={`/suburbs/${suburb?.slug}/${shop.slug}`} className="font-bold text-stone-900 hover:text-amber-600">
                  {shop.name}
                </Link>
                <div className="mt-1 text-sm text-stone-600">
                  ⭐ {shop.overallScore.toFixed(1)}/10 · {shop.priceRange}
                </div>
                <div className="mt-1 text-xs text-stone-500">{shop.address}</div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
