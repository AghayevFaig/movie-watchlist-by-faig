const watchlistContainer=document.getElementById('watchlist-container')

let watchlistArray=JSON.parse(localStorage.getItem('watchlist') || [])


document.addEventListener('click',(e)=>{
  if(e.target.dataset.id){
    watchlistArray=watchlistArray.filter(movie=>movie.Id !== e.target.dataset.id)
    localStorage.setItem('watchlist',JSON.stringify(watchlistArray))
    showMovies(watchlistArray)
  }
})
console.log(watchlistArray)
showMovies(watchlistArray)
function showMovies(data){
  if(data.length === 0){
    
  watchlistContainer.innerHTML=`<div class='not-found'><p>Your watchlist is looking a little empty...
  <a href='/index.html' class='empty-watchlist'><span>+</span>Let’s add some movies!</a>
</p>`
  }else{

    let moviesHtml=data.map(
      movie =>{
      const{Poster,Title,Rating,Runtime,Genre,Plot,Id}=movie
      return `<div class="movie">
      <div>
      <img src="${Poster==='N/A' ? '/images/No_Image_Available.jpg': Poster}" alt="movie poster" class="poster">
      </div>
      <div class="information">
          <div>
            <h1 class="title">${Title}<span class="rating">⭐${Rating}</span></h1>
          </div>
        <div class="short-information">
          <p class="duration">
          ${Runtime}
          </p>
          <p class="genre">
            ${Genre}
          </p>
          <button class="add-or-remove"  data-id=${Id}><span>-</span>Remove</button>
        </div>
        <div class="plot">
         ${Plot}
        </div>
      </div>
    </div>`
    })
    watchlistContainer.innerHTML=moviesHtml
  }
}