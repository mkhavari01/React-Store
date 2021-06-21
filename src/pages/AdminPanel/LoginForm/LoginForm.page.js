import { Component } from "react";
import {Form,Button} from 'react-bootstrap'
import styled from './LoginForm.module.css'
import { Link,Redirect } from "react-router-dom";
class LoginForm extends Component{
    login(e){
        e.preventDefault()
        console.log('logged in')
        window.location.href = "/AdminPanel/orders";
    }
    render(){
        return(
            <div className={styled.container}>
                <Form className={styled.form} onSubmit={this.login}>
                    <h1 className={styled.formTitle}>
                        ورود به پنل مدیریت فروشگاه فلان
                    </h1>
                    <div className={styled.inputGroups}>
                        <Form.Group controlId="formBasicEmail" style={{width:'100%'}}>
                            <Form.Label className={styled.label}>نام کاربری :</Form.Label>
                            <Form.Control type="email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" style={{width:'100%'}}>
                            <Form.Label className={styled.label}>رمز عبور :</Form.Label>
                            <Form.Control type="password" />
                        </Form.Group>

                        <Button variant="none" type="submit" className={styled.loginBtn}>
                            ورود
                        </Button>
                    </div>
                    <Link to="/" style={{position: 'absolute','bottom': '15px',left: '15px',fontWeight:'bold'}}>
                        بازگشت به سایت
                    </Link>
                </Form>
            </div>
        )
    }
}

export {LoginForm}