import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, IconButton, withStyles } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { SearchInput } from '../../../../../components';
import styles from './styles';

const EntryToolbar = props => {
    const {
        classes,
        className,
        selectedEntry,
        toggleDialog,
        deleteEntry,
        search,
        onChangeSearch
      } = props;
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
             <div>
              {selectedEntry.length > 0 && (
                <IconButton className={classes.deleteButton} onClick={() => deleteEntry(selectedEntry) }>
                  <DeleteIcon />
                </IconButton>
              )}
              {selectedEntry.length === 1 && (
              <Button
                onClick={() => toggleDialog(selectedEntry)}
                color="primary"
                size="small"
                variant="outlined">
                 Edit
              </Button>
              )}
            </div>
          </div>
        </div>
      )
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
