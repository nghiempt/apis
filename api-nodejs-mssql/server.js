var  controller = require('./controller');
var  express = require('express');
var  bodyParser = require('body-parser');
var  cors = require('cors');
const res = require('express/lib/response');
var  app = express();
var  router = express.Router();

app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request, response, next) => {
    console.log('middleware');
    next();
  });
   
   
  router.route('/location').get((request, response) => {
    controller.getAll().then((data) => {
      response.json(data[0]);
    })
  })

  router.route('/location/:id').get((request, response) => {
    controller.getLocation(request.params.id).then((data) => {
      response.json(data[0]);
    })
  })
  
  router.route('/location').post((request, response) => {
    let  location = { ...request.body }
    controller.addLocation(location).then(data  => {
      response.status(201).json(data);
    })
  })

var  port = process.env.PORT || 8090;
app.listen(port, () => {
    console.log('Server is runnning at ' + port);
});
