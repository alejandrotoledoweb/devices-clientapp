import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {
  set_sort,
  set_filter,
} from "../redux/actions/devicesActions";

const FilterSort = ({ handleFilter, handleSort }) => {

  const changeFilter = (filter) => {
    handleFilter(filter)
  }

  const changeSort = (sort) => {
    handleSort(sort)
  }

  return (
    <>
      <div className="border mt-3 mb-3 w-25 "></div>
      <select className="mt-1 mb-2 mr-2 pr-2" onChange={(e) => changeFilter(e.target.value)}>
        <option defaultValue>Filter: All</option>
        <option value="WINDOWS_WORKSTATION">Device Type: Windows Workstation</option>
        <option value="WINDOWS_SERVER">Device Type: Windows Server</option>
        <option value="MAC">Device Type: Mac</option>
      </select>
      <div className="mr-1"></div>
      <select className="mt-1 mb-2 ml-2" onChange={e => changeSort(e.target.value)} >
        <option defaultValue>Sort by: All</option>
        <option value="system">Sort by: System Name</option>
        <option value="hdd">Sort by: HDD Capacity</option>
      </select>
      <div className="border mt-3 mb-3 w-25 "></div>
    </>
  );
};

FilterSort.propTypes = {
  handleFilter: PropTypes.func.isRequired,
  handleSort: PropTypes.func.isRequired,
};

FilterSort.propTypes = {
  handleFilter: PropTypes.func,
  handleSort: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  handleFilter: (filter) => dispatch(set_filter(filter)),
  handleSort: (sort) => dispatch(set_sort(sort)),
});

export default connect(null, mapDispatchToProps)(FilterSort);
