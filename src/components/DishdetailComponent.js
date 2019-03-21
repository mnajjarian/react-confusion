import React from 'react'
import { Card, CardBody, CardTitle, CardText, CardImg } from 'reactstrap'

const renderComments = (dish) => {
    if(dish != null) {
        return(
            <div className="col-12 col-md-5 m-1" >
                <h4>Comments</h4>
                 
                <ul className="list-unstyled" >
                {dish.comments.map(comment =>
                <div key={comment.id}>
                    <li>{comment.comment}</li>
                    <p>-- {comment.author}, { new Intl.DateTimeFormat('en-us', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                </div>
                )}
                </ul>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

const renderDish = (dish) => {
    if(dish != null) {
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
    } else {
        return <div></div>
    }
}

class Dishdetail extends React.Component {
    
    
    render() {
        return(
            <div className="container">
                <div className="row" >
                    {renderDish(this.props.dish)}
                    {renderComments(this.props.dish)}
                </div>
            </div>
        )
    }
}

export default Dishdetail