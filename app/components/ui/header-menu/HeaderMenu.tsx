'use client'
import {
    HoverCard,
    Group,
    Button,
    UnstyledButton,
    Text,
    SimpleGrid,
    ThemeIcon,
    Anchor,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
    rem,
    useMantineTheme,
  } from '@mantine/core';
  import { useDisclosure } from '@mantine/hooks';
  import {
    IconNotification,
    IconCode,
    IconBook,
    IconChartPie3,
    IconFingerprint,
    IconCoin,
    IconChevronDown,
    IconBuildingStore,
  } from '@tabler/icons-react';
  import classes from '../../../mantine-css-modules/HeaderMenu.module.css';
  import { IconUser, IconDatabaseImport, IconBuildingWarehouse } from '@tabler/icons-react';
  
  const mockdata = [
    {
      icon: IconCode,
      title: 'Open source',
      description: 'This Pokémon’s cry is very loud and distracting',
    },
    {
      icon: IconCoin,
      title: 'Free for everyone',
      description: 'The fluid of Smeargle’s tail secretions changes',
    },
    {
      icon: IconBook,
      title: 'Documentation',
      description: 'Yanma is capable of seeing 360 degrees without',
    },
    {
      icon: IconFingerprint,
      title: 'Security',
      description: 'The shell’s rounded shape and the grooves on its.',
    },
    {
      icon: IconChartPie3,
      title: 'Analytics',
      description: 'This Pokémon uses its flying ability to quickly chase',
    },
    {
      icon: IconNotification,
      title: 'Notifications',
      description: 'Combusken battles with the intensely hot flames it spews',
    },
  ];
  
  export function HeaderMenu() {
    const handleSignOut = async () => {
      await fetch('/api/signout', {
          method: 'POST',
      });
    };

    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const theme = useMantineTheme();
  
    const links = mockdata.map((item) => (
      <UnstyledButton className={classes.subLink} key={item.title}>
        <Group wrap="nowrap" align="flex-start">
          <ThemeIcon size={34} variant="default" radius="md">
            <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
          </ThemeIcon>
          <div>
            <Text size="sm" fw={500}>
              {item.title}
            </Text>
            <Text size="xs" c="dimmed">
              {item.description}
            </Text>
          </div>
        </Group>
      </UnstyledButton>
    ));
  
    return (
      <Box>
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
            {/* <MantineLogo size={30} /> */}
            <Text>
                {/* ユーザーIconなどを表示予定 */}
            </Text>
  
            <Group h="100%" gap={0} visibleFrom="sm">
              <a href="/dashboard" className={classes.link}>
                <IconUser stroke={1.5} />
                マイページ
              </a>
              <a href="/dashboard/inventory" className={classes.link}>
                <Box mr={5}>
                  <IconDatabaseImport  stroke={1.5} />
                </Box>
                在庫一覧
              </a>
              <a href="/dashboard/create-product" className={classes.link}>
                <Box mr={5}>
                  <IconBuildingWarehouse stroke={1.5} />
                </Box>
                製品作成
              </a>
              <a href="/dashboard/create-order" className={classes.link}>
                <Box mr={5}>
                  <IconBuildingStore stroke={1.5} />
                </Box>
                店舗提供
              </a>
              {/* 今後実装予定 */}
              {/* <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                <HoverCard.Target>
                  <a href="#" className={classes.link}>
                    <Center inline>
                      <Box component="span" mr={5}>
                        Features
                      </Box>
                      <IconChevronDown
                        style={{ width: rem(16), height: rem(16) }}
                        color={theme.colors.blue[6]}
                      />
                    </Center>
                  </a>
                </HoverCard.Target>
  
                <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                  <Group justify="space-between" px="md">
                    <Text fw={500}>Features</Text>
                    <Anchor href="#" fz="xs">
                      View all
                    </Anchor>
                  </Group>
  
                  <Divider my="sm" />
  
                  <SimpleGrid cols={2} spacing={0}>
                    {links}
                  </SimpleGrid>
  
                  <div className={classes.dropdownFooter}>
                    <Group justify="space-between">
                      <div>
                        <Text fw={500} fz="sm">
                          Get started
                        </Text>
                        <Text size="xs" c="dimmed">
                          Their food sources have decreased, and their numbers
                        </Text>
                      </div>
                      <Button variant="default">Get started</Button>
                    </Group>
                  </div>
                </HoverCard.Dropdown>
              </HoverCard> */}
            </Group>
  
            <Group visibleFrom="sm">
              {/* <Button variant="default">Log in</Button> */}
              <a href="/">
                <Button color="gray">ログアウト</Button>
              </a>
            </Group>
  
            <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
          </Group>
        </header>

        {/* ハンバーガーメニュー */}
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title=""
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
            <Divider my="sm" />
            <Box mb={16}>
                <a href="/dashboard" className={classes.link}>
                    <IconUser stroke={1.5} />
                    マイページ
                </a>
            </Box>
            <Box mb={16}>
                <a href="/dashboard/inventory" className={classes.link}>
                    <Box mr={5}>
                        <IconDatabaseImport  stroke={1.5} />
                    </Box>
                    在庫一覧
                </a>
            </Box>
            <Box mb={16}>
                <a href="/dashboard/create-product" className={classes.link}>
                    <Box mr={5}>
                        <IconBuildingWarehouse stroke={1.5} />
                    </Box>
                    製品作成
                </a>
            </Box>
            <Box mb={16}>
                <a href="/dashboard/create-order" className={classes.link}>
                    <Box mr={5}>
                        <IconBuildingStore stroke={1.5} />
                    </Box>
                    店舗提供
                </a>
            </Box>

            {/* 今後実装予定 */}
            {/* <UnstyledButton className={classes.link} onClick={toggleLinks}>
              <Center inline>
                <Box component="span" mr={5}>
                  Features
                </Box>
                <IconChevronDown
                  style={{ width: rem(16), height: rem(16) }}
                  color={theme.colors.blue[6]}
                />
              </Center>
            </UnstyledButton>
            <Collapse in={linksOpened}>{links}</Collapse> */}

            <Divider my="sm" />
  
            <Group justify="center" grow pb="xl" px="md">
              {/* <Button variant="default">Log in</Button> */}
              <a href="/">
                <Button color="gray">ログアウト</Button>
              </a>
            </Group>
          </ScrollArea>
        </Drawer>
        <Divider my="sm" />
      </Box>
    );
  }