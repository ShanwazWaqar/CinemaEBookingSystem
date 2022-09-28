import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss']
})
export class EditMovieComponent implements OnInit {
  title?:"";
  addMovie: FormGroup;
  genres = ["Action","Horror","Thriller","Comedy","Drama","Adventure","Documentary","Fiction","Mystery","Animation"];
  ratings = ["G: General Audiences","PG: Parental Guidance Suggested","PG-13: Parents Strongly Cautioned","R: Restricted","NC-17: Clearly Adult"];
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,private Ref:MatDialogRef<EditMovieComponent>) {
    this.title = data.title;
   };

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

  ngAfterContentInit() {
    this.addMovie.patchValue({
      title : this.data.title
    });
  }

  addNewMovie() {

  }

  updateGenre(evt:any) {

  }

  updateRating(evt:any) {

  }

  cancelEditMovie() {
    this.Ref.close();
  }
  updateEditMovie(){
    this.Ref.close(this.addMovie.value);
  }

}
