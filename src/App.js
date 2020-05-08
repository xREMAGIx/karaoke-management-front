import React, { useEffect } from "react";
import "./App.css";
import PropTypes from "prop-types";
import { Router, Route, Switch } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Register from "./views/Register";
import Users from "./views/Users";
import Schedules from "./views/Schedules";
import Rooms from "./views/Rooms";
import { history } from "./store";
import AdminRoute from "./components/AdminRoute";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "./actions";
import { ThemeProvider } from "@material-ui/core/styles";
import darkTheme from "./store/darkTheme";
import theme from "./store/theme";

const App = () => {
  const [checked, setChecked] = React.useState(false);

  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getMe());
  }, [dispatch]);

  const user = useSelector((state) => state.users);

  return (
    <ThemeProvider theme={checked ? theme : darkTheme}>
      <React.Fragment>
        <Router history={history}>
          <Switch>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
            <AdminRoute
              exact
              path="/"
              user={user}
              toggleTheme={toggleChecked}
              component={Dashboard}
            ></AdminRoute>
            <AdminRoute
              exact
              path="/users"
              user={user}
              toggleTheme={toggleChecked}
              component={Users}
            ></AdminRoute>
            <AdminRoute
              exact
              path="/schedules"
              user={user}
              toggleTheme={toggleChecked}
              component={Schedules}
            ></AdminRoute>
            <AdminRoute
              exact
              path="/rooms"
              user={user}
              toggleTheme={toggleChecked}
              component={Rooms}
            ></AdminRoute>
            <AdminRoute render={() => <h1>404: page not found</h1>} />
          </Switch>
        </Router>
      </React.Fragment>
    </ThemeProvider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
