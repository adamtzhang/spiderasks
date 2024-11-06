document.addEventListener('DOMContentLoaded', function() {
    // ---- Main Bookshelf Selection ----
    const books = document.querySelectorAll('.book');
    const expandedBooks = document.getElementById('expanded-books');
    const subcategoryContainer = document.getElementById('subcategory-container');
    const expandedTitle = document.getElementById('expanded-title');

    // Subcategory data for each book
    const subcategories = {
        book1: {
            title: "IELTS",
            backgroundColor: "rgba(0, 0, 0, 0)", // Transparent background
            subBooks: [
                { text: "Foundations", link: "IELTS-Foundation.html" },
                { text: "Beginner", link: "IELTS-Beginner.html" },
                { text: "Intermediate", link: "IELTS-Intermediate.html" },
                { text: "Advanced", link: "IELTS-Advanced.html" }
            ]
        },
        book2: {
            title: "TOEFL",
            backgroundColor: "rgba(0, 0, 0, 0)",
            subBooks: [
                { text: "Foundations", link: "TOEFL-Foundation.html" },
                { text: "Beginner", link: "TOEFL-Beginner.html" },
                { text: "Intermediate", link: "TOEFL-Intermediate.html" },
                { text: "Advanced", link: "TOEFL-Advanced.html" }
            ]
        },
        // More subcategory data for other books as needed...
    };

    // Adds event listeners to each book in the main bookshelf
    books.forEach(book => {
        book.addEventListener('click', () => {
            const bookId = book.id;
            const subcategory = subcategories[bookId];

            // Update expanded title and background color
            expandedTitle.textContent = `Sub-categories for ${subcategory.title}`;
            expandedBooks.style.backgroundColor = subcategory.backgroundColor;

            // Clear any previous subcategories displayed
            subcategoryContainer.innerHTML = '';

            // Populate subcategories for the selected book
            subcategory.subBooks.forEach(subBook => {
                const bookDiv = document.createElement('div');
                bookDiv.className = 'book d-flex flex-column align-items-center';

                const bookLink = document.createElement('a');
                bookLink.href = subBook.link;
                bookLink.className = 'text-center';
                bookLink.style.textDecoration = 'none';

                const img = document.createElement('img');
                img.src = 'https://openclipart.org/image/800px/219894'; // Placeholder image
                img.alt = subBook.text;
                img.className = 'book-image';

                const caption = document.createElement('p');
                caption.className = 'book-caption';
                caption.textContent = subBook.text;

                bookLink.appendChild(img);
                bookLink.appendChild(caption);
                bookDiv.appendChild(bookLink);

                subcategoryContainer.appendChild(bookDiv);
            });

            // Display the expanded section with subcategories
            expandedBooks.classList.remove('d-none');
        });
    });

    // ---- Smooth Section Scrolling ----
    const sections = document.querySelectorAll('section, #introCarousel'); // Select all sections for scrolling
    let currentSection = 0; // Track the current section index
    let isScrolling = false; // Debounce variable

    function scrollToSection(index) {
        // Scroll smoothly to the selected section
        sections[index].scrollIntoView({ behavior: 'smooth' });
        currentSection = index; // Update current section index
    }

    // Event listener for wheel scroll with debounce
    window.addEventListener('wheel', (event) => {
        if (isScrolling) return; // Prevent additional scroll events during transition

        // Determine scroll direction
        if (event.deltaY > 0 && currentSection < sections.length - 1) {
            // Scroll down to the next section
            scrollToSection(currentSection + 1);
        } else if (event.deltaY < 0 && currentSection > 0) {
            // Scroll up to the previous section
            scrollToSection(currentSection - 1);
        }

        // Set debounce to prevent rapid scrolling
        isScrolling = true;
        setTimeout(() => { isScrolling = false; }, 1000); // Adjust debounce delay as needed
    });
});