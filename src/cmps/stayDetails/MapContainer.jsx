import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const API_KEY = 'AIzaSyB24fmoFy0PfYJeqW1F7Ida3Ok3IlwDZUw'

export function MapContainer({ lat, lng }) {
  const center = {
    lat: lat,
    lng: lng
  }

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        mapContainerClassName="map-container"
        center={center}
        zoom={10}
      >
        <Marker position={{ lat: lat, lng: lng }} />
      </GoogleMap>
    </LoadScript>
  )
}
