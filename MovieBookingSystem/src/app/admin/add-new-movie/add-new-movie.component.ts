import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-movie',
  templateUrl: './add-new-movie.component.html',
  styleUrls: ['./add-new-movie.component.scss']
})
export class AddNewMovieComponent implements OnInit {
  addMovie: FormGroup;
  genres = ["Action","Horror","Thriller","Comedy","Drama","Adventure","Documentary","Fiction","Mystery","Animation"];
  ratings = ["G: General Audiences","PG: Parental Guidance Suggested","PG-13: Parents Strongly Cautioned","R: Restricted","NC-17: Clearly Adult"];
  constructor(private fb: FormBuilder) {
   }

  ngOnInit(): void {
    this.genres = ["Action","Horror","Thriller","Comedy","Drama","Adventure","Documentary","Fiction","Mystery","Animation"];
    this.ratings = ["G: General Audiences","PG: Parental Guidance Suggested","PG-13: Parents Strongly Cautioned","R: Restricted","NC-17: Clearly Adult"];
    this.addMovie = this.fb.group({
      title : ['',[Validators.required]],
      Synopsis : ['', [Validators.required]],
      cast: ['',[Validators.required]],
      trailerLink : ['', [Validators.required]],
      thumbnail : ['',[Validators.required]],
      genre: ['Choose your Genre',[Validators.required]],
      rating: ['', [Validators.required]],
      director: ['', [Validators.required]],
      producer: ['',[Validators.required]],
      startDate: ['',[Validators.required]],
      endDate: ['',[Validators.required]],
    });
  };

  ngAfterViewInit() {
    this.genres = ["Action","Horror","Thriller","Comedy","Drama","Adventure","Documentary","Fiction","Mystery","Animation"];
    this.ratings = ["G: General Audiences","PG: Parental Guidance Suggested","PG-13: Parents Strongly Cautioned","R: Restricted","NC-17: Clearly Adult"];
  }

  addNewMovie() {
    console.log(this.addMovie.value);
  }

  updateGenre(evt:any) {

  }

  updateRating(evt:any) {

  }

}
