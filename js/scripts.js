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
            backgroundColor: "rgba(0, 0, 0, 0)",
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
        // Additional subcategory data for other books...
    };

    // Event listeners for book selection
    books.forEach(book => {
        book.addEventListener('click', () => {
            const bookId = book.id;
            const subcategory = subcategories[bookId];

            // Update expanded title and background color
            expandedTitle.textContent = `Sub-categories for ${subcategory.title}`;
            expandedBooks.style.backgroundColor = subcategory.backgroundColor;

            // Clear previous content
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

            // Show the expanded section with subcategories
            expandedBooks.classList.remove('d-none');
        });
    });

    // ---- Section Scrolling with IntersectionObserver ----
    const sections = document.querySelectorAll('section, #introCarousel'); // Select all sections
    const navbarHeight = document.querySelector('.navbar').offsetHeight; // Navbar height for offset
    let activeSectionIndex = 0; // Track the currently active section

    // Smoothly scrolls to the section, aligning it below the navbar
    function scrollToSection(element) {
        const offsetTop = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }

    // IntersectionObserver options and callback
    const observerOptions = {
        root: null, // Use the viewport as the root
        threshold: 0.5 // Trigger when 50% of the section is visible
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            const index = Array.from(sections).indexOf(entry.target);
            if (entry.isIntersecting && index !== activeSectionIndex) {
                activeSectionIndex = index;
                scrollToSection(entry.target);
            }
        });
    };

    // Create and observe each section with IntersectionObserver
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));
});
