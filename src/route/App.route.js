import { Component } from "react";
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
// import pages in here =>
import {SiteHeader,AdminHeader} from '../layout/index'
import {LoginForm} from '../pages/AdminPanel/LoginForm/LoginForm.page'
import {Products} from '../pages/AdminPanel/Products/Products.page'
import {Pricing} from '../pages/AdminPanel/Pricing/Pricing.page'
import {Orders} from '../pages/AdminPanel/Orders/Orders.page'
import {SiteProducts} from '../pages/site/Products/SiteProducts.page'
import {Home} from '../pages/site/Home/Home.page'
import Product from '../pages/site/Product/Product.page'
import {Cart} from '../pages/site/Cart/Cart.page'
import {ShoppingForm} from '../pages/site/ShoppingForm/Shopping.page'
import { Fail } from "../pages/site/payment/Fail";
import { Success } from "../pages/site/payment/Success";
//
class AppRoute extends Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact>
                        <SiteHeader>
                            <Home />
                        </SiteHeader>
                    </Route>
                    <Route path="/AdminPanel/products" exact>
                        <AdminHeader productsClass='active'>
                            <Products />
                        </AdminHeader>
                    </Route>
                    <Route path="/AdminPanel/pricing" exact>
                        <AdminHeader pricingClass='active'>
                            <Pricing />
                        </AdminHeader>
                    </Route>
                    <Route path="/AdminPanel/orders" exact>
                        <AdminHeader ordersClass='active'>
                            <Orders />
                        </AdminHeader>
                    </Route>
                    <Route path="/AdminPanel" exact>
                        <LoginForm />
                    </Route>
                    <Route path="/SiteProducts/:leadGroup/:subGroup" exact>
                        <SiteProducts />
                    </Route>
                    <Route path="/shoppingForm" exact >
                        <ShoppingForm />
                    </Route>
                    <Route path="/cart" exact >
                        <Cart />
                    </Route>
                    <Route path="/payment/success" exact >
                        <Success />
                    </Route>
                    <Route path="/payment/fail" exact >
                        <Fail />
                    </Route>
                    <SiteHeader>
                    <Route path="/product/:id" exact children={<Product />} />
                    </SiteHeader>
                </Switch>
            </BrowserRouter>
        )
    }
}

export {AppRoute}