import React from 'react'
import {ProductCard} from '../../../components/index'
import styled from './Homepage.module.css'
import axios from 'axios' 
import {Link} from 'react-router-dom'

class Home extends React.Component{
    state={
        p0 : [],
        p1 : [],
        p2 : []
    }
    componentDidMount(){
        const one = 'http://localhost:3000/products?leadGroup=کالاهای اساسی و خواربار'
        const two = 'http://localhost:3000/products?leadGroup=لبنیات'
        const three = 'http://localhost:3000/products?leadGroup=نوشیدنی'
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
            <Link to={`/siteProducts/کالاهای اساسی و خواربار/1`} style={{color:'black'}}>
              <h1 className={styled.h1}>کالاهای اساسی و خواربار</h1>
            </Link>
            <div className='container-fluid d-flex justify-content-around mt-1 flex-wrap'>
                { 
                p0.map(dairy => <Link to={`/product/${dairy.id}`} style={{color:'black'}}>
                <ProductCard 
                price={dairy.price+'هزار تومان'} 
                desc={dairy.name}
                picture={`http://localhost:3000${dairy.image}`}
                key={dairy.id}
                />
                </Link>)
                }
            </div>
            <Link to={`/siteProducts/لبنیات/1`} style={{color:'black'}}>
              <h1 className={styled.h1}>کالاهای گروه لبنیات</h1>
            </Link>
            <div className='container-fluid d-flex justify-content-around mt-1 flex-wrap'>
                { 
                p1.map(dairy => <Link to={`/product/${dairy.id}`} style={{color:'black'}} >
                <ProductCard 
                price={dairy.price+'هزار تومان'} 
                desc={dairy.name}
                picture={`http://localhost:3000${dairy.image}`}
                key={dairy.id}
                />
                </Link>)
                }
            </div>
            <Link to={`/siteProducts/نوشیدنی/1`} style={{color:'black'}}>
              <h1 className={styled.h1}>کالاهای گروه نوشیدنی</h1>
            </Link>
            <div className='container-fluid d-flex justify-content-around mt-1 flex-wrap'>
                { 
                p2.map(dairy => <Link to={`/product/${dairy.id}`} style={{color:'black'}} >
                <ProductCard 
                price={dairy.price+'هزار تومان'} 
                desc={dairy.name}
                picture={`http://localhost:3000${dairy.image}`}
                key={dairy.id}
                />
                </Link>)
                }
            </div>
            </>
        )
    }
}

export {Home}