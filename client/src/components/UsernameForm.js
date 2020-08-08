import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function UsernameForm(props) {
  const [username, setUsername] = useState('');

  function handleChange(e) {
    setUsername(e.target.value);
  }

  function joinRoom() {
    props.handleClose();
    props.updateUsername(username);
  }

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle id="form-dialog-title">Join Room</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Enter Username"
            type="text"
            value={username}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={joinRoom} color="primary">
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

