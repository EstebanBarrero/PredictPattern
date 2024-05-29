import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PredictComponent from "./components/PredictComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const App = () => (
  <Router>
    <div className="container supercontainer">
      <div className="col-md-6">
        <PredictComponent />
      </div>
    </div>
  </Router>
);

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
