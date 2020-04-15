import React, { useContext } from "react";
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import {
  ADD_POST,
  ADD_LIST,
  PROFILE_SETTINGS,
  LOG_OUT
} from 'config/view/constants';
import { UserContext } from 'data/UserStore';
import { PostForm } from 'posts/PostForm';
import { ListForm } from 'lists/ListForm';
import { ProfileForm } from 'user/ProfileForm';

export const UserMenu = (props) => {
  const [state, dispatch] = useContext(UserContext);
  const [values, setValues] = React.useState({
    menu: false
  });

  // The direction the menu enters from.
  const menuAnchor = 'left';

  const toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setValues({ ...values, 'menu': open });
  };

  const addList = () => {
    dispatch({
      type: 'pushBlock',
      payload: <ListForm />
    });
  };

  const addPost = () => {
    dispatch({
      type: 'pushBlock',
      payload: <PostForm /> 
    });
  }

  const profileForm = () => {
    dispatch({
      type: 'pushBlock',
      payload: <ProfileForm />
    });
  }

  const logout = () => {
    dispatch({
      type: 'logout'
    });
  }

  const userMenuOptions = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button onClick={addPost}>
          <ListItemIcon>
            <PostAddIcon />
          </ListItemIcon>
          <ListItemText primary={ADD_POST} />
        </ListItem>
        <ListItem button onClick={addList}>
          <ListItemIcon>
            <PlaylistAddIcon />
          </ListItemIcon>
          <ListItemText primary={ADD_LIST} />
        </ListItem>
        <ListItem button onClick={profileForm}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary={PROFILE_SETTINGS} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={logout}>
          <ExitToAppIcon />
          <ListItemText primary={LOG_OUT} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <IconButton
        edge={props.edge}
        onClick={toggleDrawer(true)}
        aria-label="open drawer">
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor={menuAnchor}
        open={values.menu}
        onClose={toggleDrawer(false)}
       >
        {userMenuOptions()}
      </Drawer>
    </div>
  );
}