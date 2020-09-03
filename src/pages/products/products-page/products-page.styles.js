import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    width: `100%`,
    marginTop: 65,
    padding: 20,
    '& .MuiLinearProgress-root': {
      margin: '40px 0 !important'
    }
  },
  tableNav: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2)
  },
  productsTitle: {
    fontSize: '1.5rem',
    color: theme.palette.text.disabled,
    fontWeight: 'bold',
    width: '270px',
    margin: '30px auto'
  }
}));
