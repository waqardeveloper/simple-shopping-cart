import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, ButtonBase, Typography, Divider } from "@material-ui/core";
import GroupedButtons from "../components/GroupedButtons";
import { CartState } from "../Context";

const useStyles = makeStyles((theme) => ({
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

export default function Products(props) {
  const classes = useStyles();

  let { cartProduct, setCartProduct } = CartState();

  const addProductInCart = (quantity) => {
    console.log(quantity);
    if (quantity > 0) {
      // First find product in cartProduct array if exist then update quantity else add new product in cartProduct array

      let product = cartProduct.find((item) => item.id === props.product.id);
      if (product) {
        product.quantity = quantity;
        setCartProduct([...cartProduct]);
      } else {
        let product = {
          ...props.product,
          quantity: quantity,
        };
        setCartProduct((cartProduct) => [...cartProduct, product]);
      }
    } else {
      // Remove product from cartProduct array
      let product = cartProduct.find((item) => item.id === props.product.id);
      if (product) {
        let index = cartProduct.indexOf(product);
        cartProduct.splice(index, 1);
        setCartProduct([...cartProduct]);
      }
    }
  };

  return (
    <>
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        <Grid item>
          <ButtonBase className={classes.image}>
            <img
              className={classes.img}
              alt="complex"
              src={props.product.img}
            />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1">
                {props.product.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {props.product.colour}
              </Typography>
              <Typography variant="body2" gutterBottom>
                $ {props.product.price}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <GroupedButtons addQuantity={addProductInCart} />
          </Grid>
        </Grid>
      </Grid>
      <Divider style={{ marginTop: "25px" }} />
    </>
  );
}
