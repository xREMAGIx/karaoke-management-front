import React, { useEffect } from "react";
import "./App.css";
import PropTypes from "prop-types";
import { Router, Route, Switch } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Register from "./views/Register";
import { history } from "./store";
import AdminRoute from "./components/AdminRoute";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "./actions";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getMe());
  }, [dispatch]);

  const user = useSelector((state) => state.users);

  return (
    // <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/register" component={Register}></Route>
        <AdminRoute
          exact
          path="/"
          user={user}
          component={Dashboard}
        ></AdminRoute>
        <AdminRoute render={() => <h1>404: page not found</h1>} />
      </Switch>
    </Router>
    // </Provider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
