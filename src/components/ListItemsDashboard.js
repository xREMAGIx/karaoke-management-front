import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import CategoryIcon from "@material-ui/icons/Category";
import BrandingWatermarkIcon from "@material-ui/icons/BrandingWatermark";
import PanoramaIcon from "@material-ui/icons/Panorama";
import AssignmentIcon from "@material-ui/icons/Assignment";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import { Link } from "react-router-dom";

// component
//import DashBoard from "./Dashboard";
export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>

    <ListItem button component={Link} to="/products">
      <ListItemIcon>
        <FastfoodIcon />
      </ListItemIcon>
      <ListItemText primary="Products" />
    </ListItem>

    <ListItem button component={Link} to="/categories">
      <ListItemIcon>
        <CategoryIcon />
      </ListItemIcon>
      <ListItemText primary="Categories" />
    </ListItem>

    <ListItem button component={Link} to="/brands">
      <ListItemIcon>
        <BrandingWatermarkIcon />
      </ListItemIcon>
      <ListItemText primary="Brands" />
    </ListItem>

    <ListItem button component={Link} to="/orders">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>

    <ListItem button component={Link} to="/posts">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Posts" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
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
