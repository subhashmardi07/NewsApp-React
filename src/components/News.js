import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component'

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

    capitalizeFirstLetter =(val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}


  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title= `${this.capitalizeFirstLetter(this.props.category)} -NewsMonkey`;
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

  fetchMoreData = async () => {
    this.setState({page: this.state.page + 1})
    const { country, category, pageSizes } = this.props;
    const { page } = this.state;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&pageSize=${pageSizes}&apiKey=f13c71a4dd5c4bd3aa5b644dceb0d644`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: '30px' }}>
          NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines
        </h1>
        {this.state.loading && <Spinner />}
        
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
          >
            <div className="container">

              <div className="row">
                {this.state.articles.map((element) => (
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
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
