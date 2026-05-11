// main.js

document.addEventListener('DOMContentLoaded', function() {
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const car = document.getElementById('car').value;
            const year = document.getElementById('year').value;
            const coverage = document.getElementById('coverage').value;
            // Simple quote calculation (placeholder logic)
            let base = 500;
            if (coverage === 'standard') base += 200;
            if (coverage === 'premium') base += 400;
            if (parseInt(year) < 2015) base += 150;
            const quote = base;
            document.getElementById('quoteResult').innerHTML =
                `<strong>Hi ${name}, your estimated quote is $${quote} per year.</strong>`;
        });
    }
});