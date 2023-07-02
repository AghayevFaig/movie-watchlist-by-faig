const searchInput=document.getElementById('search-input')
const searchBtn=document.getElementById('search-btn')
const mainContentContainer=document.getElementById('main-content-container')
const startContent=document.getElementById('start-content')
const baseURL='https://www.omdbapi.com/'
const apiKey='apikey=4ede2a67'
let moviesResultArray=[]
let watchlistArray=JSON.parse(localStorage.getItem('watchlist') || "[]")
console.log(watchlistArray)

searchBtn.addEventListener("click"||'keypress',()=>{
  const searchInputValue=searchInput.value
  const trimmed=searchInputValue.trim()
  if(trimmed){
    apiCall(trimmed)
  }
})

startContent.style.display='block'

function apiCall(value){
  fetch(`https://www.omdbapi.com/?s=${value}&type=movie&apikey=6a616cc4`)
  .then(res => res.json())
  .then(data => {
    const movies=data.Search
    if(movies){
      startContent.style.display='none'
      getMovies(movies)
    }else{
      mainContentContainer.innerHTML=`<div class='not-found'><p>Unable to find what you’re looking for. Please try another search.</p></div>`
    }
  })
}

function getMovies(movies){
  const movieArray=[]

  movies.forEach(movie => {
    
  fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=3a43dcb5`)
  .then(res => res.json())
  .then(data => {
    movieArray.push({
      Poster:data.Poster,
      Title:data.Title,
      Runtime:data.Runtime,
      Genre:data.Genre,
      Plot:data.Plot,
      Rating:data.imdbRating,
      Id:data.imdbID
    })
    if(movieArray != undefined){

      showMovies(movieArray)
    }
   
      
    })
  })
}

document.addEventListener('click',(e)=>{
  if(e.target.dataset.id){
    console.log(e.target.dataset.id)
    const watchlisted=moviesResultArray.filter(movie=>movie.Id === e.target.dataset.id)[0]
    if(!watchlistArray.includes(watchlisted)){

      watchlistArray.push(watchlisted)
    }


    console.log(watchlistArray)
    localStorage.setItem('watchlist', JSON.stringify(watchlistArray))
  }
})

function showMovies(data){
moviesResultArray=data
let moviesHtml=data.map(movie =>{
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
      <button class="add-or-remove" id="add-to-watchlist" data-id=${Id}><span>+</span> Watchlist</button>
    </div>
    <div class="plot">
     ${Plot}
    </div>
  </div>
</div>
`
})
mainContentContainer.innerHTML=moviesHtml
}

