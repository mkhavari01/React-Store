import { Component } from "react";
import styled from './productCard.module.css';
import pictures from '../../assets/food.svg'
class ProductCard extends Component{
    render(){
        return(
                <div className={styled.wrapper}>
                    <div className={styled.imgContainer}>
                        <img width='85%' height='85%' src={this.props.picture} style={{borderRadius:'50%'}} />
                    </div>
                    <div className={styled.productDetail}>
                        <h2>
                            {this.props.desc}
                        </h2>
                        <h2>
                            {this.props.price}
                        </h2>
                    </div>
                </div>
        )
    }
}

export {ProductCard}