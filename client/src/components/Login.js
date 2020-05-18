import React from "react";
import axios from "axios";

import './style.css';

class Login extends React.Component
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

   login = (e) => {
       e.preventDefault();
       axios
       .post("http://localhost:9090/api/auth/login", this.state.credentials)
       .then(res => {
           console.log(res);
           //localStorage.setItem("username",res.data.payload);
        //    this.props.history.push("/friendsList");
       })
       .catch(err => {
           console.log(err);
       });
   }

   render() {
    return (
     <div className="main">
        <h2>Login Form</h2>

        <form onSubmit={this.login}>
          
            {/* <div class="imgcontainer">
                <img src="../img_avatar2.png" alt="Avatar" class="avatar" />
            </div> */}
            
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
                    
                <button type="submit">Login</button>
            
            </div>
        
         
        </form>
              
      </div>
    );
  }

}

export default Login;