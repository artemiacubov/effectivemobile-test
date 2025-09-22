import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {finalize} from 'rxjs';
import {ApiService} from '../../service/app.service';
import {IFilm} from '../../type/api.type';

const LIMIT = 100
const PAGE = 1

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true,
})

export class Home implements OnInit {
  films: IFilm[] = [];
  search: string = '';
  isLoading = false;
  error = false;
  errorMessage: string = '';
  selectedFilm: IFilm | null = null;

  noImageSrc = 'https://tookametex.kz/wa-data/public/site//themes/default/img/empty.png'

  constructor(public apiService: ApiService) {}

  ngOnInit() {
    this.getFilmsByName('')
  }

  getFilmsByName(name: string) {

    this.films = []
    this.error = false
    this.isLoading = true

    this.apiService.getFilmsByName(LIMIT, PAGE, name)
      .pipe(
        finalize(()=> (this.isLoading = false))
      )
      .subscribe({
        next: ({docs}) => this.films = docs,
        error: (err) => {
          this.error = true
          this.errorMessage = err
        }
      })
  }

}
