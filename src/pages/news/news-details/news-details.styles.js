import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  newsItemUpdate: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px 0'
  },
  newsDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  detailsContainer: {
    width: '100%',
    padding: 20,
    marginTop: 70
  },
  saveButton: {
    margin: '20px 0'
  },
  controlsBlock: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  textField: {
    margin: '10px 5px'
  },
  select: {
    width: '150px'
  }
}));
