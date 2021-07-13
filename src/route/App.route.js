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
import {Product} from '../pages/site/Product/Product.page'
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
                    <Route path="/SiteProducts" exact>
                        <SiteProducts />
                    </Route>
                    <SiteHeader>
                        <Route path="/products/:id" exact children={<Product />} />
                    </SiteHeader>
                </Switch>
            </BrowserRouter>
        )
    }
}

export {AppRoute}