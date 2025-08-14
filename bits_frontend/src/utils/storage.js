// Transaction logs management
export const loadTransactionLogs = () => {
  const stored = localStorage.getItem('mediVerifyLogs');
  return stored ? JSON.parse(stored) : [];
};

export const saveTransactionLogs = (logs) => {
  localStorage.setItem('mediVerifyLogs', JSON.stringify(logs));
};