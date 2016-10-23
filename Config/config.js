var path = require ('path')
rootpath=path.normalize(__dirname +'/..'),
env=process.env.NODE_ENV || 'development';

//Add controller code to load the controllers//

var config={
    development:{
        root:rootpath,
        app:{ name: 'chirps'},
        port: 5000,
        db: 'mongodb://127.0.0.1/chirp-dev',
    },
    production: {
        root: rootpath,
        app: { name: 'chirps' },
        port: 80, },
        db: 'mongodb://127.0.0.1/chirp-test',
test: {
    root: rootpath,
    app: { name: 'chirps' },
    port:5000,
    db: 'mongodb://127.0.0.1/chirp',
    }
}

    module.exports=config[env];
    