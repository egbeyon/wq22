import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatarGreen: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.primary.main,
    height: 56,
    width: 56
  },
  avatarRed: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.primary.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  }
}));

const LatestEntry = props => {
  const { className, latest } = props;
  
  const classes = useStyles();
  //const latest = entry.sort((a, b) => new Date(b.date) - new Date(a.date))[0]

  return (
    <Card className={classnames(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="inherit"
              gutterBottom
              variant="body2">
              LATEST ENTRY
            </Typography>
            <Typography color="inherit" variant="h3">
              {latest.location}
            </Typography>
          </Grid>
          
          {(latest.temperature) > 20 ? (
            <Grid item>
            <Avatar className={classes.avatarRed}>
              <EventIcon className={classes.icon} />
            </Avatar>
            </Grid>
          )
            : (
            <Grid item>
            <Avatar className={classes.avatarGreen}>
              <EventIcon className={classes.icon} />
            </Avatar>
            </Grid>
            )}
        </Grid>
      </CardContent>
    </Card>
  );
};

LatestEntry.propTypes = {
  className: PropTypes.string
};

export default LatestEntry;
