import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { bmsApiService } from '../../services/bmsapi.service';

@Component({
  selector: 'app-add-new-movie',
  templateUrl: './add-new-movie.component.html',
  styleUrls: ['./add-new-movie.component.scss']
})
export class AddNewMovieComponent implements OnInit {
  addMovieForm: FormGroup;
  genres = ["Action","Horror","Thriller","Comedy","Drama","Adventure","Documentary","Fiction","Mystery","Animation"];
  ratings = ["G: General Audiences","PG: Parental Guidance Suggested","PG-13: Parents Strongly Cautioned","R: Restricted","NC-17: Clearly Adult"];
  constructor(private fb: FormBuilder, private _bmsAs:bmsApiService) {}

  ngOnInit(): void {
    this.genres = ["Action","Horror","Thriller","Comedy","Drama","Adventure","Documentary","Fiction","Mystery","Animation"];
    this.ratings = ["G: General Audiences","PG: Parental Guidance Suggested","PG-13: Parents Strongly Cautioned","R: Restricted","NC-17: Clearly Adult"];
    this.addMovieForm = this.fb.group({
      title : ['',[Validators.required]],
      cast: ['',[Validators.required]],
      director: ['', [Validators.required]],
      producer: ['', [Validators.required]],
      synopsis : ['', [Validators.required]],
      trailer: ['', [Validators.required]],
      thumbnail: ['', [Validators.required]],
      startdate: ['', [Validators.required]],
      enddate: ['', [Validators.required]],
      category : ['', [Validators.required]],
      rating: ['', [Validators.required]]
    });
  };

  ngAfterViewInit() {
    this.genres = ["Action","Horror","Thriller","Comedy","Drama","Adventure","Documentary","Fiction","Mystery","Animation"];
    this.ratings = ["G: General Audiences","PG: Parental Guidance Suggested","PG-13: Parents Strongly Cautioned","R: Restricted","NC-17: Clearly Adult"];
  }

  addNewMovie() {
    var movie:any;
    movie =  {
      title: this.addMovieForm.value.title,
      cast: this.addMovieForm.value.cast,
      director: this.addMovieForm.value.director,
      producer: this.addMovieForm.value.producer,
      synopsis: this.addMovieForm.value.synopsis,
      trailer: this.addMovieForm.value.trailer,
      thumbnail: this.addMovieForm.value.thumbnail,
      startdate: this.addMovieForm.value.startdate,
      enddate: this.addMovieForm.value.enddate,
      category: this.addMovieForm.value.category,
      rating: this.addMovieForm.value.rating
    }
    let data2 = JSON.stringify(movie);
    this._bmsAs.addMovie(data2).subscribe(res=>{
      console.log(JSON.stringify(res)," put method result");
    });
  }

  updateGenre(evt:any) {

  }

  updateRating(evt:any) {

  }

}
