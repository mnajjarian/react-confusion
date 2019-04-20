import React from 'react'
import { Card, CardBody, CardTitle, CardText, CardImg, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import { Loading } from './LoadingComponent'
import CommentForm from './CommentComponent'


const RenderComments = ({ comments, postComment, dishId }) => {

    return(
        <div >
            <h4>Comments</h4> 
            <ul className="list-unstyled" >
            {comments.map(comment =>
            <div key={comment.id}>
                <li>{comment.comment}</li>
                <p>-- {comment.author}, { new Intl.DateTimeFormat('en-us', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
            </div>
            )}
            </ul>
            <CommentForm dishId={dishId} postComment={postComment} />
        </div>
    )
}

const RenderDish = ({ dish }) => {
        return(
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        )
}

const Dishdetail = (props) => {
    if(props.isLoading) {
        return(
            <div className='container' >
                <div className='row' >
                    <Loading />
                </div>
            </div>
        )
    } else if(props.errMess) {
        return(
            <div className='container' >
                <div className='row' >
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    } else if(props.dish != null) {
        return(
            <div className="container">
                <div className="row" >
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row" >
                    <div className='col-12 col-md-5 m-1'>
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className='col-12 col-md-5 m-1'>
                        <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id} />
                    </div>
                </div>
            </div>
        )
    }  else {
        return <div></div>
        
    }
}

export default Dishdetail