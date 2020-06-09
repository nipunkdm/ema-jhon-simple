import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
//import { createContext } from 'react';
import { AuthContexProvider, PrivateRoute } from './components/Login/useAuth';

//export const UserContext = createContext();

function App() {
  return (
    <div>
        <AuthContexProvider>
          <Header></Header>
          <Router>
            <Switch>
                <Route path="/shop">
                      <Shop></Shop>
                </Route>
                <Route path="/review">
                    <Review></Review>
                </Route>
                <Route path="/inventory">
                      <Inventory></Inventory>
                </Route>
                <Route exact path="/">
                        <Shop></Shop>
                </Route>
                <Route path="/product/:productkey">
                        <ProductDetail></ProductDetail>
                </Route>
                <Route path="/Login">
                        <Login></Login>
                </Route>
                <PrivateRoute path="/Shipment">
                       <Shipment></Shipment>
                </PrivateRoute>
                <Route path="*">
                      <NotFound></NotFound>
                </Route>
            </Switch>
          </Router>
        </AuthContexProvider>
    </div>
  );
}

export default App;
