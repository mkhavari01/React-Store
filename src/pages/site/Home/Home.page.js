import React from 'react'
import {ProductCard} from '../../../components/index'
import styled from './Home.page.module.css'
import axios from 'axios' 


// class Home extends React.Component{
//     state={
//         dairy : []
//     }
    // componentDidMount(){
    //     axios.get('http://localhost:3000/products')
    //      .then((res)=>{
    //          const dairy = res.data
    //          this.setState({dairy : dairy})
    //      })
    // }
//     render(){
//         return(
//             <>
//             <h1 className={styled.h1}>کالاهای گروه لبنیات</h1>
//             <div className='container-fluid d-flex justify-content-around mt-1 flex-wrap'>
//                 {/* <ProductCard /> */}
//                 { 
                // this.state.dairy.map(dairy => <ProductCard 
                // price={dairy.price} 
                // desc={dairy.createdAt}
                // picture={dairy.avatar}
                // key={dairy.id}
                // />)
//                 }
//             </div>
                
//             </>
//         )
//     }
// }


class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        products : [],
        currentPage: 1,
        productsPerPage: 9
      };
      this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount(){
        axios.get('http://localhost:3000/products')
         .then((res)=>{
             const products = res.data
             this.setState({products : products})
         })
    }
    handleClick(event) {
      this.setState({
        currentPage: Number(event.target.id)
      });
    }

    render() {
      const { products, currentPage, productsPerPage } = this.state;

      // Logic for displaying current products
      const indexOfLastTodo = currentPage * productsPerPage;
      const indexOfFirstTodo = indexOfLastTodo - productsPerPage;
      const currentproducts = products.slice(indexOfFirstTodo, indexOfLastTodo);

      const renderproducts = currentproducts.map((todo) => {
        return <ProductCard 
        price={todo.id} 
        desc={todo.createdAt}
        picture={todo.avatar}
        key={todo.id}
        />;
      });

      // Logic for displaying page numbers
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
        pageNumbers.push(i);
      }

      const renderPageNumbers = pageNumbers.map(number => {
        return (
          <li
            key={number}
            id={number}
            onClick={this.handleClick}
          >
            {number}
          </li>
        );
      });

      return (
        <div className='mt-4'>
          <div className='container-fluid d-flex justify-content-around mt-1 flex-wrap'>
            {renderproducts}
          </div>
          <ul id={styled.pageNumbers}>
            {renderPageNumbers}
          </ul>
        </div>
      );
    }
  }
export {Home}