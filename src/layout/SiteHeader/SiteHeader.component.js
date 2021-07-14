import {Component} from 'react'
import {Navbar,Nav} from 'react-bootstrap'
import styled from './SiteHeader.module.css'
import picture from '../../assets/logo.svg'
import {connect} from 'react-redux'
class SiteHeader extends Component{
    render(){
        return(
            <>
            <Navbar  variant="dark" className={styled.header} style={{justifyContent:'space-between'}} >
                <div className='mx-5'>
                    <Navbar.Brand href="#home" className='text-dark'>
                        سبد خرید
                        <i class="fa fa-shopping-cart mx-1" aria-hidden="true"></i>
                        <span className={styled.number} >{this.props.itemsNumber}</span>
                    </Navbar.Brand>
                    <Navbar.Brand href="/adminPanel" className='text-dark'>
                        مدیریت
                    </Navbar.Brand>
                </div>
                <div className='mr-4'>
                    <Nav className={styled.brand}>
                        <Nav.Link href="#home" className='mx-3' style={{fontSize:'30px',color:'black'}}>فروشگاه فلان</Nav.Link>
                        <img width='50px' height='50px' src={picture} />
                    </Nav>
                </div> 
            </Navbar>
            {this.props.children}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        itemsNumber : state.itemsToBuy
    }
};

export default connect(mapStateToProps)(SiteHeader) 