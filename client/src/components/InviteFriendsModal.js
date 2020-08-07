import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CopyLink from './CopyLink';

export default function InviteFriendsModal(props) {


  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Invite Friends!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Invite friends to join the room by copying the link to the clipboard!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CopyLink copyLink={props.copyLink} button={true} autoFocus />
          <Button onClick={props.closeModal} color="primary">
            Close
      </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}