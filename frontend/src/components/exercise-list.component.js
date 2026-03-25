import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = ({ exercise, deleteExercise }) => {
  const initials = exercise.username
    ? exercise.username.slice(0, 2).toUpperCase()
    : '??';

  const formattedDate = new Date(exercise.date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <div className="exercise-card">
      <div className="exercise-card-header">
        <div className="user-avatar">{initials}</div>
        <span className="username-text">{exercise.username}</span>
      </div>
      <p className="exercise-description">{exercise.description}</p>
      <div className="exercise-meta">
        <span className="badge badge-duration">⏱ {exercise.duration} min</span>
        <span className="badge badge-date">📅 {formattedDate}</span>
      </div>
      <div className="exercise-actions">
        <Link to={"/edit/" + exercise._id} className="btn-icon btn-edit">
          ✏️ Edit
        </Link>
        <button
          onClick={() => deleteExercise(exercise._id)}
          className="btn-icon btn-delete"
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
};

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);
    this.deleteExercise = this.deleteExercise.bind(this);
    this.state = { exercises: [] };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/exercises/')
      .then(response => this.setState({ exercises: response.data }))
      .catch(error => console.log(error));
  }

  deleteExercise(id) {
    axios.delete('http://localhost:5000/exercises/' + id)
      .then(res => console.log(res.data));
    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    });
  }

  render() {
    const { exercises } = this.state;
    const totalMinutes = exercises.reduce((sum, e) => sum + Number(e.duration), 0);
    const uniqueUsers = [...new Set(exercises.map(e => e.username))].length;

    return (
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Exercise Log</h1>
            <p className="page-subtitle">Track and manage your workout history</p>
          </div>
          <Link to="/create" className="btn-primary-gradient">
            + Log Exercise
          </Link>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Sessions</div>
            <div className="stat-value indigo">{exercises.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Minutes</div>
            <div className="stat-value sky">{totalMinutes}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Active Users</div>
            <div className="stat-value green">{uniqueUsers}</div>
          </div>
        </div>

        {exercises.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🏋️</div>
            <h3>No exercises logged yet</h3>
            <p>Start by logging your first workout!</p>
          </div>
        ) : (
          <div className="exercises-grid">
            {exercises.map(exercise => (
              <Exercise
                key={exercise._id}
                exercise={exercise}
                deleteExercise={this.deleteExercise}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}