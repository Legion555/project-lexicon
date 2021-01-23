const noteDataReducer = (state = {}, action) => {
    switch(action.type) {
        case 'UPDATE_NOTEDATA':
            return action.payload
        default:
            return state
    }
}

export default noteDataReducer