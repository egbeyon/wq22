import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
  Typography
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '300px'
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  device: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: theme.palette.icon
  }
}));

const EntryByTeam = props => {
  const { className, bestTeams } = props;

  const classes = useStyles();
  const theme = useTheme();
  let perc = 0
  const percy = bestTeams.map(team => team.count)
  for (let i=0; i<percy.length; i++) {
    perc = perc + percy[i]
    
  }
  const data = {
    datasets: [
      {
        data: bestTeams.map(team => (team.count/perc).toFixed(2) * 100),
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.error.main,
          theme.palette.warning.main
        ],
        borderWidth: 3,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white,
        labels: bestTeams.map(team => team && team.name)
      }
    ],
    labels: bestTeams.map(team => team && team.name)
  };
  
  const options = {
    legend: {
      display: true
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 0.5,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
    }
  };

  return (
    <Card className={classnames(classes.root, className)}>
      <CardHeader
        action={
          <IconButton size="small">
            <RefreshIcon />
          </IconButton>
        }
        title="Data Entry by Team"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut data={data} options={options} />
        </div>
        <div className={classes.stats}>
          {data.datasets.map(device => (
            <div className={classes.device} key={device.labels}>
              {device.data.map((percentage, id) => (
              <Typography key={id} style={{ color: device.backgroundColor }} variant="h2">
                {percentage}%
              </Typography>
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

EntryByTeam.propTypes = {
  className: PropTypes.string
};

export default EntryByTeam;
