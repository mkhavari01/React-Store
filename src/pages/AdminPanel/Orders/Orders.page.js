import React from 'react'
import { Table,Pagination } from 'react-bootstrap';
import styled from './orders.page.module.css'
import axios from 'axios' 
import {OrdersModal} from '../../../components/modals/OrdersModal'
class Orders extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        products : [],
        user : '',
        currentPage: 1,
        productsPerPage: 5,
      };
      this.handleClick = this.handleClick.bind(this);
      this.handleClickPrev = this.handleClickPrev.bind(this);
      this.handleClickNext = this.handleClickNext.bind(this);
      this.radioHandler = this.radioHandler.bind(this);
      this.modalHandler = this.modalHandler.bind(this);
    }
    componentDidMount(){
        axios.get('http://localhost:3000/orders')
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
    radioHandler(e){
      if(e.target.value=="notDelivered"){
        axios.get('http://localhost:3000/orders?deliverd=false')
         .then((res)=>{
             const products = res.data
             this.setState({products : products})
         })
      }else{
        axios.get('http://localhost:3000/orders?deliverd=true')
         .then((res)=>{
             const products = res.data
             this.setState({products : products})
         })
      }
    }
    modalHandler= (e)=>{
      this.setState({
        user : e.target.parentElement.parentElement.lastChild.textContent
      })
      // console.log(this.state.user)
    }
    render() {
      const { products, currentPage, productsPerPage } = this.state;

      // Logic for displaying current products
      const indexOfLastproduct = currentPage * productsPerPage;
      const indexOfFirstproduct = indexOfLastproduct - productsPerPage;
      const currentproducts = products.slice(indexOfFirstproduct, indexOfLastproduct);

      const renderproducts = currentproducts.map((product) => {
        return <tr>
                <td><OrdersModal dataParentToChild = {this.state.user} modalHandler={this.modalHandler}/></td>
                <td>1400/4/{product.id}</td>
                <td>
                  {product.totalPrice}
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
        <Pagination.Item key={number} id={number} onClick={this.handleClick} active={currentPage==number ?'true' : ''} >
            {number}
        </Pagination.Item>
        );
      });

      return (
        <div className='mt-4 container'>
            <div className={styled.pageDetail}>
                <h2>مدیریت سفارش ها</h2>
                <form>
                    <input type="radio" id="html" name="fav_language" value="notDelivered" onClick={this.radioHandler} />
                    <label for="html" className='mr-5'>سفارش های در انتظار ارسال</label>
                    <input type="radio" id="html" name="fav_language" value="delivered" onClick={this.radioHandler} />
                    <label for="html">سفارش های تحویل شده</label>
                </form>
            </div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th></th>
                    <th>زمان ثبت سقارش</th>
                    <th>مجموع مبلغ</th>
                    <th>نام کاربر</th>
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
export {Orders}