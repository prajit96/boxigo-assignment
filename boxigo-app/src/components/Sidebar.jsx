import React from 'react';
import { Box, CloseButton, Flex, Icon, Link, Drawer, DrawerContent, Text, useDisclosure, IconButton } from '@chakra-ui/react';
import { FiHome, FiUser, FiClipboard, FiLogOut, FiMenu } from 'react-icons/fi';

const LinkItems = [
  { name: 'MY MOVES', icon: FiHome, path: '/' },
  { name: 'MY PROFILE', icon: FiUser, path: '/' },
  { name: 'GET QUOTE', icon: FiClipboard, path: '/' },
  { name: 'LOGOUT', icon: FiLogOut, path: '/' },
];

export default function Sidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg="gray.100">
      <SidebarContent onClose={onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer autoFocus={false} isOpen={isOpen} placement="left" onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose} size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box bg="white" borderRight="1px" borderRightColor="gray.200" w={{ base: 'full', md: 60 }} pos="fixed" h="full" {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" color="tomato">BOXIGO</Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, path, ...rest }) => {
  return (
    <Link href={path} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex align="center" p="4" mx="4" borderRadius="lg" role="group" cursor="pointer" _hover={{ bg: 'cyan.400', color: 'white' }} {...rest}>
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen }) => {
  return (
    <Flex display={{ base: 'flex', md: 'none' }} p="4" bg="white" borderBottomWidth="1px" borderBottomColor="gray.200" alignItems="center" justifyContent="space-between">
      <IconButton
        aria-label="Open menu"
        icon={<FiMenu />}
        onClick={onOpen}
        variant="outline"
      />
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" color="tomato">BOXIGO</Text>
    </Flex>
  );
};
