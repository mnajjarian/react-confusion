import * as ActionTypes from './ActionTypes'
import { baseUrl } from '../shared/baseUrl'

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true))
    return fetch(baseUrl + 'dishes')
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
})

export const dishesFailed = () => (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
})

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
})

export const fetchComments = () => (dispatch) =>{
    return fetch(baseUrl + 'comments')
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
}

export const commentsFailed = (errmess) => {
    return {
        type: ActionTypes.COMMENTS_FAILED,
        payload: errmess
    }
}
export const addComments = (comments) => {
    return {
        type: ActionTypes.ADD_COMMENTS,
        payload: comments
    }
}

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading())
    return fetch(baseUrl + 'promotions')
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
}

export const promosLoading = () => {
    return {
        type: ActionTypes.PROMOS_LOADING
    }
}

export const addPromos = (promos) => {
    return {
        type: ActionTypes.ADD_PROMOS,
        payload: promos
    }
}

export const promosFailed = (errmess) => {
    return {
        type: ActionTypes.PROMOS_FAILED,
        payload: errmess
    }
}



export const addComment = (dishId, rating, author, comment) => {
    return {
        type: ActionTypes.ADD_COMMENT,
        payload: {
            dishId,
            rating,
            author,
            comment
        }
    }
}