import React from "react";
import GoogleMapReact from "google-map-react";
import styles from "../style.module.scss";
import {coordinates} from "./mapCoordinates";

const LocationMarker = ({lat, lng, onClick}) => (
  <div className={styles.marker} onClick={onClick}>
    <div className={styles.markerInner}>
      <div className={styles.markerDot}></div>
    </div>
  </div>
);

function GoogleLiveComponent({latitude, longitude}) {
  const handleApiLoaded = ({map, maps}) => {
    coordinates.forEach((route) => {
      const path = route.map(([lng, lat]) => ({lat, lng}));

      const polyline = new maps.Polyline({
        path,
        geodesic: true,
        strokeColor: "blue",
        strokeOpacity: 1.0,
        strokeWeight: 3,
      });

      polyline.setMap(map);
    });
  };

  return (
    <>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyAdBRYyeH13KXV-VtXpQuG36A7vbBjibMU",
        }}
        defaultCenter={{
          lat: latitude ?? 37.422,
          lng: longitude ?? -122.0862,
        }}
        defaultZoom={15}
        options={{
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true,
          mapTypeId: "roadmap",
        }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={handleApiLoaded}>
        <LocationMarker
          lat={latitude ?? 37.422}
          lng={longitude ?? -122.0862}
          onClick={() => {}}
        />
      </GoogleMapReact>
    </>
  );
}

export default GoogleLiveComponent;
