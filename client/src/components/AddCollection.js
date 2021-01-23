import { useState } from 'react';
import axios from 'axios';
import '../styles/AddCollection.scss';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { updateUserData } from '../actions';
//Icons
import { FaCheckCircle } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import TextField from '@material-ui/core/TextField';



export default function AddCollection(props) {
    const dispatch = useDispatch();

    const userData = useSelector(state => state.userData);

    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState(false);

    const genId = () => {
        return `${userData.name.slice(0,2)}-${Math.floor(Math.random() * 100000)}`;
    }

    const createCollection = () => {
        //Validation
        if (title.length < 1) {
            return setTitleError(true);
        }
        setTitleError(false);

        const payload = {
            userId: userData._id,
            _id: genId(),
            title: title
        }
        axios.put("/api/collections/create", payload)
        .then(res => {
            console.log(res)
            //update local user data
            axios.get('/api/users', {
                params: {
                    email: userData.email
                }
            })
            .then(res => {
                //set user data
                dispatch(updateUserData(res.data[0]));
                //Close window
                props.setCollectionFunctionView('')
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
        <div className="add-collection__container">
            {titleError ?
                <TextField label="Title" variant="filled" className="input" error helperText="Cannot be empty"
                    value={title} onChange={(e) => setTitle(e.target.value)} />
                :
                <TextField label="Title" variant="filled" className="input"
                    value={title} onChange={(e) => setTitle(e.target.value)} />
            }
            <div className="actions">
                <GiCancel className="icon-cancel" onClick={() => props.setCollectionFunctionView('')} />
                <FaCheckCircle className="icon-accept" onClick={createCollection} />
            </div>
        </div>
    )
}