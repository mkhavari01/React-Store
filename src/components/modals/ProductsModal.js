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

    handleSubmit = (e) => {
        e.preventDefault()
        const data = {}
        const keys = ['avatar','name','leadGroup','desc']
        data['avatar'] = URL.createObjectURL(e.target.children[0].children[1].children[0].files[0])
        for(var i=1;i<keys.length;i++){
            data[keys[i]] = e.target.children[i].children[1].value
        }
        // data['createdAt'] = new Date().toISOString()
        // data['id'] = new Date().toISOString().slice(20)
        data['subGroup'] = 'subGroup' + new Date().toISOString().slice(22,23)
        data['price'] = 0
        data['entity'] = 0
        console.log(data)
        axios.post('http://localhost:3000/products',data)
          .then((res)=>{
              console.log(res)
          })
        this.handleClose()
        
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
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group >
                                <Form.Label>تصویر کالا :</Form.Label>
                                <Form.File id="exampleFormControlFile1"/>
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
                            <Form.Group className='text-center'>
                            <Button variant="primary" type='submit'>
                                ذخیره
                            </Button>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    </Modal>
            </>
            )
}}

export {ProductModal}
