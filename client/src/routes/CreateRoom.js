import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


export default function CreateRoom(props) {
    const [username, setUsername] = useState(null);
    const [title, setTitle] = useState(null);
    const [publicBool, setPublicBool] = useState('true');

    const handleChange = (event) => {
        console.log('change happened in the form yo')
        console.log(event);
      setPublicBool(event.target.value);
    };

    function handleUsernameChange(e) {
        setUsername(e.target.value);
    }

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handleCreate(e) {
        props.handleClose();
        console.log('creating session with');
        console.log({title, username, publicBool});
        props.createSession(title, username, publicBool);
    }
    return (
        <div>
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create Room</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Create a room to share your streaming experience with others! 
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="username"
                label="Enter username"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                fullWidth
            />
            <TextField
                margin="dense"
                id="room-title"
                label="Room Title"
                type="text"
                value={title}
                onChange={handleTitleChange}
                fullWidth
            />
            <DialogContentText>
                Private rooms are only accessible to people you invite. Public rooms are displayed on our page and anyone can join! 
            </DialogContentText>
            <FormControl component="fieldset">
                <FormLabel component="legend">Room Type</FormLabel>
                <RadioGroup aria-label="room-type" name="gender1" value={publicBool} onChange={handleChange}>
                    <FormControlLabel value="true" control={<Radio />} label="public" />
                    <FormControlLabel value="false" control={<Radio />} label="private" />
                </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogActions>
            <Button onClick={props.handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleCreate} color="primary">
                Create!
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}



