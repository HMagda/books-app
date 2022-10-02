/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';
  const select = {
    templateOf: {
      books: '#template-book',
    },
    listOf: {
      booksList: '.books-list',
    },
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  };
      
  class BooksList {
    constructor() {
      this.initData();
      this.getElements();
      this.render();
    }

    initData() {
      this.data = dataSource.books;
    }

    getElements() {
      this.bookListContainer = document.querySelector(select.listOf.booksList);  
    }

    render() {

      for (let book of this.data) {
      
        const generatedHTML = templates.bookTemplate(book);

        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        this.bookListContainer.appendChild(generatedDOM);
      }
    }

  }
  new BooksList();
}
