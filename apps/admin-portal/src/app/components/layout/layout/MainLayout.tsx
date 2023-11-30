import {Box, Portal} from "@chakra-ui/react";
import {Sidebar} from "../sidebar/Sidebar";
import React, {PropsWithChildren, useState} from "react";

export const MainLayout = ({ children }: PropsWithChildren) => {

  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <Box display="flex" height="100%" maxH="100%">
      <Sidebar expanded={sidebarExpanded} onExpanded={setSidebarExpanded}/>
      <Box
        flex="1"
        height='100%'
        maxH='100%'
        overflow='auto'
        maxHeight='100%'
        ml={sidebarExpanded ? "300px" : "75px"}
        transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
        transitionDuration='.2s, .2s, .35s'
        transitionProperty='margin'
        transitionTimingFunction='linear, linear, ease'>
        <Portal>
          <Box>
            {/*<Navbar*/}
            {/*  onOpen={onOpen}*/}
            {/*  logoText={'Horizon UI Dashboard PRO'}*/}
            {/*  brandText={getActiveRoute(routes)}*/}
            {/*  secondary={getActiveNavbar(routes)}*/}
            {/*  message={getActiveNavbarText(routes)}*/}
            {/*  fixed={fixed}*/}
            {/*  {...rest}*/}
            {/*/>*/}
          </Box>
        </Portal>

        <Box mx='auto' p={{ base: '20px', md: '30px' }} pe='20px' minH='100vh' pt='50px'>
          {children}
        </Box>
      </Box>
    </Box>
  )
}
