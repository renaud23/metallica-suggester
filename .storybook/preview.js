import { addDecorator } from '@storybook/react';
import { initializeWorker, mswDecorator } from 'msw-storybook-addon';

const BASE_PATH = process.env.BASE_PATH;
console.log({ BASE_PATH });

initializeWorker({ url: `${BASE_PATH}/mockServiceWorker.js` });
addDecorator(mswDecorator);

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
};
