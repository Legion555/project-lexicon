const collectionDataReducer = (state = {}, action) => {
    switch(action.type) {
        case 'UPDATE_COLLECTIONDATA':
            return action.payload
        default:
            return state
    }
}

export default collectionDataReducer