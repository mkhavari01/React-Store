import { Button,Modal,Form } from 'react-bootstrap'
import React from 'react'
import axios from 'axios'

class ProductModal extends React.Component{
    state={
        show : false,
        catogries : []
    }
    componentDidMount(){
        axios.get('http://localhost:3000/sideBar')
          .then((res)=>{
            this.setState({
                catogries : res.data
            })
          })
    }
    handleClose = () => this.setState({
        show : false
    })
    handleShow = () => this.setState({
        show : true
    })
    handleSave = () => {
        console.log('saved')
    }
    render(){
        const renderCatogeries = this.state.catogries.map((el)=>{
            return <option>{el.name}</option>
        })
        return(
            <>
                <a style={this.props.color} onClick={this.handleShow} href='#'>
                    {this.props.children}
                </a>
                    <Modal
                      show={this.state.show}
                      onHide={this.handleClose}
                      backdrop="static"
                      keyboard={false}
                    >
                    <Modal.Header closeButton>
                      <Modal.Title>افزودن/ویرایش کالا</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{textAlign:'right',direction:'rtl'}}>
                        <Form>
                            <Form.Group>
                                <Form.File id="exampleFormControlFile1" label="تصویر کالا :" />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>نام کالا :</Form.Label>
                                <Form.Control type="input"/>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>دسته بندی :</Form.Label>
                                <Form.Control as="select">
                                    {renderCatogeries}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formGridAddress1">
                                <Form.Label>توضیحات :</Form.Label>
                                <Form.Control/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                      <Modal.Footer style={{justifyContent:'center'}}>
                        <Button variant="primary" onClick={this.handleSave} >
                          ذخیره
                        </Button>
                      </Modal.Footer>
                    </Modal>
            </>
            )
}}

export {ProductModal}
