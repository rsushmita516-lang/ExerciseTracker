import React, { Component } from "react";
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    };
  }

  componentDidMount(){
    axios.get('/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          });
        }
      })
      .catch(error => {
        console.error('GET /users failed:', error.response?.data || error.message);
      });
  }

  onChangeUsername(e){
    this.setState({ username: e.target.value });
  }

  onChangeDescription(e){
    this.setState({ description: e.target.value });
  }

  onChangeDuration(e){
    this.setState({ duration: e.target.value });
  }

  onChangeDate(date){
    this.setState({ date: date });
  }

  onSubmit(e){
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description.trim(),
      duration: Number(this.state.duration),
      date: this.state.date
    };

    axios.post('/exercises/add', exercise)
      .then(res => {
        console.log(res.data);
        window.location = '/';
      })
      .catch(err => {
        console.error('POST /exercises/add failed:', err.response?.data || err.message);
        alert('Failed to create exercise. Check backend terminal for exact error.');
      });
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Log Exercise</h1>
            <p className="page-subtitle">Record a new workout session</p>
          </div>
        </div>
        <div className="form-card">
          <form onSubmit={this.onSubmit}>
            <div className="form-field">
              <label className="form-label">Username</label>
              <select
                required
                className="form-select"
                value={this.state.username}
                onChange={this.onChangeUsername}
              >
                {this.state.users.map(user => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label className="form-label">Exercise Description</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="e.g. Morning run, Bench press..."
                value={this.state.description}
                onChange={this.onChangeDescription}
              />
            </div>

            <div className="form-field">
              <label className="form-label">Duration (minutes)</label>
              <input
                type="number"
                required
                min="1"
                step="1"
                className="form-input"
                placeholder="30"
                value={this.state.duration}
                onChange={this.onChangeDuration}
              />
            </div>

            <div className="form-field">
              <label className="form-label">Date</label>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
                dateFormat="MMMM d, yyyy"
              />
            </div>

            <button
              type="submit"
              className="btn-primary-gradient"
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              Log Exercise
            </button>
          </form>
        </div>
      </div>
    );
  }
}