import React from 'react';
import axios from 'axios';



//import { axiosWithAuth } from "../utils/axiosWithAuth";

class JokesList extends React.Component 
{

    state = {
        jokesList: []
    }

    componentDidMount() {
       this.getJokesList();
    }

    getJokesList = () => {

        //axiosWithAuth()
        axios
        .get('http://localhost:9090/api/jokes')
        .then(res => {
          console.log(res);
          this.setState({jokesList: res.data})
        })
        .catch(err => {
          console.log(err);
        });
    } 

   render() {

        return (
            <div>
                <h2>Jokes List</h2>
                <table>
                   <tbody> 
                        <tr> 
                            <th>ID</th>
                            <th>Joke</th>
                        </tr> 
                        {this.state.jokesList.map( (res, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{res.joke}</td>
                        </tr> 
                        ))}
                   </tbody>
                </table>
            </div>
        ); 
    }

}

export default JokesList;