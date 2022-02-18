import './BuildingLocation.scss';
import React, { FunctionComponent, useEffect, useState } from 'react';
import GoogleMapReact, { Coords } from 'google-map-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import MapMarker from '../../../core/Map/MapMarker/MapMarker';
import { RootState } from '../../../redux/store';
import { removeBuilding, setFormMode } from '../../../redux/userBuildingSlice';
import Spinner from '../../../core/Spinner/Spinner';
import NoData from '../../../core/NoData/NoData';
import { CONFIRM_DELETE_MESSAGE, SUCCESS_DELETE_MESSAGE } from '../../../constants/messages.constant';
import DEFAULT_MAP_OPTIONS from '../../../constants/building.constant';
import GOOGLE_MAP_KEY from '../../../constants/map.constant';

const editIcon = require('../../../assets/images/edit.svg').default;
const deleteIcon = require('../../../assets/images/delete.svg').default;

interface IMapOptions {
    center: Coords,
    zoom?: number
}

declare const window: any;

const BuildingLocation: FunctionComponent = () => {
  const building = useSelector((state: RootState) => state.usersBuildings.activeBuilding);
  const activeUserBuildings = useSelector((state: RootState) => state.usersBuildings.activeUser);
  const [mapRef, setMapRef] = useState<any>();
  const [mapOptions, setMapOptions] = useState<IMapOptions>(DEFAULT_MAP_OPTIONS);
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

    mapRef.fitBounds(bounds, { height: 500, width: 500 });
    setMapOptions({
      center: {
        lat: mapRef.getCenter().lat(),
        lng: mapRef.getCenter().lng(),
      },
      zoom: 12,
    });
  };

  const deleteBuildingHandler = () => {
    const deleteStatus = window.confirm(CONFIRM_DELETE_MESSAGE);
    if (deleteStatus) {
      dispatch(removeBuilding(building));
      toast.success(SUCCESS_DELETE_MESSAGE);
    }
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

    building ? (
      <div className="building-location">
        <div className="building-location__header">
          <h2 className="building-location__header__building-name">{building.buildingName}</h2>
          <ul className="building-location__header__actions">
            <li
              className="building-location__header__actions__item"
              onClick={() => dispatch(setFormMode('UPDATE'))}
            >
              <img
                className="building-location__header__actions__item__link"
                src={editIcon}
                alt="edit Icon"
              />
            </li>
            <li onClick={deleteBuildingHandler} className="building-location__header__actions__item">
              <img
                className="building-location__header__actions__item__link"
                src={deleteIcon}
                alt="delete Icon"
              />
            </li>
          </ul>
        </div>
        <div className="building-location__map">
          {isLoading && <Spinner />}
          <div style={{ height: '80vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: GOOGLE_MAP_KEY }}
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
    ) : <NoData message="No Building Location selected" />

  );
};

export default BuildingLocation;
