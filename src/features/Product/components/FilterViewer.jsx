import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Box, Chip } from "@material-ui/core";
import { useMemo } from "react";

FilterViewer.propTypes = {
  onChange: PropTypes.func,
  filters: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
    marin: theme.spacing(1, 0),
    padding: 0,
    listStyle: "none",

    "& > li": {
      marin: 0,
      padding: theme.spacing(0, 1),
    },
  },
}));

const FILTER_LIST = [
  {
    id: 1,
    getLabel: (filters) => "Miễn phí vận chuyển",
    isActive: (filters) => filters.isFreeShip,
    isVisible: (filters) => true,
    isRemoveable: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilters = { ...filters };
      if (filters.isFreeShip) {
        delete newFilters.isFreeShip;
      } else {
        newFilters.isFreeShip = true;
      }

      return newFilters;
    },
  },
  {
    id: 2,
    getLabel: (filters) => "Đang giảm giá",
    isActive: (filters) => true,
    isVisible: (filters) => Boolean(filters?.isPromotion),
    isRemoveable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.isPromotion;

      return newFilters;
    },
    onToggle: () => {},
  },
  {
    id: 3,
    getLabel: (filters) => `${filters.salePrice_gte} - ${filters.salePrice_lte}`,
    isActive: (filters) => true,
    isVisible: (filters) => Boolean(filters?.salePrice_gte) && Boolean(filters?.salePrice_lte),
    isRemoveable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.salePrice_gte;
      delete newFilters.salePrice_lte;

      return newFilters;
    },
    onToggle: () => {},
  },
];

function FilterViewer({ filters = {}, onChange }) {
  const classes = useStyles();

  const visibleFilters = useMemo(() => {
    return FILTER_LIST.filter((item) => item.isVisible(filters));
  }, [filters]);

  return (
    <Box className={classes.root} component="ul">
      {visibleFilters.map((x) => (
        <li key={x.id}>
          <Chip
            size="small"
            label={x.getLabel(filters)}
            color={x.isActive(filters) ? "primary" : "default"}
            clickable={!x.isRemoveable}
            onClick={
              x.isRemoveable
                ? null
                : () => {
                    if (!onChange) return;
                    const newFilters = x.onToggle(filters);
                    onChange(newFilters);
                  }
            }
            onDelete={
              x.isRemoveable
                ? () => {
                    if (!onChange) return;
                    const newFilters = x.onRemove(filters);

                    onChange(newFilters);
                  }
                : null
            }
          />
        </li>
      ))}
    </Box>
  );
}

export default FilterViewer;
