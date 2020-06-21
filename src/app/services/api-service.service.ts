import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  baseUrl = 'http://hn.algolia.com/api/v1/';
  newListUrl = this.baseUrl + 'search';

  constructor(private http: HttpClient) { }

  getNewsList(pageNo) {
    if (pageNo - 1 === 0) {
      return this.http.get<object>(this.newListUrl + '?tags=front_page');
    }
    return this.http.get<object>(this.newListUrl + '?tags=front_page&page=' + (pageNo - 1));
  }
}
