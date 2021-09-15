import React, {useState, useEffect} from 'react';
import {createBrowser, removeBrowser} from './remoteHQ';
import "./Browser.css";

const Browser = (props) => {
  const {embeddedAppSDK} = props;
  const [allowOthersToEdit, setAllowOtherstoEdit] = useState(false);

  const allowOthers = () => {};
  return <div className="Browser container">
    {
      // render the Form Component First!
      // After Click 
    }
  </div>;
};

export default Browser;