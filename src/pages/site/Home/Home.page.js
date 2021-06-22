import React from 'react'
import {ProductCard} from '../../../components/index'
import styled from './Home.page.module.css'
class Home extends React.Component{
    render(){
        return(
            <>
            <h1 className={styled.h1}>کالاهای گروه فست فود</h1>
            <div className='container-fluid d-flex justify-content-around mt-1 flex-wrap'>
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
                
            </>
        )
    }
}

export {Home}