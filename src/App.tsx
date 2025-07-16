import AppRouter from './route/AppRouter';
import { Provider } from 'react-redux';
import { store } from './store';
// import Cookies from 'js-cookie';
function App() {
  // Cookies.set('role','user')
  return (
    <div className='bg-mainBg h-screen'>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </div>
  );
}

export default App;
