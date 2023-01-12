const axios = require('axios');
const fs = require('fs');

const tmdbApiKey = "ee16a746baaf2494e1fa1cf69485f135";
const baseUrl = "https://api.themoviedb.org/3";
const imageUrl = "https://image.tmdb.org/t/p/original"

// const collectionMovie = [86311,328,120794,8537,519457,531799,435259,119]

// async function getMovie() {
//     const movieIds = movieData = [];
//      const data = await axios.get(
//         `/trending/movie/week?api_key=${tmdbApiKey}`,
//         {
//             baseURL:baseUrl
//         }
//     )
//     let fildMovId = data.data.results.map(val => val.id);
//     movieIds.push(...fildMovId);
//     // await getGenre();
//     const genres = await getGenre();
//     const filtGenre = genres.map(val => val.name);
//     let dita = [];
//     for(val in filtGenre) {
//         // https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&with_genres=Action&with_watch_monetization_types=flatrate
//         let data = await axios.get(
//             `/discover/movie?api_key=${tmdbApiKey}&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&with_genres=${val}&with_watch_monetization_types=flatrate`,
//             {
//                 baseURL:baseUrl
//             }
//         )
//         const datas = data.data.results.map(val => val.id);
//         // for(let x = 0; x < 5; x++) {
//         //     if(datas[x] !== undefined) dita.push(datas[x]);
//         // }
//         dita.push(...datas);
//     }
//     movieIds.push(...dita);
    
//     // for(val in movieIds) {
//     //     console.log(val);
//     //     const data = await axios.get(
//     //         `/movie/${val}?api_key=${tmdbApiKey}&language=en-US`,
//     //         {
//     //             baseURL:baseUrl
//     //         }
//     //     )
//     //     movieData.push(data);
//     // }
//     // console.log(movieData[0].json());
//     fs.writeFileSync("data.json",JSON.stringify(movieIds));
//     // console.log(movieIds);
// }

// get genre

// async function getGenre() {
//     const data = await axios.get(
//         `/genre/movie/list?api_key=${tmdbApiKey}`,
//         {
//             baseURL:baseUrl
//         }
//     )
//     // console.log(data.data.genres);
//     const genre = data.data.genres;
//     fs.writeFileSync("category.json", JSON.stringify(genre,null,2));
//     // return genre;
// }
// getGenre();

// const dataId = require("../data.json");

// async function getMovieData() {
//     let fildData = filterIds = [];
//     // console.log(dataId);
//     for(let s of dataId) {
//         const data = await axios.get(
//             `/movie/${s}?api_key=${tmdbApiKey}&language=en-US`,
//             {
//                 baseURL:baseUrl
//             }
//             )
//             fildData.push(data.data);
//     }
//     // console.log(fildData);
//     const filterMuchData = fildData.map(val => {
//         let rating = 0;
//         if(val.vote_average > 9) {
//             rating = 5
//         } else if(val.vote_average > 7) {
//             rating = 4
//         }else if(val.vote_average > 5) {
//             rating = 3
//         }else if(val.vote_average > 3) {
//             rating = 2
//         } else {rating = 1}
//         return {
//             adult:val.adult,
//             language:val.original_language,
//             title:val.original_title,
//             overview:val.overview,
//             popularity:val.popularity,
//             image:imageUrl+val.poster_path,
//             releaseDate:val.release_date,
//             tagline:val.tagline,
//             rating,
//             ratingQuantity:val.vote_count,
//             genres:val.genres,
//             id:val.id
//         }
//     })
//     const filteragain = filterMuchData.filter(val => (val.releaseDate) && (val.tagline));
//     // console.log(filteragain,filteragain.length);
//     let filterNewIds = filteragain.map(val => val.id);
//     // console.log(filterNewIds);
//     filterIds = [...filterNewIds];
//     for(let x of collectionMovie) {
//         const data = await axios.get(
//             `/collection/${x}?api_key=${tmdbApiKey}&language=en-US`,
//             {
//                 baseURL:baseUrl
//             }
//         )
//         const rest = data.data.parts.map(val => val.id);
//         filterIds.push(...rest);
//     }
//     // fs.writeFileSync("data.json", JSON.stringify(filterIds,null,2));
// }


// async function mappingData() {
//     const fildData = [];

//     for(let s of dataId) {
//         const data = await axios.get(
//             `/movie/${s}?api_key=${tmdbApiKey}&language=en-US`,
//             {
//                 baseURL:baseUrl
//             }
//         )
//             fildData.push(data.data);

