import React from 'react'
import Menu from './MenuComponent'
import Header from './HeaderComponent'
import Home from './HomeComponent'
import { DISHES } from '../shared/dishes'
import { Switch, Route, Redirect } from 'react-router-dom'
import Footer from './FooterComponent'

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dishes: DISHES,
            selectedDish: null
        }
    }

    onDishSelect = (dishId) => {
        this.setState({ selectedDish: dishId })
    }

    render() {
        const Homepage = () => {
            return(
                <Home />
            )
        }
        return(
            <div >
                <Header />
                <Switch>
                    <Route path="/home" component={Homepage} />
                    <Route exact path="/menu" component={() =>
                    <Menu dishes={this.state.dishes} /> } />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        )
    }
}

export default Main