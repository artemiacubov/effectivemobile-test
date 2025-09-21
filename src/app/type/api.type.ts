export interface IFilm {
  id: number
  name: string
  year: number
  description: string
  poster?: {
    previewUrl: string
    url: string
  }
  genres: {name: string}[]
  movieLenght: number
}
