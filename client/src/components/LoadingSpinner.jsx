import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 24, text = 'Loading...' }) => {
  return (
    <div className="loading-spinner">
      <Loader2 size={size} className="spinner-icon" />
      {text && <p>{text}</p>}
    </div>
  );
};

export default LoadingSpinner;