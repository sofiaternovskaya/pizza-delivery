import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { SWRConfig } from "swr";
import { useFetcher } from "./hooks/useFetcher";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { PublicRoute } from "./routes/PublicRoute";
import { Catalog } from "./pages/Catalog/Catalog";
import { CatalogItemPage } from "./pages/CatalogItemPage/CatalogItemPage";
import { Cart } from "./pages/Cart/Cart";
import { Login } from "./pages/Login/Login";
import { OrderPage } from "./pages/OrderPage/OrderPage";
import { User } from "./pages/User/User";
import { Navigation } from "./components/Navigation/Navigation";
import "./styles/variables.css";
import "./styles/base.css";

function App() {
  const fetcher = useFetcher();

  return (
    <div className="App">
      <CookiesProvider>
        <SWRConfig
          value={{
            fetcher,
          }}
        >
          <Router>
            <Navigation />
            <Switch>
              <Route path="/" component={Catalog} exact />
              <Route
                path="/product/:productId"
                component={CatalogItemPage}
                exact
              />
              <Route path="/cart" component={Cart} exact />
              <PublicRoute path="/login" component={Login} exact />
              <ProtectedRoute
                path="/order/:orderId"
                component={OrderPage}
                exact
              />
              <ProtectedRoute path="/user" component={User} exact />
            </Switch>
          </Router>
        </SWRConfig>
      </CookiesProvider>
    </div>
  );
}

export default App;
