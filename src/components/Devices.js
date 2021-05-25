import React, { useState, useEffect } from 'react'
// import Filter from './Filter';

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading ] = useState(true);
  const [filter, setFilter] = useState("");

useEffect(() => {
  fetch("http://localhost:3000/devices")
  .then(response => response.json())
  .then(data => {
    setDevices(data)
    setLoading(false)
  });
}, [])

if (loading) {
  return <p className="text-center">Loading Devices...</p>
}

const filteredDevices = devices.filter(devices => {
  return devices.type.includes(filter)
})


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
      <select className="mt-3 mb-2" onChange={e => setFilter(e.target.value)}>
        <option value="">All</option>
        <option value="WINDOWS_WORKSTATION">Windows Workstation</option>
        <option value="WINDOWS_SERVER">Windows Server</option>
        <option value="Mac">Mac</option>
      </select>
      {filteredDevices.map(device => (
        <div className="border rounded mt-3 mb-3">
          <div key={device.id} className="container mt-3">
            <p className="pl-2"><strong>Device System Name:</strong> {device.system_name}</p>
            <p className="ml-3"><strong>Device Type:</strong> {device.type}</p>
            <p className="pl-2"><strong>HDD Capacity:</strong> {device.hdd_capacity} gb</p>
          </div>
        </div>
      ))}
      </div>

      <div className="col-md-4">
        <h4 className="ml-2 pl-2 text-center">Update Form</h4>
      </div>
      
      
    </div>
  );
}

export default Devices;

