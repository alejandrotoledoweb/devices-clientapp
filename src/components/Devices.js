import React, { useState, useEffect } from 'react'

const Devices = () => {
  const [devices, setDevices] = useState([]);

useEffect(() => {
  fetch("http://localhost:3000/devices").then(response => response.json().then(data => {
    setDevices(data);
  }))
})

  return (
    <div className="container">
      {devices.map((device) => (
        <div className="border rounded mt-3 mb-3">
          <div className="container mt-3">
            <p className="ml-3">Device Type: {device.type}</p>
            <p className="pl-2">Device System Name: {device.system_name}</p>
            <p className="pl-2">HDD Capacity: {device.hdd_capacity}</p>
            </div>
        </div>
      ))}
      
    </div>
  );
}

export default Devices;

