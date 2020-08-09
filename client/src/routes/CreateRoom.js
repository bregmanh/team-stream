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


import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';

const theme = createMuiTheme({
    spacing: [0, 2, 3, 5, 8],
    overrides: {
        // Style sheet name ⚛️

        MuiDialog: {
            // Name of the rule
            text: {
                // Some CSS
                color: '#eceff1',
            },
            paper: {
                // Some CSS
                backgroundColor: '#37474f',
                color: '#eceff1',
            },
        },
        MuiTypography: {


            body2: {

                fontSize: 14,
                color: '#cfd8dc',
            },
        },
    },


    palette: {
        primary: {
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
});
const useStyles = makeStyles({
    root: {
        background: '#37474f',
        color: '#eceff1',

    },
    label: {
        background: '#37474f',
        color: '#eceff1',
    },
});
export default function CreateRoom(props) {
    const classes = useStyles();

    const [username, setUsername] = useState(null);
    const [title, setTitle] = useState(null);
    const [publicBool, setPublicBool] = useState('true');

    const handleChange = (event) => {
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
        props.createSession(title, username, publicBool);
    }
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Create Room</DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ color: '#cfd8dc' }}>
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
                        <DialogContentText >
                        <Typography variant="body2" mt={3}>
                            </Typography>
                        </DialogContentText>
                        <DialogContentText >
                            <Typography variant="body2" mt={3}>
                                Private rooms are only accessible to people you invite. Public rooms are displayed on our page and anyone can join!
                            </Typography>
                        </DialogContentText>
                        <DialogContentText >
                        <Typography variant="body2" mt={3}>
                            </Typography>
                        </DialogContentText>
                        <FormControl component="fieldset">
                            <FormLabel component="legend" style={{ color: '#cfd8dc' }}>Room Type</FormLabel>
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
            </ThemeProvider>
        </div>
    );
}



