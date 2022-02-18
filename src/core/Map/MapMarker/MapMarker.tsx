import './MapMarker.scss';
import { FunctionComponent, useEffect, useState } from 'react';
import MarkerImage from '../../../assets/images/marker.svg';

const MapMarker: FunctionComponent<any> = ({ buildingName, buildingLocation }) => {
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    setShowInfo(false);
  }, [buildingName]);

  return (
    <div className="map-marker">
      {showInfo && (
        <div className="map-marker__info">
          <h2 className="map-marker__info__building-name">{buildingName}</h2>
          <h3 className="map-marker__info__building-city">{buildingLocation}</h3>
        </div>
      )}
      <button type="button" onClick={() => setShowInfo(!showInfo)}>
        <img className="map-marker__icon" style={{ width: '50px' }} src={MarkerImage} alt="Marker" />
      </button>
    </div>
  );
};

export default MapMarker;
