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
      axios.get(`http://localhost:3000/orders/${this.props.dataParentToChild}`)
         .then((res)=>{
             const person = res.data
             this.setState({user : person,orders:person.orderList})
         })
    }
  }
  async saveBtn(e){
    await axios.patch(`http://localhost:3000/orders/${e.target.id}`,{deliverd : true})
      .then((res)=>{
        console.log(res.data)
      })
    window.location.reload()
  }
  render(){
  const person = this.state.user
  const renderproducts = this.state.orders.map((product) => {
    return    <tr>
                  <td>{product.entity}</td>
                  <td>{product.price}</td>
                  <td>{product.name}</td>
              </tr>
  });
    const renderCustumer =  
            <ul>
              <li>
                نام مشتری : <span>{person.name}</span>
              </li>
              <li>
                آدرس : <span>{person.address}</span>
              </li>
              <li>
                تلفن : <span>{person.phone}</span>
              </li>
              <li>
                زمان تحویل : <span>{person.deliverTime}</span>
              </li>
              <li>
                زمان سفارش : <span>{person.orderTime}</span>
              </li>
            </ul> ;
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
        <Modal.Footer className='text-center'>
          <span >{this.state.user.deliverd ? <span> زمان تحویل : <span>{person.deliverTime}</span> </span> : <Button variant="success" onClick={this.saveBtn} id={this.state.user.id}>تحویل شد</Button>}</span>
        </Modal.Footer>
      </Modal>
    </>
  )}
}

export {OrdersModal}