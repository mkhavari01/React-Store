import { Button,Modal,Form } from 'react-bootstrap'
import React from 'react'
import axios from 'axios'
class ProductModal extends React.Component{
    constructor(props){
        super(props)
        this.onInputchange = this.onInputchange.bind(this);
    }
    state={
        show : false,
        catogries : [],
        name : '',
        leadGroup : '',
        subGroup : '',
        desc : ''
    }
    onInputchange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
    }
    componentDidMount(){
        axios.get('http://localhost:3000/sideBar')
          .then((res)=>{
            this.setState({
                catogries : res.data
            })
          })
    }
    handleClose = () => {this.setState({
        show : false
    })
       
    }
    handleShow = (e) => {this.setState({
        show : true
    })
        this.props.modalHandler(e)
    }

    handleSubmit = (e) => {
        // POST method
        // e.preventDefault()
        if(this.props.data==undefined){
            const formData = new FormData();
            formData.append('image',e.target.children[0].children[1].children[0].files[0])
            const keys = ['avatar','name','leadGroup','subGroup','desc']
            for(var i=1;i<keys.length;i++){
                formData.append(keys[i],e.target.children[i].children[1].value)
            }
            formData.append('price',0)
            formData.append('entity',0)
            axios.post('http://localhost:3000/products',formData)
          .then((res)=>{
              console.log(res)
            })
        // PATCH method 
        }else{
            const updatedData = {}
            const states = [this.state.image,this.state.name,this.state.leadGroup,this.state.subGroup,this.state.desc]
            const keys = ['avatar','name','leadGroup','subGroup','desc']
            for(let i=1;i<keys.length;i++){
                updatedData[keys[i]] = states[i]
            }
            updatedData['image'] = e.target.children[0].children[1].children[0].files[0]
            axios.patch(`http://localhost:3000/products/${this.props.data}`,updatedData)
                .then((res)=>{
                    console.log(res)
                })
        }
    }
    componentDidUpdate(prevProps,prevState){
        if (prevProps.data !== this.props.data){
            console.log(this.props.data)
            axios.get(`http://localhost:3000/products/${this.props.data}`)
              .then((res)=>{
                  const modalInfo = res.data
                  this.setState({
                    name : modalInfo.name,
                    leadGroup : modalInfo.leadGroup,
                    subGroup : modalInfo.subGroup,
                    desc : modalInfo.desc
                  })
              })
        }
    }
    render(){
        const renderCatogeries = this.state.catogries.map((el)=>{
            return <option>{el.name}</option>
        })
        const renderSubCatogeries = this.state.catogries.map((el)=>{
            return (
                el.subNames.map((els)=>{
                    return <option>{els}</option>
                })
                )
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
                                <Form.File id="exampleFormControlFile1" name='file' value={this.state.file}/>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>نام کالا :</Form.Label>
                                <Form.Control type="input" name='name' value={this.state.name} onChange={this.onInputchange} />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>سرگروه :</Form.Label>
                                <Form.Control as="select" value={this.state.leadGroup} name='leadGroup' onChange={this.onInputchange} >
                                    {renderCatogeries}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>زیر گروه :</Form.Label>
                                <Form.Control as="select"  name='subGroup' value={this.state.subGroup}  onChange={this.onInputchange} >
                                    {renderSubCatogeries}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formGridAddress1"   >
                                <Form.Label>توضیحات :</Form.Label>
                                <Form.Control name='desc' value={this.state.desc}  onChange={this.onInputchange}/>
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
