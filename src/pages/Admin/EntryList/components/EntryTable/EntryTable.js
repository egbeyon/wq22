import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Checkbox, Typography, withStyles } from '@material-ui/core';
import { Table, TableBody, TableCell, TableHead, TableRow, TablePagination
} from '@material-ui/core';
import { Portlet, PortletContent } from '../../../../../components';
import styles from './styles';

class EntryTable extends Component {
  state = {
    selectedEntry: [],
    rowsPerPage: 10,
    page: 0
  };

  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    onSelect: PropTypes.func,
    onShowDetails: PropTypes.func,
    entry: PropTypes.array.isRequired,
    // users: PropTypes.array.isRequired,
    // allTeams: PropTypes.array.isRequired
  };

  static defaultProps = {
    entry: [],
    // users: [],
    // allTeams: [],
    onSelect: () => {}
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  // onFindAttr = (id, list, attr) => {
  //   const item = list.find(item => item._id === id);
  //   return item ? item[attr] : `Not ${attr} Found`;
  // };

  render() {
    const { classes, className, entry, 
      onSelect, selectedEntry } = this.props;
    const { rowsPerPage, page } = this.state;
    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet className={rootClassName}>
        <PortletContent noPadding>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell align="left">
                  {/* <Checkbox
                    checked={selectedEntry.length === entry.length}
                    color="primary"
                    indeterminate={
                      selectedEntry.length > 0 &&
                      selectedEntry.length < entry.length
                    }
                    onChange={onSelectAll}
                  /> */}
                  Team
                </TableCell>
                <TableCell align="left">User</TableCell>
                <TableCell align="left">Location</TableCell>
                <TableCell align="left">Created At</TableCell>
                <TableCell align="left">Temperature</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entry
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((datum) => (
                  
                    <TableRow
                        className={classes.tableRow}
                        hover
                        key={datum._id}
                        selected={selectedEntry.indexOf(datum._id) !== -1}
                        >
                        <TableCell className={classes.tableCell} >
                          <div className={classes.tableCellInner}>
                              <Checkbox
                                checked={selectedEntry.indexOf(datum._id) !== -1}
                                color="primary"
                                onChange={() => onSelect(datum._id)}
                                value="true"
                            />
                            <Typography className={classes.nameText} variant="body1">
                              {datum.teamId}
                            </Typography>
                        </div>
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {datum.userId}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {datum.location}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {datum.createdAt}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {datum.temperature}
                        </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            
          </Table>
          <TablePagination
            backIconButtonProps={{
              'aria-label': 'Previous Page'
            }}
            component="div"
            count={entry.length}
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

export default withStyles(styles)(EntryTable);
