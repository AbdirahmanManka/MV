import React from 'react';
import { Card } from 'antd';
import { CalendarOutlined, StarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../services/api';
import './MovieCard.css';

const { Meta } = Card;

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <Card
      hoverable
      className="movie-card"
      cover={
        <div className="movie-card-cover">
          <img
            alt={movie.title}
            src={getImageUrl(movie.poster_path)}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500x750?text=No+Image';
            }}
          />
          <div className="movie-card-overlay">
            <div className="movie-card-rating">
              <StarOutlined /> {movie.vote_average?.toFixed(1)}
            </div>
          </div>
        </div>
      }
      onClick={handleClick}
    >
      <Meta
        title={
          <div className="movie-card-title">
            {movie.title}
          </div>
        }
        description={
          <div className="movie-card-description">
            <div className="movie-card-date">
              <CalendarOutlined /> {movie.release_date?.split('-')[0] || 'N/A'}
            </div>
            {movie.overview && (
              <p className="movie-card-overview">
                {movie.overview.length > 100
                  ? `${movie.overview.substring(0, 100)}...`
                  : movie.overview}
              </p>
            )}
          </div>
        }
      />
    </Card>
  );
};

export default MovieCard;



