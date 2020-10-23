import React, { useEffect } from 'react';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import UserList from './components/user/UserList';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/actions/authActions';

import { BrowserRouter, Route, Switch  } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <AppNavbar />
          <Switch>
            <Route path="/" exact render={() =>
              <Container>
                <ItemModal />
                <ShoppingList />
              </Container>
            } />
            <ProtectedRoute path="/users" exact component={UserList} />
            <Route path="*" render={() => <Container><h1>404 NOT FOUND</h1></Container>} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
