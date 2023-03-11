import React, { useEffect } from 'react';
import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import { Paper } from '../../../components';
import { connect } from 'react-redux';
import { getTeams, getTeamEntrys } from '../../../store/actions';
import { history } from '../../../utils';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '3rem',
    lineHeight: '3rem',
    textAlign: 'center',
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(3)
  },
  imageWrapper: {
    height: '150px',
    margin: '0 auto',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

function TeamBoard(props) {
  
  const { teams, getTeams } = props
  useEffect(() => {
      getTeams()
  }, [getTeams])


  
  console.log(teams)
  
  const classes = useStyles()
  const teamsImage = teams && teams.image ? teams.image
    : 'https://www.atomicarchive.com/img/bios/marie-curie.jpg';
          
  return (
    <Container maxWidth="xl">
            <Grid item xs={12}>
              <Typography className={classes.title} variant="h2" color="inherit">
                Your Team
              </Typography>
            </Grid>
            <Paper>
            {(!teams) ? <CircularProgress /> : (
            <div key={teams._id} onClick={() => history.push(`/teamdash/entry/${teams._id}`)}>
                <Paper>
                    <div className={classes.imageWrapper}>
                      <img alt="team" className={classes.image} src={teamsImage} />
                    </div>
                    <div className={classes.title}>
                      <Typography className={classes.title} variant="h4">
                        {teams.name}
                      </Typography>
                    </div>
                </Paper>
           </div>
              )  
              }
            </Paper>
    </Container>
  )
}

const mapStateToProps = ({teamState, authState, entryState }) => ({
  teams: teamState.teams,
  user: authState.user,
  teamEntry: teamState.teamEntry
})

const mapDispatchToProps = { getTeams, getTeamEntrys }

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(TeamBoard)