import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FilterSort from "./FilterSort";
import { fetchDevices } from "../redux/actions/devicesActions";

const Devices = (devices, fetchAllDevices, loading) => {

  useEffect(() => {
    fetchAllDevices();
  }, [fetchAllDevices]);

  if (loading) {
    return <p className="text-center">Loading Devices...</p>;
  }

  const handleChangeFilter = (e) => {
    setFilter(e);
    console.log(sortCat);
  };

  return (
    <div className="container d-flex">
      <div className="col-md-8">
        <FilterSort
          handleFilter={(e) => handleChangeFilter(e.target.value)}
          handleSort={(e) => handleChangeSort(e.target.value)}
        />
        {devices.map((device, i) => (
          <div
            key={i}
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
            <div className="d-flex align-items-center justify-content-between">
              <button
                className="btn btn-secondary mr-4"
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
                className="btn btn-danger"
                onClick={() => deleteDevice(device.id)}
              >
                Delete device
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="col-md-1"></div>

      <Modal show={show} animation={false}>
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
          <Button variant="primary" onClick={updateDevice}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

Devices.defaultProps = {
  fetchAllDevices: PropTypes.func,
};

Devices.propTypes = {
  fetchAllDevices: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  devices: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.allDevices.loading,
  devices: state.allDevices.devices,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllDevices: () => dispatch(fetchDevices()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Devices);
