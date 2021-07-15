import React from 'react'
import {SiteHeader} from '../../../layout/index'
import check from '../../../assets/check.svg'
import axios from 'axios'
class Success extends React.Component{
    state={
        cart : []
    }
    async componentDidMount(){
        const resetData = {
            id : 1,
            name: '',
            address: '',
            phone: '',
            deliverTime: '',
            orderTime: '' ,
            totalPrice: 0,
            deliverd: false,
            orderList: []
            }
        await axios.get('http://localhost:3000/person/1')
            .then((res)=>{
                const response = res.data
                response['id'] = new Date().getTime()
                this.setState({
                    cart : response
                })
                console.log('axios get ' , res.data)
            })
        
        await axios.post('http://localhost:3000/orders',this.state.cart)
            .then((res)=>{
                console.log('axios post ',res.data)
            })
        await axios.patch('http://localhost:3000/person/1',resetData)
            .then((res)=>{
                console.log('axios patch ',res.data)
            })
        setTimeout(() => {
            window.location.href = 'http://localhost:3001'
        }, 5000);
    }
    render(){
        return(
            <>
            <SiteHeader />
            <div className='container d-flex mt-5 align-items-center flex-row-reverse'>
                <img src={check} width='150px' />
                <h3 className='mr-3'>
                    پرداخت شما با موفقیت انجام شد منتظر تماس ما باشید
                </h3>
                <h1>بعد از ۵ ثانیه ازین صفحه منتقل میشوید</h1>
            </div>
            </>
        )
    }
}

export {Success}