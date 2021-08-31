import Header from "components/Header";
import ProductFeature from "features/Product";
import { Redirect, Route, Switch } from "react-router-dom";
import NotFound from "./components/NotFound";
import AlbumFeature from "./features/Album/pages";
import CounterFeature from "./features/Counter";
import TodoFeature from "./features/Todo/pages";

function App() {
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const productList = await productApi.getAll();
  //   };

  //   fetchProducts();
  // }, []);

  return (
    <div className="App">
      <Header />

      <Switch>
        <Redirect from="/home" to="/" exact></Redirect>
        <Redirect from="/post-list/:postId" to="/posts/:postId" exact></Redirect>
        <Route path="/" component={CounterFeature} exact />
        <Route path="/todos" component={TodoFeature} exact />
        <Route path="/album" component={AlbumFeature} exact />
        <Route path="/products" component={ProductFeature} />
        <Route component={NotFound} />;
      </Switch>
    </div>
  );
}

export default App;
