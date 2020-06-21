import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  localStorageData = [];

  constructor() {
    if (localStorage.getItem('localStorageData')) {
      this.localStorageData = JSON.parse(localStorage.getItem('localStorageData'));
    }
  }

  getLocalData() {
    if (localStorage.getItem('localStorageData')) {
      this.localStorageData = JSON.parse(localStorage.getItem('localStorageData'));
    } else {
      this.localStorageData = [];
    }
    return this.localStorageData;
  }

  setLocalData(data) {
    let localData = this.getLocalData();
    let dataNotFound = localData.every(dataItem => {
      if (dataItem.objectID === data.objectID) {
        dataItem.points = data.points;
        dataItem.hide = data.hide;
        return false;
      }
      return true;
    });

    if (dataNotFound) {
      localData.push(data);
    }

    localStorage.setItem('localStorageData', JSON.stringify(localData));
  }

  fillLocalData(news) {
    news.forEach((newsItem) => {
      this.getLocalData().forEach((localData) => {
        if (newsItem.objectID === localData.objectID) {
          newsItem.points = localData.points;
          newsItem.hide = localData.hide;
        }
      });
    });
    return news;
  }
}
