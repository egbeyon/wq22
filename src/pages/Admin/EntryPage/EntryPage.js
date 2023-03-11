import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { Table, TableBody, TableCell, TableHead, TableRow, TablePagination
} from '@material-ui/core';
import { Portlet, PortletContent } from '../../../components';
import styles from './styles';
import { connect } from 'react-redux';

class EntryPage extends Component {
  state = {
    rowsPerPage: 10,
    page: 0
  };

  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    onSelect: PropTypes.func,
    onShowDetails: PropTypes.func,
    selectedEntry: PropTypes.array.isRequired,
    user: PropTypes.array.isRequired,
    team: PropTypes.array.isRequired
  };

  static defaultProps = {
    entry: [],
    user: [],
    team: [],
    onSelect: () => {},
    onShowDetails: () => {}
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  onFindAttr = (id, list, attr) => {
    const item = list.find(item => item._id === id);
    return item ? item[attr] : `Not ${attr} Found`;
  };

  render() {
    const { classes, className, selectedEntry } = this.props;
    const { rowsPerPage, page } = this.state;
    const rootClassName = classNames(classes.root, className);
    console.log(selectedEntry)

    return (
      <Portlet className={rootClassName}>
        <PortletContent noPadding>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Water Criteria</TableCell>
                <TableCell align="left">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(selectedEntry) &&
                // .map((index, data) => (
                  <TableRow className={classes.tableRow}
                    hover
                    key={selectedEntry.index}>
                    <TableCell className={classes.tableCell}>
                        {selectedEntry.index}
                    </TableCell>  
                    <TableCell className={classes.tableCell}>
                      {selectedEntry.teamId}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {selectedEntry.userId}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {selectedEntry.location}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {selectedEntry.createdAt}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {selectedEntry.temperature}
                    </TableCell>
                  </TableRow>
                }
            </TableBody>
          </Table>
          <TablePagination
            backIconButtonProps={{
              'aria-label': 'Previous Page'
            }}
            component="div"
            count={selectedEntry.length}
            nextIconButtonProps={{
              'aria-label': 'Next Page'
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </PortletContent>
      </Portlet>
    );
  }
}

const mapStateToProps = ({ entryState, teamState, userState }) => ({
  selectedEntry: entryState.selectedEntry
});

const mapDispatchToProps = {
  
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EntryPage));
