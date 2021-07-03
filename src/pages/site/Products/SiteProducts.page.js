import React from 'react'
import styled from './products.module.css';
import {SiteHeader} from '../../../layout/index'
import axios from 'axios';

class SiteProducts extends React.Component{
    state={
        sideBar : []
    }
    componentDidMount(){
        axios.get('http://localhost:3000/sideBar')
         .then((res)=>{
             const sideBar = res.data
             this.setState({sideBar : sideBar})
         })
         axios.get('http://localhost:3000/products')
         .then((res)=>{
             const products = res.data
             this.setState({products : products})
         })
    }
    linkHandler(event){
        console.log(event.target.textContent)
    }
    render(){
        const renderSidebar = this.state.sideBar.map((el) => {
            return <>
                    <ul className='mt-4'> 
                        {el.name}
                    </ul>
                    {el.subNames.map((subnames)=>{
                        return <li> <a onClick={this.linkHandler} href='#'> {subnames} </a> </li>
                    })}
                    </>
        });
        return(
            <>
            <SiteHeader />
            <div className={styled.sideBar}>
                {renderSidebar}
            </div>
            <div className={styled.products}>
                main part
            </div>
            </>
        )
    }
}

export {SiteProducts}