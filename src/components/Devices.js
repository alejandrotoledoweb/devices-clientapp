import React, { useEffect, useState } from "react";
import {
  fetchDevices,
  deleteDevice,
  editDevice
} from "../redux/actions/devicesActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Devices = ({
  devices,
  loading,
  fetchAllDevices,
  deleteDevice,
  updateDevice
}) => {
  const [system_name, setSystem] = useState("");
  const [type, setType] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [deviceId, setDeviceId] = useState("");
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    fetchAllDevices();
  }, [fetchAllDevices]);

  const deleteDv = (id) => {
    deleteDevice(id);
  };

  const selectDevice = (system, type, capacity, id) => {
    handleShow();
    setSystem(system);
    setType(type);
    setCapacity(capacity);
    setDeviceId(id);
  };

  const udpateDev = (system, type, capacity, deviceId) => {
    updateDevice(system, type, capacity, deviceId);
    handleClose();
  };

  if (loading) {
    return <p className="text-center">Loading Devices...</p>;
  }

  return (
    <div className="container d-flex">
      <div className="col-md-8">
        {devices.map((device) => (
          <div
            key={device.id}
            className="border rounded container mt-3 mb-3 pb-4 d-flex justify-content-around flex-wrap"
          >
            <div className="mt-4 mr-4 pr-4">
              <p className="pl-2">
                <strong>Device System Name:</strong> {device.system_name}
              </p>
              <p className="ml-3">
                <strong>Device Type:</strong> {device.type}
              </p>
              <p className="pl-2">
                <strong>HDD Capacity:</strong> {device.hdd_capacity} gb
              </p>
            </div>
            <div className="d-flex flex-row align-items-end justify-content-around">
              <button
                type="button"
                className="btn btn-secondary btn-sm ml-3 mr-3 "
                onClick={() =>
                  selectDevice(
                    device.system_name,
                    device.type,
                    device.hdd_capacity,
                    device.id
                  )
                }
              >
                Edit Device
              </button>
              <button
                type="button"
                className="btn btn-danger btn-sm ml-3 mr-3 pl-3 pr-3"
                onClick={() => deleteDv(device.id)}
              >
                Delete Device
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="col-md-1"></div>
      <Modal show={show} animation={false} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Update Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-md-12 text-center update-form" id="update-form">
            <div className="d-flex flex-column justify-content-around align-items-center border mt-2 pb-5 pt-4 pr-2 rounded">
              <p className="mt-2">Name of the device</p>
              <input
                className="mt-2 mb-3"
                id="input1"
                value={system_name}
                type="text"
                onChange={(e) => setSystem(e.target.value)}
              />
              <p className="mt-2">Select the device type</p>
              <select
                className="w-175 mb-3"
                id="input2"
                onChange={(e) => setType(e.target.value)}
                value={type}
              >
                <option value="">Select</option>
                <option value="WINDOWS_WORKSTATION">WINDOWS WORKSTATION</option>
                <option value="WINDOWS_SERVER">WINDOWS SERVER</option>
                <option value="MAC">MAC</option>
              </select>
              <br></br>
              <p>Disk capacity in GB</p>
              <input
                className="mt-2 mb-3"
                id="input3"
                type="number"
                onChange={(e) => setCapacity(e.target.value)}
                value={capacity}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={udpateDev}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

Devices.defaultProps = {
  fetchAllDevices: PropTypes.func,
  deleteDevice: PropTypes.func,
  updateDevice: PropTypes.func
};

Devices.propTypes = {
  fetchAllDevices: PropTypes.func,
  deleteDevice: PropTypes.func,
  updateDevice: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  devices: PropTypes.arrayOf(Object).isRequired
};

const mapStateToProps = (state) => ({
  loading: state.allDevices.loading,
  devices: state.allDevices.devices
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllDevices: () => dispatch(fetchDevices()),
  deleteDevice: (id) => dispatch(deleteDevice(id)),
  updateDevice: (system_name, type, capacity, deviceId) =>
    dispatch(editDevice(system_name, type, capacity, deviceId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Devices);
