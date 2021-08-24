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

  const { errors } = form;
  const hasError = errors[name];

  return (
    <Controller
      name={name}
      control={form.control}
      margin="normal"
      variant="outlined"
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
