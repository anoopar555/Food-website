import React,{useState} from 'react' 
import Axios from 'axios'
import {v4 as uuidv4} from 'uuid';
import "./App.css"
import Recipe from './component/Recipe';
import Alert from "./component/Alert";
const App = () => {
  const[query,setQuery] = useState("");
  const[recipes,setRecipes] = useState([]);
  const [alert,setAlert] = useState(" ");
  const YOUR_APP_ID = "b5849c27";
  const YOUR_APP_KEY = "6f5dee3da72cdc5bf858fda7984a642c";
  const url =`https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;
  
  const getData = async() =>{
    if(query !== ""){
    const result =  await Axios.get(url);
    console.log(result);
    if(!result.data.more){
      return setAlert("NO food with such name");
    }
    setRecipes(result.data.hits);
    console.log(result.data);
    setAlert("")
    setQuery("");
    }else{
      setAlert("fill the form");
    }
  };

  const submit = (e) =>{
    e.preventDefault();
    getData();
    };
    
  const change = e =>{
       setQuery(e.target.value);
  };
  return (
    <div className ="App">
      <h1>Food Searching App</h1>
      <form className="search-form" onSubmit={submit}>
        {alert !=="" && <Alert alert={alert} />}
        <input
         type="text" 
         placeholder="Search Food"
         autoComplete="off" 
         onChange={change} 
         value={query}
         />
        <input type="submit" value="Search" />
      </form>
      <div className="recipes">
          {recipes !==[] && recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe}/>)
          }
      </div>
    </div>
  );
}

export default App

