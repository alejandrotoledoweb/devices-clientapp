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
import FilterSort from "./FilterSort";

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
    id : deviceId,
    system_name: system_name,
    type: type,
    hdd_capacity: capacity
  };

  const appointmentSchema = Yup.object().shape({
    system_name: Yup.string().required("System Name is required"),
    type: Yup.string().required("System Type is required"),
    hdd_capacity: Yup.number().required("Capacity is required")
  });

  const submitForm = (values) => {
    const data = {
      id : values.id,
      system_name: values.system_name,
      type: values.type,
      hdd_capacity: values.hdd_capacity
    };
    updateDevice(data);
    handleClose()
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

  if (loading) {
    return <p className="text-center">Loading Devices...</p>;
  }

  return (
    <div className="container border-top mt-5 pt-3">
    <h3 className="mt-2 mb-4">List of devices</h3>
    <FilterSort></FilterSort>
      <div>
      <div className="col-md-8">
        {devices.map((device) => (
          <div
            key={device.id}
            className="border rounded container mt-3 mb-3 pb-2 d-flex justify-content-around flex-wrap"
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
            <div className="d-flex align-items-center">
              <div className="pl-4 pr-4">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
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
              </div>
              
              <div className="mr-1 ml-1">
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteDv(device.id)}
                  >
                  Delete Device
                </button>
              </div>
              
            </div>
          </div>
        ))}
        <footer className="text-center bold mt-4 mb-4 pt-5 pb-5">
        ® Rights Reserved for Alejandro Toledo
      </footer>
      </div>
      </div>
      
      
      <Modal show={show} animation={false} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Update Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            className="w-100"
            initialValues={initialValues}
            validationSchema={appointmentSchema}
            onSubmit={(values) => {
              submitForm(values);
            }}
          >
            {(formik) => {
              const { errors, touched, isValid, dirty } = formik;
              return (
                <div className="mt-2 pl-2 pt-2 mb-2 pb-4 w-75 mx-auto">
                  <h5 className="my-4">Edit a device</h5>
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

                    <div className="mt-5 mt-3 d-flex justify-content-around">
                      <div className="">
                        <button
                          type="submit"
                          className={`${
                            !(dirty && isValid) ? "disabled-btn" : ""
                          } btn btn-success`}
                          disabled={!(dirty && isValid)}
                        >
                          Update Device Info
                        </button>
                      </div>
                      
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    </div>
                  </Form>
                  <div className="mt-3" />
                </div>
              );
            }}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
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
  updateDevice: (data) =>
    dispatch(editDevice(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Devices);
