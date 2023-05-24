import {useEffect, useState } from 'react';
import NextApp, { AppProps, AppContext } from 'next/app';
import { getCookie, setCookie } from 'cookies-next';
import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider, MediaQuery, AppShell, Burger, Header, Navbar, Text, Button } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { AuthProvider } from '../components/Context/AuthContext';
import Link from 'next/link';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { useRouter } from 'next/router';

import styles from './_app.module.scss'

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);
  const [opened, setOpened] = useState(false);
  const router = useRouter()
  
  const [isAuthenticated, setIsAthenticated] = useState(false)
  
  const login = () => {
    setIsAthenticated(true);
  }

  const logout = () => {
    setIsAthenticated(false);
  };
  
  useEffect(() => {
    if(isAuthenticated)
      router.push('dashboard')
    else {
      router.push('/');
    }
  }, [isAuthenticated]);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  const MainApp = (
    <>
      <Component {...pageProps} />
      <Notifications />
    </>
  );

  return (
    <>
      <Head>
        <title>Mantine next example</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          theme={{
            colorScheme,
            breakpoints: {
              xs: '30em',
              sm: '48em',
              md: '64em',
              lg: '74em',
              xl: '90em',
            },
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <AuthProvider value={{ isAuthenticated, login, logout }}>
            {isAuthenticated ? (
              <AppShell
                navbarOffsetBreakpoint="sm"
                asideOffsetBreakpoint="sm"
                navbar={
                  <Navbar
                    p="md"
                    hiddenBreakpoint="sm"
                    hidden={!opened}
                    width={{ sm: 200, lg: 300 }}
                  >
                    <div className={styles.navSplit}>
                      <div>
                        <Link href="dashboard">
                          <Text>Dashboard</Text>
                        </Link>
                        <Link href="clients">
                          <Text>Clients</Text>
                        </Link>
                        <Link href="jobs">
                          <Text>Jobs</Text>
                        </Link>
                        <Link href="payments">
                          <Text>Payments</Text>
                        </Link>
                      </div>
                      <div>
                      <Button onClick={logout}>Logout</Button>
                      <ColorSchemeToggle />
                      </div>
                    </div>
                  </Navbar>
                }
                header={
                  <Header height={{ base: 50, md: 70 }} p="md">
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                      <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                        <Burger
                          opened={opened}
                          onClick={() => setOpened((o) => !o)}
                          size="sm"
                          mr="xl"
                        />
                      </MediaQuery>
                      <Text>Application header</Text>
                    </div>
                  </Header>
                }
              >
                {MainApp}
              </AppShell>
            ) : (
              MainApp
            )}
          </AuthProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
    colorScheme: getCookie('mantine-color-scheme', appContext.ctx) || 'dark',
  };
};
