import React, { Component } from 'react';

import { Film } from '../../types.ts';
import SearchForm from '../../components/SearchForm/SearchForm.tsx';
import FilmCard from '../../components/FilmCard/FilmCard.tsx';

interface StateType {
  films: Film[];
}
class Home extends Component<object, StateType> {
  constructor(props) {
    super(props);

    this.state = { films: [] };
  }

  handleSuccess = (films: Film[]) => {
    this.setState({ films });
  };

  render() {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-lg mx-auto">
          <SearchForm onSuccess={this.handleSuccess} />
          <div className="mt-6 space-y-4 p-6 border border-gray-300 rounded-md">
            <h2>Searc results: {this.state.films.length}</h2>
            {this.state.films.map(({ title, opening_crawl }, index) => (
              <FilmCard key={index} title={title} description={opening_crawl} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
