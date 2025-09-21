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
  selectedFilm: IFilm | null = null;

  constructor(public apiService: ApiService) {}

  ngOnInit() {
    this.getFilmsByName('')
  }

  getFilmsByName(name: string) {

    this.films = []
    this.isLoading = true

    this.apiService.getFilmsByName(LIMIT, PAGE, name)
      .pipe(
        finalize(()=> (this.isLoading = false))
      )
      .subscribe({
        next: ({docs}) => this.films = docs
      })
    console.log(name)
  }

  //
  //
  //
  // getFilms(search: string, maxResults = 20) {
  //   const fetchId = ++this.currentFetchId;
  //   this.isLoading = true;
  //   this.error = null;
  //   this.movies = [];
  //
  //   const fetchPage = (page: number) => {
  //     let url = `https://www.omdbapi.com/?apikey=${this.apiKey}&s=${encodeURIComponent(search)}&type=movie&page=${page}`;
  //     return fetch(url).then(res => res.json());
  //   };
  //
  //   const pages = Math.ceil(maxResults / 10);
  //
  //   Promise.all(Array.from({ length: pages }, (_, i) => fetchPage(i + 1)))
  //     .then(results => {
  //       if (fetchId !== this.currentFetchId) return;
  //
  //       const allMovies: Movie[] = [];
  //       for (const data of results) {
  //         if (data.Response === 'True') {
  //           for (const movie of data.Search) {
  //             if (movie && movie.imdbID && !allMovies.some(m => m.imdbID === movie.imdbID)) {
  //               allMovies.push(movie);
  //               if (allMovies.length >= maxResults) break;
  //             }
  //           }
  //           if (allMovies.length >= maxResults) break;
  //         } else {
  //           switch (data.Error) {
  //             case 'Movie not found!':
  //               this.error = 'Фильмы не найдены';
  //               break;
  //             case 'Too many results.':
  //               this.error = 'Слишком много результатов, уточните поиск';
  //               break;
  //             default:
  //               this.error = 'Ошибка при загрузке данных';
  //           }
  //         }
  //       }
  //
  //       this.movies = allMovies;
  //       this.isLoading = false;
  //
  //       this.movies.forEach((movie, index) => {
  //         fetch(`https://www.omdbapi.com/?apikey=${this.apiKey}&i=${movie.imdbID}&plot=short`)
  //           .then(res => res.json())
  //           .then(data => {
  //             if (fetchId !== this.currentFetchId) return;
  //             this.movies[index] = { ...movie, ...data };
  //           });
  //       });
  //
  //       if (this.movies.length > 0) this.error = null;
  //     })
  //     .catch(() => {
  //       if (fetchId !== this.currentFetchId) return;
  //       this.error = 'Ошибка при загрузке данных';
  //       this.isLoading = false;
  //     });
  // }
  //
  //
  // onInputChange() {
  //   const query = this.searchQuery.trim();
  //   this.getFilms(query || 'movie', 2024);
  // }
  //
  // selectMovie(movie: Movie) {
  //   if (!movie.Plot) {
  //     fetch(`https://www.omdbapi.com/?apikey=${this.apiKey}&i=${movie.imdbID}&plot=full`)
  //       .then(res => res.json())
  //       .then(data => {
  //         this.selectedMovie = { ...movie, ...data };
  //       });
  //   } else {
  //     this.selectedMovie = movie;
  //   }
  // }
  //
  // closeModal(event: MouseEvent) {
  //   if ((event.target as HTMLElement).classList.contains('modal-overlay') ||
  //     (event.target as HTMLElement).classList.contains('modal-close')) {
  //     this.selectedMovie = null;
  //   }
  // }
}
