import React from 'react';
import Spinner from '../../assets/icons/spinner.svg'
import './Spinner.css'
const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner">
         {/* <img src={Spinner}/> */}
      </div>
    </div>
  );
};

export default LoadingSpinner;