//         // console.log(data.data);
//         // fildData.push(data.data);
//         // console.log(fildData);
//     }

//     // console.log(fildData);

//     let finalData = [];
//     for(let val of fildData) {
//         const video = await axios.get(
//             `/movie/${val.id}/videos?api_key=ee16a746baaf2494e1fa1cf69485f135&language=en-US`,
//             {
//                 baseURL:baseUrl
//             }
//         )
//         let videoKey = 0;
//         video.data.results.forEach(val => {
//             if(val.key) {
//                 videoKey = val.key;
//             }
//         });
//         const certf = ["PG","G"];
//         let randomIdx = Math.floor(Math.random()*2);
//         let rating = 0;
//         if(val.vote_average > 9) {
//             rating = 5
//         } else if(val.vote_average > 7) {
//             rating = 4
//         }else if(val.vote_average > 5) {
//             rating = 3
//         }else if(val.vote_average > 3) {
//             rating = 2
//         } else {rating = 1}
//         let newData =  {
//             adult:val.adult,
//             language:val.original_language,
//             title:val.original_title,
//             overview:val.overview,
//             popularity:val.popularity,
//             image:imageUrl+val.poster_path,
//             releaseDate:val.release_date,
//             tagline:val.tagline,
//             rating,
//             ratingQuantity:val.vote_count,
//             genres:val.genres,
//             certification:certf[randomIdx],
//             video:`https://www.youtube.com/watch?v=${videoKey}`
//         }
//         finalData.push(newData);
//     }

//     fs.writeFileSync("./data/movies.json",JSON.stringify(finalData, null, 2));

    // const filterMuchData = fildData.map(val => {
    //     const video = await axios.get(
    //         `/movie/${val.id}/videos?api_key=ee16a746baaf2494e1fa1cf69485f135&language=en-US`,
    //         {
    //             baseURL:baseUrl
    //         }
    //     )
    //     const certf = ["PG","G"];
    //     let randomIdx = Math.floor(Math.random()*2);
    //     let rating = 0;
    //     if(val.vote_average > 9) {
    //         rating = 5
    //     } else if(val.vote_average > 7) {
    //         rating = 4
    //     }else if(val.vote_average > 5) {
    //         rating = 3
    //     }else if(val.vote_average > 3) {
    //         rating = 2
    //     } else {rating = 1}
    //     return {
    //         adult:val.adult,
    //         language:val.original_language,
    //         title:val.original_title,
    //         overview:val.overview,
    //         popularity:val.popularity,
    //         image:imageUrl+val.poster_path,
    //         releaseDate:val.release_date,
    //         tagline:val.tagline,
    //         rating,
    //         ratingQuantity:val.vote_count,
    //         genres:val.genres,
    //         certification:certf[randomIdx]
    //     }
    // })
// }

// getGenre();
// mappingData();
// getMovieData();
// getMovie()



// manipulate video url
const data = require('./movies.json');

async function checks(name) {
    const rest = await axios.get(
        "/search/movie?api_key=ee16a746baaf2494e1fa1cf69485f135&language=en-US&page=1&include_adult=false" ,
        {
            baseURL:baseUrl,
            params: {query: name}
        }
    )
    const data = {id:rest.data.results[0].id,searc:name}
    return data
}

const idsss = require("../ids2.json");

// async function videoUrlGet() {
//     let ids = [];
//     let keys = [];
//     const dataName = data.map(val => val.title);
//     console.log(dataName);
    // for(let y in dataName) {
    //     let id = await checks(y);
    //     // console.log(id);
    //     ids.push(id);
    // }
    // fs.writeFileSync("./ids2.json", JSON.stringify(ids,null,2));
//     for(let x of idsss) {
//         let video = await axios.get(
//             `/movie/${x}/videos?api_key=${tmdbApiKey}&language=en-US`, {
//                 baseURL:baseUrl
//             }
//         )
//         keys.push(video.data.results[0]?.key);
//     }
//     fs.writeFileSync("./keys3.json", JSON.stringify(keys,null,2))
// }

// videoUrlGet();


const movieData = require("./movies.json");
const keysMove = require("../../keys4.json");
// console.log(keysMove);

function attachMovieKey() {
    movieData.map((val,idx) => {
        // https://www.youtube.com/embed/GQrLuW5KWU0
        val.video = `https://www.youtube.com/embed/${keysMove[idx]}`
        return val;
    })
    fs.writeFileSync("./data/movies.json", JSON.stringify(movieData,null,2));
}

attachMovieKey()