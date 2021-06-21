import { Component } from "react";
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
// import pages in here =>
import {SiteHeader} from '../layout/index'
import {LoginForm} from '../pages/AdminPanel/LoginForm/LoginForm.page'
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
                    <Route path="/AdminPanel" exact>
                        <LoginForm />
                    </Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

export {AppRoute}