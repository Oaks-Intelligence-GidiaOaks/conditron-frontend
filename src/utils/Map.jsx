import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ latitude, longitude }) => {
  const mapRef = useRef(null);
  const [address, setAddress] = useState("");
  const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;

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

        // Reverse geocoding using OpenStreetMap Nominatim API
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            if (data && data.display_name) {
              setAddress(data.display_name);
            }
          })
          .catch((error) => {
            console.error("Error fetching address:", error);
          });
      } else {
        // If map is already initialized, just update the marker
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            if (data && data.display_name) {
              setAddress(data.display_name);
            }
          })
          .catch((error) => {
            console.error("Error fetching address:", error);
          });
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
      <div>{address ? `Address: ${address}` : "No address found"}</div>
    </div>
  );
};

MapComponent.propTypes = {
  latitude: PropTypes.string,
  longitude: PropTypes.string,
};

export default MapComponent;
