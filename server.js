const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const passport = require('passport');
const io = require('socket.io')(server);
const mercadopago = require('mercadopago');



//MERCADO PAGO CONFIGURACION
mercadopago.configure({
    access_token: 'TEST-6883134940383661-092720-8d89b13c6150a06945844cc45a755175-518627501'
});


//sockets 
const orderDeliverySocket = require('./sockets/orders_delivery_socket');


//inicializar firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const upload = multer({
    storage: multer.memoryStorage()
})

/*RUTAS*/
const users = require('./routes/usersRoutes');
const categories = require('./routes/categoryRouter');
const products = require('./routes/productsRoutes');
const address = require('./routes/addressRoutes');
const orders = require('./routes/ordersRoutes');
const mercadoPagoRoutes = require('./routes/mercadoPagoRoutes');


const port =  process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.disable('x-powered-by');

app.set('port',port);

//LLAMAR A LOS SOCKETS
orderDeliverySocket(io);

//LLAMANDO A LAS RUTAS
users(app,upload);
categories(app);
address(app);
orders(app);
products(app,upload);
mercadoPagoRoutes(app);

server.listen(3000, function(){
    console.log('Aplicacion de NodeJS ' + port +' Iniciada...')
});

//ERROR HANDLER
app.use((err,req,res,next)=>{
    console.log(err);
    res.status(err.status ||500).send(err.stack);
});

module.exports = {
    app:app,
    server:server
}



// 200 es una respuesta exitosa
// 404 significa que la url no existe
// 500 error interno del servidor
