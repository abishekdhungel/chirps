var path = require ('path'),
rootpath=path.normalize(__dirname +'/..'),
env=process.env.NODE_ENV || 'development';

//Add controller code to load the controllers//

var config={
    development:{
        root:rootpath,
        app:{ name: 'chirps'},
        port: 5000,
        db: 'mongodb://127.0.0.1/chirp-dev',
        secret: "cayennedlikedhistreats",
    },
    production: {
        root: rootpath,
        app: { name: 'chirps' },
        port: 80, },
        db: 'mongodb://127.0.0.1/chirp-test',
        secret: "cayennedlikedhistreats",
test: {
    root: rootpath,
    app: { name: 'chirps' },
    port:5000,
    db: 'mongodb://127.0.0.1/chirp',
    secret: "cayennedlikedhistreats",
    }
};

    module.exports=config[env];
    