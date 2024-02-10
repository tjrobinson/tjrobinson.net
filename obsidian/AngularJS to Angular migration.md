---
title: AngularJS to Angular migration
---

This is a collection of useful links I've come across when working on an AngularJS to Angular migration project.

- [Migrating Large Enterprise Angular JS Codebases to Angular by Christian Kohler](https://www.youtube.com/watch?v=lYOHB_yTEmo)
- [ngMigration Forum](https://github.com/angular/ngMigration-Forum)


<https://stackoverflow.com/questions/59302237/how-to-use-ng-annotate-with-hybrid-app-based-on-angular-cli>
<https://github.com/angular/ngMigration-Forum/wiki/Migration-Paths-Overview>
<https://angular.io/guide/upgrade>
<https://morioh.com/p/9da9a8d46458>
<https://www.npmjs.com/package/webpack-merge>
<https://github.com/survivejs/webpack-merge#mergewithrules>
<https://github.com/just-jeb/angular-builders/blob/65eef0edcef16c6edaa9a69dd8431af695d51b3e/MIGRATION.MD>
<https://www.reddit.com/r/angularjs/comments/4fe1vw/ngannotate_babel_plugin_automatically_add_angular/>
<https://www.google.co.uk/search?ei=yLwrYOCvEpDygQbH7LaQDw&q=webpack+loader+filtering&oq=webpack+loader+filtering&gs_lcp=Cgdnd3Mtd2l6EAM6BwgAEEcQsAM6AggAOgYIABAWEB46BQghEKABOgcIIRAKEKABUNwSWNQYYNwZaAFwAXgAgAFZiAHJBJIBAjEwmAEAoAEBqgEHZ3dzLXdpesgBCMABAQ&sclient=gws-wiz&ved=0ahUKEwjgs92Ktu7uAhUQecAKHUe2DfIQ4dUDCA0&uact=5>
<https://www.npmjs.com/package/ng-annotate-patched>
<https://medium.com/@UpgradingAJS>
<https://www.npmjs.com/package/@angular-builders/custom-webpack>
<https://www.google.co.uk/search?source=hp&ei=3R3FX7zkJ5LWarqilogI&q=ngx-build-plus+ng-annotate&btnK=Google+Search&oq=Keyword+not+supported%3A+%27multiple+active+result+sets%27.&gs_lcp=CgZwc3ktYWIQAzIJCAAQyQMQFhAeUKATWKATYPgXaABwAHgAgAFUiAFUkgEBMZgBAKABAqABAaoBB2d3cy13aXo&sclient=psy-ab&ved=0ahUKEwj8xt2X2KrtAhUSqxoKHTqRBYEQ4dUDCAk&uact=5>
<https://stackoverflow.com/questions/40820727/injection-on-es6-classes-constructors-with-angular-1-x-and-webpack-not-working>
<https://github.com/just-jeb/angular-builders/issues/186>
<https://github.com/angular/angular-cli/issues/6873>
<https://github.com/angular/angular/issues/17581>
<https://code.angularjs.org/1.8.2/docs/error/ng/btstrpd?p0=%26lt;body%26gt>;
<https://github.com/wix/angular-tree-control/issues/293>
<https://healthcases.local-dev.com/online-form/#/7011/dc5b1667-9191-4c27-8c1c-84ab811b8ae7?returnUrl=%2F%23%2Fcases%2F7011%2Ftasks%2Fdc5b1667-9191-4c27-8c1c-84ab811b8ae7>
<https://www.google.co.uk/search?source=hp&ei=3R3FX7zkJ5LWarqilogI&q=depends+on+%27jquery%27.+CommonJS+or+AMD+dependencies+can+cause+optimization+bailouts.&btnK=Google+Search&oq=Keyword+not+supported%3A+%27multiple+active+result+sets%27.&gs_lcp=CgZwc3ktYWIQAzIJCAAQyQMQFhAeUKATWKATYPgXaABwAHgAgAFUiAFUkgEBMZgBAKABAqABAaoBB2d3cy13aXo&sclient=psy-ab&ved=0ahUKEwj8xt2X2KrtAhUSqxoKHTqRBYEQ4dUDCAk&uact=5>
<https://www.google.co.uk/search?source=hp&ei=3R3FX7zkJ5LWarqilogI&q=Cannot+assign+to+%27htmlPrefilter%27+because+it+is+a+read-only+property.&btnK=Google+Search&oq=Keyword+not+supported%3A+%27multiple+active+result+sets%27.&gs_lcp=CgZwc3ktYWIQAzIJCAAQyQMQFhAeUKATWKATYPgXaABwAHgAgAFUiAFUkgEBMZgBAKABAqABAaoBB2d3cy13aXo&sclient=psy-ab&ved=0ahUKEwj8xt2X2KrtAhUSqxoKHTqRBYEQ4dUDCAk&uact=5>
<https://blog.bitsrc.io/how-to-use-jquery-with-angular-when-you-absolutely-have-to-42c8b6a37ff9>
<https://medium.com/better-programming/how-to-include-and-use-jquery-in-angular-cli-project-592e0fe63176>
<https://www.npmjs.com/package/@uirouter/angular-hybrid>
<https://github.com/just-jeb/angular-builders/search?q=ng-annotate&type=issues>
<https://github.com/just-jeb/angular-builders/issues/12>
<https://github.com/schmod/babel-plugin-angularjs-annotate>
<https://github.com/manfredsteyer/ngx-build-plus>
<https://gist.github.com/aaronfrost/a8c86cb2653d62588cd629c392a4e8dc>
<https://medium.com/@ajexx/angular2-provide-external-data-to-app-before-bootstrap-5180d0b28ea9>
<https://github.com/just-jeb/angular-builders/issues/186>

I've also discovered that:

* Angular CLI (11) doesn't have any official support for `ng-annotate`. In other words, any AngularJS code that you have annotated with things like `/* @ngInject */` won't work if you try to build your code using the webpack configuration that Angular CLI generates.


To fix "The Kendo UI directives require jQuery to be available before AngularJS. Please include jquery before angular in the document" - use:

```
plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      moment: "moment",
      "window.jQuery": "jquery"
    }),
  ]
```
