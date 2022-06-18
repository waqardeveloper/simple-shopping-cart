import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Grid, Typography, Link } from "@material-ui/core";
export default function GroupedButtons({ addQuantity }) {
  const [state, setState] = useState({
    counter: 0,
  });
  const displayCounter = state.counter > 0;

  const handleIncrement = () => {
    setState((state) => ({ counter: state.counter + 1 }));
  };

  const handleDecrement = () => {
    setState((state) => ({ counter: state.counter - 1 }));
  };

  const handleRemove = () => {
    setState(() => ({ counter: 0 }));
  };

  useEffect(() => {
    addQuantity(state.counter);
  },[state.counter]);

  return (
    <>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <ButtonGroup size="small" aria-label="small outlined button group">
              <Button onClick={handleIncrement}>+</Button>
              {displayCounter && <Button disabled>{state.counter}</Button>}
              {displayCounter && <Button onClick={handleDecrement}>-</Button>}
            </ButtonGroup>

            {displayCounter && (
              <Typography
                style={{ marginTop: "15px", textAlign: "center" }}
                variant="body2"
                gutterBottom
              >
                <Link href="javascript:void(0)" onClick={handleRemove}>
                  Remove
                </Link>
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
