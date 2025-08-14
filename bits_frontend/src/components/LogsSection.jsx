import React, { useState, useEffect } from 'react';
import { Filter, Download, Calendar, Eye, EyeOff } from 'lucide-react';
import { formatDate, formatDateTime, formatDateString, getStatusClass, getStatusText } from '../utils/helpers';

const LogsSection = ({ transactionLogs = [], showAlert }) => {
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [filteredLogs, setFilteredLogs] = useState(transactionLogs);
  const [expandedRows, setExpandedRows] = useState(new Set());

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
        (log?.status === 'counterfeit' ? 'counterfeit' : getStatusText(log?.expiryDate)).toLowerCase() === statusFilter.toLowerCase()
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
      ['Timestamp', 'Medicine ID', 'Medicine Name', 'Status', 'Manufacturer', 'Batch Number', 'Manufacturing Date', 'Expiry Date', 'Blockchain Hash', 'User'],
      ...transactionLogs.map(log => [
        formatDateTime(log?.timestamp),
        log?.medicineId ?? 'N/A',
        log?.medicineName ?? 'N/A',
        log?.status === 'counterfeit' ? 'Counterfeit' : getStatusText(log?.expiryDate),
        log?.manufacturer ?? 'N/A',
        log?.batchNumber ?? 'N/A',
        formatDateString(log?.manufacturingDate),
        formatDateString(log?.expiryDate),
        log?.verificationHash ?? 'N/A',
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

  const toggleRowExpansion = (logId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(logId)) {
      newExpanded.delete(logId);
    } else {
      newExpanded.add(logId);
    }
    setExpandedRows(newExpanded);
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
            <option value="counterfeit">Counterfeit</option>
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
                <th>Actions</th>
                <th>Timestamp</th>
                <th>Medicine ID</th>
                <th>Medicine Name</th>
                <th>Status</th>
                <th>Manufacturer</th>
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
                  <React.Fragment key={log?.id || index}>
                    <tr className="log-row">
                      <td>
                        <button 
                          className="expand-btn"
                          onClick={() => toggleRowExpansion(log?.id || index)}
                        >
                          {expandedRows.has(log?.id || index) ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </td>
                      <td>{formatDateTime(log?.timestamp)}</td>
                      <td className="medicine-id">{log?.medicineId ?? 'N/A'}</td>
                      <td>{log?.medicineName ?? 'N/A'}</td>
                      <td>
                        <span className={`status-badge status-${log?.status === 'counterfeit' ? 'counterfeit' : getStatusClass(log?.expiryDate)}`}>
                          {log?.status === 'counterfeit' ? 'Counterfeit' : getStatusText(log?.expiryDate)}
                        </span>
                      </td>
                      <td>{log?.manufacturer ?? 'N/A'}</td>
                      <td>{log?.user ?? 'Unknown'}</td>
                    </tr>
                    {expandedRows.has(log?.id || index) && (
                      <tr className="expanded-row">
                        <td colSpan="7">
                          <div className="expanded-details">
                            <div className="detail-grid">
                              <div className="detail-item">
                                <span className="detail-label">Batch Number</span>
                                <span className="detail-value">{log?.batchNumber ?? 'N/A'}</span>
                              </div>
                              <div className="detail-item">
                                <span className="detail-label">Manufacturing Date</span>
                                <span className="detail-value">{formatDateString(log?.manufacturingDate)}</span>
                              </div>
                              <div className="detail-item">
                                <span className="detail-label">Expiry Date</span>
                                <span className="detail-value">{formatDateString(log?.expiryDate)}</span>
                              </div>
                              <div className="detail-item">
                                <span className="detail-label">Blockchain Hash</span>
                                <span className="detail-value blockchain-hash">{log?.verificationHash ?? 'N/A'}</span>
                              </div>
                              <div className="detail-item">
                                <span className="detail-label">Transaction ID</span>
                                <span className="detail-value">{log?.id ?? 'N/A'}</span>
                              </div>
                              <div className="detail-item">
                                <span className="detail-label">Verification Time</span>
                                <span className="detail-value">{formatDateTime(log?.timestamp)}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
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