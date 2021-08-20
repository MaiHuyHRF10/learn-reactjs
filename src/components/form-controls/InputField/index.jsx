import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disable: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disable } = props;

  const { errors, formState } = form;
  const hasError = formState.touched[name] && errors[name];

  return (
    <Controller
      name={name}
      control={form.control}
      as={TextField}
      fullWidth
      label={label}
      disabled={disable}
      error={!!hasError}
      helperText={errors[name]?.message}
    />
  );
}

export default InputField;
