import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CustomDrawer from "../components/CustomDrawer";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { DateTimePicker } from "@material-ui/pickers";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { roomActions, productActions, receiptActions } from "../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  uploadRoot: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
  gridList: {
    height: "60vh",
  },
  marginBox: {
    margin: theme.spacing(2),
  },
}));

const statusOption = [
  { title: "Checked In", value: "checkedIn" },
  { title: "Checked Out", value: "checkedOut" },
];

export default function ReceiptAdd(props) {
  const classes = useStyles();
  const rooms = useSelector((state) => state.rooms);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    room: "",
  });

  const [newProducts, setNewProducts] = React.useState([]);

  const [selectedCheckIn, handleCheckInChange] = useState(new Date());
  const [selectedCheckOut, handleCheckOutChange] = useState(new Date());

  useEffect(() => {
    dispatch(roomActions.getAllNonPagination());
    dispatch(productActions.getAllNonPagination());
  }, [dispatch]);

  const handleRoomSelected = (value) => {
    if (value) {
      setFormData({ ...formData, room: value.id });
    }
  };

  const handleStatusSelected = (value) => {
    if (value) {
      setFormData({ ...formData, status: value.value });
    }
  };

  const addNewProductsClick = () => {
    setNewProducts((newProducts) => [
      ...newProducts,
      { productId: "none", quantity: 1 },
    ]);
  };

  const handleProductsSelected = (value, index) => {
    if (value) {
      setNewProducts((state) => {
        let new_product = state;
        new_product[index].productId = value.id;

        return [...new_product];
      });
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    console.log(newProducts);
  }, [newProducts]);

  const onDelete = (index) => {
    newProducts.splice(index, 1);
    setNewProducts([...newProducts]);
  };

  const onQuantityChange = (e, index) => {
    // e.persist();
    const { value } = e.target;
    //setFormData({ ...formData, [e.target.name]: e.target.value });
    setNewProducts((state) => {
      let new_product = state;
      new_product[index].quantity = value;

      return [...new_product];
    });
  };

  const onSubmit = () => {
    if (formData.status === "checkedIn")
      dispatch(
        receiptActions.add({
          ...formData,
          products: newProducts,
          checkInDate: selectedCheckIn,
        })
      );
    else
      dispatch(
        receiptActions.add({
          ...formData,
          products: newProducts,
          checkInDate: selectedCheckIn,
          checkOutDate: selectedCheckOut,
        })
      );
  };

  const keyPressed = (e) => {
    if (e.key === "Enter") onSubmit(e);
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CustomDrawer light={props.light} onToggleTheme={props.toggleTheme} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <Container maxWidth="lg" className={classes.container}>
            <Typography variant="h4" gutterBottom>
              Add new Receipt
            </Typography>
            <Autocomplete
              id="room-cb"
              className={classes.marginBox}
              options={rooms.items}
              getOptionLabel={(options) => options.roomId}
              onChange={(e, value) => handleRoomSelected(value)}
              style={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Room" variant="outlined" />
              )}
            />
            <Autocomplete
              id="status-cb"
              className={classes.marginBox}
              options={statusOption}
              onChange={(e, value) => handleStatusSelected(value)}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField {...params} label="Status" variant="outlined" />
              )}
            />
            {formData.status ? (
              <React.Fragment>
                <DateTimePicker
                  className={classes.marginBox}
                  value={selectedCheckIn}
                  disablePast
                  ampm={false}
                  onChange={handleCheckInChange}
                  label="Check In Time"
                  showTodayButton
                />
                {formData.status === "checkedOut" ? (
                  <DateTimePicker
                    className={classes.marginBox}
                    value={selectedCheckOut}
                    disablePast
                    ampm={false}
                    onChange={handleCheckOutChange}
                    label="Check Out Time"
                    showTodayButton
                  />
                ) : null}
              </React.Fragment>
            ) : null}
            <Grid
              style={{ marginTop: "10px" }}
              container
              justify="center"
              spacing={5}
            >
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addNewProductsClick}
                >
                  Add new Product
                </Button>
              </Grid>
            </Grid>

            <Grid container>
              {newProducts.length > 0 &&
                newProducts.map((product) => (
                  <Grid
                    key={newProducts.indexOf(product)}
                    style={{ marginTop: "10px" }}
                    item
                    xs={12}
                    container
                    alignItems="center"
                    spacing={3}
                  >
                    <Grid item xs={6}>
                      <Autocomplete
                        options={products.items}
                        onChange={(e, value) =>
                          handleProductsSelected(
                            value,
                            newProducts.indexOf(product)
                          )
                        }
                        value={
                          product.productId !== "none"
                            ? products.items.find(
                                (element) => element.id === product.productId
                              )
                            : null
                        }
                        getOptionLabel={(option) => option.productName}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Product"
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                    <TextField
                      style={{ marginTop: "10px" }}
                      label="Quantity"
                      id="outlined-quantity"
                      variant="outlined"
                      name="quantity"
                      type="number"
                      value={product.quantity}
                      onChange={(e, value) =>
                        onQuantityChange(e, newProducts.indexOf(product))
                      }
                      onKeyPress={(e) => keyPressed(e)}
                    />

                    <Grid item xs={1}>
                      <Button
                        style={{ color: "#b51a02" }}
                        variant="text"
                        onClick={(e) => onDelete(newProducts.indexOf(product))}
                      >
                        DEL
                      </Button>
                    </Grid>
                  </Grid>
                ))}
            </Grid>

            <Grid
              style={{ marginTop: "10px" }}
              container
              justify="center"
              spacing={5}
            >
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => onSubmit(e)}
                >
                  Add
                </Button>
              </Grid>
              <Grid item>
                <Button component={Link} to="/receipts" variant="contained">
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    </React.Fragment>
  );
}
