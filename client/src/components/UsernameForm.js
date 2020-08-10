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
        // Style sheet name ⚛️

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
            },
        },
        MuiSvgIcon: {
            root: {
                color: '#10959D',
            },

        },
        MuiTypography: {
            body2: {
                fontSize: 14,
                color: '#cfd8dc',
            },
        },
        MuiInput: {
            root: {
                color: '#eceff1',
            },
            input: {
                color: '#eceff1',
            }
        },
        MuiFormControl: {
            root: {
                color: '#eceff1',
            }
        },
        MuiInputLabel: {

            animated: {
                color: '#eceff1',
            }

        },
        // MuiFormLabel:{
        //     root:{
        //         Mui:{
        //             focused:{
        //                 color: '#eceff1',
        //             }
        //         }
        //     }
        // },
        // "& .MuiFormLabel-root.Mui-focused":{
            
        //     color: '#eceff1',
            
        // },
        '& label.Mui-focused': {
            color: '#eceff1',
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
            textField: {
                color: '#eceff1'
            },
        },
    }
})

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

