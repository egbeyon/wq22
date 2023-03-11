import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../../../store/actions';
import { withStyles } from '@material-ui/core/styles';
import { Badge, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import { getAlerts } from '../../../../store/actions';
import { ResponsiveNotification } from '../../../../components'
import Notification from '../../../../pages/Admin/Notification'

// Component styles
import styles from './styles';

class Topbar extends Component {
  state = {
    openNotification: false,
    viewReport: null,
    closedAt: new Date().setDate(new Date().getDate() - 1)
  }
  static defaultProps = {
    title: 'Dashboard',
    isSidebarOpen: false
  };
  static propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    isSidebarOpen: PropTypes.bool,
    title: PropTypes.string,
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getAlerts()
  }

  openNotification = report => {
    this.setState({ 
      openNotification: true, 
      viewReport: report 
     })
  }

  closeNotification = () => {
    this.setState({ 
      openNotification: false, 
      viewReport: null,
      closedAt: Date.now()
    })
  }

  viewReport(report) {
    this.openNotification(report)
  }

  handleSignOut = async () => {
    this.props.logout();
  };

  render() {
    const {
      classes,
      ToolbarClasses,
      children,
      isSidebarOpen,
      onToggleSidebar,
      allNotifications
    } = this.props;
    const { closedAt } = this.state
     const newNotifications = allNotifications.filter(report => (new Date(report.createdAt) >= new Date(closedAt)))
    

    return (
      <div className={`${classes.root} , ${ToolbarClasses}`}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.brandWrapper}>
            <NavLink className={classes.logo} to="/">
              wq22
            </NavLink>
            <IconButton
              className={classes.menuButton}
              aria-label="Menu"
              onClick={onToggleSidebar}>
              {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </div>
          
            <IconButton className={classes.notificationsButton} onClick={() => this.openNotification()}>
                  <Badge badgeContent={6} color={newNotifications.length > 0  ? 'error' : 'primary'} variant="dot">
                    <NotificationsIcon />
                      <Typography>{newNotifications.length > 0 ? newNotifications.length : ''}</Typography>
                  </Badge>
            </IconButton>

            <ResponsiveNotification
             id="view-report"
             open={this.state.openNotification}
             handleClose={() => this.closeNotification()}>  
              <Notification
                viewReport={this.state.viewReport}
                newNotifications={newNotifications}
                />
            </ResponsiveNotification>
          
          <IconButton
            className={classes.signOutButton}
            onClick={this.handleSignOut}>
            <InputIcon />
          </IconButton>
        </Toolbar>
        {children}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.authState,
  allNotifications: state.alertState.allNotifications
});

const mapDispatchToProps = { getAlerts, logout }
export default connect(
  mapStateToProps, 
  mapDispatchToProps
  )(withStyles(styles)(Topbar));
