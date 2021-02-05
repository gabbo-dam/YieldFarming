import React from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Farm from '../Farm';
import FarmCards from './FarmCards';

const Farms: React.FC = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <PageHeader
            icon={'🏦'}
            title="Pick a Farm."
            subtitle="Earn LAYERx by providing liquidity"
          />
          <FarmCards />
        </Route>
        <Route path={`${path}/:farmId`}>
          <Farm />
        </Route>
        <Redirect from="/" to={`${path}/LAYERXETHPool`} />
      </Page>
    </Switch>
  );
};

export default Farms;
