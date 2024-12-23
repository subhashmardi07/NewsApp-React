import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSizes: 8,
    category: 'general',
  };

  static propTypes = {
    country: PropTypes.string,
    pageSizes: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  async updateNews() {
    const { country, category, pageSizes } = this.props;
    const { page } = this.state;
    this.setState({ loading: true });
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&pageSize=${pageSizes}&apiKey=f13c71a4dd5c4bd3aa5b644dceb0d644`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState(
      (prevState) => ({ page: prevState.page - 1 }),
      this.updateNews
    );
  };

  handleNextClick = async () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      this.updateNews
    );
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: '30px' }}>
          NewsMonkey - Top Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title || ''}
                  description={element.description || ''}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page >=
              Math.ceil(this.state.totalResults / this.props.pageSizes)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
