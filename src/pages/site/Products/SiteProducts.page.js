import React from 'react'
import styled from './products.module.css';
import {SiteHeader} from '../../../layout/index'
import axios from 'axios';
import {ProductCard} from '../../../components/index'
import {Link} from 'react-router-dom'
class SiteProducts extends React.Component{
    constructor(props){
        super(props)

        this.state={
            sideBar : [],
            mainProducts :[]
        }

        this.linkHandler = this.linkHandler.bind(this)
    }
    
    componentDidMount(){
        let id = window.location.href.split('/')
        console.log(id.length)
        
        // console.log(id)
        axios.get('http://localhost:3000/sideBar')
         .then((res)=>{
             const sideBar = res.data
             this.setState({sideBar : sideBar})
         })
         if(id[id.length-1]!='1'){
            const subGroup = id[id.length-1]
            const leadGroup = id[id.length-2]
            console.log(subGroup,leadGroup)
            axios.get(`http://localhost:3000/products?leadGroup=${leadGroup}&subGroup=${subGroup}`)
            .then((res)=>{
             const mainProducts = res.data
             this.setState({
                mainProducts : mainProducts 
             })
         })
        }else{
            // const subGroup = id[id.length-1]
            const leadGroup = id[id.length-2]
            axios.get(`http://localhost:3000/products?leadGroup=${leadGroup}`)
            .then((res)=>{
             const mainProducts = res.data
             this.setState({
                mainProducts : mainProducts 
             })
         })
        }
    }
    linkHandler(){
        setTimeout(() => {
            window.location.reload()
        }, 1);
    }
    render(){
        const renderSidebar = this.state.sideBar.map((el) => {
            return <>
                    <ul className={styled.ul}> 
                        {el.name}
                    </ul>
                    {el.subNames.map((subnames)=>{
                        
                        return <li className={styled.li}> <Link to={`/siteProducts/${el.name}/${subnames}`} onClick={this.linkHandler}>{subnames}</Link> </li>
                    })}
                    </>
        });
        // this.state.products.length = 6
        const renderProducts = this.state.mainProducts.map((el) => {
            
            return <>
                    <Link to={`/product/${el.id}`} style={{color:'black'}} >
                    {<ProductCard 
                        price={el.price+'هزار تومان'} 
                        desc={el.name}
                        picture={`http://localhost:3000${el.image}`}
                        key={el.id}
                    />}
                    </Link>
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