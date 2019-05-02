# Reactify

### Team Members:
##### Sicen Luan  https://github.com/luansicen
##### Duy Nguyen  https://github.com/dnguyenocc
##### Ivo Siddarta https://github.com/ivo-siddarta
##### Angela Liu https://github.com/angelaliu1

### Prompt:
Spotify Client

### Abstract:
Our app supports searching for songs and adding songs to playlist. It creates a visualization of the lyrics of songs that you have added to playlist by generating a word cloud. We use the spotify api for searching and playing songs and musixmatch api for finding lyrics. We also use a package “stopword” to filter out meaningless words in the lyrics. 

### Components:
Cloud: Fetches the lyrics and generates a word cloud according to how often a word shows up in the lyrics.
Playlist: A container for added songs. Allows deleting songs.
Song: Upon searching, display the search result: song title, album image and singer.
AddedSongs: Songs that have been added to playlist.
SearchResults: A wrapper to display all search results. 

### Features:
Search for songs and add to playlist
Remove songs from playlist
Generates a word cloud for all lyrics in playlist

### Division of Labor:
Sicen Luan: WordCloud library, Project writeup; 
Angela Liu: Musixmatch lyrics API, Authentification; 
Ivo Siddarta: Lo-Fi mockup UI, Bootstrap, Add/Remove Playlist; 
Duy Nguyen: Spotify API, Search



### This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). ###

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify



