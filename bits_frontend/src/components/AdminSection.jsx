import React from 'react';
import { Activity, Shield, Clock, AlertTriangle, FolderSync as Sync, FileText, Trash2 } from 'lucide-react';
import { getStatusClass } from '../utils/helpers';

const AdminSection = ({ transactionLogs = [], onClearLogs, setIsLoading, showAlert }) => {

  // Compute stats dynamically from expiryDate
  const stats = {
    total: transactionLogs.length,
    authentic: transactionLogs.filter(log => getStatusClass(log.expiryDate) === 'authentic').length,
    expired: transactionLogs.filter(log => getStatusClass(log.expiryDate) === 'expired').length,
    counterfeit: transactionLogs.filter(log => getStatusClass(log.expiryDate) === 'counterfeit').length // likely 0 unless you add counterfeit logic
  };

  const syncBlockchain = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      showAlert('Blockchain synchronization completed', 'success');
    }, 3000);
  };

  const generateReport = () => {
    const reportContent = `MediVerify System Report
Generated: ${new Date().toLocaleString()}

SUMMARY STATISTICS:
- Total Scans: ${stats.total}
- Authentic Medicines: ${stats.authentic}
- Expired Medicines: ${stats.expired}
- Counterfeit Detected: ${stats.counterfeit}

DETAILED LOGS:
${transactionLogs.map(log => 
  `${new Date(log.timestamp).toLocaleString()} - ${log.medicineName} (${log.medicineId}) - ${getStatusClass(log.expiryDate).toUpperCase()}`
).join('\n')}`;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `medverify_report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showAlert('Report generated successfully', 'success');
  };

  return (
    <section className="section active">
      <div className="card">
        <h2>Admin Portal</h2>
        <div className="admin-dashboard">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <Activity size={32} />
              </div>
              <div className="stat-content">
                <div className="stat-number">{stats.total}</div>
                <div className="stat-label">Total Scans</div>
              </div>
            </div>

            <div className="stat-card success">
              <div className="stat-icon">
                <Shield size={32} />
              </div>
              <div className="stat-content">
                <div className="stat-number">{stats.authentic}</div>
                <div className="stat-label">Authentic Medicines</div>
              </div>
            </div>

            <div className="stat-card warning">
              <div className="stat-icon">
                <Clock size={32} />
              </div>
              <div className="stat-content">
                <div className="stat-number">{stats.expired}</div>
                <div className="stat-label">Expired Medicines</div>
              </div>
            </div>

            <div className="stat-card danger">
              <div className="stat-icon">
                <AlertTriangle size={32} />
              </div>
              <div className="stat-content">
                <div className="stat-number">{stats.counterfeit}</div>
                <div className="stat-label">Counterfeit Detected</div>
              </div>
            </div>
          </div>

          <div className="admin-actions">
            <h3>System Actions</h3>
            <div className="action-buttons">
              <button className="btn primary" onClick={syncBlockchain}>
                <Sync size={18} />
                Sync with Blockchain
              </button>
              <button className="btn secondary" onClick={generateReport}>
                <FileText size={18} />
                Generate Report
              </button>
              <button className="btn danger" onClick={onClearLogs}>
                <Trash2 size={18} />
                Clear Logs
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminSection;
