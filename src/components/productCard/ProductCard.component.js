import { Component } from "react";
import styled from './productCard.module.css';
import pictures from '../../assets/food.svg'
class ProductCard extends Component{
    render(){
        return(
                <div className={styled.wrapper}>
                    <div className={styled.imgContainer}>
                        <img width='85%' height='85%' src={pictures}/>
                    </div>
                    <div className={styled.productDetail}>
                        <h2>
                        در کادر زیر هر متنی را که دوست دارید 
                        </h2>
                        <h2>
                            ۲۰۰ هزار تومان
                        </h2>
                    </div>
                </div>
        )
    }
}

export {ProductCard}