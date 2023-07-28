/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React from 'react';

export const paymentLogos = {
  applePayLogo: React.lazy(async () => import('./applePayLogo.svg')),
  googlePayLogo: React.lazy(async () => import('./googlePayMark.svg')),
  mastercardLogo: React.lazy(async () => import('./mastercardLogo.svg')),
  payPalLogoCompressed: React.lazy(async () => import('./payPalLogoCompressed.svg')),
  sepaLogo: React.lazy(async () => import('./sepaLogo.svg')),
  visaLogo: React.lazy(async () => import('./visaLogo.svg')),
};
