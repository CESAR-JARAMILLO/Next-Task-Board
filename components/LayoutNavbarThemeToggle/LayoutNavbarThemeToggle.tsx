import { Flex, Image, Switch, useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
import styles from './LayoutNavbarThemeToggle.module.css'


const LayoutNavbarThemeToggle = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <Flex 
      className={styles.navbarThemeToggle} 
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')} 
    >
      <Image src={'/assets/icon-light-theme.svg'} />
      <Switch 
        checked={computedColorScheme === 'dark'}
      />
      <Image src={'/assets/icon-dark-theme.svg'} />
    </Flex>
  )
}

export default LayoutNavbarThemeToggle