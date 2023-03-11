import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  root: { padding: theme.spacing(4) },
  paper: { padding: theme.spacing(3, 6) },
  title: {
    fontSize: '3rem',
    lineHeight: '3rem',
    textAlign: 'center',
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(3)
  }
}));
