var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;    
var router = express.Router(); 
var Cliente = require('./app/models/cliente');
mongoose.connect('mongodb://localhost:27017/prueba');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.use(function (req, res, next) {
    // Dominio que queremos del que queremos permitir el acceso puede ser * para cualquiera
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Verbos HTTP que vamos a permitir
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Cabeceras que vamos a permitir
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Para el uso de sesiones o cookies
    res.setHeader('Access-Control-Allow-Credentials', true);

    next(); // lo enviamos a la ruta, para que no se pare en este mecliente
});

router.route('/clientes')
    .get(function (req, res) {
        Cliente.find(function (err, clientes) {
            if (err) {
                res.send(err);
            }
            res.json(clientes);
        });
       
    })
    .post(function (req, res) {
        var cliente = new Cliente();    

        cliente.nombre = req.body.nombre;
        cliente.telefono = req.body.telefono;
        cliente.direccion = req.body.direccion;
        cliente.estado = req.body.estado;

        cliente.save(function (err,cliente) {
            if (err)
                res.send(err);
            else{
                res.json(cliente);
            }    

         
        });
    });

    router.route('/clientes/:idcliente')
    .get(function (req, res) {
        
    })
    .put(function (req, res) {
        Cliente.findById(req.params.idcliente, function (err, cliente) {

            if (err)
                res.send(err);

                cliente.nombre = req.body.nombre;
                cliente.telefono = req.body.telefono;
                cliente.direccion = req.body.direccion;
                cliente.estado = req.body.estado;

            // save the cliente
            cliente.save(function (err,cliente) {
                if (err)
                res.send(err);
            else{
                res.json(cliente);
            }  
            });

        });
       
    })
    .delete(function (req, res) {
        Cliente.remove({
            _id: req.params.idcliente
        }, function (err, cliente) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });
app.use('/api/v1/', router);    
app.listen(port);
console.log('Magic happens on port ' + port);

