import React from 'react';
import { Box, Button } from '@material-ui/core';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow
// } from '@material-ui/core';
import { makeStyles, Grid, Typography, Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  label: { width: 120, height: 20, overflow: 'hidden' }
}));

const Stats = ({ stats, classes }) =>
  stats.map((stat, index) => (
    <Box key={`${stat.label}-${index}`} display="flex" alignItems="center">
      <Typography
        className={classes.label}
        color="inherit"
        gutterBottom
        variant="subtitle1">
        {stat.label}
      </Typography>
      <Typography color="inherit" variant="body2" gutterBottom>
        {stat.value}
      </Typography>
    </Box>
  ));

const Entry = ({chosenEntry, viewEntry, closeEntry }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="xl">
      <Grid container spacing={5}>
        {(chosenEntry) && 
          chosenEntry.map((item, index) => (
            <Box key={`${item}-${index}`} display="flex" alignItems="center">
              <Typography
                className={classes.label}
                color="inherit"
                gutterBottom
                variant="subtitle1">
                {index}
              </Typography>
              <Typography color="inherit" variant="body2" gutterBottom>
                {item}
              </Typography>
            </Box>
          ))
        }
        
      <Grid item xs={8} container direction="column" spacing={2}>
        <Grid item xs>
          <Stats
            classes={classes}
            stats={[
              { label: 'Released', value: '19 September 2019' },
              { label: 'Runtime', value: '1h 20mins' },
              { label: 'Director', value: 'George Simos' },
              { label: 'Genre', value: 'Action' },
              { label: 'Status', value: 'Released' },
              { label: 'Language', value: 'English' }
            ]}
          />
        </Grid>
      </Grid>
      </Grid>
      <Button onClick={closeEntry} color="primary" autoFocus>
          close
      </Button>
    </Container>
  )
}

export default Entry;