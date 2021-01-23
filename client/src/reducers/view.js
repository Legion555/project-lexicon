const viewReducer = (state = 'login', action) => {
    switch(action.type) {
        case 'UPDATE_VIEW':
            return action.payload;
        default:
            return state
    }
}

export default viewReducer