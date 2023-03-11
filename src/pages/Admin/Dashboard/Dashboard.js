import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid } from '@material-ui/core';
import {
  TotalUsers,
  TotalTeams,
  TotalEntry,
  LatestEntry,
  Anomalous,
  EntryByTeam
} from './components';
import {
  getUsers,
  getEntrys,
  getAllTeams
} from '../../../store/actions';

const styles = theme => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(4)
  }
});

class Dashboard extends Component {
  componentDidMount() {
    this.props.getUsers();
    this.props.getAllTeams();
    this.props.getEntrys();
    
  }

  getBestTeams = (entry, allTeams) => {
    const entryCounter = entry.map(data => ({
      teamId: data.teamId,
      count: entry.filter(r => r.teamId === data.teamId).length
    }));

    const result = [];
    const map = new Map();
    for (const item of entryCounter) {
      if (!map.has(item.teamId)) {
        map.set(item.teamId, true); // set any value to Map
        result.push({
          teamId: item.teamId,
          count: item.count
        });
      }
    }
    return result
      .sort((a, b) => b.count - a.count)
      .map(res => ({
        team: allTeams.find(team => team._id === res.teamId),
        count: res.count
      }));
  };

  getHighestParameters = (entry, param) => {
    const top5 = entry.map(datum => datum[`${param}`] )
      .sort((b,a) => (!b ? 0 : b[`${param}`]) - (!a ? 0 : a[`${param}`]))
      .slice(0,7)
      return top5
  } 

  render() {
    const { classes, user, users, allTeams, entry } = this.props;
    const latest = entry.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    const guests = users.filter(user => user.role === 'guest')
    const latest_entry = (!latest.length) ? 0 : latest[0]
    
    return (
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalUsers users={guests.length} user={user} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalTeams allTeams={allTeams.length} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalEntry entry={entry.length} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <LatestEntry latest={latest_entry} />
          </Grid>
          
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <Anomalous highParam={this.getHighestParameters} entry={entry}  
            />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <EntryByTeam  bestTeams={this.getBestTeams(entry, allTeams)} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ authState, userState, teamState, entryState, alertState }) => ({
  users: userState.users,
  user: authState.user,
  allTeams: teamState.allTeams,
  entry: entryState.entry
});
const mapDispatchToProps = {
  getUsers,
  getAllTeams,
  getEntrys
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Dashboard));
