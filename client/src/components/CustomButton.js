import React from 'react';
import MaterialButton from '@mui/material/Button';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
  root: {
    borderRadius: 8,
    padding: '10px 20px',
    fontSize: '16px',
  },
  primary: {
    backgroundColor: '#007BFF',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
  secondary: {
    backgroundColor: '#6c757d',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#5a6268',
    },
  },
});

const CustomButton = ({ variant = 'primary', children, onClick, testId }) => {
  const classes = useStyles();
  return (
    <MaterialButton
      className={`${classes.root} ${classes[variant]}`}
      onClick={onClick}
      variant='contained'
      data-testid={testId}
    >
      {children}
    </MaterialButton>
  );
};

export default CustomButton;