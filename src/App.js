import React from "react";
import "./App.css";
import Loading from "./components/Loading";
import ShowTopRepos from "./components/ShowTopRepos";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.languages = ["all", "javascript", "ruby", "python"];
    this.state = {
      lang: "",
      loading: false,
      allRepos: [],
    };
    this.fetchData = this.fetchData.bind(this);
  }
  componentDidMount() {
    window.API = {
      fetchPopularRepos(language) {
        // "language" can be "javascript", "ruby", "python", or "all"
        const encodedURI = encodeURI(
          `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
        );

        return fetch(encodedURI)
          .then((data) => data.json())
          .then((repos) => repos.items)
          .catch((error) => {
            console.warn(error);
            return null;
          });
      },
    };
    this.fetchData(this.state.lang);
  }
  fetchData() {
    this.setState({
      loading: true,
    });
    console.log(this.state.lang);
    window.API.fetchPopularRepos(this.state.lang).then((data) => {
      console.log(data[0]);
      this.setState({
        allRepos: data,
        loading: false,
      });
    });
  }
  render() {
    return (
      <div>
        <div className="ui container">
          <div className="ui center aligned container">
            <div
              className="ui icon input focus"
              style={{ margin: "10px", width: "400px" }}
            >
              <input
                type="text"
                placeholder="Search for any Programming language..."
                value={this.state.lang}
                onChange={(e) => this.setState({ lang: e.target.value })}
              />
              <i className="search icon"></i>
            </div>
            <button
              className="ui basic button focus green"
              onClick={this.fetchData}
            >
              Search
            </button>
          </div>
          {this.state.loading === true ? (
            <Loading />
          ) : (
            <ShowTopRepos
              allRepos={this.state.allRepos}
              lang={this.state.lang}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
