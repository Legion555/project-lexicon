//VIEW
export const updateView = data => {
    return {
        type: 'UPDATE_VIEW',
        payload: data
    }
};

//USERDATA
export const updateUserData = data => {
    return {
        type: 'UPDATE_USERDATA',
        payload: data
    }
};

//COLLECTION_DATA
export const updateCollectionData = data => {
    return {
        type: 'UPDATE_COLLECTIONDATA',
        payload: data
    }
}

//NOTE_DATA
export const updateNoteData = data => {
    return {
        type: 'UPDATE_NOTEDATA',
        payload: data
    }
}

//ISLOGGEDIN
export const updatedIsLoggedIn = data => {
    return {
        type: 'UPDATE_ISLOGGEDIN',
        payload: data
    }
}