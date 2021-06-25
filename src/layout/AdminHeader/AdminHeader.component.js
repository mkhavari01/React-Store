import React from 'react'
import styled from './AdminHeader.module.css'
import {Pagination} from 'react-bootstrap'
class AdminHeader extends React.Component{
    render(){
        return(
            <>
            <header className={styled.header}>
                <div>
                    <h1>پنل مدیریت فروشگاه</h1>
                </div>
                <div>
                    <Pagination>
                        <Pagination.Item className={this.props.ordersClass} href='/adminPanel/orders'>سفارش ها</Pagination.Item>
                        <Pagination.Item className={this.props.pricingClass} href='/adminPanel/pricing'>موجودی ها و قیمت ها</Pagination.Item>
                        <Pagination.Item className={this.props.productsClass} href='/adminPanel/products'>کالاها</Pagination.Item>
                    </Pagination>
                </div>
                <div>
                    <a href='/'>بازگشت به سایت</a>
                </div>
            </header>
            {this.props.children}
            </>
        )
    }
}

export {AdminHeader}