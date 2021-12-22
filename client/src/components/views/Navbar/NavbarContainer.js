import React from "react";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import auth from "../../../hoc/auth";
const NavbarContainer = (user) => {
  return <Navbar user={user} auth={auth} />;
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToprops = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToprops)(NavbarContainer);
