import React, { useEffect } from "react";
import { lighten, makeStyles, fade } from "@material-ui/core/styles";
import CustomDrawer from "../components/CustomDrawer";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../actions";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Skeleton from "@material-ui/lab/Skeleton";
import { history } from "../store";

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

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "sku",
    numeric: false,
    disablePadding: true,
    label: "SKU",
  },
  {
    id: "productName",
    numeric: false,
    disablePadding: true,
    label: "Product Name",
  },
  { id: "img", numeric: false, disablePadding: false, label: "Image" },
  { id: "price", numeric: true, disablePadding: false, label: "Price" },
  { id: "stock", numeric: true, disablePadding: false, label: "Stock" },
  {
    id: "createAt",
    numeric: true,
    disablePadding: false,
    label: "Create Date",
  },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all " }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            style={{
              whiteSpace: "normal",
              wordWrap: "break-word",
            }}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, selectedIndex } = props;
  //const user = useSelector(state => state.authentication.user);
  const dispatch = useDispatch();

  const onDelete = (id) => {
    dispatch(productActions.delete(id));
  };

  return (
    <React.Fragment>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle">
            Products
          </Typography>
        )}

        {numSelected > 0 ? (
          <Grid container direction="row" justify="flex-end" spacing={1}>
            {numSelected < 2 ? (
              <Grid item>
                <Tooltip title="Modify">
                  <IconButton
                    component={Link}
                    to={"/products-edit/" + selectedIndex[0]}
                    aria-label="modify"
                  >
                    <CreateIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            ) : null}
            <Grid item>
              <Tooltip title="Delete">
                <IconButton
                  aria-label="delete"
                  onClick={() => onDelete(selectedIndex[0])}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <Grid item>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                  onChange={props.searchAction}
                />
              </div>
            </Grid>
            <Grid item>
              <Tooltip title="Add new">
                <IconButton component={Link} to="/products-add">
                  <AddCircleIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        )}
      </Toolbar>
    </React.Fragment>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

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
  mainContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  table: {
    minWidth: 750,
  },
  tableContainer: {
    maxHeight: "60vh",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  img: {
    maxHeight: 50,
    maxWidth: 100,
  },
}));

export default function Products() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [searchResults, setSearchResults] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  //const user = useSelector(state => state.authentication.user);

  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(history.location.state);
  }, []);

  useEffect(() => {
    dispatch(productActions.getAll());
  }, [dispatch]);

  useEffect(() => {
    if (products.items) {
      const results = products.items.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm)
      );
      setSearchResults(results);
    }
  }, [searchTerm, products.items]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = products.items.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const emptyRows = 0;

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CustomDrawer />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <Container maxWidth="lg" className={classes.mainContainer}>
            {!products.items ? (
              <Skeleton
                variant="rect"
                width={"100%"}
                height={50}
                style={{ marginBottom: "10px" }}
              />
            ) : (
              <EnhancedTableToolbar
                numSelected={selected.length}
                selectedIndex={selected}
                searchAction={handleChange}
              />
            )}
            <TableContainer className={classes.tableContainer}>
              <Table
                stickyHeader
                className={classes.table}
                aria-labelledby="tableTitle"
                aria-label="enhanced table"
              >
                {!products.items ? (
                  <Skeleton variant="rect" width={"100%"} height={40} />
                ) : (
                  <EnhancedTableHead
                    classes={classes}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={products.items.length}
                  />
                )}
                {!products.items ? (
                  <Skeleton variant="rect" width={"100%"} height={100} />
                ) : (
                  <TableBody>
                    {Array.isArray(products.items) &&
                      stableSort(searchResults, getComparator(order, orderBy))
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => {
                          const isItemSelected = isSelected(row._id);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              onClick={(event) => handleClick(event, row._id)}
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.sku}
                              selected={isItemSelected}
                            >
                              <TableCell>
                                <Checkbox
                                  checked={isItemSelected}
                                  inputProps={{ "aria-labelledby": labelId }}
                                />
                              </TableCell>
                              <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"
                              >
                                <Grid item xs zeroMinWidth>
                                  <Typography variant="body2" noWrap>
                                    {row.sku}
                                  </Typography>
                                </Grid>
                              </TableCell>
                              <TableCell scope="row" padding="none">
                                <Grid item xs zeroMinWidth>
                                  <Typography variant="body2" noWrap>
                                    {row.productName}
                                  </Typography>
                                </Grid>
                              </TableCell>
                              {/* <TableCell scope="row" padding="none">
                                {categories.items.length !== 0
                                  ? categories.items.filter((category) => {
                                      return category._id === row.category;
                                    })[0].name
                                  : null}
                              </TableCell>
                              <TableCell scope="row" padding="none">
                                {brands.items.length !== 0
                                  ? brands.items.filter((brand) => {
                                      return brand._id === row.brand;
                                    })[0].name
                                  : null}
                              </TableCell> */}
                              <TableCell padding="none">
                                {row.images.length > 0 ? (
                                  <img
                                    className={classes.img}
                                    src={
                                      "http://localhost:5000/uploads/" +
                                      row.images[0].path
                                    }
                                    alt="broken"
                                  />
                                ) : null}
                              </TableCell>
                              <TableCell align="right">
                                {row.price.toLocaleString()}
                              </TableCell>
                              <TableCell align="right">{row.stock}</TableCell>
                              {/* <TableCell align="right">
                                {row.discount}%
                              </TableCell>
                              <TableCell
                                style={{
                                  maxWidth: "5vw",
                                  whiteSpace: "normal",
                                  wordWrap: "break-word",
                                }}
                                scope="row"
                                // padding="none"
                              >
                                <Grid item xs zeroMinWidth>
                                  <Typography variant="body2" noWrap>
                                    {row.description}
                                  </Typography>
                                </Grid>
                              </TableCell> */}
                              <TableCell align="right">
                                {dateFormat(row.createAt)}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
            {!products.items ? (
              <Skeleton
                variant="rect"
                width={400}
                height={50}
                style={{ marginLeft: "auto", marginTop: "10px" }}
              />
            ) : (
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={products.items.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            )}
          </Container>
        </main>
      </div>
    </React.Fragment>
  );
}
