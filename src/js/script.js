/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';
  const select = {
    templateOf: {
      books: '#template-book',
    },
    listOf: {
      booksList: '.books-list',
      booksImages: '.books-list .book__image',
      booksImage: '.book__image',
      filters: '.filters'
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
      this.initActions();
      this.filterBooks();
    }

    initData() {
      this.data = dataSource.books;
    }

    getElements() {
      this.booksListContainer = document.querySelector(select.listOf.booksList);
      this.filteredBooksContainer = document.querySelector(select.listOf.filters);
    }

    render() {

      for (let book of this.data) {
        
        const generatedHTML = templates.bookTemplate(book);

        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        this.booksListContainer.appendChild(generatedDOM);
        
      }
      this.booksImagesContainer = document.querySelectorAll(select.listOf.booksImages);
    }

    initActions() {

      const thisBook = this;

      const favoriteBooks = [];
      thisBook.filters = []; //informacje, jakie aktualnie filtry są wybrane w aplikacji

      for (let bookImage of this.booksImagesContainer) {

        bookImage.addEventListener('click', function (event) {
          event.preventDefault();
        });

        bookImage.addEventListener('dblclick', function (event) {

          event.preventDefault();

          const bookImageId = bookImage.getAttribute('data-id');

          if (event.target.offsetParent.classList.contains('favorite')) {

            bookImage.classList.remove('favorite');
            const index = favoriteBooks.indexOf(bookImageId);
            favoriteBooks.splice(index, 1);
          }
        
          else {
            bookImage.classList.add('favorite');
            favoriteBooks.push(bookImageId);
          }

        });
      }

      this.filteredBooksContainer.addEventListener('click', function (event) {

        if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter') {

          if (event.target.checked) {
            thisBook.filters.push(event.target.value);
          }
          else {
            const index = thisBook.filters.indexOf(event.target.value);
            thisBook.filters.splice(index, 1);
          }
          
        }
        thisBook.filterBooks();
      });
      
    }

    filterBooks() {
      for (let book of this.data) {
        let shouldBeHidden = false;
        for (let filter of this.filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        const bookImageID = document.querySelector(select.listOf.booksImage + '[data-id="' + book.id + '"]');
        if (shouldBeHidden === true) {
          bookImageID.classList.add('hidden');
        }
        else {
          bookImageID.classList.remove('hidden');
        }
      }
    }

  }
  new BooksList();
}

