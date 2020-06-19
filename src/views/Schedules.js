import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CustomDrawer from "../components/CustomDrawer";
import { useDispatch, useSelector } from "react-redux";
import { scheduleActions, userActions } from "../actions";
import { history } from "../store";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Skeleton from "@material-ui/lab/Skeleton";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AlertTitle from "@material-ui/lab/AlertTitle";

import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

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
  linearLoading: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
    height: 10,
  },
  tableRow: {
    "& .MuiTableCell-root": {
      padding: 0,
    },
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.focus,
    },
  },
  chipRoot: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  menuItem: {
    ".MuiSelect-root": {
      maxHeight: "100px",
    },
  },
}));

const weekDay = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const SelectProps = {
  MenuProps: {
    PaperProps: {
      style: {
        maxHeight: "30vh",
      },
    },
  },
};

export default function Schedules(props) {
  const classes = useStyles();

  const [openAlert, setOpenAlert] = React.useState(false);
  const [openAlertMessage, setOpenAlertMessage] = React.useState("");

  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const schedules = useSelector((state) => state.schedules);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getAllNonPagination());
    dispatch(scheduleActions.getAllNonPagination());
  }, [dispatch]);

  useEffect(() => {
    switch (history.location.state) {
      case 201:
        setOpenAlert(true);
        setOpenAlertMessage("Add successful!");
        break;
      case 202:
        setOpenAlert(true);
        setOpenAlertMessage("Update successful!");
        break;
      case 203:
        setOpenAlert(true);
        setOpenAlertMessage("Delete successful!");
        break;
      default:
        break;
    }
  }, [schedules.items]);

  useEffect(() => {
    if (schedules.error && typeof schedules.error === "string") {
      setErrorOpen(true);
      setErrorMessage(schedules.error);
    }
  }, [schedules.error]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleSelect = (e, dayOfWeek, workingTime) => {
    dispatch(
      scheduleActions.add({
        staff: e.target.value,
        weekDay: dayOfWeek,
        workingTime: workingTime,
      })
    );
  };

  const handleDelete = (chipToDelete) => () => {
    dispatch(scheduleActions.delete([chipToDelete.id]));
  };

  useEffect(() => {
    console.log(users.user && users.user.is_staff);
  }, [users.user]);

  return (
    <React.Fragment>
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {openAlertMessage}
        </Alert>
      </Snackbar>

      <div className={classes.root}>
        <CustomDrawer light={props.light} onToggleTheme={props.toggleTheme} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="xl" className={classes.mainContainer}>
            {/* Error warning */}
            <Collapse className={classes.alertContainer} in={errorOpen}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setErrorOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                <AlertTitle>Error</AlertTitle>
                {errorMessage}
              </Alert>
            </Collapse>
            {schedules.items && users.items ? (
              <React.Fragment>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Shift</TableCell>
                        <TableCell>Monday</TableCell>
                        <TableCell>Tuesday</TableCell>
                        <TableCell>Wednesday</TableCell>
                        <TableCell>Thursday</TableCell>
                        <TableCell>Friday</TableCell>
                        <TableCell>Saturday</TableCell>
                        <TableCell>Sunday</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Morning
                        </TableCell>
                        {weekDay.map((dayOfWeek, index) => (
                          <TableCell key={index} align="right">
                            <Paper
                              component="ul"
                              className={classes.chipRoot}
                              elevation={0}
                            >
                              {schedules.items
                                .filter(
                                  (schedule) =>
                                    schedule.weekDay === dayOfWeek &&
                                    schedule.workingTime === "morning"
                                )
                                .map((data, index) => {
                                  return (
                                    <li key={index}>
                                      <Chip
                                        label={
                                          (
                                            users.items.find(
                                              (x) => x.id === data.staff
                                            ) || {}
                                          ).username || null
                                        }
                                        onDelete={handleDelete(data)}
                                        className={classes.chip}
                                        disabled={
                                          users.user && !users.user.is_staff
                                        }
                                      />
                                    </li>
                                  );
                                })}
                              <TextField
                                select
                                value={""}
                                disabled={users.user && !users.user.is_staff}
                                onChange={(e) =>
                                  handleSelect(e, dayOfWeek, "morning")
                                }
                                SelectProps={SelectProps}
                              >
                                {users.items.map((option) => (
                                  <MenuItem key={option.id} value={option.id}>
                                    {option.username}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Paper>
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Afternoon
                        </TableCell>
                        {weekDay.map((dayOfWeek, index) => (
                          <TableCell key={index} align="right">
                            <Paper
                              component="ul"
                              className={classes.chipRoot}
                              elevation={0}
                            >
                              {schedules.items
                                .filter(
                                  (schedule) =>
                                    schedule.weekDay === dayOfWeek &&
                                    schedule.workingTime === "afternoon"
                                )
                                .map((data, index) => {
                                  return (
                                    <li key={index}>
                                      <Chip
                                        label={
                                          (
                                            users.items.find(
                                              (x) => x.id === data.staff
                                            ) || {}
                                          ).username || null
                                        }
                                        onDelete={handleDelete(data)}
                                        className={classes.chip}
                                        disabled={
                                          users.user && !users.user.is_staff
                                        }
                                      />
                                    </li>
                                  );
                                })}{" "}
                              <TextField
                                select
                                value={""}
                                disabled={users.user && !users.user.is_staff}
                                onChange={(e) =>
                                  handleSelect(e, dayOfWeek, "afternoon")
                                }
                                SelectProps={SelectProps}
                              >
                                {users.items.map((option) => (
                                  <MenuItem key={option.id} value={option.id}>
                                    {option.username}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Paper>
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Evening
                        </TableCell>
                        {weekDay.map((dayOfWeek, index) => (
                          <TableCell key={index} align="right">
                            <Paper
                              component="ul"
                              className={classes.chipRoot}
                              elevation={0}
                            >
                              {schedules.items
                                .filter(
                                  (schedule) =>
                                    schedule.weekDay === dayOfWeek &&
                                    schedule.workingTime === "evening"
                                )
                                .map((data, index) => {
                                  return (
                                    <li key={index}>
                                      <Chip
                                        label={
                                          (
                                            users.items.find(
                                              (x) => x.id === data.staff
                                            ) || {}
                                          ).username || null
                                        }
                                        onDelete={handleDelete(data)}
                                        className={classes.chip}
                                        disabled={
                                          users.user && !users.user.is_staff
                                        }
                                      />
                                    </li>
                                  );
                                })}
                              <TextField
                                select
                                value={""}
                                disabled={users.user && !users.user.is_staff}
                                onChange={(e) =>
                                  handleSelect(e, dayOfWeek, "evening")
                                }
                                SelectProps={SelectProps}
                              >
                                {users.items.map((option) => (
                                  <MenuItem key={option.id} value={option.id}>
                                    {option.username}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Paper>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </React.Fragment>
            ) : (
              <Skeleton variant="rect" width={"100vw"} height={500} />
            )}
          </Container>
        </main>
      </div>
    </React.Fragment>
  );
}
