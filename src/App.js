import { BrowserRouter, Switch, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./Pages/Home";
import EditUser from "./Pages/EditUser";
import Update from "./Pages/Update";
import AllPosts from "./Pages/AllPosts";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/EditUser/:id" exact component={EditUser} />
        <Route path="/user/:id/post" exact component={AllPosts} />
        <Route path="/Update/:id" exact component={Update} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
