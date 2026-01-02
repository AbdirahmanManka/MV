import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Layout from './components/Layout';
import Home from './pages/Home';
import MovieList from './pages/MovieList';
import MovieDetails from './pages/MovieDetails';
import Search from './pages/Search';
import 'antd/dist/reset.css';
import './App.css';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#667eea',
          borderRadius: 8,
        },
      }}
    >
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/popular" element={<MovieList type="popular" />} />
            <Route path="/top-rated" element={<MovieList type="top-rated" />} />
            <Route path="/upcoming" element={<MovieList type="upcoming" />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Layout>
      </Router>
    </ConfigProvider>
  );
}

export default App;
