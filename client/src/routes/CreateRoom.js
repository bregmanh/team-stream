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
import Typography from '@material-ui/core/Typography';
import { spacing } from '@material-ui/system';
import './CreateRoom.css'


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
        MuiSvgIcon: {
            root: {
                color: 'rgb(23, 243, 255)',
            },

        },
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

const useStyles = makeStyles({
    root: {
        color: '#eceff1'
    },
    textField: {
        color: '#eceff1'
    },
    input: {
        color: '#eceff1'
    }
});


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




export default function CreateRoom(props) {
    const classes = useStyles();

    const [username, setUsername] = useState(null);
    const [title, setTitle] = useState(null);
    const [publicRoom, setPublicRoom] = useState("true");

    const handleChange = (event) => {
        setPublicRoom(event.target.value);
    };

    function handleUsernameChange(e) {
        setUsername(e.target.value);
    }

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handleCreate(e) {
        props.handleClose();
        const publicBool = publicRoom === 'true';
        console.log({ publicRoom });
        console.log({ publicBool });
        props.createSession(title, username, publicBool);
    }
    return (
        <div className="create-room-modal">
            <ThemeProvider theme={theme}>
                <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Create Room</DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ color: '#cfd8dc' }}>
                            Create a room to share your streaming experience with others!
            </DialogContentText>

                        <CssTextField

                            autoFocus
                            margin="dense"
                            id="username"
                            label="Enter username"
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                            fullWidth
                        />

                        <CssTextField
                            margin="dense"
                            id="room-title"
                            label="Room Title"
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                            fullWidth
                        />
                        <DialogContentText >

                            <Typography variant="body2" style={{paddingTop: '20px' }}>
                                Private rooms are only accessible to people you invite. Public rooms are displayed on our page and anyone can join!
                            </Typography>

                        </DialogContentText>
                      
                        <FormControl component="fieldset">
                            <FormLabel component="legend" style={{ color: '#cfd8dc', paddingTop: '20px' }}>Room Type</FormLabel>
                            <RadioGroup aria-label="room-type" name="gender1" value={publicRoom} onChange={handleChange}>
                                <FormControlLabel value='true' control={<Radio />} label="public" />
                                <FormControlLabel value='false' control={<Radio />} label="private" />
                            </RadioGroup>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.handleClose} >
                            Cancel
            </Button>
                        <Button onClick={handleCreate}>
                            Create!
            </Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </div>
    );
}



