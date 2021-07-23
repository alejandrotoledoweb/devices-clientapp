import React from 'react';
import PropTypes from 'prop-types';

const FilterSort = ({ handleFilter, handleSort, count }) => {

  return (
    <>
      <div></div>
      <select className="mt-1 mb-2 mr-2 pr-2" onChange={handleFilter}>
        <option defaultValue>Filter: All</option>
        <option value="WINDOWS_WORKSTATION">Device Type: Windows Workstation</option>
        <option value="WINDOWS_SERVER">Device Type: Windows Server</option>
        <option value="MAC">Device Type: Mac</option>
      </select>
      <div className="mr-1"></div>
      <select className="mt-1 mb-2 ml-2" onChange={handleSort} >
        <option defaultValue>Sort by: All</option>
        <option value="system">Sort by: System Name</option>
        <option value="hdd">Sort by: HDD Capacity</option>
      </select>
    </>
  );
};

FilterSort.propTypes = {
  handleFilter: PropTypes.func.isRequired,
  handleSort: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};

export default FilterSort;