import {Component} from 'react'
import {Navbar,Nav} from 'react-bootstrap'
import styled from './SiteHeader.module.css'

class SiteHeader extends Component{
    render(){
        return(
            <>
            <Navbar bg="dark" variant="dark" className={styled.header} style={{justifyContent:'space-between'}} >
                <div className='mx-5'>
                    <Navbar.Brand href="#home">
                        سبد خرید
                        <i class="fa fa-shopping-cart mx-1" aria-hidden="true"></i>
                    </Navbar.Brand>
                    <Navbar.Brand href="/adminPanel">
                        مدیریت
                    </Navbar.Brand>
                </div>
                <div className='mr-4'>
                    <Nav className={styled.brand}>
                        <Nav.Link href="#home" className='mx-3' style={{fontSize:'30px'}}>فروشگاه فلان</Nav.Link>
                        <img width='50px' height='50px' />
                    </Nav>
                </div> 
            </Navbar>
            {this.props.children}
            </>
        )
    }
}

export {SiteHeader}