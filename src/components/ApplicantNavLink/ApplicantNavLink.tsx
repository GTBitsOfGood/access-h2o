import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import classes from './ApplicantNavLink.module.css'
import { UtilityPartnerModal } from 'src/components/UtilityPartnerModal/UtilityPartnerModal'
import { useState } from 'react'
import urls from '../../../utils/urls'
import { Link } from '@mui/material'

interface PropTypes {
  isUtilityView: boolean
}

const ApplicantNavLink = ({ isUtilityView }: PropTypes): JSX.Element => {
  const [auth] = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [showUtilityPartnerModal, setShowUtilityPartnerModal] = useState(false)

  // const handleChange = (event) => {
  //   setAuth(event.target.checked)
  // }

  const handleMenu = (event: any): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" className={classes.root}>
        <Toolbar>
          <div className={classes.logo1} />
          <div className={classes.logo2} />
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mx: 'auto' }}
          ></IconButton>
          {!isUtilityView && (
            <span className={classes.editForm}><Link href='/editform' underline="none">Edit Form</Link></span>
          )}
          {!isUtilityView && (
            <span
              onClick={() => setShowUtilityPartnerModal(true)}
              className={classes.addPartner}
            >
              Add Utility Partner
            </span>
          )}
          <UtilityPartnerModal
            shouldShowModal={showUtilityPartnerModal}
            onClose={() => setShowUtilityPartnerModal(false)}
          />

          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle
                  color="action"
                  className={classes.profilebutton}
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  component="a"
                  href={urls.pages.profile + '/' + isUtilityView.toString()}
                >
                  {' '}
                  Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default ApplicantNavLink
