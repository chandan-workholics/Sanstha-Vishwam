import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import PageNotFound from './components/pages/PageNotFound';
import App from './App';
import './App.css';
import Cutomer from './components/pages/Cutomer';
import Master from './components/pages/Master';


const root = ReactDOM.createRoot(
    document.getElementById("root")
);
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/home" element={<App />}>
                <Route index path="/home" element={<Home />} />
                <Route index path="/home/masters" element={<Master />} />
                <Route index path="/home/customer" element={<Cutomer />} />
                <Route path='*' element={<PageNotFound />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

