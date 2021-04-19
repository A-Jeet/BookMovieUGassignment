import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import GridList from '@material-ui/core/GridList';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import './Home.css';
import Header from '../../common/header/Header';


const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    upcomingMoviesHeading: {
        textAlign: 'center',
        background: '#ff9999',
        padding: '8px',
        fontSize: '1rem'
    },
    gridListUpcomingMovies: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        width: '100%'
    },
    gridListMain: {
        transform: 'translateZ(0)',
        cursor: 'pointer'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 240,
        maxWidth: 240
    },
    title: {
        color: theme.palette.primary.light,
    }
});


// Using Class Component for practice of the React JS part 1 module.
// This component handles the Home page as per the required specifications.
class Home extends Component {

    constructor() {
        super();
        this.state = {
            movieName: "",
            upcomingMovies: [],
            releasedMovies: [],
            genres: [],
            artists: [],
            genresList: [],
            artistsList: [],
            releaseDateStart: "",
            releaseDateEnd: ""
        }
    }

	// This will get all the required parameters from the server via Xhttp requests.
    UNSAFE_componentWillMount() {
        
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    upcomingMovies: JSON.parse(this.responseText).movies
                });
            }
        });

        xhr.open("GET", this.props.baseUrl + "movies?status=PUBLISHED");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);

        
        let dataReleased = null;
        let xhrReleased = new XMLHttpRequest();
        xhrReleased.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    releasedMovies: JSON.parse(this.responseText).movies
                });
            }
        });

        xhrReleased.open("GET", this.props.baseUrl + "movies?status=RELEASED");
        xhrReleased.setRequestHeader("Cache-Control", "no-cache");
        xhrReleased.send(dataReleased);


        let dataGenres = null;
        let xhrGenres = new XMLHttpRequest();
        xhrGenres.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    genresList: JSON.parse(this.responseText).genres
                });
            }
        });

        xhrGenres.open("GET", this.props.baseUrl + "genres");
        xhrGenres.setRequestHeader("Cache-Control", "no-cache");
        xhrGenres.send(dataGenres);

        let dataArtists = null;
        let xhrArtists = new XMLHttpRequest();
        xhrArtists.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    artistsList: JSON.parse(this.responseText).artists
                });
            }
        });

        xhrArtists.open("GET", this.props.baseUrl + "artists");
        xhrArtists.setRequestHeader("Cache-Control", "no-cache");
        xhrArtists.send(dataArtists);
    }
    onArtistChoice = event => {
        this.setState({ artists: event.target.value });
    }

    onReleaseDateBegin = event => {
        this.setState({ releaseDateStart: event.target.value });
    }

    onGenreSelect = event => {
        this.setState({ genres: event.target.value });
    }

    onReleaseDateLast = event => {
        this.setState({ releaseDateEnd: event.target.value });
    }
    onFilterSelect = () => {
        let queryString = "?status=RELEASED";
        if (this.state.movieName !== "") {
            queryString += "&title=" + this.state.movieName;
        }
        if (this.state.genres.length > 0) {
            queryString += "&genres=" + this.state.genres.toString();
        }
        if (this.state.artists.length > 0) {
            queryString += "&artists=" + this.state.artists.toString();
        }
        if (this.state.releaseDateStart !== "") {
            queryString += "&start_date=" + this.state.releaseDateStart;
        }
        if (this.state.releaseDateEnd !== "") {
            queryString += "&end_date=" + this.state.releaseDateEnd;
        }



        let that = this;
        let dataFilter = null;
        let xhrFilter = new XMLHttpRequest();
        xhrFilter.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    releasedMovies: JSON.parse(this.responseText).movies
                });
            }
        });

        xhrFilter.open("GET", this.props.baseUrl + "movies" + encodeURI(queryString));
        xhrFilter.setRequestHeader("Cache-Control", "no-cache");
        xhrFilter.send(dataFilter);    
    
    }

    onMovieNameChange = event => {
        this.setState({ movieName: event.target.value });
    }


    onMovieClick = (movieId) => {
        this.props.history.push('/movie/' + movieId);
    }


    render() {
        const { classes } = this.props;
        return (
            
<div>
	<Header baseUrl={this.props.baseUrl} />
	<div className={classes.upcomingMoviesHeading}>
		<span>Upcoming Movies</span>
	</div>
	<GridList cols={5} className={classes.gridListUpcomingMovies} >
                    {this.state.upcomingMovies.map(movie => (
                        
		<GridListTile key={"upcoming" + movie.id}>
			<img src={movie.poster_url} className="movie-thumbnail" alt={movie.title} />
			<GridListTileBar title={movie.title} />
		</GridListTile>
                    ))}
                
	</GridList>
	<div className="flex-container">
		<div className="left">
			<GridList cellHeight={350} cols={4} className={classes.gridListMain}>
                            {this.state.releasedMovies.map(movie => (
                                
				<GridListTile onClick={() => this.onMovieClick(movie.id)} className="released-movie-list" key={"grid" + movie.id}>
					<img src={movie.poster_url} className="movie-thumbnail" alt={movie.title} />
					<GridListTileBar
                                        title={movie.title}
                                        subtitle={
						<span>Release Date: {new Date(movie.release_date).toDateString()}</span>}
                                    />
					</GridListTile>
                            ))}
                        
				</GridList>
			</div>
			<div className="right">
				<Card>
					<CardContent>
						<FormControl className={classes.formControl}>
							<Typography className={classes.title} color="textSecondary">
                                        FIND MOVIES BY:
                                    </Typography>
						</FormControl>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="movieName">Movie Name</InputLabel>
							<Input id="movieName" onChange={this.onMovieNameChange} />
						</FormControl>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="select-multiple-checkbox">Genres</InputLabel>
							<Select
                                        multiple
                                        input={
								<Input id="select-multiple-checkbox-genre" />}
                                        renderValue={selected => selected.join(',')}
                                        value={this.state.genres}
                                        onChange={this.onGenreSelect}
                                    >
                                        {this.state.genresList.map(genre => (
                                            
								<MenuItem key={genre.id} value={genre.genre}>
									<Checkbox checked={this.state.genres.indexOf(genre.genre) > -1} />
									<ListItemText primary={genre.genre} />
								</MenuItem>
                                        ))}
                                    
							</Select>
						</FormControl>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="select-multiple-checkbox">Artists</InputLabel>
							<Select
                                        multiple
                                        input={
								<Input id="select-multiple-checkbox" />}
                                        renderValue={selected => selected.join(',')}
                                        value={this.state.artists}
                                        onChange={this.onArtistChoice}
                                    >
                                        {this.state.artistsList.map(artist => (
                                            
								<MenuItem key={artist.id} value={artist.first_name + " " + artist.last_name}>
									<Checkbox checked={this.state.artists.indexOf(artist.first_name + " " + artist.last_name) > -1} />
									<ListItemText primary={artist.first_name + " " + artist.last_name} />
								</MenuItem>
                                        ))}
                                    
							</Select>
						</FormControl>
						<FormControl className={classes.formControl}>
							<TextField
                                        id="releaseDateStart"
                                        label="Release Date Start"
                                        type="date"
                                        defaultValue=""
                                        InputLabelProps={{ shrink: true }}
                                        onChange={this.onReleaseDateBegin}
                                    />
						</FormControl>
						<FormControl className={classes.formControl}>
							<TextField
                                        id="releaseDateEnd"
                                        label="Release Date End"
                                        type="date"
                                        defaultValue=""
                                        InputLabelProps={{ shrink: true }}
                                        onChange={this.onReleaseDateLast}
                                    />
						</FormControl>
						<br />
						<br />
						<FormControl className={classes.formControl}>
							<Button onClick={() => this.onFilterSelect()} variant="contained" color="primary">
                                        APPLY
                                    </Button>
						</FormControl>
					</CardContent>
				</Card>
			</div>
		</div>
	</div >
        )
    }
}

export default withStyles(styles)(Home);
