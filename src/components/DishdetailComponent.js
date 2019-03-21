import React from 'react'
import { Card, CardBody, CardTitle, CardText, CardImg } from 'reactstrap'

const RenderComments = ({ comments }) => {
    return(
        <div className="col-12 col-md-5 m-1" >
            <h4>Comments</h4> 
            <ul className="list-unstyled" >
            {comments.map(comment =>
            <div key={comment.id}>
                <li>{comment.comment}</li>
                <p>-- {comment.author}, { new Intl.DateTimeFormat('en-us', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
            </div>
            )}
            </ul>
        </div>
    )
}

const RenderDish = ({ dish }) => {
        return(
            <div className='col-12 col-md-5 m-1' >
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
}

const Dishdetail = (props) => {
    if(props.dish != null) {
        return(
            <div className="container">
                <div className="row" >
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.dish.comments} />
                </div>
            </div>
        )
    }  else {
        return <div></div>
        
    }
}

export default Dishdetail