import React from 'react'
import {SiteHeader} from '../../../layout/index'
import {Form,Button} from 'react-bootstrap';
import axios from 'axios';

class ShoppingForm extends React.Component{
    async submitHandler(e){
        e.preventDefault()
        const datas = ['name','phone','deliverTime','address']
        const dataToPatch = {}
        for(let i = 0;i<datas.length;i++){
            dataToPatch[datas[i]] = e.target.children[i].children[1].value
        }
        console.log(dataToPatch)
        await axios.patch('http://localhost:3000/person/1',dataToPatch)
            .then((res)=>{
                console.log(res.data)
            })
        window.location.href='http://127.0.0.1:5501/payment.html'
    }
    render(){
        return(
            <>
                <SiteHeader />
                <Form className='container text-right mt-3' style={{direction:'rtl'}} onSubmit={this.submitHandler}>
                    <Form.Group className="mb-3" controlId="firstName">
                        <Form.Label>نام</Form.Label>
                        <Form.Control type="input"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="phoneNumebr">
                        <Form.Label>تلفن همراه</Form.Label>
                        <Form.Control type='input'/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="phoneNumebr">
                        <Form.Label>تاریخ تحویل</Form.Label>
                        <Form.Control type='input'/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" style={{resize:'none'}}>
                        <Form.Label>آدرس</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    <div className='text-center'>
                        <Button type='submit' variant="success" >پرداخت</Button>
                    </div>
                </Form>
            </>
        )
    }
}

export {ShoppingForm}