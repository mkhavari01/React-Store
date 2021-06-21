import React from 'react'

class AdminHeader extends React.Component{
    render(){
        return(
            <header>
                {this.props.children}
            </header>
        )
    }
}

export {AdminHeader}