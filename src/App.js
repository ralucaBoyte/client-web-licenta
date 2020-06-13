import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Routes from "./components/routing/Routes";

// Redux
import { Provider } from "react-redux";
import store from "./store";
//import { loadUser } from "./store/auth/authActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./components/auth/Login";


const App = () => {
  /*useEffect(() => {
    store.dispatch(loadUser());
  }, []);*/

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route component={Routes} />
          </Switch>
          <ToastContainer />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
