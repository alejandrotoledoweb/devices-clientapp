import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Devices = () => {
    const [system, setSystem] = useState("");
    const [type, setType] = useState("");
    const [capacity, setCapacity] = useState("");
    const [show, setShow] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseCreate = () => setShowCreate(false);
    const handleShowCreate = () => setShowCreate(true);

  const addDevice = () => {
    if (system !== '' && type !== "" && capacity !== '') {
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
        input => (input.value = ""),
        setSystem(""),
        setType(""),
        setCapacity(""),
        handleShowCreate()
      );
    } else {
      handleShow()
    }
  };

  return (
    <div className="mb-5 container">
      <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column">
      <h3 className="mt-3 mb-4">Enter the following information to create a new device</h3>
      <p className="mt-2">Enter the name of the device</p>
      <input className="mb-2 mt-2 rounded" id="input1" onChange={e => setSystem(e.target.value.toUpperCase())} placeholder="Alex Device" type="text" required/> <br></br>
      <p className="mt-2">Select the device type</p>
      <select className="w-100 mb-3" id="input2" onChange={e => setType(e.target.value)} required >
        <option value="">Select</option>
        <option value="WINDOWS_WORKSTATION">WINDOWS WORKSTATION</option>
        <option value="WINDOWS_SERVER">WINDOWS SERVER</option>
        <option value="MAC">MAC</option>
      </select><br></br>
      <p>Enter the disk capacity in GB</p>
      <input className="mb-3 rounded" id="input3" onChange={e => setCapacity(e.target.value)} type="number" placeholder="512" required /><br></br>
      <button className="btn btn-primary" onClick={addDevice}>Create new device</button>
      </div>
      

      <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please fill all inputs with a value</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCreate} onHide={handleCloseCreate}>
        <Modal.Header>
          <Modal.Title>Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>Device created successfully</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseCreate}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </div>
  );
}

export default Devices;