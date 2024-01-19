import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapWithoutAddress = ({ latitude, longitude }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (
      latitude !== undefined &&
      longitude !== undefined &&
      latitude !== "" &&
      longitude !== ""
    ) {
      // If map is not initialized, create a new map
      if (!mapRef.current) {
        mapRef.current = L.map("map").setView([latitude, longitude], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(mapRef.current);

        L.marker([latitude, longitude]).addTo(mapRef.current);
      } else {
        mapRef.current.setView([latitude, longitude], 13);
        mapRef.current.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            layer.setLatLng([latitude, longitude]);
          }
        });
      }
    }
  }, [latitude, longitude]);

  return (
    <div style={{ width: "100%" }}>
      <div id="map" style={{ height: "300px", width: "100%" }} />
    </div>
  );
};

MapWithoutAddress.propTypes = {
  latitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  longitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default MapWithoutAddress;
