import { useEffect} from 'react';
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDataStore } from '../src/app/store/store';
import { Flowbite} from 'flowbite-react';
import Layout from './components/Layout';
import { useShallow } from 'zustand/react/shallow';

function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const loadPresentations = useDataStore(useShallow((state) => state.loadPresentations));

  useEffect(() => {
    if (isLoggedIn === 'true') {
      loadPresentations();
    }
  }, [isLoggedIn])

  return (
    <Flowbite>
      <BrowserRouter>
        <Layout />
        <ToastContainer position='bottom-right' autoClose={5000} pauseOnFocusLoss={false} />
      </BrowserRouter>
    </Flowbite>
  )
}

export default App
