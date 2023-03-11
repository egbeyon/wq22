import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, CircularProgress } from '@material-ui/core';
import styles from './styles';
import { EntryToolbar, EntryTable } from './components';
import { getEntrys, toggleEntryDialog, getTeams, selectEntry } from '../../../store/actions';
import { match } from '../../../utils';
import AddEntry from './components/AddEntry/AddEntry';
import { ResponsiveDialog } from '../../../components';

class EntryList extends Component {
  state = {  search: '', editEntry: null, openEditDialog: false };

  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
  };

  componentDidMount() {
    const {
      entry,
      teams,
      getEntrys,
      getTeams
    } = this.props;

    if(!teams.length) getTeams()
    if (!entry.length) getEntrys()
  }

  openEditDialog = entry => {
    this.setState({ openEditDialog: true, editEntry: entry });
  };

  CloseEditDialog = () => {
    this.setState({ openEditDialog: false, editEntry: null });
  };

  viewEntry(data) {
    this.openEditDialog(data)
  }

  onChangeSearch = e => this.setState({ search: e.target.value });

  render() {
    const { search } = this.state;
    const { classes, selectedEntry, teams, entry, selectEntry} = this.props;
    const myTeamEntry = entry.filter(data => data.teamId === teams._id)
    const filteredEntry = (!myTeamEntry) ? myTeamEntry : match(search, myTeamEntry, 'location');
    
    return (
          <div className={classes.root}>
            <EntryToolbar
              search={search}
              selectedEntry={selectedEntry}
              toggleDialog={this.openEditDialog}
              onChangeSearch={this.onChangeSearch}

            />
            
            <div className={classes.content}>
              {!filteredEntry ? (
                <div className={classes.progressWrapper}>
                  <CircularProgress />
                </div>
              ) : (
                    <EntryTable
                    teamEntry={filteredEntry} 
                    onSelect={selectEntry}
                    selectedEntry={selectedEntry}
                  />
              ) }
            </div>
            <ResponsiveDialog
                  id="edit-entry"
                  open={this.state.openEditDialog}
                  handleClose={() => this.CloseEditDialog()}>
              <AddEntry 
                selectedData={entry.find(data => data._id === selectedEntry[0])}
                handleClose={() => this.CloseEditDialog()}
                editEntry={this.state.editEntry}  />
            </ResponsiveDialog>
          </div>
      
    );
  }
}

const mapStateToProps = ({ entryState, teamState, authState, userState }) => ({
  teams: teamState.teams,
  user: authState.user,
  selectedEntry: entryState.selectedEntry,
  openDialog: userState.openDialog,
  entry: entryState.entry
});

const mapDispatchToProps = {
  getEntrys,
  toggleEntryDialog,
  selectEntry,
  getTeams
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EntryList));