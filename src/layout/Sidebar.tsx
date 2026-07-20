import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import { NavLink } from 'react-router-dom'

export const DRAWER_WIDTH = 240

type SidebarProps = {
  mobileOpen: boolean
  onClose: () => void
}

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const links = (
    <>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Картотека граждан
        </Typography>
      </Toolbar>
      <List>
        <ListItemButton
          component={NavLink}
          to="/"
          end
          onClick={onClose}
          sx={{
            '&.active': {
              bgcolor: 'action.selected',
            },
          }}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Главная" />
        </ListItemButton>
        <ListItemButton
          component={NavLink}
          to="/citizens"
          onClick={onClose}
          sx={{
            '&.active': {
              bgcolor: 'action.selected',
            },
          }}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Картотека" />
        </ListItemButton>
      </List>
    </>
  )

  return (
    <Box
      component="nav"
      sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH },
        }}
      >
        {links}
      </Drawer>
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
        }}
      >
        {links}
      </Drawer>
    </Box>
  )
}
