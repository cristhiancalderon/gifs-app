import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {

  public gifsList: Gif[] = [];

  private _tagHistory: string[] = [];
  private apiKey:string = '9VU1UyMdMeJJ7iN9DNKbnp0zQQMAHV8Q';
  private serviceUrl:string = 'https://api.giphy.com/v1/gifs';

  //api.giphy.com/v1/gifs/search?api_key=9VU1UyMdMeJJ7iN9DNKbnp0zQQMAHV8Q&limit=10&q=valorant

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    this.showFirstGif();

    console.log('Gifs Service Ready');
   }

  get tagHistory() {
    return [...this._tagHistory];
  }

  private organizeHistory(tag: string){
    tag = tag.toLowerCase();

    if(this._tagHistory.includes(tag)){
      this._tagHistory = this._tagHistory.filter( oldTag => oldTag !== tag)
    }

    this._tagHistory.unshift(tag);
    this._tagHistory = this.tagHistory.splice(0,10);
    this.saveLocalStorage();

  }

  private saveLocalStorage(): void{
    localStorage.setItem('history', JSON.stringify(this._tagHistory));
  }

  private showFirstGif(): void{
    if(!localStorage.getItem('history')) return;

    this.searchTag(this._tagHistory[0]);

  }

  private loadLocalStorage():void{
    if(!localStorage.getItem('history')) return;

    this._tagHistory = JSON.parse(localStorage.getItem('history')!);

  }

  public searchTag(tag: string):void {
    if (tag.length === 0 ) return ;
    this.organizeHistory(tag);

    const params = new HttpParams().set('api_key',this.apiKey)
    .set('limit','10')
    .set('q',tag);

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
    .subscribe(resp => {

      this.gifsList = resp.data;
    });

  }
}
