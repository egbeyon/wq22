import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  Select,
  MenuItem
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import palette from '../../../../../theme/palette';
import { options } from './chart';

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const Anomalous = props => {
  const [parameter, setParameter] = useState('temperature')
  const { className, highParam, entry } = props;
  const classes = useStyles();

  const data = {
    labels: 'alright',
    datasets: [
      {
        label: parameter,
        backgroundColor: palette.primary.main,
        data: highParam(entry, parameter),
        barThickness: 10,
        categoryPercentage: 0.5,
        maxBarThickness: 9,
      },
      {
        label: 'Average level',
        backgroundColor: palette.success.main,
        data: [11, 20, 12, 29, 30, 27, 20],
        barThickness: 10,
        categoryPercentage: 0.5,
        maxBarThickness: 9,
        
      },
      {
        label: 'Highest-ever level',
        backgroundColor: palette.danger.main,
        data: [21, 29, 19, 34, 39, 39, 34],
        barThickness: 10,
        categoryPercentage: 0.5,
        maxBarThickness: 9,
        
      }
    ]
  };

  const paramList = ['temperature', 'sulphate', 'chlorine', 'pH' ]

  return (
    <Card className={classnames(classes.root, className)}>
      <CardHeader
        action={
          <Select
          label="Microbe"
          margin="dense"
          size="small"
          value={parameter}
          variant="outlined"
          onChange={event =>
            setParameter(event.target.value)
          }>
          {paramList.map((Micron, index) => (
            <MenuItem key={Micron + '-' + index} value={Micron}>
              {Micron}
            </MenuItem>
          ))}
        </Select>
        }
        title="Highest Parameters"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar data={data} options={options} />
        </div>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button color="primary" size="small" variant="text">
          Overview <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

Anomalous.propTypes = {
  className: PropTypes.string
};

export default Anomalous;
