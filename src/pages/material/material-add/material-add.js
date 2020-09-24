import { Typography } from '@material-ui/core';
import React from 'react';
import MaterialForm from '../../../components/material-form';
import { useStyles } from './material-add.styles';
import { config } from '../../../configs';

const MaterialAdd = () => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <MaterialForm />
    </div>
  );
};

export default MaterialAdd;
