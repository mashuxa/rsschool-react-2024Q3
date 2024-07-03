import React, { PureComponent } from 'react';

interface FilmCardProps {
  title: string;
  description: string;
}

class FilmCard extends PureComponent<FilmCardProps, object> {
  render() {
    return (
      <div className="result-item card p-4 bg-gray-50 border-gray-300 rounded-md shadow-md">
        <h3 className="text-xl font-semibold">{this.props.title}</h3>
        <p>{this.props.description}</p>
      </div>
    );
  }
}

export default FilmCard;
