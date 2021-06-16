import { Component } from "react";
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
// import pages in here =>

//
class AppRoute extends Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact>
                        <h1>hello</h1>
                    </Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

export {AppRoute}