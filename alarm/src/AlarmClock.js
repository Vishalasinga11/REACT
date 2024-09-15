import React, { useState, useEffect } from 'react';

// Import a sound file for the alarm (put this file in the public folder)
//import alarmSound from './alarm.mp3'; 

const AlarmClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alarmTime, setAlarmTime] = useState('');
  const [isAlarmSet, setIsAlarmSet] = useState(false);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Check if the current time matches the alarm time
  useEffect(() => {
    const checkAlarm = () => {
      if (isAlarmSet && currentTime.toTimeString().startsWith(alarmTime)) {
        //const audio = new Audio(alarmSound);
        //audio.play();
        console.log("Ringing")
        setIsAlarmSet(false); // Optionally turn off the alarm after it rings
      }
    };
    checkAlarm();
  }, [currentTime, alarmTime, isAlarmSet]);

  const handleSetAlarm = () => {
    setIsAlarmSet(true);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Current Time: {currentTime.toLocaleTimeString()}</h1>
      <input
        type="time"
        value={alarmTime}
        onChange={(e) => setAlarmTime(e.target.value)}
      />
      <button onClick={handleSetAlarm}>Set Alarm</button>
      {isAlarmSet && <p>Alarm set for {alarmTime}</p>}
    </div>
  );
};

export default AlarmClock;
