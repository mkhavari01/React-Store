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
                    <Route path="/dashboard" exact>
                        <AdminHeader>
                            <h1>main part of website will be here</h1>
                        </AdminHeader>
                    </Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

export {AppRoute}