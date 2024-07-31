/* eslint-disable */
import { showAlert } from './alerts.js';

// const stripe = Stripe(
//   'pk_live_51PiY60LsTGMzrUIla32CgIcoHiNGuYjtYTek57hU6ONs4taZxqP3kiX8oBKXg5eWlfh1XFXOAjeYV97xJd5WNW9a002FlCaeZl',
// );

export const bookTour = async (tourId) => {
  try {
    // 1) Get Checkout Session from API
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`,
    );
    console.log(session);
    // 2) Create checkout form  charge credit card
    window.location.replace(session.data.session.url);
  } catch (error) {
    console.log(error);
    showAlert('error', error);
  }
};
