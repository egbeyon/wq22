import React from 'react';
import { Divider, Typography } from '@material-ui/core';
import useStyles from './styles';

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Divider />
      <Typography className={classes.copyright} variant="body1">
        &copy; ...2022
      </Typography>
    </div>
  );
}
