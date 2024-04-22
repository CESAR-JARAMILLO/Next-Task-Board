'use client';

import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import LayoutHeader from '../LayoutHeader/LayoutHeader';
import LayoutNavbar from '../LayoutNavbar/LayoutNavbar';
import { Suspense } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({children}:LayoutProps) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <LayoutHeader opened={opened} toggle={toggle} />
      </AppShell.Header>

      <AppShell.Navbar>
        <Suspense>
          <LayoutNavbar />
        </Suspense>
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}

export default Layout;