import React from 'react'
import {ProductCard} from '../../../components/index'
import styled from './Home.page.module.css'
import axios from 'axios' 


class Home extends React.Component{
    state={
        p0 : [],
        p1 : [],
        p2 : []
    }
    componentDidMount(){
        const one = 'http://localhost:3000/selectedleadGroup1'
        const two = 'http://localhost:3000/selectedleadGroup2'
        const three = 'http://localhost:3000/selectedleadGroup3'
        const requestOne = axios.get(one);
        const requestTwo = axios.get(two);
        const requestThree = axios.get(three);
        axios
          .all([requestOne, requestTwo, requestThree])
          .then(
            axios.spread((...responses) => {
              
              this.setState({
                p0 : responses[0].data,
                p1 : responses[1].data,
                p2 : responses[2].data
              })
              console.log(this.state)
            })
          ).catch((error)=>{
            console.log(error)
          })
    }
    render(){
      const {p0,p1,p2} = this.state
        return(
            <>
            <h1 className={styled.h1}>کالاهای گروه لبنیات</h1>
            <div className='container-fluid d-flex justify-content-around mt-1 flex-wrap'>
                { 
                p0.map(dairy => <ProductCard 
                price={dairy.price+'هزار تومان'} 
                desc={dairy.name}
                picture={dairy.avatar}
                key={dairy.id}
                />)
                }
            </div>
            <h1 className={styled.h1}>کالاهای گروه شوینده و بهداشتی</h1>
            <div className='container-fluid d-flex justify-content-around mt-1 flex-wrap'>
                { 
                p1.map(dairy => <ProductCard 
                price={dairy.price+'هزار تومان'} 
                desc={dairy.name}
                picture={dairy.avatar}
                key={dairy.id}
                />)
                }
            </div>
            <h1 className={styled.h1}>کالاهای گروه حبوبات</h1>
            <div className='container-fluid d-flex justify-content-around mt-1 flex-wrap'>
                { 
                p2.map(dairy => <ProductCard 
                price={dairy.price+'هزار تومان'} 
                desc={dairy.name}
                picture={dairy.avatar}
                key={dairy.id}
                />)
                }
            </div>
            </>
        )
    }
}

export {Home}