import { Box, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import productApi from "api/productApi";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import FilterViewer from "../components/FilterViewer";
import ProductFilters from "../components/ProductFilters";
import ProductList from "../components/ProductList";
import ProductSkeletonList from "../components/ProductSkeletonList";
import ProductSort from "../components/ProductSort";
import queryString from "query-string";
import { useMemo } from "react";

const useStyles = makeStyles((theme) => ({
  root: {},

  left: {
    width: "250px",
  },

  right: {
    flex: "1 1 0",
  },

  pagination: {
    display: "flex",
    flexFrow: "row no-wrap",
    justifyContent: "center",
    marginTop: "20px",
    paddingBottom: "40px",
  },
}));

function ListPage(props) {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 8,
    total: 8,
  });

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 8,
      _sort: params._sort || "salePrice:ASC",
      isFreeShip: params.isFreeShip === "true",
      isPromotion: params.isPromotion === "true",
    };
  }, [location.search]);

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }

      setLoading(false);
    })();
  }, [queryParams]);

  const handlePageChange = (e, page) => {
    const filters = {
      ...queryParams,
      _page: page,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleSortChange = (newSortValue) => {
    const filters = {
      ...queryParams,
      _sort: newSortValue,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleFiltersChange = (newFilters) => {
    const filters = {
      ...queryParams,
      ...newFilters,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const setNewFilters = (newFilters) => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters),
    });
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid className={classes.left} item>
            <Paper elevation={0}>
              <ProductFilters onChange={handleFiltersChange} filters={queryParams} />
            </Paper>
          </Grid>
          <Grid className={classes.right} item>
            <Paper elevation={0}>
              <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />
              <FilterViewer onChange={setNewFilters} filters={queryParams} />
              {loading ? <ProductSkeletonList length={8} /> : <ProductList data={productList} />}

              <Box className={classes.pagination}>
                <Pagination
                  count={Math.ceil(pagination.total / pagination.limit)}
                  color="primary"
                  page={pagination.page}
                  onChange={handlePageChange}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
