import { Flex, Image, Switch, useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
import styles from './LayoutNavbarThemeToggle.module.css'


const LayoutNavbarThemeToggle = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <Flex className={styles.navbarThemeToggle} >
      <Image src={'/assets/icon-light-theme.svg'} />
      <Switch

        className={styles.themeToggleSwitch}
        classNames={{
          track: styles.themeToggleTrack,
        }}
        checked={computedColorScheme === 'dark'}
        onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      />
      <Image src={'/assets/icon-dark-theme.svg'} />
    </Flex>
  )
}

export default LayoutNavbarThemeToggle