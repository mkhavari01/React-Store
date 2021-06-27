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
    }
    render(){
        const renderSidebar = this.state.sideBar.map((el) => {
            return <>
                    <ul className='mt-4'> 
                        {el.name}
                    </ul>
                    {el.subNames.map((subnames)=>{
                        return <li> {subnames} </li>
                    })}
                    </>
        });
        return(
            <>
            <SiteHeader />
            <div className={styled.sideBar}>
                {renderSidebar}
            </div>
            </>
        )
    }
}

export {SiteProducts}