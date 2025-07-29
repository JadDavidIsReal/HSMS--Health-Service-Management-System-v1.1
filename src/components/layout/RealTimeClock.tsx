import React, { useState, useEffect } from 'react';

const RealTimeClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'Asia/Manila',
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'Asia/Manila',
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  return (
    <div className="text-right">
      <p className="text-sm font-medium text-foreground">{formatDate(time)}</p>
      <p className="text-xs text-muted-foreground">{formatTime(time)}</p>
    </div>
  );
};

export default RealTimeClock;
