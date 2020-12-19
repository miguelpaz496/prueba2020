import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MyForm from './Components/myForm'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

const App =  () => {

  const classes = useStyles();

  return (
    <div>
      <MyForm></MyForm>
    </div>
  )
}






export default App;
