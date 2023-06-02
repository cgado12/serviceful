import { useEffect, useState } from 'react';
import NextApp, { AppProps, AppContext } from 'next/app';
import { getCookie, setCookie } from 'cookies-next';
import Head from 'next/head';
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
  MediaQuery,
  AppShell,
  Burger,
  Header,
  Navbar,
  Text,
  Button,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { AuthContext } from '../components/Context/AuthContext';
import Link from 'next/link';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { useRouter } from 'next/router';

import styles from './_app.module.scss';
import { UserProvider } from '../components/Context/UserContext';
import usePocketbase from '../hooks/usePocketbase';
import { CustomerProvider } from '../components/Context/CustomerContext';
import { JobProvider } from '../components/Context/JobContext';
import { CatalogProvider } from '../components/Context/catalogContext';

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const router = useRouter();
  const pb = usePocketbase()
  const { Component, pageProps } = props;
  const [user, setUser] = useState({})
  const [opened, setOpened] = useState(false);
  const [isAuthenticated, setIsAthenticated] = useState(false);
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  useEffect(() => {
    const revalidateUser = async () => {
      if (pb.authStore.isValid && await pb.collection('user').authRefresh()) {
        console.log(pb.authStore)
        setIsAthenticated(true)
        setUser(pb.authStore.model as {})
      }
    }
    revalidateUser()
  }, [])

  const login = async (loginInfo: { [key: string]: string }) => {
    console.log(loginInfo);
    let userData
    try {
      userData = await pb.collection('user').authWithPassword(loginInfo.email, loginInfo.password);
    } catch (err) {
      console.log(err)
      return
    }
    setUser(userData)
    setIsAthenticated(true);
  };

  const signUp = async (data: { [key: string]: {email: string, password: string} }) => {
    const { orgData, userData } = data
    let user, org = undefined

    try {
      user = await pb.collection('user').create(userData)
    } catch(err) {
      console.error(err)
      return
    }
    
    try {
      const data = { ...orgData, orgAdminId: user.id };
      org = await pb.collection('organization').create(data)
    } catch (err) {
      console.error(err);
      return;
    }
    await login({email: userData.email,password: userData.password})
    
    try {
      await pb.collection('user').update(user.id, {...user,orgId: [...user.orgId, org.id], role: [...user.role, "Admin"]})
    } catch(err) {
      console.error(err);
      return;
    }
    console.log(user)
    console.log(org)
  }

  const logout = () => {
    pb.authStore.clear()
    setIsAthenticated(false);
    setUser({})
  };

  useEffect(() => {
    if (isAuthenticated) router.push('/dashboard');
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
          <AuthContext.Provider value={{ isAuthenticated, login, logout, signUp }}>
            {isAuthenticated && user ? (
              <UserProvider value={{ user }}>
                <CustomerProvider>
                  <JobProvider>
                    <CatalogProvider>
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
                                <Link href="/dashboard">
                                  <Text>Dashboard</Text>
                                </Link>
                                <Link href="/clients">
                                  <Text>Clients</Text>
                                </Link>
                                <Link href="/jobs">
                                  <Text>Jobs</Text>
                                </Link>
                                <Link href="/subscriptions">
                                  <Text>Subscriptions</Text>
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
                    </CatalogProvider>
                  </JobProvider>
                </CustomerProvider>
              </UserProvider>
            ) : (
              MainApp
            )}
          </AuthContext.Provider>
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
