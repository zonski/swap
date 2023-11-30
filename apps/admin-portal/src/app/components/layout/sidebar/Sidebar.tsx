import React from 'react';

// chakra imports
import {Box, IconButton, useColorModeValue,} from '@chakra-ui/react';
import {NavItem} from "./NavItem";
import {FiHome, FiMenu, FiSettings} from 'react-icons/fi'
import {CustomScrollbars} from "../scrollbar/CustomScrollbars";

interface Props {
  expanded: boolean;
  onExpanded?: (expanded: boolean) => void;
}

export const Sidebar = (props: Props) => {

  const {expanded, onExpanded} = props;
  const variantChange = '0.2s linear';
  const shadow = useColorModeValue('14px 17px 40px 4px rgba(112, 144, 176, 0.08)', 'unset');
  const sidebarBg = useColorModeValue('white', 'navy.800');
  const sidebarMargins = '0px';

  return (
    <Box
      position='fixed' top="0" bottom="0"
      bg={sidebarBg}
      transition={variantChange}
      w={expanded ? '300px' : '75px'}
      m={sidebarMargins}
      height='100vh'
      minH='100%'
      overflowX='hidden'
      boxShadow={shadow}>
      <CustomScrollbars
        autoHide={true}>
        <Box
          maxW="100%"
          overflowX='hidden'>
          <IconButton
            aria-label="Toggle sidebar"
            mt={5}
            icon={<FiMenu/>}
            onClick={() => onExpanded && onExpanded(!expanded)}
          />
          <NavItem navExpanded={expanded} path="/" icon={<FiHome/>} title="Home" active={true}/>
          <NavItem navExpanded={expanded} path="/things" icon={<FiSettings/>} title="Things"/>
        </Box>
      </CustomScrollbars>
    </Box>
  );
}
