import { useState, MouseEvent } from 'react';
import { Button, Popover, MenuItem, ListItemIcon, ListItemText, Collapse, Grow, Box, Typography } from '@mui/material';
import { Edit, FileCopy, Share, Delete, ArrowDropDown } from '@mui/icons-material';
import { RotateIcon } from '../utils';

export default function StaggeredDropDown() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = () => {
    setOpenMenu(false);
    setTimeout(() => {
      setAnchorEl(null);
    }, 300); // Adjust timeout to match your animation duration
  };

  return (
    <Box>
      <Button onClick={handleClick} variant="contained" endIcon={<RotateIcon isOpen={openMenu} Icon={ArrowDropDown} />}>
        Stage Select
      </Button>

      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        TransitionComponent={Grow}
      >
        <Typography textAlign={'center'} my={1}>
          Select Chain
        </Typography>
        <Box>
          <Collapse in={openMenu} timeout={300}>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Edit />
              </ListItemIcon>
              <ListItemText primary="Edit" />
            </MenuItem>
          </Collapse>
          <Collapse in={openMenu} timeout={400}>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <FileCopy />
              </ListItemIcon>
              <ListItemText primary="Duplicate" />
            </MenuItem>
          </Collapse>
          <Collapse in={openMenu} timeout={500}>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Share />
              </ListItemIcon>
              <ListItemText primary="Share" />
            </MenuItem>
          </Collapse>
          <Collapse in={openMenu} timeout={600}>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Delete />
              </ListItemIcon>
              <ListItemText primary="Remove" />
            </MenuItem>
          </Collapse>
        </Box>
      </Popover>
    </Box>
  );
}
