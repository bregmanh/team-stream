import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    // MuiSvgIcon: {
    //   root: {
    //     color: '#10959D',
    //     '&:hover': {
    //       color: 'rgb(23, 243, 255)'
    //     }
    //   },
    // },
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
    }
  }
})

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function CopyLink(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    props.copyLink();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <ThemeProvider theme={theme}>
        {props.icon &&
          <PersonAddIcon aria-describedby={id} onClick={handleClick} fontSize="large" onMouseOver="color: 'rgb(23, 243, 255)'"
          onMouseOut="color: '#10959D'"/>
        }{props.button &&
          <Button onClick={handleClick} >
            Copy Link
      </Button>
        }
      </ThemeProvider>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>Link copied to clipboard</Typography>
      </Popover>
    </div>
  );
}