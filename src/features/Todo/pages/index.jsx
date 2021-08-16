import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ListPage from './ListPage';
import DetailPage from './DetailPage';
import NotFound from '../../../components/NotFound';


function TodoFeature() {
    const match = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route path={match.path} component={ListPage} exact></Route>
                <Route path={`${match.path}/:todoId`} component={DetailPage} exact></Route>

                <Route component={NotFound} />
            </Switch>

        </div>
    );
}

export default TodoFeature;