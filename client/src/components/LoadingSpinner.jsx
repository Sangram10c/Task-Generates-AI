// import React from 'react';
// import { Loader2 } from 'lucide-react';

// const LoadingSpinner = ({ size = 24, text = 'Loading...' }) => {
//   return (
//     <div className="loading-spinner">
//       <Loader2 size={size} className="spinner-icon" />
//       {text && <p>{text}</p>}
//     </div>
//   );
// };

// export default LoadingSpinner;

import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';

const LoadingSpinner = ({ size = 24, text = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative">
        <Loader2 size={size} className="animate-spin text-primary-600" />
        <div className="absolute inset-0 bg-primary-400 blur-2xl opacity-30 animate-pulse"></div>
      </div>
      {text && (
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-primary-500 animate-pulse" />
          <p className="text-slate-600 font-medium animate-pulse">{text}</p>
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;