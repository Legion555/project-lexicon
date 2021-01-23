import axios from 'axios';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { updateCollectionData, updateNoteData, updateUserData } from '../actions';
//styles
import '../styles/NoteContent.scss';
//icons
import { FaTrash, FaPencilAlt } from 'react-icons/fa';

export default function NoteContent(props) {
    const dispatch = useDispatch();

    const userData = useSelector(state => state.userData);
    const collectionData = useSelector(state => state.collectionData);
    const noteData = useSelector(state => state.noteData);

    const removeNote = () => {
        const payload = {
            userId: userData._id,
            collectionId: collectionData._id,
            noteId: noteData._id
        }
        axios.put("/api/notes/deleteNote", payload)
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
                dispatch(updateCollectionData( res.data[0].collections.filter(collection => collection._id === collectionData._id)[0] ))
                //set note data
                dispatch(updateNoteData({}));
            })
            .catch(err => {
                console.log("Error: " + err);
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    const editNote = () => {
        props.setView('editNote');
    }

    return (
        <div className="note-content">
            <div className="actions">
                <FaPencilAlt className="icon-edit" onClick={editNote} />
                <FaTrash className="icon-delete" onClick={removeNote} />
            </div>
            <div className="content__container">
                <h1>{noteData.title}</h1>
                <p>{noteData.description}</p>
            </div>
        </div>
    )
}