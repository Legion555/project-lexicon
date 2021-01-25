import { useState } from 'react';
import axios from 'axios';
//components
import AddCollection from './AddCollection';
//styles
import '../styles/NavigationMain.scss';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { updateUserData, updateCollectionData, updateView } from '../actions';
//icons
import { CgProfile } from 'react-icons/cg';
import { AiFillPlusCircle, AiOutlineFolder } from 'react-icons/ai';
import { RiShutDownLine } from 'react-icons/ri';

export default function NavigationMain(props) {
    const dispatch = useDispatch();

    const userData = useSelector(state => state.userData);
    const collectionData = useSelector(state => state.collectionData);

    const [collectionFunctionView, setCollectionFunctionView] = useState('');
    

    const logout = () => {
        dispatch(updateUserData({}));
        dispatch(updateView('login'));
    }

    const selectCollection = (collectionData) => {
        dispatch(updateCollectionData(collectionData));
    }

    return (
        <div className="navigation">
            <div className="top">
                <div className="profile__container">
                    <div className="image">
                        <CgProfile />
                    </div>
                    <div className="text">
                        <p className="welcome">Welcome</p>
                        <p className="username">{userData.name}</p>
                    </div>
                </div>
                <div className="add-collection__link" onClick={() => setCollectionFunctionView('addCollection')}>
                    <AiFillPlusCircle className="icon" />
                    <p className="text">Add Collection</p>
                </div>
                {collectionFunctionView === 'addCollection' &&
                    <AddCollection collectionFunctionView={collectionFunctionView} setCollectionFunctionView={setCollectionFunctionView} />
                }
                {userData.collections && userData.collections.map(collection =>
                    <div className={collection._id === collectionData._id ? "note__link active" : "note__link"} key={collection._id}
                        onClick={() => selectCollection(collection)} >
                        <p className="title"><AiOutlineFolder /> {collection.title}</p>
                        {/* <p>{note.description.length > 130 ? `${note.description.slice(0, 130)}...` : note.description}</p> */}
                    </div>
                )}
            </div>
            <div className="bottom">
                <RiShutDownLine className="icon-logout" onClick={logout} />
            </div>
        </div>
    )
}