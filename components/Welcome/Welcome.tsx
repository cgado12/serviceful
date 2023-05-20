import { Title, Text, Anchor, MediaQuery, rem } from '@mantine/core';
import useStyles from './Welcome.styles';

import styles from './Welcome.module.scss';

export function Welcome() {
  const { classes } = useStyles();

  return (
    <>
      <MediaQuery
        query="(max-width: 75em) and (min-width: 50em)"
        styles={{ fontSize: rem(20), '&:hover': { backgroundColor: 'silver' } }}
        className={styles.test}
      >
        <Title className={classes.title} align="center" mt={100}>
          Welcome to{' '}
          <Text inherit variant="gradient" component="span">
            Mantine
          </Text>
        </Title>
      </MediaQuery>
      <Text color="dimmed" align="center" size="lg" sx={{ maxWidth: 580 }} mx="auto" mt="xl">
        This starter Next.js project includes a minimal setup for server side rendering, if you want
        to learn more on Mantine + Next.js integration follow{' '}
        <Anchor href="https://mantine.dev/guides/next/" size="lg">
          this guide
        </Anchor>
        . To get started edit index.tsx file.
      </Text>
    </>
  );
}
