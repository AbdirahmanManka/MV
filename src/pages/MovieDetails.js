import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Spin,
  Typography,
  Row,
  Col,
  Tag,
  Space,
  Divider,
  Card,
  Avatar,
  Rate,
  Button,
} from 'antd';
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  StarOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { getMovieDetails, getMovieCredits, getMovieVideos, getImageUrl } from '../services/api';
import './MovieDetails.css';

const { Title, Paragraph, Text } = Typography;

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const [movieData, creditsData, videosData] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id),
          getMovieVideos(id),
        ]);

        setMovie(movieData);
        setCredits(creditsData);
        setVideos(videosData);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="error-container">
        <Title level={2}>Movie not found</Title>
        <Button onClick={() => navigate('/')}>Go Home</Button>
      </div>
    );
  }

  const trailer = videos?.results?.find((video) => video.type === 'Trailer' && video.site === 'YouTube');

  return (
    <div className="movie-details-page">
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        className="back-button"
      >
        Back
      </Button>

      <div
        className="movie-hero"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url(${getImageUrl(movie.backdrop_path, 'w1280')})`,
        }}
      >
        <div className="movie-hero-content">
          <Row gutter={[32, 32]}>
            <Col xs={24} sm={24} md={8} lg={6}>
              <div className="movie-poster">
                <img
                  src={getImageUrl(movie.poster_path, 'w500')}
                  alt={movie.title}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/500x750?text=No+Image';
                  }}
                />
              </div>
            </Col>
            <Col xs={24} sm={24} md={16} lg={18}>
              <div className="movie-info">
                <Title level={1} className="movie-title">
                  {movie.title}
                </Title>
                <div className="movie-meta">
                  <Space size="large" wrap>
                    <div className="meta-item">
                      <StarOutlined /> {movie.vote_average?.toFixed(1)} / 10
                    </div>
                    <div className="meta-item">
                      <CalendarOutlined /> {movie.release_date?.split('-')[0]}
                    </div>
                    <div className="meta-item">
                      <ClockCircleOutlined /> {movie.runtime} min
                    </div>
                    {movie.budget > 0 && (
                      <div className="meta-item">
                        <DollarOutlined /> ${movie.budget.toLocaleString()}
                      </div>
                    )}
                  </Space>
                </div>
                <div className="movie-genres">
                  <Space wrap>
                    {movie.genres?.map((genre) => (
                      <Tag key={genre.id} color="purple" className="genre-tag">
                        {genre.name}
                      </Tag>
                    ))}
                  </Space>
                </div>
                <Paragraph className="movie-overview">{movie.overview}</Paragraph>
                {trailer && (
                  <Button
                    type="primary"
                    size="large"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank')}
                    className="trailer-button"
                  >
                    Watch Trailer
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <div className="movie-details-content">
        {credits?.cast && credits.cast.length > 0 && (
          <div className="cast-section">
            <Title level={2} className="section-title">
              Cast
            </Title>
            <div className="cast-grid">
              {credits.cast.slice(0, 12).map((actor) => (
                <Card
                  key={actor.id}
                  className="cast-card"
                  cover={
                    <Avatar
                      size={120}
                      src={getImageUrl(actor.profile_path)}
                      icon={<UserOutlined />}
                      className="cast-avatar"
                    />
                  }
                >
                  <Card.Meta
                    title={actor.name}
                    description={actor.character}
                  />
                </Card>
              ))}
            </div>
          </div>
        )}

        {credits?.crew && credits.crew.length > 0 && (
          <div className="crew-section">
            <Title level={2} className="section-title">
              Crew
            </Title>
            <Row gutter={[16, 16]}>
              {credits.crew
                .filter((member) => ['Director', 'Producer', 'Writer', 'Screenplay'].includes(member.job))
                .slice(0, 8)
                .map((member) => (
                  <Col xs={12} sm={8} md={6} lg={4} key={member.id}>
                    <Card className="crew-card">
                      <Card.Meta
                        avatar={
                          <Avatar
                            src={getImageUrl(member.profile_path)}
                            icon={<UserOutlined />}
                          />
                        }
                        title={member.name}
                        description={member.job}
                      />
                    </Card>
                  </Col>
                ))}
            </Row>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;


