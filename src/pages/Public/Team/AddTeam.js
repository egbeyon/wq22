import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Typography, Select } from '@material-ui/core';
import { Button, TextField, MenuItem } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import styles from './styles';
import { createTeam, updateTeam } from '../../../../../store/actions';

class AddMovie extends Component {
  state = {
    name: "",
    members: [{name: "", email: "", phone: ""}]
  };
  
  componentDidMount() {
    if (this.props.edit) {
      const { name, members
      } = this.props.edit;
      this.setState({ name, members
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.entry !== this.props.teams) {
      const { name, members } = this.props.entry;
        
      this.setState({ name, members });
    }
  }

  handleChange = e => {
    if (["name", "email"].includes(e.target.name)) {
        let members = [...this.state.members];
        members[e.target.dataset.id][e.target.name] = e.target.value;
        this.setState({ members });
      } else {
        this.setState({ [e.target.id]: e.target.value });
      }
  };

  addMember = e => {
    this.setState(prevState => ({
      members: [...prevState.members, { name: "", email: "", phone: "" }]
    }));
  };

  deleteMember = index => {
    let array = [...this.state.members];
    array.splice(index, 1);
    this.setState({ members: array });
  };

  onAddTeam = () => {
    const { name, ...rest } = this.state;
    const team = { ...rest };
    this.props.createTeam(name, team);
  };

  onUpdateTeam = () => {
    const { name, ...rest } = this.state;
    const team = { ...rest };
    this.props.updateTeam(this.props.edit._id, team);
  };


  render() {
    const { classes, className } = this.props;
    const {
      name, members
    } = this.state;

    const rootClassName = classNames(classes.root, className);
    const subtitle = this.props.edit ? 'Edit Team' : 'Add Team';
    const submitButton = this.props.edit ? 'Update Team' : 'Save Details';
    const submitAction = this.props.edit
      ? () => this.onUpdateTeam()
      : () => this.onAddTeam();

    return (
      <div className={rootClassName}>
        <Typography variant="h4" className={classes.title}>
          {subtitle}
        </Typography>
        <form autoComplete="off" noValidate>
          <div className={classes.field}>
            <TextField
              className={classes.textField}
              helperText="What is the name of the team?"
              label="Name"
              margin="dense"
              required
              value={name}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('name', event.target.value)
              }
            />
          </div>
          <div className={classes.helperText}>Add team members </div>
          {members.map((val, id) => {
              let memberId = `member-${id}`,
              emailId = `email-${id}`, 
              phoneId = `phone-${id}`;
            return (
              <div className="split" key={id}>
                
                <TextField
                    className={classes.textField}
                    label="Name of member"
                    margin="dense"
                    required
                    data-id={id}
                    id={memberId}
                    value={members[id].name}
                    variant="outlined"
                    onChange={event =>
                        this.handleChange(event.target.value)
                    }>
                </TextField>
                <TextField
                      className={classes.textField}
                      label="Email address"
                      name="email"
                      value={members[id].email}
                      onChange={event =>
                        this.handleChange(event.target.value)
                      }
                    />
                <TextField
                      className={classes.textField}
                      label="Mobile Phone"
                      name="phone"
                      value={values.phone}
                      variant="outlined"
                      onChange={event =>
                        this.handleChange(event.target.value)
                      }
                    />
                <span
                  className="delete"
                  onClick={this.deleteMember.bind(this, id)}
                >
                  REMOVE
                </span>
                <Button
                    className={classes.buttonFooter}
                    color="primary"
                    variant="contained"
                    onClick={this.deleteMember.bind(this, id)}>
                </Button>
              </div>
            );
          })} 
        </form>
        <Button
          className={classes.buttonFooter}
          color="primary"
          variant="contained"
          onClick={submitAction}>
          {submitButton}
        </Button>
      </div>
    );
  }
}

createTeam.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  teams: PropTypes.object
};

const mapStateToProps = ({ teamState }) => ({
  teams: teamState.teams
});

const mapDispatchToProps = { createTeam, updateTeam };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(createTeam));
