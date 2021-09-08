import React from "react";
import PropTypes from "prop-types";
import { Box, IconButton, makeStyles } from "@material-ui/core";
import { STATIC_HOST } from "constants/index";
import { THUMBNAIL_PLACEHOLDER } from "constants/common";
import { formatPrice } from "utils";
import { Delete } from "@material-ui/icons";

SelectedProduct.propTypes = {
  onChange: PropTypes.func,
  product: PropTypes.object.isRequired,
  quantity: PropTypes.number,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "16px",
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
  },

  productDescription: {
    display: "flex",
    flexFlow: "row nowrap",
    width: "400px",
    margin: 0,
    padding: "0 15px",

    "& > img": {
      marginRight: "10px",
    },

    "& > div": {
      display: "flex",
      flexFlow: "column nowrap",
      justifyContent: "space-between",
    },
  },

  productName: {
    display: "block",

    lineHeight: "14px",
    fontSize: "12px",
    cursor: "default",
    height: "14px",

    "&:hover": {
      color: "#0b74e5",
    },
  },

  productShortDsc: {
    display: "-webkit-box",
    overflow: "hidden",

    lineHeight: "14px",
    fontSize: "12px",
    cursor: "default",
    height: "42px",

    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "3",
  },

  productPrice: {
    width: "200px",
    padding: "0 15px",
  },

  salePrice: {
    fontSize: "13px",
    fontWeight: "500",
  },

  originalPrice: {
    marginLeft: theme.spacing(1),
    textDecoration: "line-through",
    fontSize: "11px",
    color: "#7c7878",
  },

  productQuantity: {
    width: "150px",
    padding: "0 15px",
    fontSize: "13px",
    fontWeight: "500",
  },

  totalMoney: {
    width: "150px",
    padding: "0 15px",
    fontSize: "13px",
    fontWeight: "500",

    color: "#ff424e",
  },
}));

function SelectedProduct({ onChange, product, quantity }) {
  const classes = useStyles();

  const handleRemoveItem = () => {
    if (!onChange) return;

    onChange(product.id);
  };

  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail.url}`
    : THUMBNAIL_PLACEHOLDER;
  return (
    <Box className={classes.root} component="div">
      <div className={classes.productDescription}>
        <img src={thumbnailUrl} alt="" width="76px" />

        <div>
          <span className={classes.productName}>{product.name}</span>

          <span className={classes.productShortDsc}>{product.shortDescription}</span>
        </div>
      </div>

      <div className={classes.productPrice}>
        <span className={classes.salePrice}>{formatPrice(product.salePrice)}</span>

        {product.promotionPercent > 0 && (
          <>
            <Box component="span" className={classes.originalPrice}>
              {formatPrice(product.originalPrice)}
            </Box>
          </>
        )}
      </div>

      <div className={classes.productQuantity}>{quantity}</div>

      <div className={classes.totalMoney}>{formatPrice(quantity * product.salePrice)}</div>

      <div>
        <IconButton onClick={handleRemoveItem}>
          <Delete />
        </IconButton>
      </div>
    </Box>
  );
}

export default SelectedProduct;
