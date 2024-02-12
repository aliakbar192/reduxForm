import React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import UserForm from './components/userform/UserForm';
import store, { persistor } from './redux/store';
import PrivateRoutes from './PrivateRoutes';
import HomePage from './components/home/HomePage';
import CreatePost from './components/createPost/CreatePost';

function App() {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#442445',
            },
        },
        typography: {
            fontFamily: ['Product Sans', 'Poppins', 'Arial', 'sans-serif'].join(','),
        },
    });
    return (
        <div className="App">
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ToastContainer />
                    <ThemeProvider theme={theme}>
                        <BrowserRouter>
                            <Routes>
                                <Route element={<PrivateRoutes />}>
                                    <Route path="/" element={<HomePage />} />
                                    <Route path="/createpost" element={<CreatePost />} />
                                </Route>
                                <Route path="/signUp" element={<UserForm />} />
                            </Routes>
                        </BrowserRouter>
                    </ThemeProvider>
                </PersistGate>
            </Provider>
        </div>
    );
}

export default App;
