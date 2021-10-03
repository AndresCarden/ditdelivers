const UserController = require('../controllers/usersController');
const passport = require('passport');


module.exports = (app, upload)=>{
    //TRAER DATOS
    app.get('/api/users/getAll', UserController.getAll);
    app.get('/api/users/findById/:id',passport.authenticate('jwt',{session:false}), UserController.findById);
    app.get('/api/users/findDeliveryMen', passport.authenticate('jwt', {session: false}), UserController.findDeliveryMen);
    app.get('/api/users/getAdminsNotificationTokens', passport.authenticate('jwt', {session: false}), UserController.getAdminsNotificationTokens);

    app.post('/api/users/create', upload.array('image',1),  UserController.registerWithImage);

    app.post('/api/users/login', UserController.login);
    app.post('/api/users/logout', UserController.logout);
//ACTUALIZAR DATOS
    app.put('/api/users/update',passport.authenticate('jwt',{session:false}), upload.array('image',1),  UserController.update)
    app.put('/api/users/updateNotificationToken', UserController.updateNotificationToken)
}