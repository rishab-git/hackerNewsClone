import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { EventReplayer } from 'preboot';


@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})

export class NewsListComponent implements OnInit, AfterViewInit {
  newsList = [] as any;
  page = 1;
  nbPages = 0;
  chartData: any;
  chartOptions: any;
  dataLoding = false;

  // tslint:disable-next-line: max-line-length
  constructor(@Inject(PLATFORM_ID) private _platformId: any, private replayer: EventReplayer, private api: ApiServiceService, private localStore: LocalStorageService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.page = +(params.page ? params.page : 1); // (+) converts string 'id' to a number
      // if (isPlatformBrowser(this._platformId)) {
      this.getNews(this.page);
      // }
    });

    this.chartOptions = {
      title: {
        display: true,
        text: 'StoryID VS Points',
        fontSize: 16
      },
      legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Points',
              fontStyle: 'bold',
              fontSize: 16
            }
          }
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Story ID',
              fontStyle: 'bold',
              fontSize: 16
            }
          }
        ]
      }
    };
  }

  getNews(pageNo) {
    this.dataLoding = true;
    this.api.getNewsList(pageNo)
      .subscribe(news => {
        this.dataLoding = false;
        // tslint:disable-next-line: no-string-literal
        this.newsList = this.localStore.fillLocalData(news['hits']);
        // tslint:disable-next-line: no-string-literal
        this.nbPages = news['nbPages'];
        // tslint:disable-next-line: no-string-literal
        this.makeChart(this.newsList);
      });
  }

  makeChart(newsData) {
    if (isPlatformBrowser(this._platformId)) {
      const labelsArr = [];
      const dataArr = [];

      newsData.forEach((hit) => {
        if (!hit.hide) {
          labelsArr.push(hit.objectID);
          dataArr.push(hit.points);
        }
      });

      this.chartData = {
        labels: labelsArr,
        datasets: [
          {
            label: 'Votes',
            data: dataArr,
            fill: false,
            borderColor: '#4bc0c0'
          }
        ]
      };
    }
  }

  upvote(hit, newsData) {
    hit.points++;
    this.localStore.setLocalData({
      objectID: hit.objectID,
      points: hit.points,
      hide: hit.hide ? hit.hide : false
    });

    this.newsList = this.localStore.fillLocalData(newsData);
    this.makeChart(this.newsList);
  }

  hide(hit, newsData) {
    hit.hide = true;
    this.localStore.setLocalData({
      objectID: hit.objectID,
      points: hit.points,
      hide: hit.hide
    });

    this.newsList = this.localStore.fillLocalData(newsData);
    this.makeChart(this.newsList);
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this._platformId)) {
      this.replayer.replayAll();
    }
  }

}
