import { Box } from '@mui/material'
import React, { useRef, useState, useEffect, useMemo } from "react";
import { PolygonF, GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from "@react-google-maps/api";
import type { NextPage } from 'next';
import CustomMapCard from './CustomMapCard';
import CustomMapCountCard from './CustomMapCountCard';
type props = {
    onComplete: any,
    path: any
}

interface MarkerData {
    position: google.maps.LatLngLiteral;
    title: string;
    description: string;
    image: string;
    category: string;
}

const CustomMap = ({ onComplete, path }: props) => {


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDDFfawHZ7MhMPe2K62Vy2xrmRZ0lT6X0I"
    })


    const mapOptions = useMemo<google.maps.MapOptions>(
        () => ({
            disableDefaultUI: true,
            clickableIcons: true,
            scrollwheel: false,
            zoomControl: true
        }),
        []
    );

    const polygonCoords: google.maps.LatLngLiteral[] = [
        { lat: 37.123, lng: -122.456 },
        { lat: 37.456, lng: -122.789 },
        { lat: 37.789, lng: -122.123 },
    ];




    const markerData: MarkerData[] = [
        {
            position: { lat: 37.5, lng: -122.5 },
            title: 'Marker 1',
            description: 'This is marker 1',
            image: 'https://www.pexels.com/photo/fashion-people-woman-relaxation-17045026/',
            category: 'category3',
        },
        {
            position: { lat: 37.6, lng: -122.6 },
            title: 'Marker 2',
            description: 'This is marker 2',
            image: 'https://www.pexels.com/photo/fashion-people-woman-relaxation-17045026/',
            category: 'category2',
        },
        {
            position: { lat: 37.7, lng: -122.7 },
            title: 'Marker 3',
            description: 'This is marker 3',
            image: 'https://www.pexels.com/photo/fashion-people-woman-relaxation-17045026/',
            category: 'category1',
        },
    ];

  

    const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);


    console.log({ selectedMarker })


    const handleMarkerClick = (marker: MarkerData) => {
        setSelectedMarker(marker);
    };

    const handleInfoWindowClose = () => {
        setSelectedMarker(null);
    };

    const overlayBoxStyles: any = {
        display: 'flex',
        gap: 10,
        position: 'absolute',
        top: '10px',
        left: '10px',
    };

    const categoryToMarkerImage: Record<string, string> = {
        category1: '/images/person.png',
        category2: '/images/rider.png',
        category3: '/images/store.png',
    };




    return (
        <Box sx={{ p: 2 }}>
            {isLoaded && <GoogleMap
                mapContainerStyle={{ width: '100%', height: '70vh', borderRadius: 25 }}
                center={markerData[0].position}
                zoom={10}
                options={mapOptions}
            >
                <PolygonF
                    paths={polygonCoords}
                    options={{
                        strokeColor: 'black',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        // fillColor: '#FF0000',
                        fillOpacity: 0.35,
                    }}
                />
                {markerData.map((marker, index) => (
                    <MarkerF
                        key={index}
                        position={marker.position}
                        onClick={() => handleMarkerClick(marker)}
                        icon={{
                            url: categoryToMarkerImage[marker.category],
                            scaledSize: new window.google.maps.Size(40, 50),
                        }}
                    />
                ))}

            
                {selectedMarker && (
                    <InfoWindowF
                        options={{ disableAutoPan: false, minWidth: 0 }}
                        position={selectedMarker.position}
                        onCloseClick={handleInfoWindowClose}
                    >
                        <Box>
                            <CustomMapCard />
                        </Box>
                    </InfoWindowF>
                )}
                <div style={overlayBoxStyles}>
                    <CustomMapCountCard />
                    <CustomMapCountCard />
                    <CustomMapCountCard />
                </div>

            </GoogleMap>}
        </Box>
    )
}

export default CustomMap