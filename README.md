# Weather Dashboard

This project is a weather dashboard application built with [Create React App](https://github.com/facebook/create-react-app). It allows users to view current weather conditions and forecasts for their selected locations.

## Features

- Search for weather information by city name.
- View current temperature, humidity, wind speed, and weather conditions.
- 7-day weather forecast with detailed information.
- Interactive map to visualize weather conditions globally.
- Responsive design for seamless use on different devices.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and transitive dependencies (webpack, Babel, ESLint, etc.) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point, you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and medium deployments, and you shouldn't feel obligated to use this feature. However, we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## API Integration

This project uses the [OpenWeather API](https://openweathermap.org/api) to fetch weather data. Make sure to set up your API key in the `.env` file:

```
REACT_APP_WEATHER_API_KEY=your_api_key_here
```

## Deployment

This project can be deployed to platforms like [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/). Follow the [deployment guide](https://facebook.github.io/create-react-app/docs/deployment) for more details.

## Troubleshooting

If you encounter issues during the build process, refer to the [troubleshooting guide](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify).

## Additional Notes

- Ensure you have the latest version of Node.js installed for compatibility.
- The interactive map feature requires enabling the `REACT_APP_MAP_API_KEY` in the `.env` file.
- Contributions are welcome! Feel free to submit a pull request or open an issue for suggestions.
- For styling, this project uses [Tailwind CSS](https://tailwindcss.com/).
- Unit tests are written using [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/).
- CI/CD pipelines are configured using GitHub Actions.
- For global weather visualization, the project integrates with [Leaflet.js](https://leafletjs.com/).
- Make sure to review the `.env.example` file for all required environment variables.
- Documentation for the API endpoints used can be found [here](https://openweathermap.org/api).

