import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const Global = createGlobalStyle`
*:focus {
   outline: 0;
   -moz-outline-style: none;
   outline-style: none;
   border: 2px solid rgba(82, 168, 236, 0.8);
}

html {
   font-size: 62.5%; 
}

body {
   line-height: 1.3;
   background-size: cover;
   background-repeat: no-repeat;
   background-position: bottom;
   height: 100vh;
   position: relative;
   font-size: 2rem;
   color: ${theme.colors.midBlue};

   @media (max-width: 1045px) {
    background-position: right;
   }
}

h1, h2 {
   font-family: ${theme.fonts.pokemon};
   color: ${theme.colors.supernova};
   font-size: 5rem;
   text-shadow: 4px 4px 0px rgba(0, 0, 0, 0.3);
   letter-spacing: 0.1em;
   -webkit-text-stroke-width: 3.5px;
   -webkit-text-stroke-color: ${theme.colors.midBlue};

   @media (max-width: 1045px) {
      font-size: 5rem;
   }
}

p {
   font-family: ${theme.fonts.sen};
   line-height: 1.5;
} 

img {
   max-width: 100%;
}
`;
