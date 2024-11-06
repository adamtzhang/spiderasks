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
        // Additional subcategory data for other books as needed...
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

    // ---- Section Scrolling with IntersectionObserver and Touch Support ----
    const sections = document.querySelectorAll('section, #introCarousel'); // Select all sections
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    let activeSectionIndex = 0;

    function scrollToSection(element) {
        const offsetTop = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }

    // IntersectionObserver for desktop scrolling
    const observerOptions = {
        root: null,
        threshold: 0.5
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

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

    // Touch event handling for mobile devices
    let touchStartY = 0;
    let touchEndY = 0;

    function handleTouchStart(event) {
        touchStartY = event.touches[0].clientY;
    }

    function handleTouchEnd(event) {
        touchEndY = event.changedTouches[0].clientY;
        handleSwipe();
    }

    function handleSwipe() {
        if (touchEndY < touchStartY - 50 && activeSectionIndex < sections.length - 1) {
            // Swipe up to go to the next section
            activeSectionIndex++;
            scrollToSection(sections[activeSectionIndex]);
        } else if (touchEndY > touchStartY + 50 && activeSectionIndex > 0) {
            // Swipe down to go to the previous section
            activeSectionIndex--;
            scrollToSection(sections[activeSectionIndex]);
        }
    }

    // Add touch event listeners to the document for mobile swipe support
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
});
