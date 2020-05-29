import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { userActions } from "../actions";
import { Redirect } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alertContainer: {
    margin: theme.spacing(2),
    width: "100%",
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const { username, email, password, confirmPassword } = formData;

  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const keyPressed = (e) => {
    if (e.key === "Enter") onSubmit(e);
  };

  const onSubmit = async () => {
    // perform all neccassary validations
    if ((username && email && password && confirmPassword) === "") {
      setOpen(true);
      setErrorMessage("Please fill all required field");
    } else if (password.length < 8) {
      setOpen(true);
      setErrorMessage("Password must have more than 8 characters");
    } else if (password !== confirmPassword) {
      setOpen(true);
      setErrorMessage("Password's not match");
    } else {
      dispatch(userActions.register(formData));
    }
  };

  useEffect(() => {
    if (users && users.error && typeof users.error === "string") {
      setOpen(true);
      setErrorMessage(users.error);
    }
  }, [users, users.error]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (users.isAuthenticated === true) {
      setIsAuthenticated(true);
    }
  }, [users]);

  if (isAuthenticated) {
    return <Redirect to="/"></Redirect>;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Collapse className={classes.alertContainer} in={open}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="username"
              label="Name"
              name="username"
              autoComplete="name"
              value={username}
              onKeyPress={(e) => keyPressed(e)}
              onChange={(e) => onChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onKeyPress={(e) => keyPressed(e)}
              onChange={(e) => onChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Password"
              name="password"
              type="password"
              id="password"
              value={password}
              onKeyPress={(e) => keyPressed(e)}
              onChange={(e) => onChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onKeyPress={(e) => keyPressed(e)}
              onChange={(e) => onChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => onSubmit()}
        >
          Sign Up
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="/" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
