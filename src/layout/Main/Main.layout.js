import { Component } from "react";

import { Header } from "./components/Header/Header.component";

class MainLayout extends Component{
    render(){
        return(
            <Header>
                {this.props.children}
            </Header>
        )
    }
}

export {MainLayout}