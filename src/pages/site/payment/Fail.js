import React from 'react'
import {SiteHeader} from '../../../layout/index'
import fail from '../../../assets/fail.svg'
class Fail extends React.Component{
    render(){
        return(
            <>
            <SiteHeader />
            <div className='container d-flex mt-5 align-items-center flex-row-reverse'>
                <img src={fail} width='150px' />
                <h3 className='mr-3'>
                    پروسه خرید ناموفق بود منتظر پرداخت شما هستیم
                </h3>
            </div>
            </>
        )
    }
}

export {Fail}