import { useState } from 'react';
//Styles
import '../styles/Dashboard.scss'
//Components
import NavigationMain from '../components/NavigationMain';
import NavigationNotes from '../components/NavigationNotes';
import NoteContent from '../components/NoteContent';
import NoteEdit from '../components/NoteEdit';
//Redux
import { useSelector } from 'react-redux';
//Material

export default function Dashboard() {3
    const collectionData = useSelector(state => state.collectionData);
    const noteData = useSelector(state => state.noteData);

    //Views
    const [collectionFunctionView, setCollectionFunctionView] = useState('');
    const [noteView, setNoteView] = useState('content');

    return (
        <div className="dashboard">
                <NavigationMain setCollectionFunctionView={setCollectionFunctionView} />
                {collectionData.title &&
                    <NavigationNotes setNoteView={setNoteView} />
                }
                {noteData.title && noteView === 'content' &&
                    <NoteContent setNoteView={setNoteView} />
                }
                {noteData.title && noteView === 'edit' &&
                    <NoteEdit setNoteView={setNoteView} />
                }
        </div>
    )
}