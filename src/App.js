import { Link, NavLink, Redirect, Route, Switch } from "react-router-dom";
import TodoFeature from "./features/Todo/pages";
import AlbumFeature from "./features/Album/pages";
import NotFound from "./components/NotFound";
import { useEffect } from "react";
import productApi from "./api/productApi";

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
        <Route path="/todos" component={TodoFeature} />
        <Route component={NotFound} />;
      </Switch>
      <Route path="/album" component={AlbumFeature} exact />
      Footer
    </div>
  );
}

export default App;
