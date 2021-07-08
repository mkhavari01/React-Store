import React from 'react'
import { Table,Pagination, Button } from 'react-bootstrap';
import styled from './pricing.page.module.css'
import axios from 'axios' 

class Pricing extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        products : [],
        currentPage: 1,
        productsPerPage: 5,
        editing : false
      };
      this.handleClick = this.handleClick.bind(this);
      this.handleClickPrev = this.handleClickPrev.bind(this);
      this.handleClickNext = this.handleClickNext.bind(this);
      this.editHandler = this.editHandler.bind(this);
    }
    componentDidMount(){
        axios.get('http://localhost:3000/products')
         .then((res)=>{
             const products = res.data
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
    editHandler(e){
      console.log(e.target.id)
      console.log(this.state)
      const element = e.target
      const val = element.textContent 
      element.innerHTML = `<input type='number' value=${val} min=0 ></input>`
    }
    saveBtn(){
      const ff = document.querySelectorAll('input')
      console.log(ff)
      ff.forEach((el)=>{
        el.remove()
      })
    }
    render() {
      const { products, currentPage, productsPerPage } = this.state;

      // Logic for displaying current products
      const indexOfLastproduct = currentPage * productsPerPage;
      const indexOfFirstproduct = indexOfLastproduct - productsPerPage;
      const currentproducts = products.slice(indexOfFirstproduct, indexOfLastproduct);

      const renderproducts = currentproducts.map((product) => {
        return <tr>
                <td onClick={this.editHandler} id={product.id}>{product.price}</td>
                <td onClick={this.editHandler} id={product.id}>
                  {product.entity}
                </td>
                <td>{product.name}</td>
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
                <h2>مدیریت موجودی و قیمت ها</h2>
                <Button variant="light" onClick={this.saveBtn} > ذخیره</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>قیمت</th>
                    <th>موجودی</th>
                    <th>کالا</th>
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
export {Pricing}