import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import PanoramaIcon from "@material-ui/icons/Panorama";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { Link } from "react-router-dom";

// component
//import DashBoard from "./Dashboard";
export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>

    <ListItem button component={Link} to="/users">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItem>

    <ListItem button component={Link} to="/schedules">
      <ListItemIcon>
        <ScheduleIcon />
      </ListItemIcon>
      <ListItemText primary="Schedules" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Store page</ListSubheader>
    {/* <ListItem button component="a" href="/text-editor">
      <ListItemIcon>
        <TextFormatIcon />
      </ListItemIcon>
      <ListItemText primary="Text Editor" />
    </ListItem> */}
    <ListItem button component="a" href="/banner">
      <ListItemIcon>
        <PanoramaIcon />
      </ListItemIcon>
      <ListItemText primary="Banner" />
    </ListItem>
  </div>
);
