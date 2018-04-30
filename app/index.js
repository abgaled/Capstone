var fs = require('fs');
var path = require('path');


module.exports = app => {
    
    require('./core/boot')(app);
    var modulesDir = 'modules';
    fs.readdir(path.join(__dirname, modulesDir), (err, modules) => {
        if (err) throw err;

        modules.forEach(moduleDir => {
            var routes = require(`./${modulesDir}/${moduleDir}/routes`);
            Object.keys(routes).forEach(route => {
                app.use(`/${route}`, routes[route]);
            });
        });

        if (!process.env.MAIN) {
            console.log(`
                Your .env file should have a MAIN variable like this:
                MAIN=home/index
                ...this maps the application's index route ('http://localhost:3009')
                to home module's routes.js' index method.`);
            throw 'Kindly update your .env configuration file and include a MAIN variable for your main module';
        }
        var mainModule = process.env.MAIN.split('/');
        app.use('/', require(`./modules/${mainModule[0]}/routes`)[mainModule[1]]); 

    
    });
}