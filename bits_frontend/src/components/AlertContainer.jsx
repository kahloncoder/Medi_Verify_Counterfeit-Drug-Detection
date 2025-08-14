import React from 'react';
import { CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

const AlertContainer = ({ alerts }) => {
  const getAlertIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <AlertCircle size={20} />;
      case 'warning':
        return <AlertTriangle size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  return (
    <div className="alert-container">
      {alerts.map((alert, index) => (
        <div key={`${alert.id}-${index}`} className={`alert ${alert.type}`}>
          <div className="alert-icon">
            {getAlertIcon(alert.type)}
          </div>
          <span>{alert.message}</span>
        </div>
      ))}
    </div>
  );
};

export default AlertContainer;
