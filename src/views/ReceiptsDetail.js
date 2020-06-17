import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CustomDrawer from "../components/CustomDrawer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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
  marginBox: {
    margin: theme.spacing(2),
  },
}));

function dateFormat(date) {
  return new Intl.DateTimeFormat("en-GB", {
    second: "numeric",
    minute: "numeric",
    hour: "numeric",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

export default function ReceiptDetail(props) {
  const classes = useStyles();
  const rooms = useSelector((state) => state.rooms);
  const products = useSelector((state) => state.products);
  const receipts = useSelector((state) => state.receipts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(roomActions.getAllNonPagination());
    dispatch(productActions.getAllNonPagination());
    dispatch(receiptActions.getById(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CustomDrawer light={props.light} onToggleTheme={props.toggleTheme} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <Container maxWidth="lg" className={classes.container}>
            {receipts.item && rooms.items && products.items ? (
              <React.Fragment>
                <Typography variant="h4" gutterBottom>
                  Receipt Detail ID #{receipts.item.id}
                </Typography>

                <Typography variant="h5" gutterBottom>
                  Room ID:{" "}
                  {(rooms.items.find((x) => x.id === receipts.item.room) || {})
                    .roomId || null}
                </Typography>
                <Grid container spacing={3}>
                  <Grid item>
                    <Typography variant="h6" gutterBottom>
                      Check-in Time: {dateFormat(receipts.item.checkInDate)}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" gutterBottom>
                      Check-out Time:{" "}
                      {receipts.item.status === "checkedOut"
                        ? dateFormat(receipts.item.checkOutDate)
                        : null}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant="h5" gutterBottom>
                  Status:{" "}
                  {receipts.item.status === "checkedIn"
                    ? "Checked In"
                    : "Checked Out"}
                </Typography>

                <Typography variant="h6" gutterBottom>
                  Number of products used: {receipts.item.products.length}
                </Typography>
                {receipts.item.products.length > 0 ? (
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Product name </TableCell>
                          <TableCell align="right">Quantity</TableCell>
                          <TableCell align="right">Price</TableCell>
                          <TableCell align="right">Sum</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {receipts.item.products.map((product, index) => (
                          <TableRow key={index}>
                            <TableCell component="th" scope="row">
                              {(
                                products.items.find(
                                  (x) => x.id === product.productId
                                ) || {}
                              ).productName || null}
                            </TableCell>
                            <TableCell align="right">
                              {product.quantity}
                            </TableCell>
                            <TableCell align="right">
                              {(
                                products.items.find(
                                  (x) => x.id === product.productId
                                ) || {}
                              ).price || null}
                            </TableCell>
                            <TableCell align="right">
                              {(
                                products.items.find(
                                  (x) => x.id === product.productId
                                ) || {}
                              ).price * product.quantity || null}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : null}
              </React.Fragment>
            ) : null}
          </Container>
        </main>
      </div>
    </React.Fragment>
  );
}
