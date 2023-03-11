import React from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles, Button } from '@material-ui/core';
import { Add } from '@material-ui/icons'

// Shared components
import { SearchInput } from '../../../../../components';

// Component styles
import styles from './styles';

const EntryToolbar = props => {

  const { classes, className, selectedEntry,
      toggleDialog, search, onChangeSearch } = props;

  const rootClassName = classNames(classes.root, className);

    return (
        <div className={rootClassName}>
          <div className={classes.row}>
            <SearchInput
              className={classes.searchInput}
              placeholder="Search entry by location"
              value={search}
              onChange={onChangeSearch}
            />
            <Button
              onClick={() => toggleDialog()}
              
              size="large"
              variant="contained">
              <Add />
            </Button>
            
          </div>
          {selectedEntry.length === 1 && (
              <Button
                onClick={() => toggleDialog(selectedEntry)}
                color="primary"
                size="small"
                variant="outlined">
                 View data
              </Button>
              )}
        </div>
    );
  }


EntryToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  selectedEntry: PropTypes.array
};

EntryToolbar.defaultProps = {
  selectedEntry: [],
}

export default withStyles(styles)(EntryToolbar);
