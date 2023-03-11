import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Typography, Select, MenuItem } from '@material-ui/core';
import { Button, TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { MicrobeData } from '../../../../../data/MicrobeData';
import styles from './styles';
import { addEntry, getEntrys, getTeam, updateEntry, deleteEntry, postAlert, getAlerts } from '../../../../../store/actions';

class AddEntry extends Component {
  state = {
    latitude: '',
    longitude: '',
    location: '',
    color: '',
    temperature: '',
    pH: '',
    conductivity: '',
    chlorine: '',
    sulphate: '',
    microbe: '',
    createdAt: new Date(),
    remark: '',
    notification: {}
  };
  
  componentDidMount() {
    if (this.props.selectedData) {
      const { ...rest } = this.props.selectedData;
      this.setState({ ...rest });
    }
    getTeam()
  }

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState[field] = value;
    this.setState(newState);
  };

  onSubmitAction = async type => {
    const {
    addEntry, updateEntry, getEntrys, deleteEntry, selectedData, postAlert, user
    } = this.props;
    const {
      latitude, longitude, location, color, temperature,
      pH, conductivity, chlorine, sulphate, microbe, remark, createdAt 
    } = this.state

    const userId = this.props.user._id
    const teamId = this.props.team._id
    const dataAdd = { userId, teamId, latitude, longitude, location, color, temperature,
      pH, conductivity, chlorine, sulphate, microbe, remark, createdAt } 
    
    const dataUpdate = {
      latitude, longitude, location, color, temperature,
      pH, conductivity, chlorine, sulphate, microbe, remark }
    let notification = {};
    type === 'create'
      ? (notification = await addEntry(dataAdd))
      : type === 'update'
      ? (notification = await updateEntry(dataUpdate, selectedData._id))
      : (notification = await deleteEntry(selectedData._id));
    this.setState({ notification });
    if (notification && notification.status === 'success') {
        getEntrys();
        postAlert({title: 'team altered', message: `${user.username} altered ${notification}`});
        getAlerts()
      }
  };

  render() {
    const { classes, className, selectedData } = this.props;
    
    const { latitude, longitude, location, color, temperature,
      pH, conductivity, chlorine, sulphate, microbe, remark,
      createdAt, notification
    } = this.state;

    const rootClassName = classNames(classes.root, className);
    const subtitle = selectedData ? 'Edit Entry' : 'Add Entry';
    const submitButton = selectedData ? 'Update Entry' : 'Save Details';
    const submitAction = selectedData
    ? () => this.onSubmitAction('update')
    : () => this.onSubmitAction('create');

    return (
      <div className={rootClassName}>
        <Typography variant="h4" className={classes.title}>
          {subtitle}
        </Typography>
            <form autoComplete="off" noValidate>
              <div className={classes.field}>
                    <TextField
                      className={classes.textField}
                      label="Location"
                      required
                      name="location"
                      variant="outlined"
                      value={location}
                      onChange={event =>
                        this.handleFieldChange('location', event.target.value)
                      }
                    />
                    <TextField
                      className={classes.textField}
                      type="number"
                      label="Longitude"
                      name="longitude"
                      value={longitude}
                      variant="outlined"
                      onChange={event =>
                        this.handleFieldChange('longitude', event.target.value)
                      }
                    />
                </div>
                <div className={classes.field}>
                    <TextField
                      className={classes.textField}
                      type="number"
                      label="Latitude"
                      name="latitude"
                      value={latitude}
                      onChange={event =>
                        this.handleFieldChange('latitude', event.target.value)
                      }
                      variant="outlined"
                    />
                    <TextField
                      className={classes.textField}
                      type="number"
                      label="temperature"
                      name="temperature"
                      value={temperature}
                      onChange={event =>
                        this.handleFieldChange('temperature', event.target.value)
                      }
                      variant="outlined"
                    />
                </div>
                <div className={classes.field}>
                    <TextField
                      className={classes.textField}
                      type="number"
                      label="pH"
                      name="pH"
                      value={pH}
                      onChange={event =>
                        this.handleFieldChange('pH', event.target.value)
                      }
                      variant="outlined"
                    />
                    <TextField
                      className={classes.textField}
                      type="number"
                      label="chlorine concentration"
                      name="chlorine"
                      value={chlorine}
                      onChange={event =>
                        this.handleFieldChange('chlorine', event.target.value)
                      }
                      variant="outlined"
                    />
                </div>
                <div className={classes.field}>
                    <TextField
                      className={classes.textField}
                      type="number"
                      label="sulphate concentration"
                      name="sulphate"
                      value={sulphate}
                      onChange={event =>
                        this.handleFieldChange('sulphate', event.target.value)
                      }
                      variant="outlined"
                    />
                    <TextField
                      className={classes.textField}
                      type="number"
                      label="conductivity"
                      name="conductivity"
                      value={conductivity}
                      onChange={event =>
                        this.handleFieldChange('conductivity', event.target.value)
                      }
                      variant="outlined"
                    />
                </div>
                <div className={classes.field}>
                    <TextField
                      className={classes.textField}
                      label="color"
                      name="color"
                      value={color}
                      onChange={event =>
                        this.handleFieldChange('color', event.target.value)
                      }
                      variant="outlined"
                    />
                    <TextField
                      className={classes.textField}
                      label="Remark"
                      name="remark"
                      value={remark}
                      onChange={event =>
                        this.handleFieldChange('remark', event.target.value)
                      }
                      variant="outlined"
                    />
                    <Select
                      displayEmpty
                      className={classes.textField}
                      label="Microbe"
                      margin="dense"
                      required
                      value={microbe}
                      variant="outlined"
                      onChange={event =>
                        this.handleFieldChange('microbe', event.target.value)
                      }>
                      {MicrobeData.map((Micron, index) => (
                        <MenuItem key={Micron + '-' + index} value={Micron}>
                          {Micron}
                        </MenuItem>
                      ))}
                    </Select>
                </div>
                <div className={classes.field}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                          className={classes.textField}
                          inputVariant="outlined"
                          margin="normal"
                          id="release-date"
                          label="Date"
                          value={createdAt}
                          onChange={date =>
                            this.handleFieldChange('Date', date._d)
                          }
                          KeyboardButtonProps={{
                            'aria-label': 'change date'
                          }}
                        />
                    </MuiPickersUtilsProvider>
                </div>
              </form>
              <Button
                    className={classes.buttonFooter}
                    color="primary"
                    onClick={submitAction}
                    variant="contained">
                    {submitButton}
              </Button>  
              {selectedData && (
                <Button
                  color="secondary"
                  className={classes.buttonFooter}
                  variant="contained"
                  onClick={this.onRemoveEntry}>
                    delete entry
                  </Button>
              )}
              {notification && notification.status ? (
                notification.status === 'success' ? (
                  <Typography
                    className={classes.infoMessage}
                    color="primary"
                    variant="caption">
                    {notification.message}
                  </Typography>
                ) : (
                  <Typography
                    className={classes.infoMessage}
                    color="error"
                    variant="caption">
                    {notification.message}
                  </Typography>
                )
              ) : null}
          </div>
    );
  }
}

AddEntry.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  team: state.teamState.team,
  user: state.authState.user
})

const mapDispatchToProps = { addEntry, updateEntry, getEntrys, deleteEntry, getTeam, postAlert, getAlerts };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddEntry));
