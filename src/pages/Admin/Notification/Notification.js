import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Paper } from '../../../components';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '60%',
    paddingBottom: theme.spacing(2),
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageWrapper: {
    height: '200px',
    width: '400px',
    margin: '0 auto',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    'object-fit': 'cover'
  },
  details: { padding: theme.spacing(3) },
  name: {
    fontSize: '18px',
    lineHeight: '21px',
    marginTop: theme.spacing(2),
    textTransform: 'capitalize'
  },
  report: {
    width: '400px',
    lineHeight: '21px',
    fontSize: '22px',
    height: theme.spacing(6),
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: '#fffff',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  eventText: {
    marginLeft: theme.spacing(1),
    color: '#fffff'
  }
}));

function Notification(props) {
  const classes = useStyles(props);
  const { className, newNotifications } = props;
  const rootClassName = classNames(classes.root, className);
  
  return (
    <div>
      {(newNotifications && newNotifications.length > 0) ? (
          newNotifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((value, id) => (
        <div className={rootClassName} key={id}>
            <Paper className={classes.report}>
                <Typography className={classes.eventText} id={`name-${id}`} variant="body2">
                 Title: {value.title} 
                </Typography>
                <Typography className={classes.eventText} id={`email-${id}`} variant="body2">
                 {value.message} 
                </Typography>
                <Typography className={classes.eventText} id={`email-${id}`} variant="body2">
                 {value.createdAt} 
                </Typography>
            </Paper>
        </div>
          ))    
      ) : <Typography className={classes.report} variant="body1">
            Nothing for you
          </Typography>
          }
    </div>
  );
}

  export default Notification
