import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button  from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const axios = require('axios');

const useStyles = makeStyles((theme) => ({
  root: {
      
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function MyForm() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    artist: "",
    song: "",
    lyrics: "",
  });

  const {artist, song, lyrics} = state;

  const handleChangeCheck = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleChangeValue = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const enviarForm = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData)
    getLyrics();

        
    /*
        return onSubmit({
            artist: formData.get('artist'),
            song: formData.get('song'),
            //lyrics: formData.get('lyrics'),
        });
        */
    }

    async function getLyrics() {
        try {
          const response = await axios.get('https://api.lyrics.ovh/v1/' + artist+'/' + song);

          var information = response.data.lyrics; 
            
          if (information === ""){
              information = "Lyrics not Found";
          }
          setState({ ...state, lyrics: information });

        } catch (error) {
          console.error(error);
        }
    }

    async function getTranslate() {
      try {
        //const response = await axios.get('http://localhost:3001/translate/' + artist+'/' + song);
        const body = { lyrics: lyrics };

        const response = await axios.post('http://localhost:3001/translate/', body);

        var information = response.data.lyrics; 

        if (information === ""){
          information = "Lyrics not Found";
        }

        setState({ ...state, lyrics: information });

      } catch (error) {
        console.error(error);
      }
  }

  return (
    <form className={classes.root} noValidate autoComplete="off" >
        <div className={classes.root}>
        
            <Grid container spacing={3}>
                <Grid item xs={3}>

                </Grid>
                <Grid item xs={6}>
                    <br/>
                    <Paper className={classes.paper}>
                    
                    <Grid item xs={12}>
                        <TextField
                        id="nameArtist"
                        label="Artist"
                        style={{ margin: 8 }}
                        name="artist"
                        value={artist}
                        fullWidth
                        margin="normal"
                        onChange={handleChangeValue}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                    </Grid>
                    <br/>
                    <Grid item xs={12}>
                        <TextField
                        id="nameSong"
                        label="Song"
                        name="song"
                        value={song}
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        onChange={handleChangeValue}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                    </Grid>
                    <br/>
                    <Grid item xs={12}>
                      <Grid item xs={6}>
                          <Button variant="contained" onClick={() => getLyrics()} color="primary" fullWidth={true}>
                              Find Lyrics
                          </Button>
                      </Grid>
                      <Grid item xs={6}>
                          <Button variant="contained" onClick={() => getTranslate()} color="primary" fullWidth={true}>
                              Translate
                          </Button>
                      </Grid>
                    </Grid>
                    <br/>
                    <br/>
                    <Grid item xs={12}>
                        <TextField
                        id="standard-multiline-flexible"
                        label="Lyrics"
                        name="lyrics"
                        value={lyrics}
                        multiline
                        fullWidth
                        rows={5}
                        rowsMax={10}
                        inputProps={{min: 0, style: { textAlign: 'center' }}}
                        onChange={handleChangeValue}
                        />
                    </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                </Grid>
            </Grid>

        </div>
    </form>
  );
}