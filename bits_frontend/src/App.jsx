
import React, { useState, useEffect } from 'react';
import { Shield, Scan, FileText, Settings } from 'lucide-react';

import ScanSection from './components/ScanSection';
import VerifySection from './components/VerifySection';
import LogsSection from './components/LogsSection';
import AdminSection from './components/AdminSection';
import LoadingModal from './components/LoadingModal';
import AlertContainer from './components/AlertContainer';
import { loadTransactionLogs, saveTransactionLogs } from './utils/storage';

import './App.css';

function App() {
  const [currentSection, setCurrentSection] = useState('scan');
  const [verificationResult, setVerificationResult] = useState(null);
  const [transactionLogs, setTransactionLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const logs = loadTransactionLogs();
    setTransactionLogs(logs);
  }, []);

  const showAlert = (message, type = 'info') => {
    const alert = {
      id: Date.now().toString(),
      message,
      type
    };
    setAlerts(prev => [...prev, alert]);
    
    setTimeout(() => {
      setAlerts(prev => prev.filter(a => a.id !== alert.id));
    }, 5000);
  };

  const addTransactionLog = (result) => {
    const transaction = {
      id: `TXN${Date.now().toString(36).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      medicineId: result.id,
      medicineName: result.name,
      status: result.status,
      manufacturer: result.manufacturer,
      expiryDate: result.expiryDate,
      user: 'Current User',
      verificationHash: result.blockchainHash
    };
    
    const updatedLogs = [transaction, ...transactionLogs];
    setTransactionLogs(updatedLogs);
    saveTransactionLogs(updatedLogs);
  };

  const clearLogs = () => {
    if (window.confirm('Are you sure you want to clear all transaction logs? This action cannot be undone.')) {
      setTransactionLogs([]);
      saveTransactionLogs([]);
      showAlert('All logs cleared successfully', 'success');
    }
  };

  const navItems = [
    { id: 'scan', label: 'Scan Medicine', icon: Scan },
    { id: 'verify', label: 'Verify Results', icon: Shield },
    { id: 'logs', label: 'Transaction Logs', icon: FileText },
    { id: 'admin', label: 'Admin Portal', icon: Settings }
  ];

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <h1>MediVerify</h1>
              <span className="tagline">Blockchain-Secured Medicine Verification</span>
            </div>
            <nav className="nav">
              {navItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    className={`nav-btn ${currentSection === item.id ? 'active' : ''}`}
                    onClick={() => setCurrentSection(item.id)}
                  >
                    <Icon size={18} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="container">
          {currentSection === 'scan' && (
            <ScanSection
              onVerificationComplete={(result) => {
                setVerificationResult(result);
                addTransactionLog(result);
                setCurrentSection('verify');
                showAlert('Verification completed successfully', 'success');
              }}
              setIsLoading={setIsLoading}
              showAlert={showAlert}
            />
          )}
          
          {currentSection === 'verify' && (
            <VerifySection verificationResult={verificationResult} />
          )}
          
          {currentSection === 'logs' && (
            <LogsSection 
              transactionLogs={transactionLogs}
              showAlert={showAlert}
            />
          )}
          
          {currentSection === 'admin' && (
            <AdminSection
              transactionLogs={transactionLogs}
              onClearLogs={clearLogs}
              setIsLoading={setIsLoading}
              showAlert={showAlert}
            />
          )}
        </div>
      </main>

      <LoadingModal isVisible={isLoading} />
      <AlertContainer alerts={alerts} />
    </div>
  );
}


export default App;