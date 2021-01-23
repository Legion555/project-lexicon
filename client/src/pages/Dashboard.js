import { useState } from 'react';
//Styles
import '../styles/Dashboard.scss'
//Components
import NavigationMain from '../components/NavigationMain';
import NavigationNotes from '../components/NavigationNotes';
import NoteContent from '../components/NoteContent';
//Redux
import { useSelector } from 'react-redux';
//Material

export default function Dashboard() {3
    const collectionData = useSelector(state => state.collectionData);
    const noteData = useSelector(state => state.noteData);

    //Views
    const [collectionFunctionView, setCollectionFunctionView] = useState('');



    return (
        <div className="dashboard">
                <NavigationMain setCollectionFunctionView={setCollectionFunctionView} />
                {collectionData.title &&
                    <NavigationNotes />
                }
                {noteData.title &&
                    <NoteContent />
                }
        </div>
    )
}