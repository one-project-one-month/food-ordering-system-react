import AppRouter from './route/AppRouter';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <div className='h-screen'>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </div>
  );
}

export default App;
