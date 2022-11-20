import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss']
})
export class EditMovieComponent implements OnInit {
  title?:"";
  addMovieForm: FormGroup;
  genres = ["Action","Horror","Thriller","Comedy","Drama","Adventure","Documentary","Fiction","Mystery","Animation"];
  ratings = ["G: General Audiences","PG: Parental Guidance Suggested","PG-13: Parents Strongly Cautioned","R: Restricted","NC-17: Clearly Adult"];
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,private Ref:MatDialogRef<EditMovieComponent>) {
    this.title = data.title;
    this.ratings = ["G: General Audiences","PG: Parental Guidance Suggested","PG-13: Parents Strongly Cautioned","R: Restricted","NC-17: Clearly Adult"];
   };

  ngOnInit(): void {
    this.genres = ["Action","Horror","Thriller","Comedy","Drama","Adventure","Documentary","Fiction","Mystery","Animation"];
    this.ratings = ["G: General Audiences","PG: Parental Guidance Suggested","PG-13: Parents Strongly Cautioned","R: Restricted","NC-17: Clearly Adult"];
    this.addMovieForm = this.fb.group({
      // title : ['',[Validators.required]],
      // Synopsis : ['', [Validators.required]],
      // cast: ['',[Validators.required]],
      // trailerLink : ['', [Validators.required]],
      // thumbnail : ['',[Validators.required]],
      // category: new FormControl(),
      // rating: ['', [Validators.required]],
      // director: ['', [Validators.required]],
      // producer: ['',[Validators.required]],
      // startDate: ['',[Validators.required]],
      // endDate: ['',[Validators.required]],
      // title: ['', [Validators.required]],
      title: [{ value: this.title, disabled: true},[]],
      cast: ['', [Validators.required]],
      director: ['', [Validators.required]],
      producer: ['', [Validators.required]],
      synopsis: ['', [Validators.required]],
      trailer: ['', [Validators.required]],
      thumbnail: ['', [Validators.required]],
      thumbnailName: [''],
      startdate: ['', [Validators.required]],
      enddate: ['', [Validators.required]],
      category: ['', [Validators.required]],
      rating: ['', [Validators.required]]
    });
    let selectedValues = ['Thriller','Comedy'];
    this.addMovieForm.controls['category'].patchValue(selectedValues);
  };

  ngAfterViewInit() {
    this.genres = ["Action","Horror","Thriller","Comedy","Drama","Adventure","Documentary","Fiction","Mystery","Animation"];
    this.ratings = ["G: General Audiences","PG: Parental Guidance Suggested","PG-13: Parents Strongly Cautioned","R: Restricted","NC-17: Clearly Adult"];
  }

  ngAfterContentInit() {
    this.addMovieForm.controls['title'].patchValue(this.data.title);
  }

  convertImage(event:any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (_event: any) => {
          this.addMovieForm.patchValue({
              thumbnail: _event.target.result,
              thumbnailName: event.target.files[0].name
          });
      };
      reader.readAsDataURL(event.target.files[0]);
  }
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
    this.Ref.close(this.addMovieForm.value);
  }

  cancel() {
    //cancel the popup
  }

}
