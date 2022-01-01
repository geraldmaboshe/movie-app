import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { MovieResponse } from "./movie"
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getMovies(): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${environment.BASE_URL}/movie/popular?api_key=${environment.api_key}&language=en-US&page=1`)
      .pipe(
        catchError(this.handleError<MovieResponse>('getMovies', undefined))
      )

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.log(error)
      console.log(`${operation}failed: ${error.message} `)

      return of(result as T)
    }
  }

}
