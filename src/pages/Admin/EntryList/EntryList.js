import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, CircularProgress } from '@material-ui/core';
import styles from './styles';
import { EntryToolbar, EntryTable } from './components';
import { getEntrys, getUsers, 
  getAllTeams, 
  selectEntry,
  deleteEntry,
  toggleEntryDialog,
  addEntry,
  updateEntry
 } from '../../../store/actions';
import { match } from '../../../utils';
import AddEntry from './components/AddEntry/AddEntry';
import { ResponsiveDialog } from '../../../components';

class EntryList extends Component {
  state = {
    editEntry: null,
    openEditDialog: false,
    search: '',
    notification: {}
  }

  componentDidMount() {
    const { entry, getEntrys } = this.props
    if (!entry.length) getEntrys();
  }

  openEditDialog = entry => {
    this.setState({ openEditDialog: true, editEntry: entry})
  };

  CloseEditDialog = () => {
    this.setState({ openEditDialog: false, editEntry: null });
  };

  editEntry(data) {
    this.openEditDialog(data)
  }

  renderEntry() {
    const { classes, entry, selectedEntry, selectEntry, selectAllEntry} = this.props;
    const filteredEntry = match(this.state.search, entry, 'location');
    if (!entry.length) {
        return (
          <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
        )
    }
    return (
      <EntryTable
        onSelect={selectEntry}
        onSelectAll={selectAllEntry}
        entry={filteredEntry}
        selectedEntry={selectedEntry}
      />
    );
  }

  render() {
    const { classes, entry, selectedEntry, deleteEntry, addEntry } = this.props;
    const { editEntry, search, openEditDialog } =this.state
      
    return (
      <div className={classes.root}>
        <EntryToolbar
          search={search}
          onChangeSearch={e => this.setState({ search: e.target.value })}
          entry={entry}
          selectedEntry={selectedEntry}
          toggleDialog={this.openEditDialog}
          deleteEntry={deleteEntry}
        />
        
        <div className={classes.content}>{this.renderEntry()}</div>
        
        <ResponsiveDialog
          id="Edit-entry"
          open={openEditDialog}
          handleClose={() => this.CloseEditDialog()}>
          <AddEntry
            selectedData={entry.find(data => data._id === selectedEntry[0])}
            addEntry={addEntry}
            handleClose={() => this.CloseEditDialog()}
            editEntry={editEntry}
          />
        </ResponsiveDialog>
      </div>
    );
  }
}

const mapStateToProps = ({ entryState, teamState, userState }) => ({
  entry: entryState.entry,
  selectedEntry: entryState.selectedEntry,
  openDialog: userState.openDialog,
  allTeams: teamState.allTeams,
  users: userState.users
});

const mapDispatchToProps = {
  getAllTeams,
  getEntrys,
  getUsers,
  selectEntry,
  toggleEntryDialog,
  addEntry,
  updateEntry,
  deleteEntry
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EntryList));
