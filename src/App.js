
//import "./App.scss"
import Radio from "./Radio"
import Grid from "@material-ui/core/Grid";
import "./App.css"

function App() {
  return (
    <Grid
    container
    direction="row"
    justify="center"
    alignItems="flex-start"
   
  >
    <Grid item xs={12} sm={12}>
      <center>
    <h1 style={{fontFamily:"Roboto"}}>World Radio Player </h1>
      <p style={{fontSize:"14px"}}>Choose a Country, start listening to there free Radio Station </p>
      </center>
        </Grid>
        <Grid item xs={12} sm={12}>
      <center>
      <Radio />
      </center>
      <center>
      <p style={{fontSize:"14px"}}>Developed by Rahul Chauhan </p>
      </center>
        </Grid>
      
    </Grid>
  )
}

export default App
