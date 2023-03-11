import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Button, TextField, Typography } from '@material-ui/core';
import styles from './styles';
import { Add } from '@material-ui/icons';
import {
  getAllTeams, getTeams, updateTeam, deleteTeam, createTeam, postAlert, getAlerts
} from '../../../../../store/actions';

class UpdateTeam extends Component {
  state = {
    _id: '',
    imageUrl: '',
    name: '',
    members: [{
      name: '',
      email: '',
      phone: ''
    }],
    notification: {}
  };

  componentDidMount() {
    if (this.props.editTeam) {
      const { ...rest } = this.props.editTeam;
      this.setState({ ...rest });
    }
  }

  onSubmitAction = async type => {
    const {
      getAllTeams, updateTeam, deleteTeam, createTeam, postAlert, user
    } = this.props;
    const {
      _id, name, imageUrl, members } = this.state;
    const team = { name, imageUrl, members };
    let notification = {};
    type === 'create'
      ? (notification = await createTeam(team))
      : type === 'update'
      ? (notification = await updateTeam(team, _id))
      : (notification = await deleteTeam(_id));
    this.setState({ notification });
    if (notification && notification.status === 'success') {
      getAllTeams();
      postAlert({title: 'team altered', message: `${user.username} altered ${team.name}`})
      getAlerts()
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleMemberChange = (index, e) => {
    const { members } = this.state;
    members[index][e.target.name] = e.target.value;
    this.setState({ members })  
  };

  onAddMembers = () => {
    this.setState(prevState => ({
      members: [...prevState.members, { name: '', email: '', phone: ''}]
    }));
  };

  deleteMember = index => {
    let array = [...this.state.members];
    array.splice(index, 1);
    this.setState({ members: array })
  }

  renderMemberFields = () => {
    const { members } = this.state;
    const { classes } = this.props;
    return (
      <>
        <div className={classes.field}>
          <Button onClick={() => this.onAddMembers()}>
            <Add /> add members
          </Button>
        </div>
        {members.length > 0 &&
          members.map((val, id) => (
              <div key={id} className={classes.field}>
                  <div htmlFor={`member-${id}`}>
                    <TextField
                      id={`member-${id}`}
                      className={classes.textField}
                      label="name"
                      name="name"
                      margin="dense"
                      data-id={id}
                      required
                      value={members[id].name}
                      variant="outlined"
                      type="text"
                      onChange={event => this.handleMemberChange(id, event)}
                    />
                  </div>
                  <div htmlFor={`email-${id}`}>
                    <TextField
                      id={`email-${id}`}
                      name="email"
                      className={classes.textField}
                      label="email"
                      margin="dense"
                      data-id={id}
                      required
                      value={members[id].email}
                      variant="outlined"
                      type="text"
                      onChange={event => this.handleMemberChange(id, event)}
                    />
                  </div>
                  <div htmlFor={`phone-${id}`}>
                    <TextField
                      id={`phone-${id}`}
                      name="phone"
                      className={classes.textField}
                      label="phone"
                      margin="dense"
                      data-id={id}
                      required
                      value={members[id].phone}
                      variant="outlined"
                      type="text"
                      onChange={event => this.handleMemberChange(id, event)}
                    />
                  </div>
              <Button
                color="secondary"
                className={classes.field}
                onClick={this.deleteMember.bind(this, id)}>
                remove
              </Button>
            </div>
          ))}
      </>
    );
  };

  render() {
    const { classes, className } = this.props;
    const {
      name,
      imageUrl,
      notification
    } = this.state;

    const rootClassName = classNames(classes.root, className);
    const mainTitle = this.props.editTeam ? 'Edit Team' : 'Add Team';
    const submitButton = this.props.editTeam
      ? 'Update Team'
      : 'Save Details';
    const submitAction = this.props.editTeam 
      ? () => this.onSubmitAction('update')
      : () => this.onSubmitAction('create');

    return (
      <div className={rootClassName}>
        <Typography variant="h4" className={classes.title}>
          {mainTitle}
        </Typography>
        <form autoComplete="off" noValidate>
          <div className={classes.field}>
            <TextField
              className={classes.textField}
              label="Name"
              margin="dense"
              required
              id="name"
              value={name}
              variant="outlined"
              onChange={this.handleChange
                //event => this.handleFieldChange('name', event.target.value)
              }
            />

            <TextField
              fullWidth
              className={classes.textField}
              label="ImageUrl"
              id="imageUrl"
              margin="dense"
              variant="outlined"
              value={imageUrl}
              onChange={this.handleChange
                //event => this.handleFieldChange('imageUrl', event.target.value)
              }
            />
          </div>
          {this.renderMemberFields()} 
        </form>

        <Button
          className={classes.buttonFooter}
          color="primary"
          variant="contained"
          onClick={submitAction}>
          {submitButton}
        </Button>
        {this.props.editTeam && (
          <Button
            color="secondary"
            className={classes.buttonFooter}
            variant="contained"
            onClick={() => this.onSubmitAction('remove')}>
            Delete Team
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

UpdateTeam.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.authState.user
});
const mapDispatchToProps = {
  getTeams,
  getAllTeams,
  createTeam,
  updateTeam,
  deleteTeam,
  postAlert,
  getAlerts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UpdateTeam));
