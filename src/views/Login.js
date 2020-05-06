import React, { useEffect } from "react";
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
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../actions";
import { history } from "../store";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Snackbar from "@material-ui/core/Snackbar";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const [successOpen, setSuccessOpen] = React.useState(false);

  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const { email, password } = formData;

  useEffect(() => {
    if (history.location.state === 200) setSuccessOpen(true);
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessOpen(false);
  };
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const keyPressed = (e) => {
    if (e.key === "Enter") onSubmit(e);
  };

  const onSubmit = () => {
    if (email === "" || password === "") {
      setErrorOpen(true);
      setErrorMessage("Please fill out all required field");
    } else {
      dispatch(userActions.login(formData));
      if (!users.user && users.error) {
        setErrorOpen(true);
        setErrorMessage("Wrong email or password!");
      }
    }
  };

  return (
    <React.Fragment>
      <Snackbar
        open={successOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          Register successful!
        </Alert>
      </Snackbar>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onKeyPress={(e) => keyPressed(e)}
            onChange={(e) => onChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onKeyPress={(e) => keyPressed(e)}
            value={password}
            onChange={(e) => onChange(e)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => onSubmit()}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>
  );
}
