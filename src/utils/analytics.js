import ReactGA from 'react-ga4';
import { analytics } from '../../common';

// Replace with your actual Measurement ID when ready
const MEASUREMENT_ID = analytics;

let isInitialized = false;

export const initGA = () => {
  if (!isInitialized) {
    ReactGA.initialize(MEASUREMENT_ID);
    isInitialized = true;
  }
};

export const logPageView = (path) => {
  if (isInitialized) {
    ReactGA.send({ hitType: 'pageview', page: path });
  }
};

export const logEvent = ({ category, action, label }) => {
  if (isInitialized) {
    ReactGA.event({
      category,
      action,
      label,
    });
  }
};
