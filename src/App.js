import "./style.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Chat, Header, Footer, Wrapper } from "./components";
import { Home, Application, NotFound, Dashboard, Auth, Update } from "./pages";
const App = () => {
  return (
    <Router>
      <Wrapper>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/apply" exact component={Application} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route
            path="/dashboard/update-application"
            exact
            component={Update}
          />
          <Route path="/login" exact component={Auth} />
          <Route component={NotFound} />
        </Switch>
        {window.location.pathname === "/" && <Chat />}
        <Footer />
      </Wrapper>
    </Router>
  );
};

export default App;
