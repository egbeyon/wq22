import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Typography } from '@material-ui/core';
import { Button, TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import styles from './styles';
import { addEntry, getTeams } from '../../../../../store/actions';

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
  };
  
  componentDidMount() {
    if (!this.props.team) getTeams()
    if (this.props.selectedData) {
      const { ...rest } = this.props.selectedData;
      this.setState({ ...rest });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.entry !== this.props.entry) {
      const { latitude, longitude, location, color, temperature,
        pH, conductivity, chlorine, sulphate, microbe, createdAt, remark } = this.props.entry;
        
      this.setState({ latitude, longitude, location, color, temperature,
        pH, conductivity, chlorine, sulphate, microbe,
        createdAt, remark });
    }
  }

  handleChange = e => {
    this.setState({
      state: e.target.value
    });
  };

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState[field] = value;
    this.setState(newState);
  };

  onAddEntry = () => {
    const userId = this.props.user._id
    const teamId = this.props.team._id
    const {...rest } = this.state;
    const entry = { ...rest, userId, teamId };
    console.log(entry)
    this.props.addEntry(entry);
  };

  onUpdateEntry = () => {
    const { location, ...rest } = this.state;
    const entry = { ...rest };
    this.props.onUpdateEntry(this.props.edit._id, entry);
  };


  render() {
    const { classes, className, selectedData } = this.props;
    
    const { latitude, longitude, location, color, temperature,
      pH, conductivity, chlorine, sulphate, microbe,
      createdDate
    } = this.state;
    const rootClassName = classNames(classes.root, className);
    const subtitle = selectedData ? 'View data' : 'Add Entry';
    const submitButton = 'Save Details';
    const submitAction = () => this.onAddEntry();

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
                      label="Microbe"
                      name="microbe"
                      value={microbe}
                      onChange={event =>
                        this.handleFieldChange('microbe', event.target.value)
                      }
                      variant="outlined"
                    />
                </div>
                <div className={classes.field}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                          className={classes.textField}
                          inputVariant="outlined"
                          margin="normal"
                          id="release-date"
                          label="Date"
                          value={createdDate}
                          onChange={date =>
                            this.handleFieldChange('Date', date._d)
                          }
                          KeyboardButtonProps={{
                            'aria-label': 'change date'
                          }}
                        />
                    </MuiPickersUtilsProvider>
                </div>        
                {/* <div className={classes.policy}>
                      <Checkbox
                        checked={policy}
                        className={classes.policyCheckbox}
                        color="primary"
                        name="policy"
                        onChange={() =>
                          this.handleFieldChange('policy', !policy)
                        }
                      />
                      <Typography
                        className={classes.policyText}
                        variant="body1">
                        Confirm data submission
                      </Typography>
                </div> */}
              </form>
              {selectedData ? '' : 
                <Button
                className={classes.registerButton}
                color="primary"
                onClick={submitAction}
                size="medium"
                variant="contained">
                {submitButton}
                </Button> 
              } 
              {/* {notification && notification.status ? (
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
              ) : null} */}
          </div>
    );
  }
}

AddEntry.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.authState.user,
  team: state.teamState.teams
})

const mapDispatchToProps = { addEntry, getTeams };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddEntry));
