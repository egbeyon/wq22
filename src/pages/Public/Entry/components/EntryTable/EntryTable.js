import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Checkbox, Typography, withStyles } from '@material-ui/core';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination
} from '@material-ui/core';

import { Portlet, PortletContent } from '../../../../../components';
import styles from './styles';
//import Entry from '../Entry';

class EntryTable extends Component {
  state = {
    rowsPerPage: 10,
    page: 0
  };

  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    onSelect: PropTypes.func,
    onShowDetails: PropTypes.func,
    teamEntry: PropTypes.array.isRequired
  };

  static defaultProps = {
    teamEntry: [],
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
    const { classes, className,  teamEntry, onSelect, selectedEntry } = this.props;
    const { rowsPerPage, page } = this.state;
    const rootClassName = classNames(classes.root, className);

    return (
        <Portlet className={rootClassName}>
          <PortletContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.topLabel} align="left">Locations</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teamEntry
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(data_entry => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={data_entry._id}
                      selected={selectedEntry.indexOf(data_entry._id) !== -1}>
                      <TableCell className={classes.tableCell}>
                        <div className={classes.tableCellInner}>
                              <Checkbox
                                checked={selectedEntry.indexOf(data_entry._id) !== -1}
                                color="primary"
                                onChange={() => onSelect(data_entry._id)}
                                value="true"
                            />
                            <Typography className={classes.nameText} variant="body1">
                                {data_entry.location}
                            </Typography>
                        </div>
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
              count={teamEntry.length}
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
