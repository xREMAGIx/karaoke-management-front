import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CustomDrawer from "../components/CustomDrawer";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { productActions } from "../actions";
import Skeleton from "@material-ui/lab/Skeleton";

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
}));

export default function ProductEdit(props) {
  const classes = useStyles();

  const [image, setImage] = React.useState([]);
  const [delImage, setDelImage] = React.useState([]);

  const [formData, setFormData] = useState({
    sku: "",
    productName: "",
    price: 1,
    stock: 1,
    images: [],
  });

  const products = useSelector((state) => state.products);
  //const user = useSelector(state => state.authentication.user);
  const dispatch = useDispatch();

  const { sku, productName, price, stock } = formData;

  useEffect(() => {
    function fetchData() {
      dispatch(productActions.getById(props.match.params.id));
    }
    //setFormData(result.data);
    fetchData();
  }, [dispatch, props.match.params.id]);

  useEffect(() => {
    setFormData({ ...products.item });
  }, [products.item]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleOnImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let images = [];
      for (let i = 0; i < event.target.files.length; i++) {
        images.push({ id: i, img: event.target.files[i] });
      }
      setImage(images);
    }
  };

  const onDeleteBtn = (e) => {
    setDelImage((delImage) => [...delImage, e.target.id]);
    setFormData({
      ...formData,
      images: formData.images.filter((_image) => _image._id !== e.target.id),
    });
  };

  const onDeleteNew = (e) => {
    let newImg = image.filter((_image) => _image.id !== e.target.id * 1);
    //console.log(newImg);
    setImage(newImg);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSave = () => {
    dispatch(
      productActions.update(props.match.params.id, formData, image, delImage)
    );
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CustomDrawer />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            {!formData ? (
              <React.Fragment>
                <Grid
                  container
                  direction="row"
                  spacing={5}
                  style={{ marginTop: "45px" }}
                >
                  <Grid
                    item
                    container
                    //xs={12}
                    md={6}
                    spacing={3}
                  >
                    <Grid item xs={12}>
                      <Skeleton variant="rect" height={56} />
                    </Grid>
                    <Grid item xs={12}>
                      <Skeleton variant="rect" height={56} />
                    </Grid>
                    <Grid item xs={12}>
                      <Skeleton variant="rect" height={56} />
                    </Grid>
                    <Grid item xs={12}>
                      <Skeleton variant="rect" height={56} />
                    </Grid>
                    <Grid item xs={12}>
                      <Skeleton variant="rect" height={56} />
                    </Grid>
                    <Grid item xs={12}>
                      <Skeleton variant="rect" height={56} />
                    </Grid>
                    <Grid item xs={12}>
                      <Skeleton variant="rect" height={56} />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6} container>
                    <Grid item xs={12} container justify="center">
                      <Skeleton variant="rect" width={120} height={45} />
                    </Grid>
                    <Grid item xs={12}>
                      <Skeleton variant="rect" height={300} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container spacing={5}>
                  <Grid item>
                    <Skeleton variant="rect" width={120} height={45} />
                  </Grid>
                  <Grid item>
                    <Skeleton variant="rect" width={120} height={45} />
                  </Grid>
                </Grid>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography variant="h4" gutterBottom>
                  Product Edit
                </Typography>
                <Grid container direction="row" spacing={5}>
                  <Grid container item xs={12} md={6} spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="SKU"
                        id="outlined-sku"
                        variant="outlined"
                        name="sku"
                        value={sku}
                        onChange={(e) => onChange(e)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Product Name"
                        id="outlined-product-name"
                        variant="outlined"
                        name="productName"
                        value={productName}
                        onChange={(e) => onChange(e)}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl
                        fullWidth
                        className={classes.margin}
                        variant="outlined"
                      >
                        <InputLabel htmlFor="outlined-adornment-price">
                          Price
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-price"
                          name="price"
                          value={price}
                          onChange={(e) => onChange(e)}
                          startAdornment={
                            <InputAdornment position="start">$</InputAdornment>
                          }
                          labelWidth={40}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Stock"
                        id="outlined-stock"
                        variant="outlined"
                        name="stock"
                        value={stock}
                        onChange={(e) => onChange(e)}
                      />
                    </Grid>
                  </Grid>
                  <Grid container item xs={12} md={6} justify="center">
                    <Grid item>
                      <div className={classes.uploadRoot}>
                        <input
                          accept="image/*"
                          className={classes.input}
                          id="contained-button-file"
                          multiple
                          type="file"
                          onChange={handleOnImageChange}
                        />
                        <label htmlFor="contained-button-file">
                          <Button
                            variant="contained"
                            color="primary"
                            component="span"
                          >
                            Upload
                          </Button>
                        </label>
                      </div>
                    </Grid>
                    <Grid item>
                      <GridList cellHeight={300} className={classes.gridList}>
                        {formData.images &&
                          formData.images.map((item) => (
                            <GridListTile
                              key={item._id}
                              style={{ width: "100%" }}
                            >
                              <img
                                src={
                                  "http://localhost:5000/uploads/" + item.path
                                }
                                alt={"No data"}
                              />
                              <GridListTileBar
                                title={item.path}
                                actionIcon={
                                  <Button
                                    id={item._id}
                                    style={{ color: "red" }}
                                    onClick={(e) => onDeleteBtn(e)}
                                  >
                                    <Typography id={item._id}>Del</Typography>
                                  </Button>
                                }
                              />
                            </GridListTile>
                          ))}
                        {image &&
                          image.map((item) => (
                            <GridListTile
                              key={item.id}
                              style={{ width: "100%" }}
                            >
                              <img
                                src={URL.createObjectURL(item.img)}
                                alt={"No data"}
                              />
                              <GridListTileBar
                                title={item.img.name}
                                actionIcon={
                                  <Button
                                    id={item.id}
                                    style={{ color: "red" }}
                                    onClick={(e) => onDeleteNew(e)}
                                  >
                                    <Typography id={item.id}>Del</Typography>
                                  </Button>
                                }
                              />
                            </GridListTile>
                          ))}
                      </GridList>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container spacing={5}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => onSave()}
                    >
                      Save
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button component={Link} to="/products" variant="contained">
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </React.Fragment>
            )}
          </Container>
        </main>
      </div>
    </React.Fragment>
  );
}
