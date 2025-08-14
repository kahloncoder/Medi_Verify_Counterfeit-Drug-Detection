// src/utils/helpers.js

// Universal safe date formatting function
const parseDateValue = (value) => {
  if (!value) return null;

  // Handle timestamp numbers (milliseconds since epoch)
  if (typeof value === 'number') {
    return new Date(value);
  }

  const str = value.toString().trim();

  // MM/YYYY → convert to first day of month
  if (/^\d{2}\/\d{4}$/.test(str)) {
    const [month, year] = str.split('/').map(Number);
    return new Date(year, month - 1, 1); // Date object
  }

  // "1234567890 seconds since epoch"
  const match = str.match(/\d+/);
  if (match) {
    return new Date(Number(match[0]) * 1000);
  }

  // fallback normal date string
  const date = new Date(str);
  return isNaN(date) ? null : date;
};

// Format date as MM/DD/YYYY (or locale format)
export const formatDate = (value) => {
  const date = parseDateValue(value);
  return date ? date.toLocaleDateString() : 'Unknown';
};

// Format date and time as locale string
export const formatDateTime = (value) => {
  const date = parseDateValue(value);
  return date ? date.toLocaleString() : 'Unknown';
};

// Format date for manufacturing/expiry dates safely as MM/YYYY
export const formatDateString = (value) => {
  const date = parseDateValue(value);
  if (!date) return 'Unknown';
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${year}`;
};

// Status helpers based purely on expiry date
export const getStatusClass = (expiryDate) => {
  const date = parseDateValue(expiryDate);
  if (!date) return 'authentic'; // fallback
  return date < new Date() ? 'expired' : 'authentic';
};

export const getStatusText = (expiryDate) => {
  const date = parseDateValue(expiryDate);
  if (!date) return 'Authentic'; // fallback
  return date < new Date() ? 'Expired' : 'Authentic';
};
