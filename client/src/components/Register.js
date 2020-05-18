import React from "react";
import axios from "axios";

import './style.css';

class Register extends React.Component
{
   state = {
    credentials: {
         username: "",
         password: ""
        }
   };

   handleChange = (e) => {
       this.setState({
           credentials: {
                  ...this.state.credentials, 
                  [e.target.name]:e.target.value
                 }  
       });
   }

   register = (e) => {
       e.preventDefault();
       axios
       .post("http://localhost:9090/api/auth/register", this.state.credentials)
       .then(res => {
           console.log(res);
        //    localStorage.setItem("token",res.data.payload);
        //    this.props.history.push("/friendsList");
       })
       .catch(err => {
           console.log(err);
       });
   }

   render() {
    return (
     <div className="main">
        <h2>Register Form</h2>

        <form onSubmit={this.register}>
          
            <div className="container">
                
                <label htmlFor="uname"><b>Username</b></label>            
                <input
                type="text"
                placeholder="Enter Username"
                name="username"
                value={this.state.credentials.username}
                onChange={this.handleChange}
                />    
            
                <label htmlFor="psw"><b>Password</b></label>          
                <input
                type="password"
                placeholder="Enter Password"
                name="password"
                value={this.state.credentials.password}
                onChange={this.handleChange}
                />
                    
                <button type="submit">Register</button>
            
            </div>
        
         
        </form>
              
      </div>
    );
  }

}

export default Register;