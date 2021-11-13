import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Links } from "../../imports/api/links";

const PER_PAGE = 20;

class LinkList extends Component {

  componentDidMount() {
    this.page = 1;
  }

  handleButtonClick() {
    Meteor.subscribe("links", PER_PAGE * this.page);
    this.page += 1;
  }

  renderRows() {
    return this.props.links.map( link => {
        const { url, token, clicks } = link;
        const shortLink = `http://localhost:3000/${token}`;

        return (
          <tr key={token} id={token}>
            <td>{url}</td>
            <td>
              <a href={shortLink}>{shortLink}</a>
            </td>
            <td>{clicks}</td>
          </tr>
        );
    })
  }

  render() {
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Address</th>
              <th>Clicks</th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
        <button
          onClick={this.handleButtonClick.bind(this)}
          className="btn btn-primary"
        >
          Load more...
        </button>
      </>
    );
  }
}

export default withTracker(() => {
  // 1 step set up subscription
  Meteor.subscribe("links", PER_PAGE);

  // 2 step return an object. Whatever we return will be sent to LinkList as props
  return { links: Links.find({}).fetch() };
})(LinkList);
