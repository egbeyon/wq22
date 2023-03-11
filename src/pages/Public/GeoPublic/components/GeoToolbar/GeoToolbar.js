import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MenuItem, Select, withStyles } from '@material-ui/core';
import { SearchInput } from '../../../../../components';
import styles from './styles';

const GeoToolbar = (props) => {
  
  const { classes, className, search, onChangeSearch, entryParams, onChangeParam } = props;
  const paramList = [ 'all', 'temperature', 'sulphate', 'microbe', 'pH' ];
  const rootClassName = classNames(classes.root, className);

    return (
      <Fragment>
        <div className={rootClassName}>
          <div className={classes.row}>
            <SearchInput
              className={classes.searchInput}
              placeholder="Search water quality by location"
              value={search}
              onChange={onChangeSearch}
            />
            <Select
                className={classes.selectInput}
                margin="dense"
                size="small"
                value={entryParams}
                variant="outlined"
                onChange={onChangeParam}
                >
                {paramList.map((Micron, index) => (
                  <MenuItem key={index} value={Micron}>{Micron}</MenuItem>
                ))}
            </Select>
          </div>
        </div>
      </Fragment>
    );
  
}

GeoToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GeoToolbar);
