import { Box, Typography } from "@material-ui/core";
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from "constants/common";
import PropTypes from "prop-types";
import React from "react";

Product.propTypes = {
  product: PropTypes.object,
};

function Product({ product }) {
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail.url}`
    : THUMBNAIL_PLACEHOLDER;

  return (
    <Box padding={1}>
      <Box padding={1} minWidth="215px">
        <img src={thumbnailUrl} alt={product.name} width="100%" />
      </Box>
      <Box padding="0 8px">
        <Typography variant="body2">{product.name}</Typography>
        <Typography variant="body2">
          <Box component="span" fontSize="16px" fontWeight="500" mr={1}>
            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
              product.salePrice
            )}
          </Box>
          <Box component="span" fontSize="12px">
            {product.promotionPercent > 0 ? ` -${product.promotionPercent}%` : ""}
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}

export default Product;
