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
   display: flex;
   align-items: flex-end;

   @media (max-width: 1045px) {
      background-position: right;
   }

   @media (max-width: 970px) {
      justify-content: center;
   }
}

h1 {
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

   @media (max-width: 675px) {
      -webkit-text-stroke-width: 2.5px;
      font-size: 4rem;
   }
}

h2 {
   font-family: ${theme.fonts.pressStart};
   font-size: 2.5rem;
   text-transform: uppercase;
   color: ${theme.colors.midBlue};

   @media (max-width: 500px) {
      font-size: 2rem;
   }
}

p {
   font-family: ${theme.fonts.pressStart};
   line-height: 1.5;
   font-size: 1.2rem;

   @media (max-width: 420px) {
    font-size: 1rem;
  }
} 

img {
   max-width: 100%;
} 

button {
   font-size: 1.5rem;

   @media (max-width: 500px) {
      font-size: 1.3rem;
   }

   @media (max-width: 420px) {
      font-size: 1rem;
   }
}

  label {
    text-transform: uppercase;
    font-family: ${theme.fonts.pressStart};
    font-size: 1.5rem;

   @media (max-width: 500px) {
      font-size: 1.3rem;
   }

   @media (max-width: 420px) {
      font-size: 1rem;
   }
  }

  select {
   font-family: ${theme.fonts.pressStart};
   color: ${theme.colors.midBlue};
   font-size: 2rem;

   @media (max-width: 500px) {
      font-size: 1.3rem;
   }

   @media (max-width: 420px) {
      font-size: 1rem;
   }
  }

  a {
      font-family: ${theme.fonts.pressStart};
      color: ${theme.colors.midBlue};
      font-size: 1.5rem;

   @media (max-width: 500px) {
      font-size: 1.3rem;
   }

   @media (max-width: 420px) {
      font-size: 1rem;
   }
  }
`;
