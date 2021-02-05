import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { UseWalletProvider } from 'use-wallet';

import FarmsProvider from './contexts/Farms';
import LayerxProvider from './contexts/LayerxProvider';
import ModalsProvider from './contexts/Modals';

import Farms from './views/Farms';

import store from './state';
import theme from './theme';
import config from './config';
import Updaters from './state/Updaters';
import Popups from './components/Popups';

const App: React.FC = () => {
  return (
    <Providers>
      <Router>
        <Switch>
          <Route path="/farm">
            <Farms />
          </Route>
          <Redirect from="/" to="farm" />
        </Switch>
      </Router>
    </Providers>
  );
};

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider chainId={config.chainId}>
        <Provider store={store}>
          <Updaters />
          <LayerxProvider>
            <ModalsProvider>
              <FarmsProvider>
                <>
                  <Popups />
                  {children}
                </>
              </FarmsProvider>
            </ModalsProvider>
          </LayerxProvider>
        </Provider>
      </UseWalletProvider>
    </ThemeProvider>
  );
};

export default App;
