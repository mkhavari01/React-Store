import React from 'react'
import styled from './products.module.css';
import {SiteHeader} from '../../../layout/index'
import axios from 'axios';
import {ProductCard} from '../../../components/index'
class SiteProducts extends React.Component{
    constructor(props){
        super(props)

        this.state={
            sideBar : [],
            mainProducts :[],
            filteredProducts : []
        }

        this.linkHandler = this.linkHandler.bind(this)
    }
    
    componentDidMount(){
        axios.get('http://localhost:3000/sideBar')
         .then((res)=>{
             const sideBar = res.data
             this.setState({sideBar : sideBar})
         })
         axios.get('http://localhost:3000/products')
         .then((res)=>{
             const mainProducts = res.data
             this.setState({
                mainProducts : mainProducts ,
                filteredProducts : mainProducts
             })
         })
    }
    linkHandler(event){
        const filteredProducts = this.state.mainProducts.filter(f => f.subGroup==event.target.textContent)
        // console.log(t)
        // let bigCities = cities.filter(city => city.population > 3000000);
        this.setState({
            filteredProducts : filteredProducts
        })
        // setTimeout(() => {
        //     console.log(this.state.filteredProducts)
        // }, 2000);
    }
    render(){
        const renderSidebar = this.state.sideBar.map((el) => {
            return <>
                    <ul className='mt-4'> 
                        {el.name}
                    </ul>
                    {el.subNames.map((subnames)=>{
                        return <li> <a onClick={this.linkHandler} href={"#"+subnames}>{subnames}</a> </li>
                    })}
                    </>
        });
        // this.state.products.length = 6
        const renderProducts = this.state.filteredProducts.map((el) => {
            return <>
                    {<ProductCard 
                        price={el.price+'هزار تومان'} 
                        desc={el.name}
                        picture={el.avatar}
                        key={el.id}
                    />}
                    </>
        });
        return(
            <>
            <SiteHeader />
            <section className={styled.sideBar}>
                {renderSidebar}
            </section>
            <section className={styled.products}>
                {renderProducts}
            </section>
            </>
        )
    }
}

export {SiteProducts}