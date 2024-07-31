import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import PageNotFound from './components/pages/PageNotFound';
import App from './App';
import './App.css';
import Cutomer from './components/pages/Cutomer';
import Master from './components/pages/Master';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(
    document.getElementById("root")
);
root.render(
    <BrowserRouter>
        <ToastContainer rtl />
        <Routes>
            <Route path="/sv" element={<App />}>
                <Route index path="/sv" element={<Home />} />
                <Route index path="/sv/masters" element={<Master />} />
                <Route index path="/sv/customer" element={<Cutomer />} />
                <Route path='*' element={<PageNotFound />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

