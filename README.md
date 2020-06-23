# HackerNewsClone

A clone of HackerNews with dynamic SSR using Angular Universal.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Aproach

Enable the app to use dynamic SSR with Angular Universal schema.
Render the app server side for the first load. Avoid duplicate ajax call (the one made on the server vs the one when client loads) using TransferHttpCacheModule.
During the time the client scripts are loading record user events and replay them with Preboot.
Local storage is used to store Upvotes and the "hide" parameter on the browser.
The Points VS Story ID chart is made using Chart.js (PrimeNg provides a wrapper for this for Angular).

## Stack
Angular 8 with Angular Universal
Preboot
PrimeNg
