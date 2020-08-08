import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    height: '40%',
    width: '30%',
    color: 'white',
    backgroundColor: '#0D7C83'
  },
  media: {
    padding: '20%',
    backgroundColor: 'black'
  },
});

export default function RoomListItem (props) {
  const classes = useStyles();

  const [redirect, setRedirect] = useState(null);

  if (redirect) {
    return <Redirect to={redirect} />
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {props.title}
          </Typography>
          <Typography variant="body2" component="p">
            Viewers: 10
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button width="20%" padding="1rem" color="#10959D" onClick={() => setRedirect(`/room/${props.id}`)}>
          Join
        </Button>
      </CardActions>
    </Card>
  )
}