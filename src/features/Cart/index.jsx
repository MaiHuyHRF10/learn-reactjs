import { Box, Container, Typography } from "@material-ui/core";
import { ErrorOutline } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { formatPrice } from "utils";
import { removeFromCart } from "./cartSlice";
import SelectedProduct from "./SelectedProduct";
import { cartItemsCountSelector, cartTotalSelector } from "./selectors";

const useStyles = makeStyles((theme) => ({
  root: {},

  cartMessage: {
    display: "block",
    marginTop: "10px",

    backgroundColor: "rgb(232, 246, 255)",
    border: "solid 1px rgb(27, 168, 255)",
    borderRadius: "4px",

    "& > p": {
      display: "flex",
      padding: "12px",

      flexFlow: "row nowrap",
      alignItems: "center",
      margin: 0,
    },
  },

  cartMessage__text: {
    fontSize: "13px",
    color: "rgb(13, 92, 182)",
    marginLeft: "10px",
  },

  cartMessage__icon: {
    fontSize: "13px",
    color: "rgb(13, 92, 182)",
  },

  cart: {
    display: "block",
    paddingTop: "20px",
  },

  cartHeading: {
    display: "flex",
    flexFlow: "row nowrap",

    padding: "8px 16px",
    margin: "15px 0 10px 0",
    backgroundColor: "#fff",
    borderRadius: "4px",

    "& > div": {
      padding: "0 15px",
      display: "inline-block",
      fontSize: "13px",
      color: "#242424",
    },
  },

  colOne: {
    width: "400px",
  },

  colTwo: {
    width: "200px",
  },

  colThree: {
    width: "150px",
  },

  colFour: {
    width: "150px",
  },

  cartProducts: {
    backgroundColor: "white",

    "& > ul": {
      margin: 0,
      padding: 0,
      listStyle: "none",

      "& > li": {
        borderBottom: "1px solid #f4f4f4",
      },
    },
  },

  cartTotal: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "flex-end",
    padding: "16px 20px",
  },

  total: {
    fontWeight: "300",
    color: "rgb(51, 51, 51)",
    fontSize: "14px",
  },

  money: {
    fontWeight: "400",
    fontSize: "20px",
    color: "rgb(254, 56, 52)",

    margin: "0 250px 0 112px",
  },
}));

function CartFeature(props) {
  const dispatch = useDispatch();
  const cartItemsCount = useSelector(cartItemsCountSelector);
  const cartTotalCount = useSelector(cartTotalSelector);
  const productInCart = useSelector((state) => state.cart.cartItems);
  const classes = useStyles();

  const handleItemRemove = (productId) => {
    const action = removeFromCart(productId);
    dispatch(action);
  };

  return (
    <Box>
      <Container>
        <div className={classes.cartMessage}>
          <p>
            <span className={classes.cartMessage__icon}>
              <ErrorOutline />
            </span>
            <span className={classes.cartMessage__text}>
              Do ???nh h?????ng c???a d???ch Covid-19, m???t s??? khu v???c c?? th??? nh???n h??ng ch???m h??n d??? ki???n. Tiki
              ??ang n??? l???c giao c??c ????n h??ng trong th???i gian s???m nh???t. C??m ??n s??? th??ng c???m c???a qu??
              kh??ch!
            </span>
          </p>
        </div>

        <div className={classes.cart}>
          <Typography component="h4">GI??? H??NG</Typography>

          <div className={classes.cartHeading}>
            <div className={classes.colOne}>{`T???t c??? (${cartItemsCount} s???n ph???m)`}</div>
            <div className={classes.colTwo}>????n gi??</div>
            <div className={classes.colThree}>S??? l?????ng</div>
            <div className={classes.colFour}>Th??nh ti???n</div>
          </div>

          <div className={classes.cartProducts}>
            <ul>
              {productInCart.map((item) => (
                <li key={item.id}>
                  <SelectedProduct
                    product={item.product}
                    quantity={item.quantity}
                    onChange={handleItemRemove}
                  />
                </li>
              ))}

              <div className={classes.cartTotal}>
                <span className={classes.total}>T???ng c???ng:</span>
                <span className={classes.money}>{formatPrice(cartTotalCount)}</span>
              </div>
            </ul>
          </div>
        </div>
      </Container>
    </Box>
  );
}

export default CartFeature;
