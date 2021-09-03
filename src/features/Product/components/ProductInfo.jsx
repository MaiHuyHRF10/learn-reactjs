import React from "react";
import PropTypes from "prop-types";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { formatPrice } from "utils";

ProductInfo.propTypes = {
  product: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(2),
    borderBottom: "1px solid #f4f4f4",
  },

  description: {
    margin: theme.spacing(1.5, 0),
    color: "#7c7878",
  },

  priceBox: {
    padding: theme.spacing(2),
    backgroundColor: "rgb(250, 250, 250)",
    color: "#7c7878",
    borderRadius: "2px",
  },

  salePrice: {
    marginRight: theme.spacing(1),
    fontSize: theme.typography.h4.fontSize,
  },

  originalPrice: {
    marginRight: theme.spacing(1),
    textDecoration: "line-through",
    fontSize: "12px",
  },

  promotionPercent: {
    fontSize: "12px",
  },

  freeShip: {
    marginTop: theme.spacing(2),
  },
}));

function ProductInfo({ product }) {
  const { name, shortDescription, salePrice, promotionPercent, originalPrice, isFreeShip } =
    product;

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography variant="h5" component="h4">
        {name}
      </Typography>
      <Typography variant="body2" className={classes.description}>
        {shortDescription}
      </Typography>

      <Box className={classes.priceBox}>
        <Box component="span" className={classes.salePrice}>
          {formatPrice(salePrice)}
        </Box>

        {promotionPercent > 0 && (
          <>
            <Box component="span" className={classes.originalPrice}>
              {formatPrice(originalPrice)}
            </Box>
            <Box component="span" className={classes.promotionPercent}>
              {`-${promotionPercent}%`}
            </Box>
          </>
        )}
        {isFreeShip && <Box className={classes.freeShip}>Miễn phí vận chuyển</Box>}
      </Box>
    </Box>
  );
}

export default ProductInfo;
