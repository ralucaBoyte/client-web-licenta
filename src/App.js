import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Routes from "./components/routing/Routes";
import { ToastContainer } from "react-toastify";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./store/auth/authActions";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";


const App = () => {
  /*useEffect(() => {
    store.dispatch(loadUser());
  }, []);*/

  return (
    <Provider store={store} class='principalProvider'>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
          <ToastContainer />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
