import '@tomtom-international/web-sdk-maps/dist/maps.css';
import tt from '@tomtom-international/web-sdk-maps';
import React, { useEffect, useRef } from 'react';

const MyMap: React.FC = () => {
    const mapElement = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mapElement.current) {
            const initialLongitude = -118.2437;
            const initialLatitude = 34.0522;

            const newMap = tt.map({
                key: "9rIZ5LqPsKwsPd5BGLQtuWUpGPW5lINZ",
                container: mapElement.current,
                center: [initialLongitude, initialLatitude],
                zoom: 13,
            });

            const marker = new tt.Marker()
                .setLngLat([initialLongitude, initialLatitude])
                .addTo(newMap);

            return () => newMap.remove();
        }
    }, []);

    return (
        <div>
            <div ref={mapElement} className="mapDiv" style={{ height: '500px', width: '100%',marginBottom:"5rem" }}></div>
        </div>
    );
};

export default MyMap;