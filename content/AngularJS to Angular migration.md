# AngularJS to Angular migration

This is a collection of useful links I've come across when working on an AngularJS to Angular migration project.

## Migration guides and overviews

- [Migrating Large Enterprise Angular JS Codebases to Angular by Christian Kohler](https://www.youtube.com/watch?v=lYOHB_yTEmo)
- [ngMigration Forum](https://github.com/angular/ngMigration-Forum)
- [Migration Paths Overview — ngMigration Forum wiki](https://github.com/angular/ngMigration-Forum/wiki/Migration-Paths-Overview)
- [Upgrading from AngularJS to Angular — official guide](https://angular.io/guide/upgrade)
- [Upgrading AngularJS — Medium publication](https://medium.com/@UpgradingAJS)
- [@uirouter/angular-hybrid — npm](https://www.npmjs.com/package/@uirouter/angular-hybrid)

## ng-annotate and dependency injection

- [How to use ng-annotate with a hybrid app based on angular-cli — Stack Overflow](https://stackoverflow.com/questions/59302237/how-to-use-ng-annotate-with-hybrid-app-based-on-angular-cli)
- [ng-annotate-patched — npm](https://www.npmjs.com/package/ng-annotate-patched)
- [babel-plugin-angularjs-annotate — adds AngularJS DI annotations to ES6 code](https://github.com/schmod/babel-plugin-angularjs-annotate)
- [ng-annotate Babel plugin discussion — r/angularjs](https://www.reddit.com/r/angularjs/comments/4fe1vw/ngannotate_babel_plugin_automatically_add_angular/)
- [Injection on ES6 class constructors with Angular 1.x and webpack not working — Stack Overflow](https://stackoverflow.com/questions/40820727/injection-on-es6-classes-constructors-with-angular-1-x-and-webpack-not-working)
- [AngularJS ⇒ Angular migration and ng-annotate — angular/angular-cli#6873](https://github.com/angular/angular-cli/issues/6873)
- [Using Babel loader with ngAnnotate plugin — just-jeb/angular-builders#12](https://github.com/just-jeb/angular-builders/issues/12)
- [ng-annotate-loader TypeScript processing order — just-jeb/angular-builders#186](https://github.com/just-jeb/angular-builders/issues/186)
- [Issues mentioning ng-annotate in just-jeb/angular-builders](https://github.com/just-jeb/angular-builders/search?q=ng-annotate&type=issues)

## Webpack and build configuration

- [@angular-builders/custom-webpack — npm](https://www.npmjs.com/package/@angular-builders/custom-webpack)
- [angular-builders migration guide](https://github.com/just-jeb/angular-builders/blob/65eef0edcef16c6edaa9a69dd8431af695d51b3e/MIGRATION.MD)
- [webpack-merge — npm](https://www.npmjs.com/package/webpack-merge)
- [webpack-merge `mergeWithRules` — GitHub](https://github.com/survivejs/webpack-merge#mergewithrules)
- [ngx-build-plus — extend the Angular CLI's build behaviour without ejecting](https://github.com/manfredsteyer/ngx-build-plus)
- [webpack.partial.js for an Angular CLI project using ngAnnotate — gist](https://gist.github.com/aaronfrost/a8c86cb2653d62588cd629c392a4e8dc)
- [Angular2: provide external data to app before bootstrap — Medium](https://medium.com/@ajexx/angular2-provide-external-data-to-app-before-bootstrap-5180d0b28ea9)

## jQuery

- [How to Use jQuery with Angular (When You Absolutely Have To) — Bits and Pieces](https://blog.bitsrc.io/how-to-use-jquery-with-angular-when-you-absolutely-have-to-42c8b6a37ff9)
- [How to Include and Use jQuery in Angular CLI Project — Better Programming](https://medium.com/better-programming/how-to-include-and-use-jquery-in-angular-cli-project-592e0fe63176)

## Errors encountered along the way

- [AngularJS error reference: `ng:btstrpd` (app already bootstrapped)](https://code.angularjs.org/1.8.2/docs/error/ng/btstrpd?p0=%26lt;body%26gt;)
- [`[$injector:strictdi]` function($parse) is not using explicit annotation — angular-tree-control#293](https://github.com/wix/angular-tree-control/issues/293)
- [ngUpgrade: No provider for [ServiceName] when AngularJS module is loaded dynamically — angular/angular#17581](https://github.com/angular/angular/issues/17581)
- `depends on 'jquery'. CommonJS or AMD dependencies can cause optimization bailouts.`
- `Cannot assign to 'htmlPrefilter' because it is a read-only property.`

## Lessons learned

- Angular CLI (11) doesn't have any official support for `ng-annotate`. In other words, any AngularJS code that you have annotated with things like `/* @ngInject */` won't work if you try to build your code using the webpack configuration that Angular CLI generates.

To fix "The Kendo UI directives require jQuery to be available before AngularJS. Please include jquery before angular in the document" - use:

```js
plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      moment: "moment",
      "window.jQuery": "jquery"
    }),
  ]
```
