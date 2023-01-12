const axios = require('axios');

const API_KEY = 'xnd_development_ziHGxNoqn92G00KHUQumMBL9QF43iZoX7vHc3AEYS61u8EOkddhHfxlu0CncfH:';
const API_KEY_64 = "eG5kX2RldmVsb3BtZW50X3ppSEd4Tm9xbjkyRzAwS0hVUXVtTUJMOVFGNDNpWm9YN3ZIYzNBRVlTNjF1OEVPa2RkaEhmeGx1MENuY2ZIOg=="
// Replace this with your own parameters
// const customer = {  
//   email: 'UncleJohn@gmail.com',
//   type:'INDIVIDUAL',
//   reference_id: 'johny_english', // This is the reference_id
//   individual_detail: {
//     given_names: 'johnny',
//     surname:"english"
//   },
// };


// const plans = {
//   reference_id:"testing_9_2002_subs",
//   customer_id:"cust-9c4f9cc8-aa62-489a-a091-26564139089c",
//   recurring_action:"PAYMENT",
//   currency:"IDR",
//   amount:100000,
//   schedule: {
//     reference_id:"weekly_6_subs_type",
//     interval:"WEEK",
//     interval_count:1
//   },
//   success_return_url:"https://www.google.com",
//   failure_return_url:"https://www.yahoo.co.id"
// }

// Send a request to the Create Customer API endpoint
// axios.post('https://api.xendit.co/customers', customer, {
//   auth: {
//     username: API_KEY,
//   },
// })
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.error(error.response.data);
//   });
// axios.post('https://api.xendit.co/recurring/plans', plans, {
//   headers:{Authorization:"Basic " + API_KEY_64}
// })
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.error(error.response.data);
//   });

// get Recurring Object plan


const planId ="repl_60b22006-7ea3-49f2-94e1-b604197747c6"

// axios.get(`https://api.xendit.co/recurring/plans/${planId}`, {
//   headers:{Authorization:"Basic " + API_KEY_64}
// })
//   .then((response) => {
//     console.dir(response.data, {depth:null});
//   })
//   .catch((error) => {
//     console.error(error.response.data);
//   });


// get cycle list from recuuring ID

// axios.get(`https://api.xendit.co/recurring/plans/${planId}/cycles`, {
//   headers:{Authorization:"Basic " + API_KEY_64}
// })
//   .then((response) => {
//     console.dir(response.data, {depth:null});
//   })
//   .catch((error) => {
//     console.error(error.response.data);
//   });


  // deactivate recurring payment

// axios.post(`https://api.xendit.co/recurring/plans/${planId}/deactivate`, {},{
//   headers:{Authorization:"Basic " + API_KEY_64}
// })
//   .then((response) => {
//     console.dir(response.data, {depth:null});
//   })
//   .catch((error) => {
//     console.error(error.response.data);
//   });

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.log(`MongoDB connection error: ${error}`);
});

db.once('open', () => {
  console.log('Successfully connected to MongoDB');
});