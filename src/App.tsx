import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import PortfolioDataService from "./browser/services/portfolioService";

type Props = {};

interface IState {
  portfolio: {
    information: string;
    image: string;
    title: string;
    description: string;
    twitterId: string;
  };
  tweets: any;
}

interface ITweet {
  id: string;
  full_text: string;
  in_reply_to_screen_name: string;
}

class App extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      portfolio: {
        information: "",
        image: "",
        title: "",
        description: "",
        twitterId: "",
      },
      tweets: "",
    };
  }

  componentDidMount() {
    const query = new URLSearchParams(location.search);
    if (query.get("portfolio")) this.retrievePortfolio(query.get("portfolio"));
  }

  retrievePortfolio(portfolio: string | null) {
    PortfolioDataService.getPortfolio(portfolio)
      .then((res) => res.json())
      .then((data: any) => {
        this.setState({
          portfolio: data,
        });
        return PortfolioDataService.getTweets(data.twitterId)
          .then((res) => res.json())
          .then((response: any) => {
            return this.tweetList(response.userTimeline);
          })
          .then((data: any) => {
            this.setState({
              tweets: data,
            });
          })
          .catch((e: Error) => {
            console.log(e);
          });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  async tweetList(tweetList: any) {
    const listItems = tweetList.map((value: ITweet) => {
      return (
        <li className="list-inline-item mx-3">
          <span>
            <div className="text-center">
              <p className="text-center">{value.full_text}</p>
            </div>
          </span>
        </li>
      );
    });

    return <ul>{listItems}</ul>;
  }

  render() {
    return (
      <div>
        <div className="container mt-3">
          <section id="about">
            <div className="col-md-3">
              <h1 style={{ color: "black" }}>
                <span>Portfolio</span>
              </h1>
              <div className="row center mx-auto mb-5">
                <div className="col-md-4 mb-5 center">
                  <div className="polaroid">
                    <span style={{ cursor: "auto" }}>
                      <img height="250px" src={this.state.portfolio.image} alt="Avatar placeholder" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-9 mt-3">
              <div className="col-md-12">
                <h1 className="section-title" style={{ color: "black" }}>
                  <span className="text-black" style={{ textAlign: "center" }}>
                    Information
                  </span>
                </h1>
              </div>
              <div className="col-md-12">
                <p>{this.state.portfolio.description}</p>
              </div>
            </div>
          </section>
          <section>
            <div className="col-md-12 mt-3">
              <div className="col-md-12">
                <h1 className="section-title" style={{ color: "black" }}>
                  <span className="text-black" style={{ textAlign: "center" }}>
                    {this.state.portfolio.title} Timeline
                  </span>
                </h1>
              </div>
              <div className="col-md-12">{this.state.tweets}</div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
