import { useState, useEffect } from 'react';

/**
 * Returns formatted Indian Standard Time (IST) live clock string: "hh:mm:ss ist"
 */
export function useIstClock() {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      // Format in Asia/Kolkata timezone with 2-digit hour, minute, second
      const formatted = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);
      setTimeStr(`${formatted} ist`);
    }

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return timeStr;
}
