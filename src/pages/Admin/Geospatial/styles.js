import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
 
  paper: { padding: theme.spacing(3, 6) },
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  progressWrapper: {
    paddingTop: '48px',
    paddingBottom: '24px',
    display: 'flex',
    justifyContent: 'center'
  }
}));
