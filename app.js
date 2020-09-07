const express =  require('express');
const https =  require('http');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req,res){
  res.sendFile(__dirname+'/index.html');
});

app.post('/',function(req,res){
    
    const query = req.body.cityName;
    console.log('Post Request recieved');



const apiKey = '5*******************29';
const url = 'http://api.weatherapi.com/v1/current.json?key=' + apiKey +  '&q=' + query + '';
https.get(url, function(response){
  //   console.log(response);

    response.on('data',function(data){
        const weatherData = JSON.parse(data);
        const weatherTemp = weatherData.current.temp_c;
      //   console.log(weatherTemp);
        const weatherCondition = weatherData.current.condition.text;
      //   console.log(weatherCondition);
       const weatherIcon = weatherData.current.condition.icon;
       const imgURL = weatherIcon;
       console.log(imgURL);
        res.write('<h1 style = "color:red; ">The Temperatue in ' + query + ' is: ' + weatherTemp + ' Degree Celcius </h1>')
        res.write(' <h2>And The Weather in ' + query + ' is ' + weatherCondition + '</h2>')
        res.write('<img src =' + imgURL + '>');
        res.send();
    })
    
})
    
})







app.listen(3000,function(){
   console.log('Server started on Port 3000');
});