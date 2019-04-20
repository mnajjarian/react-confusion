import * as ActionTypes from './ActionTypes'
import { baseUrl } from '../shared/baseUrl'

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true))

    return fetch(baseUrl + 'dishes')
    .then(response => {
        if(response.ok) {
            return response
        } else {
            let error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            throw error
        }
    },
    error => {
        let errmess = new Error(error.message)
        throw errmess
    })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)))
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
    .then(response => {
        if(response.ok) {
            return response
        } else {
            let error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            throw error
        }
    },
    error => {
        let errmess = new Error(error.message)
        throw errmess
    })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)))
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

export const addComment = (comment) => {
    return {
        type: ActionTypes.ADD_COMMENT,
        payload: comment
    }
}

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment = { dishId, rating, author, comment }
    newComment.date = new Date().toISOString()

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok) {
            return response
        } else {
            let error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            throw error
        }
    },
    error => {
        throw error
    })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error => { 
        console.log('post comments', error.message) 
        alert('Your comment could not be posted\nError: ' + error.message)
    })
}

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading())

    return fetch(baseUrl + 'promotions')
    .then(response => {
        if(response.ok) {
            return response
        } else {
            let error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            throw error
        }
    },
    error => {
        let errmess = new Error(error.message)
        throw errmess
    })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)))
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

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading(true))

    fetch(baseUrl + 'leaders')
       .then(response => {
           if(response.ok) {
               return response
           } else {
               let error = new Error('Error ' + response.status + ': ' + response.statusText)
               error.response = response
               throw error
           }
       },
        error => {
            let errmess = new Error(error.message)
            throw errmess
        })
        .then(response => response.json())
        .then(response => dispatch(addLeaders(response)))
        .catch(error => dispatch(leadersFailed(error.message)))
}

export const leadersLoading = () => {
    return {
        type: ActionTypes.LEADERS_LOADING
    }
}

export const addLeaders = (leaders) => {
    return {
        type: ActionTypes.ADD_LEADERS,
        payload: leaders
    }
}

export const leadersFailed = (errmess) => {
    return {
        type: ActionTypes.LEADERS_FAILED,
        payload: errmess
    }
}

export const postFeedback = (feedback) => (dispatch) => {
    fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(feedback),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin' 
    })
    .then(response => {
        if(response.ok) {
            return response
        } else {
            let error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            throw error
        }
    },
    error => {
        throw error
    })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => {
        console.log(error.message)
        alert('Your feedback could not be send\nError ' + error.message)
    })
}
