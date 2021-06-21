import { Component } from "react";
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
// import pages in here =>
import {SiteHeader,AdminHeader} from '../layout/index'
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
                            <h1>Products</h1>
                        </AdminHeader>
                    </Route>
                    <Route path="/AdminPanel/pricing" exact>
                        <AdminHeader pricingClass='active'>
                            <h1>pricing</h1>
                        </AdminHeader>
                    </Route>
                    <Route path="/AdminPanel/orders" exact>
                        <AdminHeader ordersClass='active'>
                            <h1>orders</h1>
                        </AdminHeader>
                    </Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

export {AppRoute}