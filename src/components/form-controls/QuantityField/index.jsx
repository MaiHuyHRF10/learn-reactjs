import { Box, makeStyles, Typography } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { Add, Remove } from "@material-ui/icons";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {},

  quantityForm: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    maxWidth: "180px",
    marginBottom: theme.spacing(1),
  },

  quantity: {
    margin: theme.spacing(1, 6.75),
  },
}));

function QuantityField(props) {
  const { form, name } = props;
  const classes = useStyles();
  const { errors, setValue } = form;
  const hasError = !!errors[name];

  return (
    <FormControl error={hasError} fullWidth variant="outlined" size="small">
      <Typography className={classes.quantity}>Số Lượng</Typography>

      <Controller
        name={name}
        control={form.control}
        render={({ onChange, onBlur, value, name }) => (
          <Box className={classes.quantityForm}>
            <IconButton
              disabled={Number.parseInt(value) <= 1}
              onClick={() =>
                setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1)
              }
            >
              <Remove />
            </IconButton>

            <OutlinedInput
              id={name}
              type="number"
              variant="outlined"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              size="small"
            />

            <IconButton
              onClick={() =>
                setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1)
              }
            >
              <Add />
            </IconButton>
          </Box>
        )}
      />
      <FormHelperText> {errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

export default QuantityField;
