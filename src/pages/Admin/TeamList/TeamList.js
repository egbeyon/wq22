import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllTeams } from '../../../store/actions';
import { withStyles } from '@material-ui/core';
import { CircularProgress, Grid } from '@material-ui/core';
import { UpdateTeam, TeamToolbar } from './components';
import { ResponsiveDialog } from '../../../components';
import styles from './styles';
import TeamCard from '../TeamList/components/TeamCard/TeamCard'
import { match } from '../../../utils';

class TeamList extends Component {
 state = {
      editTeam: null,
      openEditDialog: false,
      search: ''
    };

  componentDidMount() {
    const { allTeams, getAllTeams } = this.props;
    if (!allTeams.length) getAllTeams()
  }

  openEditDialog = team => {
    this.setState({ openEditDialog: true, editTeam: team });
  };

  CloseEditDialog = () => {
    this.setState({ openEditDialog: false, editTeam: null });
  };

  editTeam(team) {
    this.openEditDialog(team);
  }

  render() {
    const { classes, allTeams } = this.props;
    const { editTeam, search } = this.state;
    const filteredTeams = (!allTeams) ? allTeams : match(search, allTeams, 'name');
    return (
      <div className={classes.root}>
        <TeamToolbar
          search={search}
          onChangeSearch={e => this.setState({ search: e.target.value })}
        />
        <div className={classes.content}>
          {filteredTeams.length === 0 ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={3}>
              {filteredTeams.map(team => (
                <Grid
                  item
                  key={team._id}
                  lg={4}
                  md={6}
                  xs={12}
                  onClick={() => this.openEditDialog(team)}>
                  <TeamCard team={team} />
                </Grid>
              ))}
            </Grid>
          )}
        </div>
        <ResponsiveDialog
          id="Edit-team"
          open={this.state.openEditDialog}
          handleClose={() => this.CloseEditDialog()}>
          < UpdateTeam
            editTeam={editTeam}
            handleClose={() => this.CloseEditDialog()}
          />
        </ResponsiveDialog>
      </div>
    );
  }
}

TeamList.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ teamState }) => ({
  allTeams: teamState.allTeams
});

const mapDispatchToProps = { getAllTeams };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TeamList));
