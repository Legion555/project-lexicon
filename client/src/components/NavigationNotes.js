import { useState } from 'react';
import axios from 'axios';
//components
import AddNote from './AddNote';
//styles
import '../styles/NavigationNotes.scss';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { updateUserData, updateCollectionData, updateNoteData } from '../actions';
//icons
import { AiOutlineFileText, AiOutlineFileAdd } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';

export default function NavigationMain(props) {
    const dispatch = useDispatch();

    const userData = useSelector(state => state.userData);
    const collectionData = useSelector(state => state.collectionData);
    const noteData = useSelector(state => state.noteData);

    const [noteFunctionView, setNoteFunctionView] = useState('');

    const selectNote = (noteData) => {
        dispatch(updateNoteData(noteData));
        props.setNoteView('content');
    }

    const deleteCollection = () => {
        const payload = {
            userId: userData._id,
            collectionId: collectionData._id
        }
        axios.put("/api/collections/delete", payload)
        .then(res => {
            //update local user data
            axios.get('/api/users', {
                params: {
                    email: userData.email
                }
            })
            .then(res => {
                dispatch(updateUserData(res.data[0]));
                dispatch(updateCollectionData({}));
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

    return (
        <div className="navigation-notes">
            <div className="top">
                <div className="header">
                    <p className="text">{collectionData.title}</p>
                    <FaTrash className="icon-delete" onClick={deleteCollection} />
                </div>
                {collectionData.notes && collectionData.notes.map(note => 
                    <div key={note._id} className={note._id === noteData._id ? "note__container active" : "note__container"}
                        onClick={() => selectNote(note)} >
                        <p className="title"><AiOutlineFileText /> {note.title}</p>
                        <p className="description">{note.description.length > 130 ? `${note.description.slice(0, 130)}...` : note.description}</p>
                    </div>
                )}
            </div>
            <div className="bottom">
                <AiOutlineFileAdd className="icon-create" onClick={() => setNoteFunctionView('addNote')} />
                
                {noteFunctionView === 'addNote' &&
                <AddNote setNoteFunctionView={setNoteFunctionView} />
                }
            </div>
        </div>
    )
}