var pg = require('pg');
var express = require('express');
// body parser
var bodyParser = require('body-parser');



var app = express();

// json method
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));


app.set('view engine', 'ejs')
app.set('views', './views')
app.set('port', (process.env.PORT || 5000))

var Database = process.env.DATABASE_URL;

//get the home page on load
app.get('/', function(req,res){
      res.render('home');
})


app.get('/people', function(req,res){
  pg.connect(Database, function(err, client, done){
    client.query(`select * from person`, function(err, result){
      res.render('people', {data: result.rows});
      done();
      pg.end();
    })
  })
})

//adds person to the Database
app.post('/people', function(req,res){
  if(!(req.body.name == '')){
    pg.connect(Database, function(err, client, done){
      client.query(`insert into person(name,city) values('${req.body.name}','${req.body.city}')`, function(err, result){
        res.redirect('/people');
        done();
        pg.end();
      })
    })
  }
  else
    res.redirect('/people');
})

//updates persons record
app.put('/people/:id', function(req,res){
  pg.connect(Database, function(err, client, done){
    var person_id = req.params.id;
    client.query(`update person set city='${req.body.updateCity}' where id='${person_id}'`, function(err, result){
      done();
      pg.end();
    })
  })
})

//gets persons
app.get('/people/:id', function(req,res){
  pg.connect(Database, function(err,client,done){
    var person_id = req.params.id;
    client.query(`select * from person where id = '${person_id}'`, function(err, result){
      res.render('person', {data: result.rows});
      done();
      pg.end();
    })
  })
})


//deletes the person
app.delete('/people/:id', function(req, res){
  pg.connect(Database, function(err,client,done){
    var people_id = req.params.id;
    client.query(`delete from person where id ='${people_id}'`, function(err,result){
      done();
      pg.end();
    })
  })
})


//if page not found return to home page
app.get("*", function(req,res){
  res.redirect('/')
})

app.listen(app.get('port'), function(){
  console.log("Listening on port", app.get('port'));
})
