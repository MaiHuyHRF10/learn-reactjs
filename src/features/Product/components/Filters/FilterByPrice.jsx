import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, TextField, Button, makeStyles } from "@material-ui/core";
import { useState } from "react";

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid #f4f4f4`,
  },

  range: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",

    margin: "8px 0 16px",

    "& > span": {
      width: "16px",
      height: "1px",
      fontSize: "0px",
      background: "rgb(154, 154, 154)",
      margin: "0px 8px",
    },
  },
}));

function FilterByPrice({ onChange }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });

  const handleSubmit = () => {
    if (onChange) onChange(values);

    setValues({
      salePrice_gte: 0,
      salePrice_lte: 0,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">GIÁ</Typography>

      <Box className={classes.range}>
        <TextField
          size="small"
          name="salePrice_gte"
          value={values.salePrice_gte}
          onChange={handleChange}
        />

        <span> - </span>

        <TextField
          size="small"
          name="salePrice_lte"
          value={values.salePrice_lte}
          onChange={handleChange}
        />
      </Box>

      <Button color="primary" variant="outlined" onClick={handleSubmit} size="small">
        Áp dụng
      </Button>
    </Box>
  );
}

export default FilterByPrice;
