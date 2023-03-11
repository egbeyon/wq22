import React, { Component } from 'react';
import PointDisplay from './components/PointDisplay';
import { getEntrys } from '../../../store/actions'
import { CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import { match } from '../../../utils';
import styles from './styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GeoToolbar from './components/GeoToolbar/GeoToolbar';

class Geospatial extends Component {
  state = {
    search: '',
    entryParam: 'all',
    notification: {}
  }

  componentDidMount() {
    getEntrys()
  }

  getEntryParameters = (entry, param) => {
    let data = []
    if (param !== 'all') {
      let iterator = entry.map((datum, id) => datum);
        data.push({
          longitude: iterator.longitude,
          latitude: iterator.latitude,
          queryParam: iterator[`${param}`]
        })
      
    }
    else {
      data = entry.map((datum) => (datum) )
    }
    return data
  }
  // 'very high',
  // 'high',
  // 'fair',
  // 'bad'

  render() {
    const { entryParam, search } = this.state
    const { classes, entry } = this.props
    const filteredEntry = match(this.state.search, entry, 'location');
    
    if (!entry.length) {
      return (
        <div className={classes.root}>
            <div className={classes.progressWrapper}>
                <CircularProgress />
            </div>
        </div>
        
      )
  }
    return (
      
      <div className={classes.root}>
        {(!entry.length) ? 
            (<div className={classes.progressWrapper}>
              <CircularProgress />
            </div>) :
            (
              <div>
                <GeoToolbar
                  search={search}
                  onChangeSearch={e => this.setState({search: e.target.value})}
                  entry={filteredEntry}
                  entryParams={entryParam}
                  onChangeParam={e => this.setState({entryParam: e.target.value})}
                />
          
                <PointDisplay
                  entry={filteredEntry} 
                  entryParam={entryParam}
                  />
              </div>
            )
      }
        
      </div>
    )
  }
}

Geospatial.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ entryState }) => ({
  entry: entryState.entry
});

const mapDispatchToProps = { getEntrys };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Geospatial));
