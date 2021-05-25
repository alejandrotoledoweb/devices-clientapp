import React, { useState, useEffect } from 'react'
// import Filter from './Filter';

const Devices = () => {
    const [system, setSystem] = useState("");
    const [type, setType] = useState("");
    const [capacity, setCapacity] = useState("");

  const addDevice = () => {
    fetch("http://localhost:3000/devices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        system_name: system,
        type: type,
        hdd_capacity: capacity
      })
    }).then(response => response.json());
      // .then(newData => )
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
  };

  // const handleReset = () => {
  //   Array.from(document.querySelectorAll("input")).forEach(
  //     input => (input.value = "")
  //   );
  // }


  return (
    <div className="">
      <h3 className="mt-3 mb-4">Enter the following information to create a new device</h3>
      <p className="mt-2">Enter the name of the device</p>
      <input className="mb-2 mt-2 rounded" id="input1" onChange={e => setSystem(e.target.value.toUpperCase())} placeholder="Alex Device" type="text"/> <br></br>
      <p className="mt-2">Select the device type</p>
      <select className="w-25 mb-3" id="input2" onChange={e => setType(e.target.value)} >
        <option value="">Select</option>
        <option value="WINDOWS_WORKSTATION">WINDOWS WORKSTATION</option>
        <option value="WINDOWS_SERVER">WINDOWS SERVER</option>
        <option value="MAC">MAC</option>
      </select><br></br>
      <p>Enter the disk capacity in GB</p>
      <input className="mb-3 rounded" id="input3" onChange={e => setCapacity(e.target.value)} type="number" placeholder="512"/><br></br>
      <button className="btn btn-primary" onClick={addDevice}>Create new device</button>
    </div>
  );
}

export default Devices;