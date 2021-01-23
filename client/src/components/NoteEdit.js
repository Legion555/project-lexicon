import { useState } from 'react';
import axios from 'axios';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { updateCollectionData, updateNoteData, updateUserData } from '../actions';
//styles
import '../styles/NoteEdit.scss';
//icons
//Material
import TextField from '@material-ui/core/TextField';

export default function NoteEdit(props) {
    const dispatch = useDispatch();

    const userData = useSelector(state => state.userData);
    const collectionData = useSelector(state => state.collectionData);
    const noteData = useSelector(state => state.noteData);

    //inputs
    const [title, setTitle] = useState(noteData.title);
    const [titleError, setTitleError] = useState(false);
    const [description, setDescription] = useState(noteData.description);
    const [descriptionError, setDescriptionError] = useState(false);

    const editNote = (e) => {
        e.preventDefault();
        const payload = {
            userId: userData._id,
            collectionId: collectionData._id,
            noteId: noteData._id,
            title: title,
            description: description
        }
        axios.put('/api/notes/updateNote', payload)
        .then(res => {
            //update local user data
            axios.get('/api/users', {
                params: {
                    email: userData.email
                }
            })
            .then(res => {
                dispatch(updateUserData(res.data[0]));
                dispatch(updateCollectionData(res.data[0].collections.filter(collection => collection._id === collectionData._id)[0]));
                dispatch(updateNoteData(res.data[0].collections.filter(collection => collection._id === collectionData._id)[0].notes.filter(note => note._id === noteData._id)[0]));
                props.setNoteView('content');
            })
            .catch(err => {
                console.log("Error: " + err);
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <form className="note-edit">
            {titleError ?
                <TextField label="Title" variant="outlined" className="input" error helperText="Cannot be empty" autoFocus
                    value={title} onChange={(e) => setTitle(e.target.value)} />
                :
                <TextField label="Title" variant="outlined" className="input" autoFocus
                    value={title} onChange={(e) => setTitle(e.target.value)} />
            }
            <TextField label="Description" multiline rows={6} variant="outlined" className="input"
                        value={description} onChange={(e) => setDescription(e.target.value)} />
            
            <button onClick={() => props.setNoteView('content')} >Cancel</button>
            <button type="submit" onClick={(e) => editNote(e)} >Save</button>
        </form>
    )
}