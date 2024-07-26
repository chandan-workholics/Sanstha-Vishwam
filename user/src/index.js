import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageNotFound from './components/pages/PageNotFound';
import App from './App';
import './App.css';
import LoginCard from './components/pages/login';
import SignUp from './components/pages/SignUp';
import Registration from './components/pages/Registration';
import Home from './components/pages/Home';

const root = ReactDOM.createRoot(
    document.getElementById("root")
);

root.render(

    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index path="/" element={< Home />} />
                <Route index path="/login" element={< LoginCard />} />
                <Route index path="/sign-up" element={< SignUp />} />
                <Route index path="/registration-form" element={< Registration />} />
                <Route path='*' element={<PageNotFound />} />
            </Route>
        </Routes>
    </BrowserRouter>

);
