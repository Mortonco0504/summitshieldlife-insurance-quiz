function nextPage() {
    console.log("nextPage called, current page:", currentPage);
    
    // Show call modal when on page 1 (before any navigation)
    if (currentPage === 1) {
        console.log("Page 1 - showing modal immediately");
        showCallModal();
        return; // Don't proceed with navigation yet
    }
    
    // Normal page navigation for other pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentPage < totalPages) {
        if (validateCurrentPage()) {
            hidePage(currentPage);
            currentPage++;
            console.log("New current page:", currentPage);
            showPage(currentPage);
            updateProgressBar();
        }
    }
}
