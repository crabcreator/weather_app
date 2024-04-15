import './Home.css';
import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet';
import { UkraineData } from './data';
import { latLng, latLngBounds, LeafletMouseEvent, DivIcon } from 'leaflet';
import { centers } from './centers';
import PopupBody from './PopupBody';

export default function Home() {
  let corner1 = latLng(52.79, 21.59),
    corner2 = latLng(43.88, 40.54),
    bounds = latLngBounds(corner1, corner2);

  return (
    <main>
      <div id='map'>
        <MapContainer
          center={[49.039, 31.45]}
          zoom={6}
          minZoom={6}
          maxZoom={9}
          maxBounds={bounds}
          doubleClickZoom={false}
          scrollWheelZoom={true}>
          <TileLayer
            url='
https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png'
          />
          {UkraineData.features.length &&
            UkraineData.features.map((oblast: any) => {
              let coordinates: any = oblast.geometry.coordinates[0];

              return (
                <Polygon
                  className='polygon'
                  key={oblast.properties.shapeID}
                  pathOptions={{
                    fillColor: '#007cef',
                    fillOpacity: 0.4,
                    weight: 2,
                    opacity: 1,
                    dashArray: [0],
                    color: 'white',
                  }}
                  positions={coordinates}
                  eventHandlers={
                    {
                      // mouseover: (e: LeafletMouseEvent) => {
                      //   const layer = e.target;
                      //   layer.setStyle({
                      //     fillOpacity: 0.5,
                      //     weight: 2,
                      //     dashArray: '',
                      //     color: '#666',
                      //   });
                      // },
                      // mouseout: (e: LeafletMouseEvent) => {
                      //   const layer = e.target;
                      //   layer.setStyle({
                      //     fillOpacity: 0.5,
                      //     weight: 2,
                      //     dashArray: '',
                      //     color: 'white',
                      //   });
                      // },
                    }
                  }
                />
              );
            })}
          {centers.map((city: any) => {
            // setSearchValue({ lat: city.lat, lng: city.lng });
            return (
              <Marker
                key={city.city_ua}
                position={[city.lat, city.lng]}
                icon={
                  new DivIcon({
                    iconSize: [1, 1],
                    html: `${city.city_ua}`,
                    className: 'div-icon',
                  })
                }>
                <Popup>
                  <PopupBody
                    name={city.city_en}
                    lat={city.lat}
                    lng={city.lng}
                  />
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </main>
  );
}
