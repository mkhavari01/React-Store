import React,{useEffect,useState} from 'react'
import styled from './product.module.css'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { connect } from 'react-redux'
class Product extends React.Component {
    constructor(props){
        super(props)
        this.entityChanger = this.entityChanger.bind(this)
        this.addProduct = this.addProduct.bind(this)
    }
        state={
            numberToBuy : 0,
            data : '',
            entity : '',
            orderList : [{}]
        }
        componentDidMount(){
            let id = window.location.href.split('/')
            id = id[id.length-1]
            axios.get(`http://localhost:3000/products/${id}`)
                .then((res)=>{
                    this.setState({
                        data : res.data,
                        entity : res.data.entity,
                    })
                })
            axios.get('http://localhost:3000/person/1')
                .then((res)=>{
                    this.setState({
                        orderList : res.data.orderList
                    })
                })
        }
        entityChanger(e){
            this.setState({
                numberToBuy : e.target.value
            })
        }
        addProduct(e){
            // e.preventDefault()
            const previousProduct = this.state.orderList
            let newProduct = this.state.data
            newProduct['entity'] = this.state.numberToBuy
            const dataToSend = [newProduct,...previousProduct]
            axios.patch('http://localhost:3000/person/1',{orderList : dataToSend})
                .then((res)=>{
                    console.log(res)
                })
        }
        render(){
            const {data} = this.state
        return(
            <>
            {/* {console.log(id)} */}
            <section className='container-fluid d-flex flex-row-reverse text-right mr-5 mt-5'>
                <div className='mx-5'>
                    <img src={`http://localhost:3000${data.image}`} width='250px' />
                </div>
                <div className={styled.detail}>
                    <h2 className='mt-3'>{data.name}</h2>
                    <h5 className='mt-3'>
                        <span>{data.leadGroup} </span> {">"}
                        <span>{data.subGroup}</span>
                    </h5>
                    <h3 className='mt-3' style={{direction:'rtl'}}>
                        {data.price} هزار تومان
                    </h3>
                    <form className={styled.form} onSubmit={this.addProduct} >
                        <input type="number" id="quantity" name="quantity" min="1" max={this.state.entity} value={this.state.numberToBuy} onChange={this.entityChanger}/>
                        <Button type='submit' varient='success'>افزودن به سبد خرید</Button>
                    </form>
                </div>
            </section>
            <div className='text-right container-fluid mt-5 pr-5 '>
                <span className='p-5'>
                {data.desc}                
                </span>
            </div>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIncreament : () => dispatch({ type : 'INCREAMENT'}),
    }
}
export default connect(null,mapDispatchToProps)(Product)