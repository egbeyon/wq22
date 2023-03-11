import React from 'react';
import { makeStyles, Grid, Typography, Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '3rem',
    lineHeight: '3rem',
    textAlign: 'center',
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(3)
  }
}));

function ContactPage() {
   const classes = useStyles();

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h2" color="inherit">
            Water Quality Application
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={12}
          alignItems="center"
          spacing={2}>
            <Typography>
                
            </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ContactPage;