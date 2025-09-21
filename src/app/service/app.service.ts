import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {IFilm} from '../type/api.type';

@Injectable({
  providedIn: 'root'
})

export class ApiService {


  private apiKey = 'C137F3Q-9454QR5-PMJTX72-6Z17DSZ';
  private backendUrl = `https://api.kinopoisk.dev/v1.4`
  // private backendUrl = `https://www.omdbapi.com/?apikey=${this.apiKey}&s=${encodeURIComponent(search)}&type=movie&page=${page}`

  constructor(private http: HttpClient){}

  getFilms(limit: number, page: number) {
    return this.http.get<{docs: IFilm[]}>(`${this.backendUrl}/movie`, {
      headers: {'X-API-KEY': this.apiKey},
      params: {
        limit,
      }

    })
  }

  getFilmsByName(limit: number, page: number, search: string) {
    return this.http.get<{docs: IFilm[]}>(`${this.backendUrl}/movie/search`, {
      headers: {'X-API-KEY': this.apiKey},
      params: {
        limit,
        query: search,
        page
      }

    })
  }

}
