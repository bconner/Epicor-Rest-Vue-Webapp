/* This application uses Vue.js, a light weight web framework, to simplify writing data
 * to the web page after it's loaded from REST. This may seem complicated, but it's simpler
 * than using JQuery or plain javascript to update the html, we promise! 
 *
 * Since this course is about learning what you can do with Epicor ERP's REST services
 * we've written most of the javascript, css, and html code for you already. You don't need
 * to read all of the explination below to complete the lab, but hereis a brief explination
 * of how the Vue, and our application, works which you may find helpful if you get stuck.
 *
 * The Vue object below will contain all our application code, created with new Vue({...});
 * All our javascript code is going to go inside of this object.
 *
 * ## el
 * Application ELement. This is a simple css element selector that finds the html element
 * with id="app" in index.html. This just tells Vue where it is allowed to add html to
 * the page. You'll find a <div id="app"> wrapping our whole page in index.html.
 *
 * ## data
 * Each item within data will be automatically injected into the index.html
 * wherever Vue finds a {{mustache}} style data binding. For example in the html page
 * Vue will find {{appTitle}} and replace it with the data.appTitle value,
 * "Awesome REST Application."
 *
 * Data bindings can also be two way so, for example, if we create a text input like
 * <input v-model="query" /> anything the user types into that input box will update
 * the data.query object.
 *
 * ## methods
 * Methods is where we store javascript functions that can be called by the web page.
 * 
 * For example we will create a method to run a rest query to look up abccodes when
 * the user types in a partial abccode name using <input ... v-on:keyup="search">
 * which will run the search method each time the user finishes pressing a key.
 *
 * Note: Inside the methods you can get at any of the data elements using this.dataElement
 */

var app = new Vue({

  // el attaches the application to the <div> with id="app" in index.html
  el: '#app',

  // data contains all the info we want to display to the user or take as input from the user
  data: {
    appTitle: 'Awesome REST Application',

    // the search text the user types in
    query: '',

    // the last query run    
    lastQuery: '',

    // are we running a search right now?
    searching: false,

    // the search results that will be added to the page. 
    searchResults: [],

  },

  // methods stores each of our functions where we will look up data in ERP using REST
  methods: {
    search: function () {
      if (this.query.length > 0) {

        // avoid running the same query twice if the user just moves the cursor around        
        if (this.query === this.lastQuery) {
          return;
        }        

        this.lastQuery = this.query;        
        this.searching = true;

        ///// Place the Code From POSTMAN Here

        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://hv-rest-demo/2012rtest/api/v1/Erp.BO.CustomerSvc/Customers/?$filter=startswith(Name, 'A')",
          "method": "GET",
          "headers": {
            "accept": "application/json",
            "authorization": "Basic bWFuYWdlcjpFcGljb3IxMjM=",
            "cache-control": "no-cache",
            "postman-token": "4089201c-57a8-f663-7e65-fe3dc9c28688"
          }
        };

        $.ajax(settings).done(function (response) {
          console.log(response);
        });

        //1. use bind(this) to give the rest callback function access to the data objects        
        //2. set searchResults = the rest results 
        //3. set searching to false so the ui knows we're no longer searching.
        //4. inject this.query into the search url to wire up the search input
        
      }
      else {
        // if the user clears the search
        this.searching = false;
        this.searchResults = [];
      }
    }
  }
});