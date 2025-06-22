import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@zeep/assets/images/logo-short-light.svg';


export default ({ collapsed }) => {
  return (
    <div className="isoLogoWrapper">
      {collapsed ? (
        <div>
          <h3>
            <Link to="/dashboard">
              <img alt="#" src={Logo}
              style={{ verticalAlign: "baseline", height: "30px"}}/>
            </Link>
          </h3>
        </div>
      ) : (
        <h3>
          <Link to="/dashboard">Dashboard</Link>
        </h3>
      )}
    </div>
  );
};
