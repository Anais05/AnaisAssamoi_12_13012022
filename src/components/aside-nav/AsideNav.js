import React from 'react';
import yoga from '../../assets/yoga.png';
import swimming from '../../assets/swimming.png';
import biking from '../../assets/biking.png';
import weight from '../../assets/weight.png';
import './AsideNav.css';

function AsideNav() {
  return (
    <div className="aside-nav">
      <div className="aside-icons">
        <div>
          <img src={ yoga } alt='yoga' className="aside-icon"></img>
        </div>
        <div>
          <img src={ swimming } alt='swimming' className="aside-icon"></img>
        </div>
        <div>
          <img src={ biking } alt='biking' className="aside-icon"></img>
        </div>
        <div>
          <img src={ weight } alt='weight' className="aside-icon"></img>
        </div>
      </div>
      <p className="copyright">copyright, SportSee 2020</p>
    </div>
  );
}

export default AsideNav;