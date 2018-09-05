import React from 'react';
import Dimmer from '../Dimmer';
import Spinner from '../Spinner';

const DimmerSpinner = ({visible}) => {

  if(!visible) return null;
  return (
    <Dimmer>
      <Spinner color="#ffffff"/>
    </Dimmer>
  );
};

export default DimmerSpinner;