import React from 'react'
import {Button, Modal, ModalBody, ModalHeader, Row, Label, Col} from 'reactstrap'
import { LocalForm, Control, Errors } from 'react-redux-form'

const required = (val) => val && val.length
const minLength = (len) => (val) => !(val) || (val.length > len)
const maxLength = (len) => (val) => !(val) || (val.length <= len)
class CommentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false
        }
    }
    toggleModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen })
    }

    handleSubmit = (values) => {
        this.props.postComment(this.props.dishId, values.rating, values.name, values.comment)
        console.log(JSON.stringify(values))
        this.toggleModal()
    }
    render() {
        
        return(
            <div>
                <Button outline onClick={this.toggleModal} ><span className="fa fa-pencil fa-lg" ></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                    <ModalHeader toggle={this.toggleModal} >Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleSubmit} >
                            <Row className="form-group" > 
                                <Col>
                                    <Label htmlFor='rating' >Rating</Label>
                                    <Control.select model='.rating' id='rating'   className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Label htmlFor='name' >Your Name</Label>
                                    <Control.text model='.name' id='name' 
                                        className='form-control' 
                                        placeholder='Your Name'
                                        validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                        />
                                        <Errors
                                        className='text-danger'
                                        model='.name'
                                        show='touched'
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                        />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Label htmlFor='comment' >Comment</Label>
                                    <Control.textarea
                                        model='.comment'
                                        id='comment'
                                        rows='6'
                                        className='form-control'
                                    />
                                </Col>
                            </Row>
                            <Button type='submit' className='mt-2 bg-primary' >
                                Submit
                            </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default CommentForm