const axios = require("axios");

const getSeries = (page) => {
	const { data } = axios({
		method: "get",
		url: `https://www.episodate.com/api/most-popular?page=${page}`,
	});
    console.log(data)
	console.dir(data.tv_shows, { depth: null });
};

console.log(getSeries(1));
