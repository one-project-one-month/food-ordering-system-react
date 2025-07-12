import AppRouter from './route/AppRouter';
import { Provider } from 'react-redux';
import { store } from './store';
// import Cookies from 'js-cookie';
function App() {
  // Cookies.set('role','owner')
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
