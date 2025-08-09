import AppRouter from './route/AppRouter';
import { Provider } from 'react-redux';
import { store } from './store';
import MetaUpdater from './layout/MetaUpdater';

function App() {
  return (
    <div className='h-screen'>
      <Provider store={store}>
        <MetaUpdater />
        <AppRouter />
      </Provider>
    </div>
  );
}

export default App;
