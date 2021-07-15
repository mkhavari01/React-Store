import React from 'react'
import { SiteHeader } from '../../../layout';
import {Table} from 'react-bootstrap';
import axios from 'axios';

class Cart extends React.Component{
    constructor(props){
        super(props)
        this.delete = this.delete.bind(this)
    }
    state={
        products : [],
        totalPrice : 0
    }
    componentDidMount(){
        axios.get('http://localhost:3000/person/1')
            .then((res)=>{
                console.log(res.data.orderList)
                this.setState({
                    totalPrice : res.data.totalPrice,
                    products : res.data.orderList
                })
            })
    }
    delete(e){
        const data = this.state.products
        const delId = e.target.id
        const newTotalPrice = this.state.totalPrice - e.target.parentElement.nextSibling.textContent
        for (let i = 0; i < data.length; i++) {
            if(data[i].id==delId){
                data.splice(i,1)
            }
        }
        axios.patch('http://localhost:3000/person/1',{orderList : data,totalPrice : newTotalPrice})
                .then((res)=>{
                    console.log(res)
                })
        window.location.reload()
    }
    render(){
        const renderproducts = this.state.products.map((product) => {
            return <tr key={product.id} >
                    <td>
                        <a href='#' onClick={this.delete} id={product.id}>حذف</a>
                    </td>
                    <td>{product.price}</td>
                    <td>
                      {product.entity}
                    </td>
                    <td>{product.name}</td>
                  </tr>
          });
        return(
        <>
            <SiteHeader />
            <div className='container mt-5 text-right'>
                <h3>سبد خرید</h3>
            <Table striped bordered hover className='mt-4'>
                <thead>
                <tr>
                    <th></th>
                    <th>قیمت</th>
                    <th>تعداد</th>
                    <th>کالا</th>
                </tr>
                </thead>
                <tbody>
                    {renderproducts}
                </tbody>
            </Table>
            <h3 className='mt-4'>جمع نهایی :  {this.state.totalPrice} هزار تومان</h3>
            </div>
        </>
        )
    }
}

export {Cart} ; 