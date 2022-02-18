import './BuildingLocation.scss';
import React, { FunctionComponent, useEffect, useState } from 'react';
import GoogleMapReact, { Coords } from 'google-map-react';
import { useDispatch, useSelector } from 'react-redux';
import MapMarker from '../../../core/Map/MapMarker/MapMarker';
import { RootState } from '../../../redux/store';
import { setFormMode } from '../../../redux/userBuildingSlice';
import Spinner from '../../../core/Spinner/Spinner';

const defaultMapOptions = {
  center: {
    lat: 30.044420,
    lng: 31.235712,
  },
  zoom: 5,
};

interface IMapOptions {
    center: Coords,
    zoom?: number
}

declare const window: any;

const BuildingLocation: FunctionComponent = () => {
  const building = useSelector((state: RootState) => state.usersBuildings.activeBuilding);
  const activeUserBuildings = useSelector((state: RootState) => state.usersBuildings.activeUser);
  const [mapRef, setMapRef] = useState<any>();
  const [mapOptions, setMapOptions] = useState<IMapOptions>(defaultMapOptions);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const fitMapBounds = () => {
    const bounds = new window.google.maps.LatLngBounds();
    activeUserBuildings.buildings.map((build) => {
      bounds.extend({
        lat: build.position[0],
        lng: build.position[1],
      });
      return true;
    });

    mapRef.fitBounds(bounds);
    setMapOptions({
      center: {
        lat: mapRef.getCenter().lat(),
        lng: mapRef.getCenter().lng(),
      },
      zoom: 12,
    });
  };

  useEffect(() => {
    if (mapRef) {
      fitMapBounds();
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [building, mapRef]);
  return (
    <div className="building-location">
      <div className="building-location__header">
        <h2 className="building-location__header__building-name">{building.buildingName}</h2>
        <ul className="building-location__header__actions">
          <li className="building-location__header__actions__item" onClick={() => dispatch(setFormMode('UPDATE'))}>
            <span className="building-location__header__actions__item__link">e</span>
          </li>
          <li className="building-location__header__actions__item">
            <span className="building-location__header__actions__item__link">d</span>
          </li>
        </ul>
      </div>
      <div className="building-location__map">
        {isLoading && <Spinner />}
        <div style={{ height: '80vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyDf7s3FUBNPyKhtMjf8HvX_hluV1f3CJqY' }}
            yesIWantToUseGoogleMapApiInternals
            defaultZoom={mapOptions.zoom}
            defaultCenter={mapOptions.center}
            onGoogleApiLoaded={({ map }) => setMapRef(map)}
          >
            <MapMarker
              lat={building.position[0]}
              lng={building.position[1]}
              buildingName={building.buildingName}
              buildingLocation={building.countryName}
            />
          </GoogleMapReact>
        </div>
      </div>
    </div>
  );
};

export default BuildingLocation;