import React, { useState, useEffect } from 'react';
import { Row, Col, Spin, Typography, Button } from 'antd';
import { FireOutlined, StarOutlined, CalendarOutlined, PlayCircleOutlined } from '@ant-design/icons';
import MovieCard from '../components/MovieCard';
import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from '../services/api';
import './Home.css';

const { Title } = Typography;

const Home = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const [nowPlayingData, popularData, topRatedData, upcomingData] = await Promise.all([
          getNowPlayingMovies(1),
          getPopularMovies(1),
          getTopRatedMovies(1),
          getUpcomingMovies(1),
        ]);

        setNowPlaying(nowPlayingData.results.slice(0, 8));
        setPopular(popularData.results.slice(0, 8));
        setTopRated(topRatedData.results.slice(0, 8));
        setUpcoming(upcomingData.results.slice(0, 8));
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <Title level={1} className="hero-title">
            Discover Amazing Movies
          </Title>
          <Title level={4} className="hero-subtitle">
            Explore the world of cinema with our curated collection of the best movies
          </Title>
        </div>
      </div>

      <div className="movies-section">
        <div className="section-header">
          <PlayCircleOutlined className="section-icon" />
          <Title level={2} className="section-title">Now Playing</Title>
        </div>
        <Row gutter={[24, 24]}>
          {nowPlaying.map((movie) => (
            <Col xs={12} sm={12} md={8} lg={6} xl={6} key={movie.id}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      </div>

      <div className="movies-section">
        <div className="section-header">
          <FireOutlined className="section-icon" />
          <Title level={2} className="section-title">Popular Movies</Title>
        </div>
        <Row gutter={[24, 24]}>
          {popular.map((movie) => (
            <Col xs={12} sm={12} md={8} lg={6} xl={6} key={movie.id}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      </div>

      <div className="movies-section">
        <div className="section-header">
          <StarOutlined className="section-icon" />
          <Title level={2} className="section-title">Top Rated</Title>
        </div>
        <Row gutter={[24, 24]}>
          {topRated.map((movie) => (
            <Col xs={12} sm={12} md={8} lg={6} xl={6} key={movie.id}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      </div>

      <div className="movies-section">
        <div className="section-header">
          <CalendarOutlined className="section-icon" />
          <Title level={2} className="section-title">Upcoming Movies</Title>
        </div>
        <Row gutter={[24, 24]}>
          {upcoming.map((movie) => (
            <Col xs={12} sm={12} md={8} lg={6} xl={6} key={movie.id}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Home;





