export const API_KEY = '38a8b96f737d5041e511ea9e3f2b2b60';


export const apis ={
  PopularMovies:`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
  NowPlaying:`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,
  Upcomming:`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
  TrendingNow :`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`,
  Latest:`https://api.themoviedb.org/3/movie/latest?api_key=${API_KEY}&language=en-US`,
  ImageUrl:'https://image.tmdb.org/t/p/original',
  DiscoverMovies:`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_video=true`,
  DiscoverTv:`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_video=true`,
  SearchMovie:`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`,
  SearchTv:`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}`,
  MovieDetails :`https://api.themoviedb.org/3/movie/`,
  TvDetails :`https://api.themoviedb.org/3/tv/`,
}