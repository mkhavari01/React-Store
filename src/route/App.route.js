import { Component } from "react";
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
// import pages in here =>
import {SiteHeader,AdminHeader} from '../layout/index'
import {LoginForm} from '../pages/AdminPanel/LoginForm/LoginForm.page'
import {Products} from '../pages/AdminPanel/Products/Products.page'
import {Pricing} from '../pages/AdminPanel/Pricing/Pricing.page'
import {Orders} from '../pages/AdminPanel/Orders/Orders.page'
//
class AppRoute extends Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact>
                        <SiteHeader>
                            <h1>main part of website will be here</h1>
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
                </Switch>
            </BrowserRouter>
        )
    }
}

export {AppRoute}