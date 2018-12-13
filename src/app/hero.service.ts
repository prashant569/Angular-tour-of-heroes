import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
const  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';  
  getHeroes(): Observable<Hero[]> {

   //  this.messageService.add('HeroService: fetched heroes');

    return  this.http.get<Hero[]>(this.heroesUrl).pipe
    ( tap (heroes=> this.log('fetched heroes')),
    catchError(this.handleError ('getHeroes',[])));
  }
 
getHero(id: number): Observable<Hero>  {
  const url = `${this.heroesUrl}/${id}`;
  return this.http.get<Hero>(url).pipe(
    tap(_ => this.log(`fetched hero id=${id}`)),
    catchError(this.handleError<Hero>(`getHero id=${id}`))
  );
}
addHero(hero : Hero)
{
return this.http.post<Hero>(this.heroesUrl, hero , httpOptions)
          .pipe( tap ((hero : Hero) => this.log(`added hero w/ id=${hero.id}`)),
          catchError(this.handleError<Hero>(`addHero`))
          );
}


updateHero (hero: Hero): Observable<any> {
       return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
              tap(_ => this.log(`updated hero id=${hero.id}`)),
              catchError(this.handleError<any>('updateHero'))
  );
}
deleteHero( hero : Hero | number) : Observable<Hero> {
  const id = typeof hero  == 'number' ? hero :hero.id;
  const url = `$ {this.heroesUrl}/${id}`;
  return this.http.delete<Hero> (url,httpOptions).pipe(
    tap(_=> this.log(`$deletedhero id=/${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );

}
 searchHeroes(term : string) : Observable<Hero[]> {

if(!term.trim()) {
  return of ([])
}
return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
.pipe(tap(_=> this.log(`found heroes matching "${term}"`)),
catchError(this.handleError<Hero[]>(`search heroes`,[]))

 
);

 }
  constructor( private http: HttpClient, 
    private messageService : MessageService)
     {  }

private handleError<T> (operation = 'operation', result?: T) 
 {
  return (error: any): Observable<T> => {

    console.error(error); 
    this.log(`${operation} failed: ${error.message}`);

    return of(result as T);
  };
}

   private log (message : string)
   {
      this.messageService.add(`HeroService :${message}` );

   }
}
