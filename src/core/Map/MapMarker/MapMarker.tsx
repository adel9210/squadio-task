import './MapMarker.scss';
import { FunctionComponent, useState } from 'react';
import MarkerImage from '../../../assets/images/marker.svg';

const MapMarker: FunctionComponent<any> = ({ text }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="map-marker">
      {showInfo && (
      <div className="map-marker__info">
        <h2>{text}</h2>
      </div>
      ) }
      <button type="button" onClick={() => setShowInfo(!showInfo)}>
        <img className="map-marker__icon" style={{ width: '50px' }} src={MarkerImage} alt="Marker" />
      </button>
    </div>
  );
};

export default MapMarker;
