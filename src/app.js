import React from 'react';
import GlobalStyles from '@zeep/assets/styles/globalStyle';
import Routes from './router';
import AppProvider from './AppProvider';

const App = () => (

    <AppProvider>
      <>
        <GlobalStyles />
        <Routes />
      </>
    </AppProvider>
 
);

export default App;
