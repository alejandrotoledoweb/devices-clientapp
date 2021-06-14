import React, { useEffect } from "react";
import { fetchDevices, deleteDevice } from "../redux/actions/devicesActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Devices = ({ devices, loading, fetchAllDevices, deleteDevice }) => {
  useEffect(() => {
    fetchAllDevices();
  }, [fetchAllDevices]);

  const deleteDv = (id) => {
    deleteDevice(id);
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
                onClick={() => deleteDv(device.id)}
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
    </div>
  );
};

Devices.defaultProps = {
  fetchAllDevices: PropTypes.func,
  deleteDevice: PropTypes.func,
};

Devices.propTypes = {
  fetchAllDevices: PropTypes.func,
  deleteDevice: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  devices: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.allDevices.loading,
  devices: state.allDevices.devices,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllDevices: () => dispatch(fetchDevices()),
  deleteDevice: (id) => dispatch(deleteDevice(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Devices);
