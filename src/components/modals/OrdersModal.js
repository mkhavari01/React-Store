import { Component} from "react";
import { Button,Modal,Table } from "react-bootstrap";
import axios from 'axios'

class OrdersModal extends Component{
  constructor(props){
    super(props)
    this.state={
      show : false,
      orders : [],
      user : []
    }
    this.handleClose = this.handleClose.bind(this)
  }
  
  handleClose(){
    this.setState({
      show : false
    })
  }
  handleShow = (e) => {
    this.setState({
      show : true
    })
    this.props.modalHandler(e)
  }
  componentDidMount(){
    console.log('mounted')
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dataParentToChild !== this.props.dataParentToChild) {
      console.log('props has changed.')
      axios.get(`http://localhost:3000/products?user=${this.props.dataParentToChild}`)
         .then((res)=>{
             const product = res.data
             this.setState({orders : product})
         })
      axios.get(`http://localhost:3000/orders?name=${this.props.dataParentToChild}`)
         .then((res)=>{
             const person = res.data
             this.setState({user : person})
         })
    }
  }
  saveBtn(){
    console.log('save btn called')
  }
  render(){
  const renderproducts = this.state.orders.map((product) => {
    return    <tr>
                  <td>{product.id}</td>
                  <td>{product.price}</td>
                  <td>{product.name}</td>
              </tr>
  });
  const renderCustumer = this.state.user.map((person) => {
    return  <ul>
              <li>
                نام مشتری : <span>{person.name}</span>
              </li>
              <li>
                آدرس : <span>{person.address}</span>
              </li>
              <li>
                تلفن : <span>{person.telephone}</span>
              </li>
              <li>
                زمان تحویل : <span>{person.deliverTime}</span>
              </li>
              <li>
                زمان سفارش : <span>{person.orderTime}</span>
              </li>
            </ul>
  });
  const renderFooter = this.state.user.map((person) => {
    if(person.deliverd){
      return <span>
              زمان تحویل : <span>{person.deliverTime}</span>
            </span>
    }else{
      return  <Button variant="success" onClick={this.saveBtn}>
            تحویل شد
              </Button>
    }
  });
  return (
    <>
      <a href='#' onClick={this.handleShow}>
        ثبت سفارش
      </a>

      <Modal 
        show={this.state.show}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>نمایش سفارش</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign:'right'}}>
            {renderCustumer}
          <hr />
          <Table striped bordered hover>
                <thead>
                  <tr>
                      <th>تعداد</th>
                      <th>قیمت</th>
                      <th>کالا</th>
                  </tr>
                </thead>
                <tbody>
                {renderproducts}
                </tbody>
            </Table>
        </Modal.Body>
        <Modal.Footer>
          {renderFooter}
        </Modal.Footer>
      </Modal>
    </>
  )}
}

export {OrdersModal}