import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { increment, decrement } from './features/counter/counterSlice';

function App() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="font-bold">Counter: {count}</p>
      <div className="space-x-4">
        <button
          onClick={() => dispatch(decrement())}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          -
        </button>
        <button
          onClick={() => dispatch(increment())}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          +
        </button>
      </div>
      <h1 className="font-bold mb-4">Counter: {count}</h1>
    </div>
  );
}

export default App;
