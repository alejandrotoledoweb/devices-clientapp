import React from "react";
import { addDevice } from "../redux/actions/devicesActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const NewDevice = ({ addDevice, error, loading, status }) => {
  const initialValues = {
    system_name: "",
    type: "",
    hdd_capacity: ""
  };

  const appointmentSchema = Yup.object().shape({
    system_name: Yup.string().required("System Name is required"),
    type: Yup.string().required("System Type is required"),
    hdd_capacity: Yup.number().required("Capacity is required")
  });

  const submitForm = (values) => {
    const data = {
      system_name: values.system_name,
      type: values.type,
      hdd_capacity: values.hdd_capacity
    };
    addDevice(data);
  };

  const message = () =>
    error === "" && status === "created" ? (
      <span className="text-success">Device created successfully.</span>
    ) : (
      <span className="text-danger">{error}</span>
    );

  return (
    <section>
      <Formik
        className="container w-50"
        initialValues={initialValues}
        validationSchema={appointmentSchema}
        onSubmit={(values) => {
          submitForm(values);
        }}
      >
        {(formik) => {
          const { errors, touched, isValid, dirty } = formik;
          return (
            <div className="w-50 mt-5 pl-3 border-top pt-3 mx-auto">
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

      <footer className="text-center bold mt-4 mb-4 pt-5 pb-5">
          ® Rights Reserved for Alejandro Toledo
        </footer>
    </section>
    
    
  );
};

NewDevice.defaultProps = {
  addDevice: PropTypes.func
};

NewDevice.propTypes = {
  addDevice: PropTypes.func
};

const mapStateToProps = (state) => ({
  loading: state.allDevices.loading,
  status: state.allDevices.status,
  error: state.allDevices.error
});

const mapDispatchToProps = (dispatch) => ({
  addDevice: (data) => dispatch(addDevice(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewDevice);
