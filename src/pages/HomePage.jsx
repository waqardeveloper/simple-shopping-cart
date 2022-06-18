import React, { useEffect, useState } from "react";
import Products from "../components/Products";
import axios from "axios";
import Filter from "../components/Filter";
import {
  Container,
  Paper,
  ThemeProvider,
  createTheme,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";
import Cart from "../components/Cart";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),

    maxWidth: 800,
  },
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

export default function HomePage() {
  const [product, setProduct] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const [color, setColor] = useState([]);
  const classes = useStyles();
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const response = await axios.get(
        "https://my-json-server.typicode.com/benirvingplt/products/products"
      );
      setProduct(response.data);
      setFilterProduct(response.data);
      const colors = response.data.map((item) => item.colour);
      setColor(_.uniqBy(colors));
    } catch (error) {
      console.error(error);
    }
  }

  const handleFilter = (value = []) => {
    if (value.length > 0) {
      setFilterProduct(
        product.filter((item) => {
          return value.includes(item.colour);
        })
      );
    } else {
      setFilterProduct(product);
    }
  };

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Container style={{ marginTop: "25px" }}>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={8}>
                <Paper className={classes.paper}>
                  <Filter list={color} search={handleFilter}></Filter>
                  {filterProduct.map((item, index) => {
                    return <Products key={item.id} product={item} />;
                  })}
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Cart/>
              </Grid>
            </Grid>
          </div>
        </Container>
      </ThemeProvider>
    </>
  );
}
