import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    width: number;
    font: {
      small: number;
      medium: number;
      big: number; 
    }
  }
}