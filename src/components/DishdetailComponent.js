import React from 'react'
import { Card, CardBody, CardTitle, CardText, CardImg, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { FadeTransform, Fade, Stagger } from 'react-animation-components'
import { Link } from 'react-router-dom'
import { Loading } from './LoadingComponent'
import CommentForm from './CommentComponent'
import { baseUrl } from '../shared/baseUrl';


const RenderComments = ({ comments, postComment, dishId }) => {

    return(
        <div className='col-12 col-md-5 m-1' >
            <h4>Comments</h4> 
            <ul className="list-unstyled" >
                <Stagger in>
                    {comments.map(comment => {
                        return(
                            <Fade in>
                                <li key={comment.id}>
                                    <p>{comment.comment}</p>
                                    <p>-- {comment.author}, { new Intl.DateTimeFormat('en-us', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li> 
                            </Fade>
                        )}
                    )} 
                </Stagger>
            </ul>
            <CommentForm dishId={dishId} postComment={postComment} />
        </div>
    )
}

const RenderDish = ({ dish }) => {
        return(
            <div className='col-12 col-md-6 m-1'>
                <FadeTransform in transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)' }}>
                    <Card>
                        <CardImg top src={ baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            </div>
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
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id} />
                </div>
            </div>
        )
    }  else {
        return <div></div>
        
    }
}

export default Dishdetail