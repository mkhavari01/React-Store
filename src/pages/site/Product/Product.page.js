import React,{useEffect} from 'react'
import styled from './product.module.css'
import pic from '../../../assets/food.svg'
import { Button } from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import axios from 'axios'
const Product = () => {
        let { id } = useParams();
        useEffect(() => {
            axios.get(`http://localhost:3000/products${id}`)
                .then((res)=>{
                    console.log(res.data)
                })
        });
        return(
            <>
            {console.log(id)}
            <section className='container-fluid d-flex flex-row-reverse text-right mr-5 mt-5'>
                <div className='mx-5'>
                    <img src={pic} width='250px' />
                </div>
                <div className={styled.detail}>
                    <h2 className='mt-3'>کالای فلان</h2>
                    <h5 className='mt-3'>
                        <span>لبنیات </span> {">"}
                        <span>زیرگروه یک</span>
                    </h5>
                    <h3 className='mt-3' style={{direction:'rtl'}}>
                        ۲۰۰ هزار تومان
                    </h3>
                    <form className={styled.form}>
                        <input type="number" id="quantity" name="quantity" min="1" max="5" />
                        <Button type='submit' varient='success'>افزودن به سبد خرید</Button>
                    </form>
                </div>
            </section>
            <div className='text-right container-fluid mt-5 pr-5 '>
                <span className='p-5'>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.                </span>
            </div>
            </>
        )
}

export {Product}