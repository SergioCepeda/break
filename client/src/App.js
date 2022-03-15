import './App.css';
import { BrowserRouter, Switch,Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CharacterCreate from './components/CharacterCreate';
import Detail from './components/Detail';






function App() {
  return (
  

   <BrowserRouter>
   <Switch>

        <Route exact path= "/" component={LandingPage}/> 
        <Route path= "/home" component= {Home}/>  
        <Route path= "/character" component= {CharacterCreate}/>
        <Route path= "/characters/:id" component= {Detail }/>
        
        </Switch>
      
        </BrowserRouter>


  );
}

export default App;
