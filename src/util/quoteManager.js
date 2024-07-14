const quoteList = [
    '“Every child is an artist; the problem is staying an artist when you grow up” – Pablo Picasso',
    '“If you hear a voice within you say, ‘You cannot paint,’ then by all means paint, and that voice will be silenced” – Vincent Van Gogh',
    '“Don’t think about making art, just get it done. Let everyone else decide if it’s good or bad, whether they love it or hate it. While they are deciding, make even more art.” – Andy Warhol',
    '“Painting is poetry that is seen rather than felt, and poetry is painting that is felt rather than seen.” – Leonardo da Vinci',
    '“Every artist was first an amateur.” – Ralph Waldo Emerson',
    '“There is nothing more truly artistic than to love people.” – Vincent van Gogh',
    '“Art washes away from the soul the dust of everyday life.” – Pablo Picasso',
    '“Color is my day-long obsession, joy and torment.” – Claude Monet',
    '“I found I could say things with color and shapes that I couldn’t say any other way – things I had no words for.” – Georgia O’Keeffe',
    '“Art is not what you see, but what you make others see.” – Edgar Degas',
    '“A work of art which isn’t based on feeling isn’t art at all.” – Paul Cézanne',
    '“Have no fear of perfection, you’ll never reach it.” – Salvador Dali'
]


const getNextQuote = () => {
    return quoteList[Math.floor(Math.random() * (quoteList.length))];
}

export { getNextQuote }