import React from 'react'
import { Table,Pagination, Button } from 'react-bootstrap';
import styled from './products.page.module.css'
import axios from 'axios' 
import {ProductModal} from '../../../components/modals/ProductsModal'
class Products extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        products : [],
        product : '',
        currentPage: 1,
        productsPerPage: 5,
      };
      this.handleClick = this.handleClick.bind(this);
      this.handleClickPrev = this.handleClickPrev.bind(this);
      this.handleClickNext = this.handleClickNext.bind(this);
      this.modalHandler = this.modalHandler.bind(this);
    }
    componentDidMount(){
        axios.get('http://localhost:3000/products')
         .then((res)=>{
             const products = res.data.reverse()
             this.setState({products : products})
         })
    }
    // handling paging buttons clicks
    // later set the total page in backend to set the prev and next btn logic when it comes to an end
    handleClick(event) {
      this.setState({
        currentPage: Number(event.target.id)
      });
    }
    handleClickPrev() {
        this.setState({currentPage: this.state.currentPage - 1})
    }
    handleClickNext() {
        this.setState({currentPage: this.state.currentPage + 1})
    }
    modalHandler(e){
      this.setState({
        user : e.target.parentElement.parentElement.id
      })
      console.log(e.target.parentElement.parentElement.id)
    }
    render() {
      const { products, currentPage, productsPerPage } = this.state;

      // Logic for displaying current products
      const indexOfLastTodo = currentPage * productsPerPage;
      const indexOfFirstTodo = indexOfLastTodo - productsPerPage;
      const currentproducts = products.slice(indexOfFirstTodo, indexOfLastTodo);

      const renderproducts = currentproducts.map((todo) => {
        return <tr id={todo.id}>
                <td>
                <ProductModal data={this.state.user} modalHandler={this.modalHandler}>ویرایش</ProductModal> {' '}
                  <a href='#'>حذف</a>
                </td>
                <td>{todo.subGroup} / {todo.leadGroup}</td>
                <td>{todo.name}</td>
                <td>
                  <img width='50px' height='50px' src={`http://localhost:3000${todo.image}`} />
                </td>
              </tr>
      });

      // Logic for displaying page numbers
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
        pageNumbers.push(i);
      }

      const renderPageNumbers = pageNumbers.map(number => {
        return (
        <Pagination.Item key={number} id={number} onClick={this.handleClick} active={this.state.currentPage==number ?'true' : ''} >
            {number}
        </Pagination.Item>
        );
      });

      return (
        <div className='mt-4 container'>
            <div className={styled.pageDetail}>
                <h2>مدیریت کالاها</h2>
                <ProductModal modalHandler={()=>{}} color={{backgroundColor: '#28a745',color:'#fff',padding:'4px',borderRadius:'3px'}} >افزودن کالا</ProductModal>
            </div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>
                    </th>
                    <th>دسته بندی</th>
                    <th>نام کالا</th>
                    <th>تصویر</th>
                </tr>
                </thead>
                <tbody>
                {renderproducts}
                </tbody>
            </Table>
            <Pagination style={{justifyContent:'center'}}>
                <Pagination.Prev onClick={this.handleClickPrev}/>
                {renderPageNumbers}
                <Pagination.Next onClick={this.handleClickNext} id={this.state.currentPage}/>
            </Pagination>
        </div>
      );
    }
  }
export {Products}