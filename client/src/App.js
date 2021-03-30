import * as React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { listLogEntries } from "./Api";
import "./index.css";
import Pin from "./Pin";
import LogEntryForm from "./LogEntryForm";

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100vh",
    latitude: 37.6,
    longitude: -95.665,
    zoom: 3,
  });

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries); // we have assigned logEntries into our state variable.
  };

  useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/dark-v8"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      onDblClick={showAddMarkerPopup}
      doubleClickZoom={false}
    >
      {logEntries.map((entry) => (
        <React.Fragment key={entry._id}>
          {/* we will use a marker component (react-map-gl) */}
          <Marker latitude={entry.latitude} longitude={entry.longitude}>
            <Pin
              className="marker yellow"
              onClick={() =>
                setShowPopup({
                  // ...showPopup,
                  [entry._id]: true,
                })
              }
            />
          </Marker>
          {showPopup[entry._id] ? (
            <Popup
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setShowPopup({})} // we will only have one popup open at a time, which would be a better experience.
              anchor="top"
            >
              <div className="popup">
                <h3>{entry.title}</h3>
                <p>{entry.comments}</p>
                {entry.image ? (
                  <img
                    className="popup-img"
                    src={entry.image}
                    alt={entry.title}
                  />
                ) : null}
                <p>
                  <small>
                    Visited on {new Date(entry.visitDate).toLocaleDateString()}
                  </small>
                </p>
              </div>
            </Popup>
          ) : null}
        </React.Fragment>
      ))}
      {addEntryLocation ? (
        <>
          <Marker
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
          >
            <Pin className="marker red" />
          </Marker>
          <Popup
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            dynamicPosition={true}
            onClose={() => setAddEntryLocation(null)}
            anchor="top"
          >
            <div className="popup">
              <h3>Add your new log entry here</h3>
              <LogEntryForm
                onClose={() => {
                  setAddEntryLocation(null);
                  getEntries();
                }}
                location={addEntryLocation}
              />
            </div>
          </Popup>
        </>
      ) : null}
    </ReactMapGL>
  ); //return
}; //app

export default App;
