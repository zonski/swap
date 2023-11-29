import React, {ReactElement} from 'react'
import {Flex, Text, Box, HStack, useColorModeValue} from '@chakra-ui/react'
import {NavLink} from "react-router-dom";

interface Props {
  path: string;
  icon: ReactElement | string;
  title: string;
  active?: boolean;
  navExpanded: boolean
}

export const NavItem = ({path, icon, title, active, navExpanded}: Props) => {

  const activeColor = useColorModeValue('gray.700', 'white');
  const activeIcon = useColorModeValue('brand.500', 'white');
  const textColor = useColorModeValue('secondaryGray.500', 'white');
  const brandColor = useColorModeValue('brand.500', 'brand.400');

  return (
    <NavLink to={path}>
      <Box>
        <HStack
          spacing={active ? '22px' : '26px'}
          py='5px'
          ps='10px'>
          <Flex w='100%' alignItems='center' justifyContent='center'>
            <Box
              color={active ? activeIcon : textColor}
              me='18px'>
              {icon}
            </Box>
            <Text
              me='auto'
              color={active ? activeColor : textColor}
              fontWeight={active ? 'bold' : 'normal'}>
              {title}
            </Text>
          </Flex>
          <Box
            h='36px'
            w='4px'
            bg={active ? brandColor : 'transparent'}
            borderRadius='5px'
          />
        </HStack>
      </Box>
    </NavLink>
  )
}
