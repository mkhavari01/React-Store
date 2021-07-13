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
        editing : false,
        elements : []
      };
      this.handleClick = this.handleClick.bind(this);
      this.handleClickPrev = this.handleClickPrev.bind(this);
      this.handleClickNext = this.handleClickNext.bind(this);
      this.editHandler = this.editHandler.bind(this);
      this.saveBtn = this.saveBtn.bind(this);
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
    editHandler(e){
      // parents.push(e.target.parentElement)
      // console.log(parents)
      if(e.target.parentElement.id==''){
      }else{
        e.target.innerHTML = `<input type='number' value=${e.target.textContent} min=0 ></input>`
        this.setState({
          elements : [...this.state.elements,e.target.parentElement]
        })
      }
    }
    saveBtn(){
      const inputs = this.removeDuplicateValues(this.state.elements)
      inputs.map((el)=>{
        const data = {}
        const childrenTr = el.children
        const inputOrTr0 = childrenTr[0].children[0]
        const inputOrTr1 = childrenTr[1].children[0]
        if(inputOrTr0==undefined){
          data['price'] = childrenTr[0].textContent
        }else{
          data['price'] = inputOrTr0.value
        }
        if(inputOrTr1==undefined){
          data['entity'] = childrenTr[1].textContent
        }else{
          data['entity'] = inputOrTr1.value
        }
        // console.log(el.id)
        // here make a patch method
        axios.patch(`http://localhost:3000/products/${el.id}`,data)
          .then((res)=>{
            console.log(res)
          })
      })
      window.location.reload()
    }
    removeDuplicateValues(array){
      const filtredArray = [];
      for(let i=0; i < array.length; i++){
        if(filtredArray.indexOf(array[i]) === -1) {
            filtredArray.push(array[i]);
        }
      }
      return filtredArray
    }
    render() {
      const { products, currentPage, productsPerPage } = this.state;
      // Logic for displaying current products
      const indexOfLastproduct = currentPage * productsPerPage;
      const indexOfFirstproduct = indexOfLastproduct - productsPerPage;
      const currentproducts = products.slice(indexOfFirstproduct, indexOfLastproduct);

      const renderproducts = currentproducts.map((product) => {
        return <tr id={product.id} >
                <td onClick={this.editHandler} >{product.price}</td>
                <td onClick={this.editHandler} >
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