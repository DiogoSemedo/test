import React, { Component } from "react";
import Request from '../../request';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new_password1: '',
      new_password2: '',
    }
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleSave = event => {
    event.preventDefault();
    let guid = new URLSearchParams(window.location.search).get("guid");
      let fd = new FormData();
      for(let elem in this.state){
        fd.append(elem, this.state[elem]);
      }
      fd.append("guid", guid);
      Request.post("api/user/reset", fd).then( response => {
        if (response.status === 200)
          window.location.assign(window.location.origin + "/login");
      })
  };

  render() {
    return (
      <div className="login-page">
        <a href="/login" className="general-btn back-login" />
        <div className="container">
          <div className="login-form change-password">
            <div className="title">Create a new Password</div>
            {/* jmmonteiro criar nova password (ligação ao backend) */}
            <form onSubmit={this.handleSave}>
              <div className="input-password">
                <input
                  onChange={this.handleChange}
                  type="password"
                  placeholder="New password"
                  name="new_password1"
                  required
                />
              </div>
              <div className="input-password">
                <input
                  onChange={this.handleChange}
                  type="password"
                  placeholder="Confirm new password"
                  name="new_password2"
                  required
                />
              </div>
              <input type="submit" value="save"/>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
