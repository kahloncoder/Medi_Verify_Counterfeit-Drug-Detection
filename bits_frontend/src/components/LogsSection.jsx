import React, { useState, useEffect } from 'react';
import { Filter, Download, Calendar } from 'lucide-react';
import { formatDate, formatDateTime, formatDateString, getStatusClass, getStatusText } from '../utils/helpers';

const LogsSection = ({ transactionLogs = [], showAlert }) => {
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [filteredLogs, setFilteredLogs] = useState(transactionLogs);

  useEffect(() => {
    setFilteredLogs(transactionLogs);
  }, [transactionLogs]);

  const filterLogs = () => {
    let filtered = transactionLogs;

    if (dateFilter) {
      filtered = filtered.filter(log =>
        log?.timestamp && formatDate(log.timestamp) === formatDate(dateFilter)
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(log =>
        getStatusText(log?.expiryDate).toLowerCase() === statusFilter.toLowerCase()
      );
    }

    setFilteredLogs(filtered);
    showAlert?.(`Filtered ${filtered.length} records`, 'success');
  };

  const exportLogs = () => {
    if (!transactionLogs || transactionLogs.length === 0) {
      showAlert?.('No logs to export', 'warning');
      return;
    }

    const csvContent = [
      ['Timestamp', 'Medicine ID', 'Medicine Name', 'Status', 'Manufacturer', 'Expiry Date', 'User'],
      ...transactionLogs.map(log => [
        formatDateTime(log?.timestamp),
        log?.medicineId ?? 'N/A',
        log?.medicineName ?? 'N/A',
        getStatusText(log?.expiryDate),
        log?.manufacturer ?? 'N/A',
        formatDateString(log?.expiryDate),
        log?.user ?? 'Unknown'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `medverify_logs_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showAlert?.('Logs exported successfully', 'success');
  };

  const displayLogs = filteredLogs.length > 0 ? filteredLogs : transactionLogs;

  return (
    <section className="section active">
      <div className="card">
        <h2>Transaction History</h2>

        <div className="logs-controls">
          <div className="filter-group">
            <Calendar size={18} />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="filter-input"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-input"
          >
            <option value="">All Status</option>
            <option value="authentic">Authentic</option>
            <option value="expired">Expired</option>
          </select>

          <button className="btn secondary" onClick={filterLogs}>
            <Filter size={18} />
            Filter
          </button>

          <button className="btn secondary" onClick={exportLogs}>
            <Download size={18} />
            Export CSV
          </button>
        </div>

        <div className="table-container">
          <table className="logs-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Medicine ID</th>
                <th>Medicine Name</th>
                <th>Status</th>
                <th>Manufacturer</th>
                <th>Expiry Date</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {displayLogs.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                    No transaction logs available
                  </td>
                </tr>
              ) : (
                displayLogs.map((log, index) => (
                  <tr key={log?.id || index}>
                    <td>{formatDateTime(log?.timestamp)}</td>
                    <td>{log?.medicineId ?? 'N/A'}</td>
                    <td>{log?.medicineName ?? 'N/A'}</td>
                    <td>
                      <span className={`status-badge status-${getStatusClass(log?.expiryDate)}`}>
                        {getStatusText(log?.expiryDate)}
                      </span>
                    </td>
                    <td>{log?.manufacturer ?? 'N/A'}</td>
                    <td>{formatDateString(log?.expiryDate)}</td>
                    <td>{log?.user ?? 'Unknown'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default LogsSection;
