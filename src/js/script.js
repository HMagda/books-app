{
  ('use strict');
  const select = {
    templateOf: {
      books: '#template-book',
    },
    listOf: {
      booksList: '.books-list',
      booksImages: '.books-list .book__image',
      booksImage: '.book__image',
      filters: '.filters',
    },
  };

  const templates = {
    bookTemplate: Handlebars.compile(
      document.querySelector(select.templateOf.books).innerHTML
    ),
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
      this.filteredBooksContainer = document.querySelector(
        select.listOf.filters
      );
    }

    render() {
      for (let book of this.data) {
        book.ratingBgc = this.determineRatingBgc(book.rating);
        book.ratingWidth = book.rating * 10;
        const generatedHTML = templates.bookTemplate(book);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        this.booksListContainer.appendChild(generatedDOM);
      }
      this.booksImagesContainer = document.querySelectorAll(
        select.listOf.booksImages
      );
    }

    initActions() {
      const thisBook = this;

      const favoriteBooks = [];
      thisBook.filters = [];

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
          } else {
            bookImage.classList.add('favorite');
            favoriteBooks.push(bookImageId);
          }
        });
      }

      this.filteredBooksContainer.addEventListener('click', function (event) {
        if (
          event.target.tagName === 'INPUT' &&
          event.target.type === 'checkbox' &&
          event.target.name === 'filter'
        ) {
          if (event.target.checked) {
            thisBook.filters.push(event.target.value);
          } else {
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
        const bookImageID = document.querySelector(
          select.listOf.booksImage + '[data-id="' + book.id + '"]'
        );
        if (shouldBeHidden === true) {
          bookImageID.classList.add('hidden');
        } else {
          bookImageID.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating) {
      if (rating < 6) {
        return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
      } else if (rating > 6 && rating <= 8) {
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      } else if (rating > 8 && rating <= 9) {
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      } else if (rating > 9) {
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
      }
    }
  }
  new BooksList();
}
