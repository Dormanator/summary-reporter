# A simple API for html to pdf rendering.

Generate PDFs from html.

Uses Headless Chrome. Using [Simple Headless Chrome](https://github.com/LucianoGanga/simple-headless-chrome) to run with Node JS.

## To get started you need to clone the repository, cd to it and run:

```shell
npm install
```

## Running webserver locally

```shell
npm start
```

## Running webserver

```
node .
```

If you want to host html2pdf-chrome yourself, you will have to ask your host if they support hosting Node.js applications.

If your host does not support Node.js, you'll need to find a new host
that does. Check out [Heroku](http://heroku.com) or [Nodejitsu](http://nodejitsu.com) for example.
If delopying to Heroku also be sure to include the [buildpack for chrome](https://github.com/heroku/heroku-buildpack-google-chrome).

## API

```
POST /api/pdf
```

**Parameters**

* `data` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Html to generate pdf from
* `options` (optional, default `{}`)

**Parameters that can be set inside of 'options'**

* `landscape` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Paper orientation. Defaults to false.
* `displayHeaderFooter` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Display header and footer. Defaults to false.
* `printBackground` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Print background graphics. Defaults to false.
* `scale` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Scale of the webpage rendering. Defaults to 1.
* `paperWidth` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Paper width in inches. Defaults to 8.5 inches.
* `paperHeight` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Paper height in inches. Defaults to 11 inches.
* `marginTop` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Top margin in inches. Defaults to 1cm (~0.4 inches).
* `marginBottom` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Bottom margin in inches. Defaults to 1cm (~0.4 inches).
* `marginLeft` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Left margin in inches. Defaults to 1cm (~0.4 inches).
* `marginRight` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Right margin in inches. Defaults to 1cm (~0.4 inches).
* `pageRanges` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means print all pages.
  }} options - PDF options

## Formatting

Make sure to set any styles specificly for your pdf via the

```css
@media print {
  page-break-before: always; // for example, adding page break between elements
}
```

## License

MIT
