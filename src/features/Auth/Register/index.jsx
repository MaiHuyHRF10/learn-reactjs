import React from "react";
import RegisterForm from "../RegisterForm";
import { useDispatch } from "react-redux";
import { register } from "../userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

Register.prototype = {
  closeDialog: PropTypes.func,
};

function Register(props) {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      values.username = values.email;
      console.log(values);

      const action = register(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);

      // close dialog
      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }

      console.log("New user: ", user);
      enqueueSnackbar("Register successfully !!!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
