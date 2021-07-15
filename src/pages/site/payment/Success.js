import React from 'react'
import {SiteHeader} from '../../../layout/index'
import check from '../../../assets/check.svg'
class Success extends React.Component{
    render(){
        return(
            <>
            <SiteHeader />
            <div className='container d-flex mt-5 align-items-center flex-row-reverse'>
                <img src={check} width='150px' />
                <h3 className='mr-3'>
                    پرداخت شما با موفقیت انجام شد منتظر تماس ما باشید
                </h3>
            </div>
            </>
        )
    }
}

export {Success}