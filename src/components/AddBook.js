import React, { Component } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

class AddBook extends Component {
  state = {
    name: "",
    genre: "",
    authorId: "",
  };

  submitForm = (e) => {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };

  render() {
    return (
      <div>
        <form id="add-book" onSubmit={this.submitForm}>
          <div className="field">
            <label>Book Name</label>
            <input
              type="text"
              name="name"
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Genre</label>
            <input
              type="text"
              name="genre"
              onChange={(e) => this.setState({ genre: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Select Author</label>
            <select
              onChange={(e) => this.setState({ authorId: e.target.value })}
            >
              {this.props.getAuthorsQuery.loading ? (
                <div>Loading</div>
              ) : (
                this.props.getAuthorsQuery.authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))
              )}
            </select>
          </div>
          <button type="submit">+</button>
        </form>
      </div>
    );
  }
}
export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
