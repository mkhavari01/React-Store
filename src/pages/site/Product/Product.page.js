import React,{useEffect,useState} from 'react'
import styled from './product.module.css'
import pic from '../../../assets/food.svg'
import { Button } from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import axios from 'axios'
class Product extends React.Component {
    constructor(props){
        super(props)
        this.entityChanger = this.entityChanger.bind(this)
    }
        state={
            data : '',
            entity : ''
        }
        componentDidMount(){
            let id = window.location.href.split('/')
            id = id[id.length-1]
            axios.get(`http://localhost:3000/products/${id}`)
                .then((res)=>{
                    this.setState({
                        data : res.data,
                        entity : res.data.entity
                    })
                })
        }
        entityChanger(e){
            this.setState({
                entity : e.target.value
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
                    <form className={styled.form}>
                        <input type="number" id="quantity" name="quantity" min="1" max={this.state.entity} value={this.state.entity} onChange={this.entityChanger}/>
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

export {Product}