import { Box } from '@mui/material'
import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { PolygonF, GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from "@react-google-maps/api";
import type { NextPage } from 'next';
import CustomMapCard from './CustomMapCard';
import CustomMapCountCard from './CustomMapCountCard';
type props = {
    onComplete: any,
    path: any,
    data: any,
}

interface MarkerData {
    position: google.maps.LatLngLiteral;
    title: string;
    description: string;
    image: string;
    category: string;


}

const CustomMap = ({ onComplete, path, data }: props) => {

    console.log({ data })


    const [franchiseLocation, setFranchiselocation] = useState([])
    const [vendor, setVendor] = useState<any>([])
    const [active, setActive] = useState<string>('All');
    const [customer, setCustomer] = useState<any>([])





    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBBcghyB0FvhqML5Vjmg3uTwASFdkV8wZY"
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

    // const polygonCoords: google.maps.LatLngLiteral[] = [
    //     { lat: 37.123, lng: -122.456 },
    //     { lat: 37.456, lng: -122.789 },
    //     { lat: 37.789, lng: -122.123 },
    // ];




    // const markerData: MarkerData[] = [
    //     {
    //         position: { lat: 37.5, lng: -122.5 },
    //         title: 'Marker 1',
    //         description: 'This is marker 1',
    //         image: 'https://www.pexels.com/photo/fashion-people-woman-relaxation-17045026/',
    //         category: 'category3',
    //     },
    //     {
    //         position: { lat: 37.6, lng: -122.6 },
    //         title: 'Marker 2',
    //         description: 'This is marker 2',
    //         image: 'https://www.pexels.com/photo/fashion-people-woman-relaxation-17045026/',
    //         category: 'category2',
    //     },
    //     {
    //         position: { lat: 37.7, lng: -122.7 },
    //         title: 'Marker 3',
    //         description: 'This is marker 3',
    //         image: 'https://www.pexels.com/photo/fashion-people-woman-relaxation-17045026/',
    //         category: 'category1',
    //     },
    // ];



    const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);





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
        customer: '/images/person.png',
        category2: '/images/rider.png',
        store: '/images/store.png',
    };


    const activeColor = useCallback((color: string) => {
        setActive(color)
    }, [])

    useEffect(() => {
        if (data) {
            let result: any = data?.franchise?.delivery_location.map((x: any) => ({ lat: x[0], lng: x[1] }));
            setFranchiselocation(result)
            let vendorresult = data?.vendors?.map((x: any) => ({
                name: x?.vendor_name,
                position: { lat: parseFloat(x?.vendor_location?.[0]?.lat), lng: parseFloat(x?.vendor_location?.[0]?.lng) },
                email: x?.vendor_email,
                id: x?.vendor_id,
                address: x?.store_address,
                mobile: x?.vendor_mobile,
                category: 'store',
                logo: x?.store_logo,
                status: x?.status
            }))
            setVendor(vendorresult)
            let customerresult = data?.customers?.map((c: any) => ({
                name:c?.users?.name,
                position: { lat: parseFloat(c.location?.[0]), lng: parseFloat(c?.location?.[1]) },
                email: c?.users?.email,
                id: c?.customer_id,
                address: '',
                mobile:c?.users?.mobile,
                category: 'customer',
                logo: './images/user.png',
                status:c?.status
            }))

       
            setCustomer(customerresult)

        }
    }, [data])




    return (
        <Box sx={{ p: 2 }}>
            {isLoaded && <GoogleMap
                mapContainerStyle={{ width: '100%', height: '70vh', borderRadius: 25 }}
                center={franchiseLocation[0]}
                zoom={10}
                options={mapOptions}
            >
                <PolygonF
                    paths={franchiseLocation}
                    options={{
                        strokeColor: 'black',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        // fillColor: '#FF0000',
                        fillOpacity: 0.35,
                    }}
                />
                {(active === 'All' || active === 'Vendor') && vendor.map((marker: any, index: any) => (
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

                {(active === 'All' || active === 'Customer') && customer.map((marker: any, index: any) => (
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
                            <CustomMapCard data={selectedMarker} />
                        </Box>
                    </InfoWindowF>
                )}
                <div style={overlayBoxStyles}>
                    <CustomMapCountCard label='All' count={data?.customersCount} all={true} width={50} color={active === 'All' ? '#a7d5a9' : '#ffff'} onclick={() => activeColor('All')} />
                    <CustomMapCountCard label='Customer' count={data?.customersCount} color={active === 'Customer' ? '#a7d5a9' : '#ffff'} onclick={() => activeColor('Customer')} />
                    <CustomMapCountCard label='Vendor' count={data?.vendorsCount} color={active === 'Vendor' ? '#a7d5a9' : '#ffff'} onclick={() => activeColor('Vendor')} />
                    <CustomMapCountCard label='Rider' count={data?.riderCount} color={active === 'Rider' ? '#a7d5a9' : '#ffff'} onclick={() => activeColor('Rider')} />
                </div>

            </GoogleMap>}
        </Box>
    )
}

export default CustomMap