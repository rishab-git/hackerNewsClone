import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NewsListComponent } from './news-list.component';
import { DateAgoPipe } from '../pipes/date-ago.pipe';
import { ApiServiceService } from '../services/api-service.service';
import { LocalStorageService } from '../services/local-storage.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ChartModule } from 'primeng/chart';
import { EventReplayer } from 'preboot';

describe('NewsListComponent', () => {
  let component: NewsListComponent;
  let fixture: ComponentFixture<NewsListComponent>;
  let httpMock;
  let apiService;
  const fakeNewsData = {
    hits: [{
      created_at: '2020-06-23T06:08:51.000Z',
      title: 'I Am Deleting the Blog',
      url: 'https://slatestarcodex.com/2020/06/22/nyt-is-threatening-my-safety-by-revealing-my-real-name-so-i-am-deleting-the-blog/',
      author: 'perditus',
      points: 1092,
      story_text: null,
      comment_text: null,
      num_comments: 553,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1592892531,
      _tags: ['story', 'author_perditus', 'story_23610416', 'front_page'],
      objectID: '23610416',
      _highlightResult: {
        title: {
          value: 'I Am Deleting the Blog',
          matchLevel: 'none',
          matchedWords: []
        },
        url: {
          value: 'https://slatestarcodex.com/2020/06/22/nyt-is-threatening-my-safety-by-revealing-my-real-name-so-i-am-deleting-the-blog/',
          matchLevel: 'none',
          matchedWords: []
        },
        author: {
          value: 'perditus',
          matchLevel: 'none',
          matchedWords: []
        }
      }
    }, {
      created_at: '2020-06-22T16:29:08.000Z',
      title: 'Reflections on Being a Female Founder',
      url: 'https://tracy.posthaven.com/reflections-on-being-a-female-founder',
      author: 'ralphleon',
      points: 586,
      story_text: null,
      comment_text: null,
      num_comments: 221,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1592843348,
      _tags: ['story', 'author_ralphleon', 'story_23602100', 'front_page'],
      objectID: '23602100',
      _highlightResult: {
        title: {
          value: 'Reflections on Being a Female Founder',
          matchLevel: 'none',
          matchedWords: []
        },
        url: {
          value: 'https://tracy.posthaven.com/reflections-on-being-a-female-founder',
          matchLevel: 'none',
          matchedWords: []
        },
        author: {
          value: 'ralphleon',
          matchLevel: 'none',
          matchedWords: []
        }
      }
    }, {
      created_at: '2020-06-22T11:48:04.000Z',
      title: 'Ego Graphs – the Google ‘vs’ trick',
      url: 'https://adsp.ai/articles/google-vs-trick/',
      author: 'datashrimp',
      points: 244,
      story_text: null,
      comment_text: null,
      num_comments: 42,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1592826484,
      _tags: ['story', 'author_datashrimp', 'story_23599177', 'front_page'],
      objectID: '23599177',
      _highlightResult: {
        title: {
          value: 'Ego Graphs – the Google ‘vs’ trick',
          matchLevel: 'none',
          matchedWords: []
        },
        url: {
          value: 'https://adsp.ai/articles/google-vs-trick/',
          matchLevel: 'none',
          matchedWords: []
        },
        author: {
          value: 'datashrimp',
          matchLevel: 'none',
          matchedWords: []
        }
      }
    }, {
      created_at: '2020-06-23T06:33:04.000Z',
      title: 'Show HN: IHP, a batteries-included web framework built on Haskell and Nix',
      url: 'https://ihp.digitallyinduced.com/',
      author: '_query',
      points: 173,
      story_text: null,
      comment_text: null,
      num_comments: 36,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1592893984,
      _tags: ['story', 'author__query', 'story_23610527', 'show_hn', 'front_page'],
      objectID: '23610527',
      _highlightResult: {
        title: {
          value: 'Show HN: IHP, a batteries-included web framework built on Haskell and Nix',
          matchLevel: 'none',
          matchedWords: []
        },
        url: {
          value: 'https://ihp.digitallyinduced.com/',
          matchLevel: 'none',
          matchedWords: []
        },
        author: {
          value: '_query',
          matchLevel: 'none',
          matchedWords: []
        }
      }
    }, {
      created_at: '2020-06-23T08:00:43.000Z',
      title: 'Learning operating system development using Linux kernel and Raspberry Pi',
      url: 'https://s-matyukevich.github.io/raspberry-pi-os/',
      author: 'weeber',
      points: 158,
      story_text: null,
      comment_text: null,
      num_comments: 12,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1592899243,
      _tags: ['story', 'author_weeber', 'story_23611081', 'front_page'],
      objectID: '23611081',
      _highlightResult: {
        title: {
          value: 'Learning operating system development using Linux kernel and Raspberry Pi',
          matchLevel: 'none',
          matchedWords: []
        },
        url: {
          value: 'https://s-matyukevich.github.io/raspberry-pi-os/',
          matchLevel: 'none',
          matchedWords: []
        },
        author: {
          value: 'weeber',
          matchLevel: 'none',
          matchedWords: []
        }
      }
    }, {
      created_at: '2020-06-22T12:28:21.000Z',
      title: 'Kafka: The Rescue Will Begin in Its Own Time',
      url: 'https://www.newyorker.com/magazine/2020/06/29/the-rescue-will-begin-in-its-own-time',
      author: 'mitchbob',
      points: 152,
      story_text: null,
      comment_text: null,
      num_comments: 53,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1592828901,
      _tags: ['story', 'author_mitchbob', 'story_23599427', 'front_page'],
      objectID: '23599427',
      _highlightResult: {
        title: {
          value: 'Kafka: The Rescue Will Begin in Its Own Time',
          matchLevel: 'none',
          matchedWords: []
        },
        url: {
          value: 'https://www.newyorker.com/magazine/2020/06/29/the-rescue-will-begin-in-its-own-time',
          matchLevel: 'none',
          matchedWords: []
        },
        author: {
          value: 'mitchbob',
          matchLevel: 'none',
          matchedWords: []
        }
      }
    }, {
      created_at: '2020-06-23T04:06:58.000Z',
      title: 'Opinions I have formed about the “geospatial industry”',
      url: 'https://twitter.com/mouthofmorrison/status/1265635034939248640',
      author: 'luu',
      points: 121,
      story_text: null,
      comment_text: null,
      num_comments: 47,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1592885218,
      _tags: ['story', 'author_luu', 'story_23609819', 'front_page'],
      objectID: '23609819',
      _highlightResult: {
        title: {
          value: 'Opinions I have formed about the “geospatial industry”',
          matchLevel: 'none',
          matchedWords: []
        },
        url: {
          value: 'https://twitter.com/mouthofmorrison/status/1265635034939248640',
          matchLevel: 'none',
          matchedWords: []
        },
        author: {
          value: 'luu',
          matchLevel: 'none',
          matchedWords: []
        }
      }
    }, {
      created_at: '2020-06-23T01:25:01.000Z',
      title: 'nCino S-1',
      url: 'https://www.sec.gov/Archives/edgar/data/1566895/000119312520174870/d828449ds1.htm',
      author: 'nsx147',
      points: 112,
      story_text: null,
      comment_text: null,
      num_comments: 71,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1592875501,
      _tags: ['story', 'author_nsx147', 'story_23609024', 'front_page'],
      objectID: '23609024',
      _highlightResult: {
        title: {
          value: 'nCino S-1',
          matchLevel: 'none',
          matchedWords: []
        },
        url: {
          value: 'https://www.sec.gov/Archives/edgar/data/1566895/000119312520174870/d828449ds1.htm',
          matchLevel: 'none',
          matchedWords: []
        },
        author: {
          value: 'nsx147',
          matchLevel: 'none',
          matchedWords: []
        }
      }
    }, {
      created_at: '2020-06-21T23:06:48.000Z',
      title: 'Reverse Engineering the Comtech AHA363 PCIe Gzip Accelerator Board',
      url: 'https://tomverbeure.github.io/2020/06/14/AHA363-Reverse-Engineering.html',
      author: 'todsacerdoti',
      points: 112,
      story_text: null,
      comment_text: null,
      num_comments: 28,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1592780808,
      _tags: ['story', 'author_todsacerdoti', 'story_23596070', 'front_page'],
      objectID: '23596070',
      _highlightResult: {
        title: {
          value: 'Reverse Engineering the Comtech AHA363 PCIe Gzip Accelerator Board',
          matchLevel: 'none',
          matchedWords: []
        },
        url: {
          value: 'https://tomverbeure.github.io/2020/06/14/AHA363-Reverse-Engineering.html',
          matchLevel: 'none',
          matchedWords: []
        },
        author: {
          value: 'todsacerdoti',
          matchLevel: 'none',
          matchedWords: []
        }
      }
    }, {
      created_at: '2020-06-23T01:35:09.000Z',
      title: 'What Comes After Zoom?',
      url: 'https://www.ben-evans.com/benedictevans/2020/6/22/zoom-and-the-next-video',
      author: '1cvmask',
      points: 110,
      story_text: null,
      comment_text: null,
      num_comments: 102,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1592876109,
      _tags: ['story', 'author_1cvmask', 'story_23609074', 'front_page'],
      objectID: '23609074',
      _highlightResult: {
        title: {
          value: 'What Comes After Zoom?',
          matchLevel: 'none',
          matchedWords: []
        },
        url: {
          value: 'https://www.ben-evans.com/benedictevans/2020/6/22/zoom-and-the-next-video',
          matchLevel: 'none',
          matchedWords: []
        },
        author: {
          value: '1cvmask',
          matchLevel: 'none',
          matchedWords: []
        }
      }
    }, {
      created_at: '2020-06-22T22:09:55.000Z',
      title: 'Frustration project: Automate data entry into PeopleSoft with Selenium',
      url: 'https://github.com/tbensky/selenium-peoplesoft',
      author: 'tbensky',
      points: 86,
      story_text: null,
      comment_text: null,
      num_comments: 41,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1592863795,
      _tags: ['story', 'author_tbensky', 'story_23607458', 'front_page'],
      objectID: '23607458',
      _highlightResult: {
        title: {
          value: 'Frustration project: Automate data entry into PeopleSoft with Selenium',
          matchLevel: 'none',
          matchedWords: []
        },
        url: {
          value: 'https://github.com/tbensky/selenium-peoplesoft',
          matchLevel: 'none',
          matchedWords: []
        },
        author: {
          value: 'tbensky',
          matchLevel: 'none',
          matchedWords: []
        }
      }
    }, {
      created_at: '2020-06-22T12:11:35.000Z',
      title: 'NPhysics: 2D and 3D Real-Time Physics Engine for Rust',
      url: 'https://nphysics.org/',
      author: 'ArtWomb',
      points: 84,
      story_text: null,
      comment_text: null,
      num_comments: 9,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1592827895,
      _tags: ['story', 'author_ArtWomb', 'story_23599318', 'front_page'],
      objectID: '23599318',
      _highlightResult: {
        title: {
          value: 'NPhysics: 2D and 3D Real-Time Physics Engine for Rust',
          matchLevel: 'none',
          matchedWords: []
        },
        url: {
          value: 'https://nphysics.org/',
          matchLevel: 'none',
          matchedWords: []
        },
        author: {
          value: 'ArtWomb',
          matchLevel: 'none',
          matchedWords: []
        }
      }
    }, {
      created_at: '2020-06-23T09:43:42.000Z',
      title: 'CERN approves plans for a $23B, 62-mile long super-collider',
      url: 'https://www.engadget.com/cern-super-collider-higgs-boson-particle-092412017.html',
      author: 'AliCollins',
      points: 78,
      story_text: null,
      comment_text: null,
      num_comments: 54,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1592905422,
      _tags: ['story', 'author_AliCollins', 'story_23611738', 'front_page'],
      objectID: '23611738',
      _highlightResult: {
        title: {
          value: 'CERN approves plans for a $23B, 62-mile long super-collider',
          matchLevel: 'none',
          matchedWords: []
        },
        url: {
          value: 'https://www.engadget.com/cern-super-collider-higgs-boson-particle-092412017.html',
          matchLevel: 'none',
          matchedWords: []
        },
        author: {
          value: 'AliCollins',
          matchLevel: 'none',
          matchedWords: []
        }
      }
    }, {
      created_at: '2020-06-23T08:42:18.000Z',
      title: 'Former Wirecard CEO Markus Braun arrested',
      url: 'https://www.dw.com/en/former-wirecard-ceo-markus-braun-arrested/a-53905720',
      author: 'kleiba',
      points: 77,
      story_text: null,
      comment_text: null,
      num_comments: 35,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1592901738,
      _tags: ['story', 'author_kleiba', 'story_23611347', 'front_page'],
      objectID: '23611347',
      _highlightResult: {
        title: {
          value: 'Former Wirecard CEO Markus Braun arrested',
          matchLevel: 'none',
          matchedWords: []
        },
        url: {
          value: 'https://www.dw.com/en/former-wirecard-ceo-markus-braun-arrested/a-53905720',
          matchLevel: 'none',
          matchedWords: []
        },
        author: {
          value: 'kleiba',
          matchLevel: 'none',
          matchedWords: []
        }
      }
    }, {
      created_at: '2020-06-23T02:46:06.000Z',
      title: 'The Value of Life',
      url: 'http://www.overcomingbias.com/2020/06/the-value-of-life.html',
      author: 'cinquemb',
      points: 70,
      story_text: null,
      comment_text: null,
      num_comments: 37,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1592880366,
      _tags: ['story', 'author_cinquemb', 'story_23609444', 'front_page'],
      objectID: '23609444',
      _highlightResult: {
        title: {
          value: 'The Value of Life',
          matchLevel: 'none',
          matchedWords: []
        },
        url: {
          value: 'http://www.overcomingbias.com/2020/06/the-value-of-life.html',
          matchLevel: 'none',
          matchedWords: []
        },
        author: {
          value: 'cinquemb',
          matchLevel: 'none',
          matchedWords: []
        }
      }
    }, {
      created_at: '2020-06-23T08:18:29.000Z',
      title: 'Siberian town in arctic circle hits 101°F (38°C)',
      url: 'https://www.forbes.com/sites/trevornace/2020/06/22/the-arctic-circle-hit-101f-saturday-its-hottest-temperature-ever/#38fff16f4eb6',
      author: 'doitLP',
      points: 69,
      story_text: null,
      comment_text: null,
      num_comments: 52,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1592900309,
      _tags: ['story', 'author_doitLP', 'story_23611204', 'front_page'],
      objectID: '23611204',
      _highlightResult: {
        title: {
          value: 'Siberian town in arctic circle hits 101°F (38°C)',
          matchLevel: 'none',
          matchedWords: []
        },
        url: {
          value: 'https://www.forbes.com/sites/trevornace/2020/06/22/the-arctic-circle-hit-101f-saturday-its-hottest-temperature-ever/#38fff16f4eb6',
          matchLevel: 'none',
          matchedWords: []
        },
        author: {
          value: 'doitLP',
          matchLevel: 'none',
          matchedWords: []
        }
      }
    }, {
      created_at: '2020-06-22T20:10:26.000Z',
      title: 'Ask HN: How to Develop a Growth Mindset?',
      url: null,
      author: 'sixaddyffe2481',
      points: 61,
      story_text: 'I\u0026#x27;ve always considered myself as someone who can do X or can\u0026#x27;t do Y. I\u0026#x27;ve learned new things, I\u0026#x27;ve been creative and daring - at times.\u003cp\u003eBut often times, when someone challenges me to do something new, I respond that I don\u0026#x27;t know how and would not be able t do it.\u003cp\u003eHow do I turn that around? How do I develop a growth mindset?',
      comment_text: null,
      num_comments: 48,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1592856626,
      _tags: ['story', 'author_sixaddyffe2481', 'story_23605790', 'ask_hn', 'front_page'],
      objectID: '23605790',
      _highlightResult: {
        title: {
          value: 'Ask HN: How to Develop a Growth Mindset?',
          matchLevel: 'none',
          matchedWords: []
        },
        author: {
          value: 'sixaddyffe2481',
          matchLevel: 'none',
          matchedWords: []
        },
        story_text: {
          value: 'I\'ve always considered myself as someone who can do X or can\'t do Y. I\'ve learned new things, I\'ve been creative and daring - at times.\u003cp\u003eBut often times, when someone challenges me to do something new, I respond that I don\'t know how and would not be able t do it.\u003cp\u003eHow do I turn that around? How do I develop a growth mindset?',
          matchLevel: 'none',
          matchedWords: []
        }
      }
    }, {
      created_at: '2020-06-22T08:37:35.000Z',
      title: 'Why you should re-read Paradise Lost (2017)',
      url: 'https://www.bbc.com/culture/article/20170419-why-paradise-lost-is-one-of-the-worlds-most-important-poems',
      author: 'emptybits',
      points: 56,
      story_text: null,
      comment_text: null,
      num_comments: 15,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1592815055,
      _tags: ['story', 'author_emptybits', 'story_23598292', 'front_page'],
      objectID: '23598292',
      _highlightResult: {
        title: {
          value: 'Why you should re-read Paradise Lost (2017)',
          matchLevel: 'none',
          matchedWords: []
        },
        url: {
          value: 'https://www.bbc.com/culture/article/20170419-why-paradise-lost-is-one-of-the-worlds-most-important-poems',
          matchLevel: 'none',
          matchedWords: []
        },
        author: {
          value: 'emptybits',
          matchLevel: 'none',
          matchedWords: []
        }
      }
    }, {
      created_at: '2020-06-22T12:03:20.000Z',
      title: 'The Antagonism of Human and Nature in Factorio',
      url: 'https://molily.de/antagonism-human-nature/',
      author: 'erlend_sh',
      points: 46,
      story_text: null,
      comment_text: null,
      num_comments: 38,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1592827400,
      _tags: ['story', 'author_erlend_sh', 'story_23599264', 'front_page'],
      objectID: '23599264',
      _highlightResult: {
        title: {
          value: 'The Antagonism of Human and Nature in Factorio',
          matchLevel: 'none',
          matchedWords: []
        },
        url: {
          value: 'https://molily.de/antagonism-human-nature/',
          matchLevel: 'none',
          matchedWords: []
        },
        author: {
          value: 'erlend_sh',
          matchLevel: 'none',
          matchedWords: []
        }
      }
    }, {
      created_at: '2020-06-23T10:09:23.000Z',
      title: 'Tasks.org – Open-source ToDo app for Android with CalDAV sync',
      url: 'https://tasks.org/',
      author: 'freetonik',
      points: 42,
      story_text: null,
      comment_text: null,
      num_comments: 14,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1592906963,
      _tags: ['story', 'author_freetonik', 'story_23611911', 'front_page'],
      objectID: '23611911',
      _highlightResult: {
        title: {
          value: 'Tasks.org – Open-source ToDo app for Android with CalDAV sync',
          matchLevel: 'none',
          matchedWords: []
        },
        url: {
          value: 'https://tasks.org/',
          matchLevel: 'none',
          matchedWords: []
        },
        author: {
          value: 'freetonik',
          matchLevel: 'none',
          matchedWords: []
        }
      }
    }],
    nbHits: 30,
    page: 0,
    nbPages: 2,
    hitsPerPage: 20,
    exhaustiveNbHits: true,
    query: '',
    params: 'advancedSyntax=true\u0026analytics=true\u0026analyticsTags=backend\u0026tags=front_page',
    processingTimeMS: 1
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsListComponent, DateAgoPipe],
      imports: [RouterTestingModule, ChartModule, HttpClientTestingModule],
      providers: [EventReplayer, ApiServiceService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsListComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch news list on load', () => {
    component.ngOnInit();
    httpMock.match('https://hn.algolia.com/api/v1/search?tags=front_page')[0].flush(fakeNewsData);
    fixture.detectChanges();
    expect(component.newsList.length).toBe((fakeNewsData.hits).length);
  });

});
