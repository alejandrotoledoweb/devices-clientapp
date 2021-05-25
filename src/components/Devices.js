import React, { useState, useEffect } from 'react'

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading ] = useState(true);
  const [filter, setFilter] = useState("");
  const [system_name, setSystem] = useState("");
  const [type, setType] = useState("");
  const [capacity, setCapacity] = useState("");
  const [deviceId, setDeviceId] = useState("");

useEffect(() => {
  getDevices()
}, [])

const getDevices = () => {
  fetch("http://localhost:3000/devices")
  .then(response => response.json())
  .then(data => {
    setDevices(data)
    setLoading(false)
  });
}

if (loading) {
  return <p className="text-center">Loading Devices...</p>
}

const filteredDevices = devices.filter(devices => {
  return devices.type.includes(filter)
})

const deleteDevice = (id) => {
  fetch(`http://localhost:3000/devices/${id}`,{
    method: "DELETE",
  }).then(response => response.json())
    .then((data) => {
      console.warn(data)
      getDevices()
    })
}

const selectDevice = (system, type, capacity, id) => {
  console.log(system);
  console.log(type);
  console.log(capacity);
  console.log(id);
  setSystem(system);
  setType(type);
  setCapacity(capacity);
  setDeviceId(id)
}


// handleChangeSort(e){
//   this.setState({sort: e.target.value});
//   this.ListDevices();
// }

// ListDevices(){
//   this.setState(state => {
//     if(state.sort !== ''){
//       devices.sort((a,b) => (state.sort === 'lowest') ? (a.hhd_capacity > b.hdd_capacity? 1:-1) : (a.hhd_capacity < b.hdd_capacity? 1:-1) )
//     } else {
//       state.devices.sort((a,b) => (a.id < b.id ? 1:-1));
//     }
//     return {filteredDevices: state.devices};
//   })
// }

  return (
    <div className="container d-flex">
      <div className="col-md-8">
      <select className="mt-1 mb-2" onChange={e => setFilter(e.target.value)}>
        <option value="">Device Type: All</option>
        <option value="WINDOWS_WORKSTATION">Device Type: Windows Workstation</option>
        <option value="WINDOWS_SERVER">Device Type: Windows Server</option>
        <option value="MAC">Device Type: Mac</option>
      </select>
      {filteredDevices.map((device, i) => (
        <div key={i} className="border rounded container mt-3 mb-3 d-flex justify-content-around">
          <div className="mt-3 mr-4 pr-4">
            <p className="pl-2"><strong>Device System Name:</strong> {device.system_name}</p>
            <p className="ml-3"><strong>Device Type:</strong> {device.type}</p>
            <p className="pl-2"><strong>HDD Capacity:</strong> {device.hdd_capacity} gb</p>
          </div>
          <div className="d-flex align-items-center">
            <button className="btn btn-secondary" onClick={() => selectDevice(device.system_name, device.type, device.hdd_capacity, device.id)}>Edit Device</button>
            <button className="btn btn-danger" onClick={() => deleteDevice(device.id)}>Delete device</button>
          </div>
        </div>
      ))}
      </div>
      <div className="col-md-1"></div>

      <div className="col-md-3 text-center">
        <div className="d-flex flex-column justify-content-around align-items-center border mt-5 pb-5 pt-4 pr-2 rounded">
          <h4 className="ml-2 pl-2 text-center">Update Form</h4>
          <p className="mt-4">Name of the device</p>
          <input className="mt-2 mb-3" type="text" />
          <p className="mt-2">Select the device type</p>
          <select className="w-100 mb-3" id="input2" onChange={e => setType(e.target.value)} >
            <option value="">Select</option>
            <option value="WINDOWS_WORKSTATION">WINDOWS WORKSTATION</option>
            <option value="WINDOWS_SERVER">WINDOWS SERVER</option>
            <option value="MAC">MAC</option>
          </select><br></br>
          <p>Disk capacity in GB</p>
          <input className="mt-2 mb-3" type="number" />
          <button className="btn btn-dark mt-2">Save Changes</button>
        </div>
      </div>
      
      
    </div>
  );
}

export default Devices;

