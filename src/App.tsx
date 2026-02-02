import {Helmet} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AuthenticatedLayout} from './layouts/AuthenticatedLayout';
import {Create, Login, TodoList, Welcome} from './pages';
import {ProtectedRoute, PublicRoute} from './components';
import {Register} from './pages/Register';
import {UnauthenticatedLayout} from './layouts/UnauthenticatedLayout';
import {ROUTES_NESTED} from './utils/routes';

function App() {
  const {i18n, t} = useTranslation();

  return (
    <>
      <Helmet
        titleTemplate={`%s - ${t('app.title')}`}
        defaultTitle={t('app.title')}
        htmlAttributes={{lang: i18n.language}}
      >
        <meta name="description" content={t('app.description')} />
      </Helmet>

      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route
            element={
              <PublicRoute>
                <UnauthenticatedLayout />
              </PublicRoute>
            }
          >
            <Route path={ROUTES_NESTED.PUBLIC.LOGIN} element={<Login />} />
            <Route path={ROUTES_NESTED.PUBLIC.REGISTER} element={<Register />} />
          </Route>

          {/* Protected routes */}
          <Route
            element={
              <ProtectedRoute>
                <AuthenticatedLayout />
              </ProtectedRoute>
            }
          >
            <Route path={ROUTES_NESTED.PROTECTED.HOME} element={<Welcome />} />
            <Route path={ROUTES_NESTED.PROTECTED.TODOS.LIST} element={<TodoList />} />
            <Route path={ROUTES_NESTED.PROTECTED.TODOS.CREATE} element={<Create />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
