import React from "react";
import PropTypes from "prop-types";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
import categoryApi from "api/categoryApi";

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },

  menu: {
    padding: "0",
    margin: "0",
    listStyle: "none",
    "& > li": {
      marginTop: theme.spacing(1),
      "&:hover": {
        cursor: "pointer",
        color: theme.palette.primary.dark,
      },
    },
  },
}));

function FilterByCategory({ onChange }) {
  const classes = useStyles();
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAll();
        setCategoryList(
          list.map((item) => ({
            id: item.id,
            name: item.name,
          }))
        );
      } catch (error) {
        console.log("Failed to fetch list category: ", error);
      }
    })();
  }, []);

  const handleCategoryClick = (category) => {
    if (onChange) {
      onChange(category.id);
    }
  };
  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">DANH MỤC SẢN PHẨM</Typography>
      <ul className={classes.menu}>
        {categoryList.map((category) => {
          return (
            <li key={category.id} onClick={() => handleCategoryClick(category)}>
              <Typography variant="body2">{category.name}</Typography>
            </li>
          );
        })}
      </ul>
    </Box>
  );
}

export default FilterByCategory;
