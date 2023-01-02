import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

export const theme = extendTheme(
  { config },
  {
    colors: {
      brand: {
        200: '#3D84F7',
        300: '#5492f8',
        400: '#85b1fa',
      },
    },
    styles: {
      global: () => ({
        body: {
          bg: 'whiteAlpha.200',
        },
      }),
    },
  },
)
