import React, { useState, useEffect, useRef } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'react-circular-progressbar/dist/styles.css';
import HookMqtt from '../service/hook';

const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
};

const Dashboard = () => {
  const [position, setPosition] = useState([-6.34605, 106.69156]);
  const [history, setHistory] = useState([]);

  // Function to get user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = [latitude, longitude];

          setPosition(newLocation);
          setHistory((prevHistory) => [...prevHistory, newLocation]);
        },
        (error) => {
          console.error("Error fetching geolocation: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getUserLocation();
    const interval = setInterval(getUserLocation, 5000); // Update location every 5 seconds
    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  return (
    <div>
      <section>
        <h1><center>Maps</center></h1>
        <div className="maps-box" style={{ height: '600px' }}>
          <div className="details" id="map" style={{ height: '580px' }}>
            <MapContainer
              center={position}
              zoom={16} // Adjust zoom level as needed
              scrollWheelZoom={true}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position} onClick={() => alert(`Latitude : ${position[0]}, Longitude : ${position[1]}`)}>
                <Popup>
                  Latitude: {position[0]}, Longitude: {position[1]}
                </Popup>
              </Marker>
              <RecenterAutomatically lat={position[0]} lng={position[1]} />

              {/* Menggambar polyline berdasarkan history */}
              {history.length > 1 && (
                <Polyline positions={history} color="blue" />
              )}

              {history.map((pos, idx) => (
                <Marker key={idx} position={pos} onClick={() => alert(`Latitude: ${pos[0]}, Longitude: ${pos[1]}`)}>
                  <Popup>
                    Latitude : {pos[0]}, Longitude : {pos[1]}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        <div className="app">
          <HookMqtt />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
