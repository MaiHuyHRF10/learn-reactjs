import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";

ProductMenu.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    alignItems: "center",

    padding: 0,
    listStyleType: "none",

    "& > li": {
      padding: theme.spacing(2, 4),
      TextDecoder: "none",
    },

    "& > li > a": {
      color: theme.palette.grey[700],
      textDecoration: "none",
    },

    "& > li > a.active": {
      color: theme.palette.primary.main,
      textDecoration: "underline",
    },
  },
}));

function ProductMenu(props) {
  const { url } = useRouteMatch();
  const classes = useStyles();
  console.log(url);
  return (
    <Box component="ul" className={classes.root}>
      <li>
        <NavLink to={url} exact>
          Description
        </NavLink>
      </li>

      <li>
        <NavLink to={`${url}/additional`} exact>
          Additional Information
        </NavLink>
      </li>

      <li>
        <NavLink to={`${url}/reviews`} exact>
          Reviews
        </NavLink>
      </li>
    </Box>
  );
}

export default ProductMenu;
