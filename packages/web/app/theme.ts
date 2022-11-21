import { extendTheme, defineStyleConfig } from '@chakra-ui/react'

const buttonTheme = defineStyleConfig({
  defaultProps: {
    size: 'lg',
    variant: 'solid',
    colorScheme: 'purple',
  },
})

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#050404',
        color: '#d9d0deff',
      },
    },
  },
  components: {
    Button: buttonTheme,
  },
})


export default theme
// --black: #050404
// --copper: #be7c4dff;
// --amaranth-m-p: #893168ff;
// --dark-purple: #4a1942ff;
// --dark-purple-2: #2e1c2bff;
// --languid-lavender: #d9d0deff;
