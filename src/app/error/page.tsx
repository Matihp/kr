"use client"
import { Container, Title, Text, Button, Group } from '@mantine/core';
import { Illustration } from './illustration';
import classes from './nothingFoundBackground.module.css';
import Link from 'next/link';

function Error() {
  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text c="dimmed" size="lg" ta="center" className={classes.description}>
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error contact support.
          </Text>
          <Group justify="center">
            <Button variant="subtle" color="dark" size="md"><Link href={'/'}>Take me back to home page</Link></Button>
          </Group>
        </div>
      </div>
    </Container>
  )
}

export default Error