import React from 'react'
import {SiteHeader} from '../../../layout/index'
import {Form,Button} from 'react-bootstrap';

class ShoppingForm extends React.Component{
    render(){
        return(
            <>
                <SiteHeader />
                <Form className='container text-right mt-3' style={{direction:'rtl'}}>
                    <Form.Group className="mb-3" controlId="firstName">
                        <Form.Label>نام</Form.Label>
                        <Form.Control type="input"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="familyName">
                        <Form.Label>نام خانوادگی</Form.Label>
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
                        <Button type='submit' variant="success" onClick={window.location.href='http://127.0.0.1:5501/payment.html'} >پرداخت</Button>
                    </div>
                </Form>
            </>
        )
    }
}

export {ShoppingForm}