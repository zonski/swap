import React, {useState} from 'react';

// chakra imports
import {
  Box, IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import {renderThumb, renderTrack, renderView} from '../scrollbar/Scrollbar';
import {Scrollbars} from 'react-custom-scrollbars-2';
import {NavItem} from "./NavItem";
import {
  FiMenu,
  FiHome,
  FiUser,
  FiSettings
} from 'react-icons/fi'

export const Sidebar = () => {

  const [navExpanded, setNavExpanded] = useState(true);

  const variantChange = '0.2s linear';
  const shadow = useColorModeValue('14px 17px 40px 4px rgba(112, 144, 176, 0.08)', 'unset');
  const sidebarBg = useColorModeValue('white', 'navy.800');
  const sidebarMargins = '0px';

  return (
    <Box display={{sm: 'none', xl: 'block'}} position='fixed' minH='100%'>
      <Box
        bg={sidebarBg}
        transition={variantChange}
        w={navExpanded ? '300px' : '75px'}
        h='100vh'
        m={sidebarMargins}
        minH='100%'
        overflowX='hidden'
        boxShadow={shadow}>
        <Scrollbars
          autoHide
          renderTrackVertical={renderTrack}
          renderThumbVertical={renderThumb}
          renderView={renderView}>

          <IconButton
            aria-label="Toggle sidebar"
            mt={5}
            icon={<FiMenu/>}
            onClick={() => setNavExpanded(!navExpanded)}
          />
          <NavItem navExpanded={navExpanded} path="/" icon={<FiHome/>} title="Home"/>
          <NavItem navExpanded={navExpanded} path="/things" icon={<FiSettings/>} title="Things"/>

        </Scrollbars>
      </Box>
    </Box>
  );
}
