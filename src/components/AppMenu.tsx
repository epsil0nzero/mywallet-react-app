import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { Link } from 'react-router-dom';
import Logout from './auth/Logout';

export default function AppMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => { setAnchorEl(null); };

  return (
    <div>
      <Button onClick={handleClick} className="navbar-text">Menu</Button>
      <Menu
        id="app-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem><Link to="/" >Home</Link></MenuItem>
        <MenuItem><Link to="/users" >Users</Link></MenuItem>
        <MenuItem><Logout /></MenuItem>     
      </Menu>
    </div>
  );
}