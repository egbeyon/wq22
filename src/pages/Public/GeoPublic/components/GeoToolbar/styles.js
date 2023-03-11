export default theme => ({
    root: {},
    row: {
      height: '42px',
      display: 'flex',
      alignItems: 'center',
      marginTop: theme.spacing(1),
      justifyContent: 'space-between'
    },
    searchInput: {
      marginRight: theme.spacing(1)
    },
    selectInput: {
      alignItems: 'center',
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.common.neutral}`,
      borderRadius: '4px',
      display: 'flex',
      flexBasis: '220px',
      paddingBottom: theme.spacing(0.5),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(0.5)
    }
  });
  