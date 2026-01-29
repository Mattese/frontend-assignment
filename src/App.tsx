import {Helmet} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {MainLayout} from './layouts/MainLayout';
import {TodoList, Welcome} from './pages';

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
          <Route element={<MainLayout />}>
            <Route path="/" element={<Welcome />} />
            <Route path="/todos" element={<TodoList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
