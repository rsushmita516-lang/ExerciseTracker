import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUsers extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { username: '', success: false };
  }

  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = { username: this.state.username };
    axios.post('http://localhost:5000/user/add', user)
      .then(res => {
        console.log(res.data);
        this.setState({ username: '', success: true });
        setTimeout(() => this.setState({ success: false }), 3000);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Add User</h1>
            <p className="page-subtitle">Create a new user to track exercises</p>
          </div>
        </div>
        <div className="form-card">
          {this.state.success && (
            <div className="alert-success">✓ User created successfully!</div>
          )}
          <form onSubmit={this.onSubmit}>
            <div className="form-field">
              <label className="form-label">Username</label>
              <input
                required
                className="form-input"
                placeholder="Enter a username..."
                value={this.state.username}
                onChange={this.onChangeUsername}
              />
            </div>
            <button
              type="submit"
              className="btn-primary-gradient"
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              Create User
            </button>
          </form>
        </div>
      </div>
    );
  }
}