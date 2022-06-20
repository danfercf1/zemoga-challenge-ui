import http from "./axios-connect";
import IPortfolioData from "../types/portfolioType";
import ITweetData from "../types/tweetType";

class PortfolioDataService {
  getPortfolio(id: string | null) {
    return fetch(`https://1s3k18bo01.execute-api.us-east-2.amazonaws.com/prod/portfolios/${id}`);
  }

  getTweets(id: string) {
    return fetch(`https://1s3k18bo01.execute-api.us-east-2.amazonaws.com/prod/tweets/${id}`);
  }
}

export default new PortfolioDataService();
