import React from "react";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
import { getCustomers } from "../../store/customers/customerActions";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

const columns = [
  {
    name: "Id",
    selector: "id",
    sortable: true
  },
  {
    name: "First name",
    selector: "firstName",
    sortable: true
  },
  {
    name: "Last name",
    selector: "lastName",
    sortable: true
  }
];

const CustomersTable = ({
  getCustomers,
  isAuthenticated,
  customers,
  loading
}) => {
  if (loading) {
    getCustomers();
  }
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return <DataTable title="Customers" columns={columns} data={customers} />;
};
CustomersTable.propTypes = {
  getCustomers: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  customers: PropTypes.array
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  customers: state.customers.data,
  loading: state.customers.loading
});

export default connect(mapStateToProps, { getCustomers })(CustomersTable);
