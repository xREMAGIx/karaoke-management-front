import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CustomDrawer from "../components/CustomDrawer";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { userActions } from "../actions";

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

export default function UserAdd(props) {
  const classes = useStyles();
  //const user = useSelector(state => state.authentication.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    //salary: 0,
  });

  const { username, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    dispatch(userActions.add(formData));
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
              Add new User
            </Typography>
            <TextField
              fullWidth
              style={{ marginTop: "10px" }}
              label="User name"
              id="outlined-name"
              variant="outlined"
              name="username"
              value={username}
              onChange={(e) => onChange(e)}
              onKeyPress={(e) => keyPressed(e)}
            />
            <TextField
              fullWidth
              style={{ marginTop: "10px" }}
              label="User email"
              id="outlined-email"
              variant="outlined"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              onKeyPress={(e) => keyPressed(e)}
            />
            <TextField
              fullWidth
              style={{ marginTop: "10px" }}
              label="Password"
              id="outlined-password"
              variant="outlined"
              type="password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              onKeyPress={(e) => keyPressed(e)}
            />
            {/* <TextField
              fullWidth
              style={{ marginTop: "10px" }}
              label="Salary"
              id="outlined-name"
              variant="outlined"
              name="salary"
              value={salary}
              onChange={(e) => onChange(e)}
              onKeyPress={(e) => keyPressed(e)}
            /> */}
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
                <Button component={Link} to="/users" variant="contained">
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
