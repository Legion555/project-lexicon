import { useState } from 'react';
import axios from 'axios';
import '../styles/EditNote.scss';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { updateUserData } from '../actions';
//Icons
import { FaCheckCircle } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import TextField from '@material-ui/core/TextField';

export default function EditNote(props) {
    const dispatch = useDispatch();

    const userData = useSelector(state => state.userData);

    const [title, setTitle] = useState(props.noteData.title);
    const [titleError, setTitleError] = useState(false);
    const [description, setDescription] = useState(props.noteData.description);
    const [descriptionError, setDescriptionError] = useState(false);

    const editNote = () => {
        //Validation
        if (title.length < 1) {
            return setTitleError(true);
        }
        setTitleError(false);
        setDescriptionError(false);

        const payload = {
            userId: userData._id,
            noteId: props.noteData._id,
            title: title,
            description: description
        }
        axios.put('/api/users/editNote', payload)
        .then(res => {
            //update local user data
            axios.get('/api/users/', {
                params: {
                    email: userData.email
                }
            })
            .then(res => {
                //set user data
                dispatch(updateUserData(res.data[0]));
                const newNoteData = res.data[0].notes.filter(note => note._id === props.noteData._id);
                props.setNoteData(newNoteData[0]);
                //Close window
                props.setView(false)
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
        <div className="edit-note">
            <div className="header">
                <h1>Edit note</h1>
            </div>
            <div className="form">
                {titleError ?
                    <TextField label="Title" variant="outlined" className="input" error helperText="Cannot be empty"
                        value={title} onChange={(e) => setTitle(e.target.value)} />
                    :
                    <TextField label="Title" variant="outlined" className="input"
                        value={title} onChange={(e) => setTitle(e.target.value)} />
                }
                
                <TextField label="Description" multiline variant="outlined" className="input"
                    value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="actions">
                <GiCancel className="icon-cancel" onClick={() => props.setView('')} />
                <FaCheckCircle className="icon-accept" onClick={editNote} />
            </div>            
        </div>
    )
}