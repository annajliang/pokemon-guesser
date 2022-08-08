import { createGlobalStyle } from 'styled-components';

export const Animations = createGlobalStyle`
@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}


@keyframes pulse {
  0% {
    opacity: 1;
  }
  25% {
	  transform: scale(1);
  }
  38% {
    transform: scale(1.2);
    opacity: 1;
  }
}

@keyframes fade-in-up {
  0%,
  10% {
    top: 40%;
    opacity: 1;
  }
  100% {
    top: -100%;
    opacity: 0;
  }
}

@keyframes fadeInOpacity {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
`;
