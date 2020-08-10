import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import io from "socket.io-client";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { createMuiTheme, ThemeProvider, makeStyles, withStyles } from '@material-ui/core/styles';

const theme = createMuiTheme({

  overrides: {
      
      MuiDialog: {
          // Name of the rule
          paper: {
              // Some CSS
              backgroundColor: '#37474f',
              color: '#eceff1',
          },
      },
      MuiButton: {
          // Name of the rule
          text: {
              // Some CSS
              backgroundColor: '#37474f',
              color: '#eceff1',
              '&:hover': {
                color: 'rgb(23, 243, 255)'
              }
          },
      },
<<<<<<< HEAD
      MuiSvgIcon: {
          root: {
              color: 'rgb(23, 243, 255)',
          },

      },
=======
      // MuiSvgIcon: {
      //     root: {
      //         color: 'rgb(23, 243, 255)',
      //     },

      // },
>>>>>>> master
      MuiTypography: {
          body2: {
              fontSize: 14,
              color: '#cfd8dc',
          },
      },
      MuiInput: {
          input: {
              color: '#eceff1',
          },
      },
    
      MuiInputLabel: {
          animated: {
              color: '#90a4ae',
          },
      },
    
   
      palette: {
          primary: {
              primary: '#eceff1',
              light: '#eceff1',
              main: '#eceff1',
              dark: '#eceff1',

          },
          secondary: {
              light: '#eceff1',
              main: '#eceff1',
              dark: '#eceff1',
          },
      },
  }
})


const CssTextField = withStyles({
root: {
  '& label.Mui-focused': {
    color: 'rgb(23, 243, 255)',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'rgb(23, 243, 255)',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: 'rgb(23, 243, 255)',
    },
  },
},
})(TextField);

export default function UsernameForm(props) {
  const [username, setUsername] = useState('');
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    const tempSocket = io.connect('ws://localhost:8080');
    tempSocket.emit('is-session-active', props.room);
    tempSocket.on('session-status', (isActive) => {
      if (!isActive) {
        setRedirect('/rooms/closed');
      }
    });
  }, []);

  function handleChange(e) {
    setUsername(e.target.value);
  }

  function joinRoom() {
    props.handleClose();
    props.updateUsername(username);
  }

  if (redirect) {
    return <Redirect to={redirect} />
  }

  return (
    <div>
       <ThemeProvider theme={theme}>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle id="form-dialog-title">Join Room</DialogTitle>
        <DialogContent>
          <CssTextField
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
          <Button onClick={props.handleClose} >
            Cancel
          </Button>
          <Button onClick={joinRoom} >
            Join
          </Button>
        </DialogActions>
      </Dialog>
      </ThemeProvider>
    </div>
  );
}

