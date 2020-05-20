import React, { useEffect } from "react";
import "./App.css";
import PropTypes from "prop-types";
import { Router, Route, Switch } from "react-router-dom";
import { history } from "./store";
import AdminRoute from "./components/AdminRoute";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "./actions";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import darkTheme from "./store/darkTheme";
import theme from "./store/theme";
import setAuthToken from "./store/setAuthToken";

import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Register from "./views/Register";
import Users from "./views/Users";
import UsersAdd from "./views/UsersAdd";
import UsersEdit from "./views/UsersEdit";
import Schedules from "./views/Schedules";
import SchedulesAdd from "./views/SchedulesAdd";
import Rooms from "./views/Rooms";
import Products from "./views/Products";
import ProductsAdd from "./views/ProductsAdd";
import ProductEdit from "./views/ProductsEdit";
import Receipts from "./views/Receipts";
import ReceiptsAdd from "./views/ReceiptsAdd";
import ReceiptsEdit from "./views/ReceiptsEdit";

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}

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
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                path="/users-add"
                user={user}
                toggleTheme={toggleChecked}
                component={UsersAdd}
              ></AdminRoute>
              <AdminRoute
                exact
                path="/users-edit/:id"
                user={user}
                toggleTheme={toggleChecked}
                component={UsersEdit}
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
                path="/schedules-add"
                user={user}
                toggleTheme={toggleChecked}
                component={SchedulesAdd}
              ></AdminRoute>
              <Route
                exact
                path="/rooms"
                user={user}
                toggleTheme={toggleChecked}
                component={Rooms}
              ></Route>
              <AdminRoute
                exact
                path="/products"
                user={user}
                toggleTheme={toggleChecked}
                component={Products}
              ></AdminRoute>
              <AdminRoute
                exact
                path="/products-add"
                user={user}
                toggleTheme={toggleChecked}
                component={ProductsAdd}
              ></AdminRoute>
              <AdminRoute
                exact
                path="/products-edit/:id"
                user={user}
                toggleTheme={toggleChecked}
                component={ProductEdit}
              ></AdminRoute>
              <AdminRoute
                exact
                path="/receipts"
                user={user}
                toggleTheme={toggleChecked}
                component={Receipts}
              ></AdminRoute>
              <AdminRoute
                exact
                path="/receipts-add"
                user={user}
                toggleTheme={toggleChecked}
                component={ReceiptsAdd}
              ></AdminRoute>
              <AdminRoute
                exact
                path="/receipts-edit/:id"
                user={user}
                toggleTheme={toggleChecked}
                component={ReceiptsEdit}
              ></AdminRoute>
              <AdminRoute render={() => <h1>404: page not found</h1>} />
            </Switch>
          </Router>
        </React.Fragment>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
