import { AppBar, Toolbar, Box, Typography, IconButton, Avatar, MenuItem, Menu } from '@mui/material'
import React, { useState } from 'react'
import TagIcon from '@mui/icons-material/Tag'
import { useSelector } from 'react-redux'
import "../firebase"
import { getAuth, signOut } from 'firebase/auth'

const Header = () => {
  const {user} = useSelector(state => state)
  const [anchorEl, setAnchorEl] = useState(null)
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget)
  } 
  const handleCloseMenu = () => setAnchorEl(null)
  const handleLogout = async () => {
    await signOut(getAuth())
  }

  return (
    <>
      {/* todo backgroundColor 테마적용 */}
      <AppBar position='fixed' sx={{zIndex: (theme) => theme.zIndex.drawer+1, color:'#9a939b', backgroundColor:'#4c3c4c'}}>
        <Toolbar sx={{display:'flex', justifyContent:'space-between', height:'50px'}}>
          <Box sx={{display:'flex'}}>
            <TagIcon/>
            <Typography variant='h6' component="div">
              SLACK
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={handleOpenMenu}>
              <Typography variant='h6' component="div" sx={{color:'#9a939b'}}>
                {user.currentUser?.displayName}
              </Typography>
              <Avatar sx={{marginLeft:'10px'}} alt='profileImage' src={user.currentUser?.photoURL}/>
            </IconButton>
            <Menu sx={{mt:'45px'}} anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu} anchorOrigin={{vertical:'top', horizontal:'right'}}>
              <MenuItem>
                <Typography textAlign='center'>프로필이미지</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
              <Typography textAlign='center'>LogOut</Typography>
              </MenuItem>  
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header