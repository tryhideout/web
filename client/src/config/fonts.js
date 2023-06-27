import { Global } from '@emotion/react';

const Fonts = () => (
	<Global
		styles={`

	  @font-face {
        font-family: 'Hellix';
        font-style: bold;
        font-weight: 700;
        font-display: swap;
        src: url('../assets/fonts/Hellix-Bold.ttf') format('ttf');
      }

      @font-face {
        font-family: 'Hellix';
        font-style: semibold;
        font-weight: 600;
        font-display: swap;
        src: url('../assets/fonts/Hellix-SemiBold.ttf') format('ttf');
      }

	  @font-face {
        font-family: 'Hellix';
        font-style: medium;
        font-weight: 500;
        font-display: swap;
        src: url('../assets/fonts/Hellix-Medium.ttf') format('ttf');
      }

	  @font-face {
        font-family: 'Hellix';
        font-style: regular;
        font-weight: 400;
        font-display: swap;
        src: url('../assets/fonts/Hellix-Regular.ttf') format('ttf');
      }

	  @font-face {
        font-family: 'Hubot';
        font-style: bold;
        font-weight: 500;
        font-display: swap;
        src: url('../assets/fonts/Hubot-Sans-Bold.otf') format('otf');
      }

	  @font-face {
        font-family: 'Hubot';
        font-style: regular;
        font-weight: 400;
        font-display: swap;
        src: url('../assets/fonts/Hubot-Sans-Regular.otf') format('otf');
      }
      `}
	/>
);

export default Fonts;
