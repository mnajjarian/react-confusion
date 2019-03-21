import React from 'react'
import { Card, CardBody, CardTitle, CardText, CardImg } from 'reactstrap'

const renderComments = (dish) => {
    if(dish != null) {
        return(
            <div className="col-12 col-md-5 m-1" >
                <h4>Comments</h4>
                 
                <ul className="list-unstyled" >
                {dish.comments.map(c =>
                <div>
                    <li>{c.comment}</li>
                    <p>-- {c.author}, { new Date(c.date).toDateString()}</p>
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
            <div className="row" >
                {renderDish(this.props.dish)}
                {renderComments(this.props.dish)}
            </div>
        )
    }
}

export default Dishdetail