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
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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

  const initialValues = {
    system_name: system_name,
    type: type,
    hdd_capacity: capacity
  };

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

  const udpateDev = (system_name, type, capacity, deviceId) => {
    updateDevice(system_name, type, capacity, deviceId);
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
          <Formik
            className="w-75"
            initialValues={initialValues}
            validationSchema={appointmentSchema}
            onSubmit={(values) => {
              submitForm(values);
            }}
          >
            {(formik) => {
              const { errors, touched, isValid, dirty } = formik;
              return (
                <div className="mt-5 pl-3 border-top pt-3 w-75 mx-auto">
                  <h6 className="my-4">Create a new device</h6>
                  <Form>
                    <div className="form-group">
                      <label htmlFor="system_name" className="mb-3">
                        Name of the System
                      </label>
                      <Field
                        type="string"
                        name="system_name"
                        id="system_name"
                        className={`${
                          errors.system_name && touched.system_name
                            ? "is-invalid"
                            : "is-valid"
                        } form-control`}
                      />

                      <ErrorMessage
                        name="system_name"
                        component="span"
                        className="text-danger"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="type" className="mt-3">
                        Select the type of the device:
                      </label>
                      <Field
                        name="type"
                        as="select"
                        className="my-select d-inline d-block mt-3 mb-3"
                      >
                        <option defaultValue>Select Type</option>
                        <option value="WINDOWS_WORKSTATION">
                          WINDOWS_WORKSTATION
                        </option>
                        <option value="WINDOWS_SERVER">WINDOWS_SERVER</option>
                        <option value="MAC">MAC</option>
                      </Field>

                      <ErrorMessage
                        name="type"
                        component="span"
                        className="text-danger"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="hdd_capacity" className="mt-3 mb-3">
                        Name of the System
                      </label>
                      <Field
                        type="number"
                        name="hdd_capacity"
                        id="hdd_capacity"
                        className={`${
                          errors.hdd_capacity && touched.hdd_capacity
                            ? "is-invalid"
                            : "is-valid"
                        } form-control`}
                      />

                      <ErrorMessage
                        name="hdd_capacity"
                        component="span"
                        className="text-danger"
                      />
                    </div>

                    <div className="mt-3">
                      <button
                        type="submit"
                        className={`${
                          !(dirty && isValid) ? "disabled-btn" : ""
                        } btn btn-success`}
                        disabled={!(dirty && isValid)}
                      >
                        Create new Device
                      </button>
                    </div>
                  </Form>
                  <div className="mt-3" />
                  <p>{loading ? "" : message()}</p>
                </div>
              );
            }}
          </Formik>
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
