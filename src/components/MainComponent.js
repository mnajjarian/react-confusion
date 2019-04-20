import React from 'react'
import Menu from './MenuComponent'
import Header from './HeaderComponent'
import Home from './HomeComponent'
import Dishdetail from './DishdetailComponent'
import About from './AboutComponent'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Switch, Route, Redirect , withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators'
import Footer from './FooterComponent'
import Contact from './ContactComponent'
import { actions } from 'react-redux-form';

const mapDispatchToProps = (dispatch) => {
    return {
        postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
        fetchDishes: () => dispatch(fetchDishes()),
        fetchComments: () => dispatch(fetchComments()),
        fetchPromos: () => dispatch(fetchPromos()),
        fetchLeaders: () => dispatch(fetchLeaders()),
        postFeedback: (feedback) => dispatch(postFeedback(feedback)),
        resetFeedbackForm: () => dispatch(actions.reset('feedback'))
    }
}
const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

class Main extends React.Component {
    componentDidMount() {
        this.props.fetchDishes()
        this.props.fetchComments()
        this.props.fetchPromos()
        this.props.fetchLeaders()
    }

    
    onDishSelect = (dishId) => {
        this.setState({ selectedDish: dishId })
    }

    render() {
        const DishWithId = ({ match }) => {
            return(
                <Dishdetail 
                    dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                />
            )
        }
        
        const Homepage = () => {
            return(
                <Home
                   dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                   dishesLoading={this.props.dishes.isLoading}
                   dishesErrMess={this.props.dishes.errMess}
                   promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                   promoLoading={this.props.promotions.isLoading}
                   promoErrMess={this.props.promotions.errMess}
                   leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                   leadersLoading={this.props.leaders.isLoading}
                   leadersErrMess={this.props.leaders.errMess}
                />
            )
        }
        return(
            <div >
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames='page' timeout={300}>
                        <Switch location={this.props.location} >
                            <Route path="/home" component={Homepage} />
                            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes.dishes} /> } />
                            <Route path="/menu/:dishId" component={DishWithId} />
                            <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
                            <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders.leaders} />} />
                            <Redirect to="/home" />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        )
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Main))