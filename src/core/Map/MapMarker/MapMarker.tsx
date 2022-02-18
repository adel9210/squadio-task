import './MapMarker.scss';
import { FunctionComponent } from 'react';
import MarkerImage from '../../../assets/images/marker.svg';

const MapMarker: FunctionComponent<any> = ({ buildingName, buildingLocation }) => (
  <div className="map-marker">
    <div className="map-marker__info">
      <h2 className="map-marker__info__building-name">{buildingName}</h2>
      <h3 className="map-marker__info__building-city">{buildingLocation}</h3>
    </div>
    <button type="button">
      <img className="map-marker__icon" style={{ width: '50px' }} src={MarkerImage} alt="Marker" />
    </button>
  </div>
);

export default MapMarker;
