import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'mWfciPfOHbKkyHQBRmGrBPMXJeULNHyH'
  private _historial: string[] = [];

  public resultados: Gif[] = []

  get historial(){
    /* Returning a copy of the array. */
    return [...this._historial]
  }

  constructor(private http: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || []

    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []


  }

  buscarGifs(query: string = ''){
    /* Adding the query to the beginning of the array. */
    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10)

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=mWfciPfOHbKkyHQBRmGrBPMXJeULNHyH&q=${query}&limit=10&offset=0&rating=g&lang=en`)
    .subscribe((response) => {
      // console.log(response.data)
      this.resultados = response.data

      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    })
  }

}
