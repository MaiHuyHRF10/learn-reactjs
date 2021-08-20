import { Link, NavLink, Redirect, Route, Switch } from "react-router-dom";
import TodoFeature from "./features/Todo/pages";
import AlbumFeature from "./features/Album/pages";
import NotFound from "./components/NotFound";
import { useEffect } from "react";
import productApi from "./api/productApi";
import CounterFeature from "./features/Counter";

function App() {
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const productList = await productApi.getAll();
  //   };

  //   fetchProducts();
  // }, []);

  return (
    <div className="App">
      Header
      <p>
        <Link to="/todos">TodoList</Link>
      </p>
      <p>
        <NavLink to="/album" activeClassName="now">
          Album
        </NavLink>
      </p>
      <Switch>
        <Redirect from="/home" to="/" exact></Redirect>
        <Redirect from="/post-list/:postId" to="/posts/:postId" exact></Redirect>
        <Route path="/" component={CounterFeature} exact />
        <Route path="/todos" component={TodoFeature} exact />
        <Route path="/album" component={AlbumFeature} exact />
        <Route component={NotFound} />;
      </Switch>
    </div>
  );
}

export default App;
