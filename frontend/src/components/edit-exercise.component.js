import React, { Component } from "react";
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {useParams } from "react-router-dom";

function withRouter(Component) {
  return props => {
    const params = useParams();
    return <Component {...props} params={params} />;
  };
}

class EditExercise extends Component {
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

            this.state = {
                username:'',
                description:'',
                duration: 0,
                date: new Date(),
                users: []
        }
    }

    componentDidMount(){
        const id = this.props.params.id;
        axios.get('http://localhost:5000/exercises/'+ id)
        .then(response => {
            this.setState({
                username: response.data.username,
                description: response.data.description,
                duration: response.data.duration,
                date: new Date(response.data.date)
            })
        })
        .catch(function (error) {
            console.log(error);
        })


        axios.get('http://localhost:5000/users/')
        .then(response => {
            if (response.data.length>0) {
                this.setState({
                    users: response.data.map(user => user.username),
                })
            }
        })
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

     onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }

     onChangeDuration(e){
        this.setState({
            duration: e.target.value
        });
    }

     onChangeDate(date){
        this.setState({
            date: date
        });
    }

    onSubmit(e){
        e.preventDefault();

        const exercise ={
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);
        const id = this.props.params.id;

        axios.post('http://localhost:5000/exercises/update/'+ id, exercise)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));

        window.location = '/';
    }

  render() {
    return (
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Edit Exercise</h1>
            <p className="page-subtitle">Update your workout details</p>
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
                className="form-input"
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
              Save Changes
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(EditExercise);