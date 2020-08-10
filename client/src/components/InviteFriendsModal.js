import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CopyLink from './CopyLink';
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
              paddingBottom: '15px'
          },
      },
      MuiInput: {
          root: {
              color: '#eceff1',
          },
          input: {
              color: '#eceff1',
              
          },
          
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
      MuiFormLabel:{
          root:{
            '&:focused': {
                color: '#eceff1',
             
            },
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

export default function InviteFriendsModal(props) {


  return (
    <div>
       <ThemeProvider theme={theme}>
      <Dialog
        open={props.open}
        onClose={props.closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Invite Friends!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{ color: '#cfd8dc' }}>
            Invite friends to join the room by copying the link to the clipboard!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CopyLink copyLink={props.copyLink} button={true} autoFocus />
          <Button onClick={props.closeModal} >
            Close
      </Button>
        </DialogActions>
      </Dialog>
      </ThemeProvider>
    </div>
  );
}