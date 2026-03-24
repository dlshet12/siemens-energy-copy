import { addons } from '@storybook/manager-api';

// Hide zoom (+/-), eject (refresh), etc. so foundation docs show only the document.
addons.setConfig({
  toolbar: {
    zoom: { hidden: true },
    eject: { hidden: true },
    copy: { hidden: true },
    fullscreen: { hidden: true },
  },
});
