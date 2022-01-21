import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import './Header.css';

function Header() {
  return (
    <header>
      <Link to='/'>
        <img src={ Logo } alt='logo de sportsee' className="logo-header"></img>
      </Link>
      <nav className="nav-header">
        <NavLink to="/" className="home-link" style={({ isActive }) => ({color: isActive ? '#e60000' : '#ffffff'})}>
          Accueil
        </NavLink>
        <NavLink to="/profile" className="profile-link" style={({ isActive }) => ({color: isActive ? '#e60000' : '#ffffff'})}>
          Profil
        </NavLink> 
        <NavLink to="/settings" className="settings-link" style={({ isActive }) => ({color: isActive ? '#e60000' : '#ffffff'})}>
          Réglage
        </NavLink> 
        <NavLink to="/network" className="network-link" style={({ isActive }) => ({color: isActive ? '#e60000' : '#ffffff'})}>
          Communauté
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;