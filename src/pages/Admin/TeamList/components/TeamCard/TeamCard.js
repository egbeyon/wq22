import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Paper } from '../../../../../components';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
    paddingBottom: theme.spacing(2),
    cursor: 'pointer'
  },
  imageWrapper: {
    height: '200px',
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
  member: {
    lineHeight: '16px',
    height: theme.spacing(4),
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  eventText: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary
  }
}));

function TeamCard(props) {
  const classes = useStyles(props);
  const { className, team } = props;
  const teamImage = !team ? '' : team.imageUrl
  const rootClassName = classNames(classes.root, className);
  
  return (
    <Paper className={rootClassName}>
      <div className={classes.imageWrapper}>
        <img alt="team" className={classes.image} src={teamImage} />
      </div>
      <div className={classes.details}>
        <Typography className={classes.name} variant="h4">
          {team.name}
        </Typography>
      </div>
      {(team && team.members) ? (
          team.members.map((value, id) => (
            <div className={classes.member} key={id}>
                <Typography className={classes.eventText} id={`name-${id}`} variant="body2">
                 {value.name} 
                </Typography>
                <Typography className={classes.eventText} id={`email-${id}`} variant="body2">
                 {value.email} 
                </Typography>
                <Typography className={classes.eventText} id={`phone-${id}`} variant="body2">
                 {value.phone} 
                </Typography>
            </div>
          ))    
      ) : <Typography className={classes.member} variant="body1">
            No member
          </Typography>
          }
    </Paper>
  );
}

export default TeamCard;
