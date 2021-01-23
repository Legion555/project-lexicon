import { useState } from 'react';
import axios from 'axios';
import '../styles/AddNote.scss';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { updateCollectionData, updateUserData } from '../actions';
//Icons
import { FaCheckCircle } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
//Material
import TextField from '@material-ui/core/TextField';



export default function AddNote(props) {
    const dispatch = useDispatch();

    const userData = useSelector(state => state.userData);
    const collectionData = useSelector(state => state.collectionData);

    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [description, setDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState(false);

    const genNoteId = () => {
        return `${userData.name.slice(0,3)}-${collectionData.title.slice(0,3)}-${Math.floor(Math.random() * 100000)}`;
    }

    const addNote = (e) => {
        e.preventDefault();
        //Validation
        if (title.length < 1) {
            return setTitleError(true);
        }
        setTitleError(false);
        setDescriptionError(false);

        const payload = {
            userId: userData._id,
            collectionId: collectionData._id,
            _id: genNoteId(),
            title: title,
            description: description
        }
        axios.put("/api/notes/addNote", payload)
        .then(res => {
            //update local user data
            axios.get('/api/users', {
                params: {
                    email: userData.email
                }
            })
            .then(res => {
                //set user data
                dispatch(updateUserData(res.data[0]));
                //set collection data
                dispatch(updateCollectionData(res.data[0].collections.filter(collection => collection._id === collectionData._id)[0]))
                //Close window
                props.setNoteFunctionView('')
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
        <form className="add-note">
            <div className="background" onClick={() => props.setNoteFunctionView('false')} ></div>
            <div className="content">
                <div className="header">
                    <h1>Add note</h1>
                </div>
                <div className="form">
                    {titleError ?
                        <TextField label="Title" variant="outlined" className="input" error helperText="Cannot be empty" autoFocus
                            value={title} onChange={(e) => setTitle(e.target.value)} />
                        :
                        <TextField label="Title" variant="outlined" className="input" autoFocus
                            value={title} onChange={(e) => setTitle(e.target.value)} />
                    }
                    
                    <TextField label="Description" multiline rows={6} variant="outlined" className="input"
                        value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="actions">
                    <GiCancel className="icon-cancel" onClick={() => props.setNoteFunctionView('')} />
                    <button type="submit" onClick={(e) => addNote(e)}><FaCheckCircle className="icon-accept" /></button>
                </div>  
            </div>
        </form>
    )
}