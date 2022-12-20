import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import List from "./Components/LIst";
import Homepage from "./Components/Homepage";
import Navbar from "./Components/navbar";
import Blogs from "./Components/Blogs";
import { selectSignedIn } from "./features/userSlice";
import "../src/styling/app.css";

const App = () => {
  const isSignedIn = useSelector(selectSignedIn);
  return (
    <Router>
      <Switch>
        <div className="App">
          <Navbar />
          <Homepage />
          {isSignedIn && <Route exact path="/" component={Blogs}></Route>}
          {isSignedIn && <Route path="/blogs" component={Blogs}></Route>}

          {isSignedIn && <Route path="/view/:id" component={List}></Route>}
        </div>
      </Switch>
    </Router>
  );
};

export default App;
