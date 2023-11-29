import {Box, Portal} from "@chakra-ui/react";
import {Sidebar} from "../sidebar/Sidebar";
import React, {PropsWithChildren} from "react";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box>
      <Sidebar />
      <Box
        float='right'
        minHeight='100vh'
        height='100%'
        overflow='auto'
        position='relative'
        maxHeight='100%'
        w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
        maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
        transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
        transitionDuration='.2s, .2s, .35s'
        transitionProperty='top, bottom, width'
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
