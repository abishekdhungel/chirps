define('app',['exports', 'aurelia-framework', 'aurelia-auth'], function (exports, _aureliaFramework, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_aureliaAuth.FetchConfig), _dec(_class = function () {
    function App(fetchConfig) {
      _classCallCheck(this, App);

      this.fetchConfig = fetchConfig;
    }

    App.prototype.activate = function activate() {
      this.fetchConfig.configure();
    };

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.addPipelineStep('authorize', _aureliaAuth.AuthorizeStep);
      config.title = 'Chirps';
      config.map([{ route: ['', 'home'], moduleId: './modules/home', name: 'Home' }, { route: 'wall', moduleId: './modules/wall', name: 'Wall', auth: true }]);
    };

    return App;
  }()) || _class);
});
define('auth-config',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var authConfig = {
    baseUrl: "http://localhost:5000/api",
    loginUrl: '/users/login',
    tokenName: 'token',
    authHeader: 'Authorization',
    authToken: '',
    logoutRedirect: '#/home'
  };

  exports.default = authConfig;
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment', './auth-config', 'regenerator-runtime'], function (exports, _environment, _authConfig, _regeneratorRuntime) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  var _authConfig2 = _interopRequireDefault(_authConfig);

  var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  window.regeneratorRuntime = _regeneratorRuntime2.default;

  Promise.config({
    longStackTraces: _environment2.default.debug,
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().plugin('aurelia-auth', function (baseConfig) {
      baseConfig.configure(_authConfig2.default);
    }).feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('modules/home',['exports', 'aurelia-framework', 'aurelia-router', 'aurelia-auth', '../resources/data/users'], function (exports, _aureliaFramework, _aureliaRouter, _aureliaAuth, _users) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _aureliaAuth.AuthService, _users.Users), _dec(_class = function () {
    function Home(router, auth, users) {
      _classCallCheck(this, Home);

      this.router = router;
      this.auth = auth;
      this.users = users;
      this.message = 'Chirps';
      this.showLogon = true;
    }

    Home.prototype.login = function login() {
      var _this = this;

      return this.auth.login(this.email, this.password).then(function (response) {
        sessionStorage.setItem("user", JSON.stringify(response.user));
        _this.loginError = "";
        _this.router.navigate('wall');
      }).catch(function (error) {
        console.log(error);
        _this.loginError = "Invalid credentials.";
      });
    };

    Home.prototype.save = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var user, serverResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                user = {
                  fname: this.firstName,
                  lname: this.lastName,
                  email: this.email,
                  screenName: this.screenName,
                  Password: this.password
                };
                _context.next = 3;
                return this.users.save(user);

              case 3:
                serverResponse = _context.sent;

                if (!serverResponse.error) {
                  this.registerError = "";
                  this.showLogon = true;
                } else {
                  this.registerError = "There was a problem registering the user.";
                }

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save() {
        return _ref.apply(this, arguments);
      }

      return save;
    }();

    Home.prototype.showRegister = function showRegister() {
      this.showLogon = !this.showLogon;
    };

    return Home;
  }()) || _class);
});
define('modules/wall',['exports', 'aurelia-framework', 'aurelia-router', 'aurelia-auth', '../resources/data/chirps', '../resources/data/users'], function (exports, _aureliaFramework, _aureliaRouter, _aureliaAuth, _chirps, _users) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Wall = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Wall = exports.Wall = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _aureliaAuth.AuthService, _chirps.Chirps, _users.Users), _dec(_class = function () {
    function Wall(router, auth, chirps, users) {
      _classCallCheck(this, Wall);

      this.router = router;
      this.auth = auth;
      this.chirps = chirps;
      this.message = 'Chirps';
      this.users = users;
      this.newChirp;
    }

    Wall.prototype.activate = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.user = JSON.parse(sessionStorage.getItem('user'));
                this.users.setUser(this.user);
                _context.next = 4;
                return this.chirps.getUsersChirps(this.user._id);

              case 4:
                serverResponse = _context.sent;

                if (serverResponse.error) {
                  this.wallMessage = "Error retrieving chirps";
                }

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function activate() {
        return _ref.apply(this, arguments);
      }

      return activate;
    }();

    Wall.prototype.like = function like(index) {
      this.chirps.like(this.chirps.chirpArray[index]._id);
      this.chirps.chirpArray[index].likes++;
    };

    Wall.prototype.reChirp = function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(chirp) {
        var newChirp, serverResponse;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                newChirp = {
                  chirp: chirp.chirp,
                  reChirp: true,
                  chirpAuthor: this.user._id
                };
                _context2.next = 3;
                return this.chirps.saveChirp(newChirp);

              case 3:
                serverResponse = _context2.sent;

                if (serverResponse && !serverResponse.error) {
                  this.saveStatus = "";
                  this.chirps.chirpArray[0].chirpAuthor = new Object();
                  this.chirps.chirpArray[0].chirpAuthor = { email: this.user.email };
                } else {
                  this.saveStatus = "Error saving chirp";
                }

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function reChirp(_x) {
        return _ref2.apply(this, arguments);
      }

      return reChirp;
    }();

    Wall.prototype.chirp = function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        var chirp, serverResponse;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.newChirp) {
                  _context3.next = 6;
                  break;
                }

                chirp = {
                  chirp: this.newChirp,
                  user: this.user._id,
                  chirpAuthor: this.user._id
                };
                _context3.next = 4;
                return this.chirps.saveChirp(chirp);

              case 4:
                serverResponse = _context3.sent;

                if (serverResponse && !serverResponse.error) {
                  this.newChirp = "";
                  this.saveStatus = "";
                  this.chirps.chirpArray[0].chirpAuthor = new Object();
                  this.chirps.chirpArray[0].chirpAuthor = { email: this.user.email };
                } else {
                  this.saveStatus = "Error saving chirp";
                }

              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function chirp() {
        return _ref3.apply(this, arguments);
      }

      return chirp;
    }();

    Wall.prototype.findUser = function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        var serverResponse, response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.users.getPersonScreenName(this.searchScreenName);

              case 2:
                serverResponse = _context4.sent;

                this.notMe = true;

                if (!(serverResponse && !serverResponse.error)) {
                  _context4.next = 9;
                  break;
                }

                _context4.next = 7;
                return this.chirps.getUsersChirps(serverResponse._id);

              case 7:
                response = _context4.sent;

                if (response.error) {
                  this.wallMessage = "Error retrieving chirps";
                }

              case 9:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function findUser() {
        return _ref4.apply(this, arguments);
      }

      return findUser;
    }();

    Wall.prototype.follow = function () {
      var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.users.followUser(this.user._id, this.users.selectedUser._id);

              case 2:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function follow() {
        return _ref5.apply(this, arguments);
      }

      return follow;
    }();

    Wall.prototype.home = function () {
      var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this.notMe = false;
                _context6.next = 3;
                return this.chirps.getUsersChirps(this.user._id);

              case 3:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function home() {
        return _ref6.apply(this, arguments);
      }

      return home;
    }();

    Wall.prototype.logout = function logout() {
      sessionStorage.removeItem('user');
      this.auth.logout();
    };

    return Wall;
  }()) || _class);
});
define('resources/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources(['./value-converters/date-format']);

    config.globalResources(['./value-converters/gravatar-url']);
  }
});
define('resources/data/chirps',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Chirps = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Chirps = exports.Chirps = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
        function Chirps(data) {
            _classCallCheck(this, Chirps);

            this.data = data;
            this.chirpsArray = undefined;
        }

        Chirps.prototype.getUsersChirps = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(id) {
                var url, serverResponse;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                url = this.data.USER_SERVICE + '/followedChirps/' + id;
                                _context.prev = 1;
                                _context.next = 4;
                                return this.data.get(url);

                            case 4:
                                serverResponse = _context.sent;

                                if (!serverResponse.error) {
                                    this.chirpArray = serverResponse;
                                }
                                return _context.abrupt('return', serverResponse);

                            case 9:
                                _context.prev = 9;
                                _context.t0 = _context['catch'](1);

                                console.log(_context.t0);
                                return _context.abrupt('return', undefined);

                            case 13:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[1, 9]]);
            }));

            function getUsersChirps(_x) {
                return _ref.apply(this, arguments);
            }

            return getUsersChirps;
        }();

        Chirps.prototype.saveChirp = function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(chirp) {
                var serverResponse;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;
                                _context2.next = 3;
                                return this.data.post(chirp, this.data.CHIRP_SERVICE);

                            case 3:
                                serverResponse = _context2.sent;

                                if (!serverResponse.error) {
                                    this.chirpArray.unshift(serverResponse);
                                }
                                return _context2.abrupt('return', serverResponse);

                            case 8:
                                _context2.prev = 8;
                                _context2.t0 = _context2['catch'](0);

                                console.log(_context2.t0);
                                return _context2.abrupt('return', undefined);

                            case 12:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[0, 8]]);
            }));

            function saveChirp(_x2) {
                return _ref2.apply(this, arguments);
            }

            return saveChirp;
        }();

        Chirps.prototype.like = function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(id) {
                var chirp, serverResponse;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                chirp = {};
                                _context3.prev = 1;
                                _context3.next = 4;
                                return this.data.put(chirp, this.data.CHIRP_SERVICE + '/like/' + id);

                            case 4:
                                serverResponse = _context3.sent;
                                return _context3.abrupt('return', serverResponse);

                            case 8:
                                _context3.prev = 8;
                                _context3.t0 = _context3['catch'](1);

                                console.log(_context3.t0);
                                return _context3.abrupt('return', undefined);

                            case 12:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[1, 8]]);
            }));

            function like(_x3) {
                return _ref3.apply(this, arguments);
            }

            return like;
        }();

        return Chirps;
    }()) || _class);
});
define('resources/data/data-services',['exports', 'aurelia-framework', 'aurelia-http-client'], function (exports, _aureliaFramework, _aureliaHttpClient) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.DataServices = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var DataServices = exports.DataServices = (_dec = (0, _aureliaFramework.inject)(_aureliaHttpClient.HttpClient), _dec(_class = function () {
		function DataServices(http) {
			var _this = this;

			_classCallCheck(this, DataServices);

			this.BASE_URL = "http://localhost:5000/api";
			this.USER_SERVICE = '/users';
			this.CHIRP_SERVICE = '/chirps';

			this.http = http;
			this.http.configure(function (x) {
				x.withBaseUrl(_this.BASE_URL);
			});
		}

		DataServices.prototype.get = function get(url) {
			return this.http.createRequest(url).asGet().withHeader('Authorization', localStorage.getItem('aurelia_token')).send().then(function (response) {
				if (!response.isSuccess) {
					return response;
				} else {
					return JSON.parse(response.response);
				}
			}).catch(function (e) {
				console.log(e);
				return { error: true, code: e.statusCode, message: e.statusText };
			});
		};

		DataServices.prototype.put = function put(content, url) {
			return this.http.createRequest(url).asPut().withHeader('Authorization', localStorage.getItem('aurelia_token')).withContent(content).send().then(function (response) {
				if (!response.isSuccess) {
					return response;
				} else {
					return JSON.parse(response.response);
				}
			}).catch(function (e) {
				console.log(e);
				return { error: true, code: e.statusCode, message: e.statusText };
			});
		};

		DataServices.prototype.post = function post(content, url) {
			return this.http.createRequest(url).asPost().withHeader('Authorization', localStorage.getItem('aurelia_token')).withContent(content).send().then(function (response) {
				if (!response.isSuccess) {
					return response;
				} else {
					return JSON.parse(response.response);
				}
			}).catch(function (e) {
				console.log(e);
				return { error: true, code: e.statusCode, message: e.statusText };
			});
		};

		DataServices.prototype.delete = function _delete(url) {
			return this.http.createRequest(url).asDelete().withHeader('Authorization', localStorage.getItem('aurelia_token')).send().then(function (response) {
				if (!response.isSuccess) {
					return response;
				} else {
					return JSON.parse(response.response);
				}
			}).catch(function (e) {
				console.log(e);
				return { error: true, code: e.statusCode, message: e.statusText };
			});
		};

		return DataServices;
	}()) || _class);
});
define('resources/data/users',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Users = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Users = exports.Users = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
        function Users(data) {
            _classCallCheck(this, Users);

            this.data = data;
        }

        Users.prototype.setUser = function setUser(user) {
            this.selectedUser = user;
        };

        Users.prototype.getPersonScreenName = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(name) {
                var serverResponse;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!name) {
                                    _context.next = 12;
                                    break;
                                }

                                _context.prev = 1;
                                _context.next = 4;
                                return this.data.get(this.data.USER_SERVICE + "/screenName/" + name);

                            case 4:
                                serverResponse = _context.sent;
                                return _context.abrupt('return', serverResponse);

                            case 8:
                                _context.prev = 8;
                                _context.t0 = _context['catch'](1);

                                console.log(_context.t0);
                                return _context.abrupt('return', undefined);

                            case 12:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[1, 8]]);
            }));

            function getPersonScreenName(_x) {
                return _ref.apply(this, arguments);
            }

            return getPersonScreenName;
        }();

        Users.prototype.save = function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(user) {
                var serverResponse;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!user) {
                                    _context2.next = 12;
                                    break;
                                }

                                _context2.prev = 1;
                                _context2.next = 4;
                                return this.data.post(user, this.data.USER_SERVICE);

                            case 4:
                                serverResponse = _context2.sent;
                                return _context2.abrupt('return', serverResponse);

                            case 8:
                                _context2.prev = 8;
                                _context2.t0 = _context2['catch'](1);

                                console.log(_context2.t0);
                                return _context2.abrupt('return', undefined);

                            case 12:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[1, 8]]);
            }));

            function save(_x2) {
                return _ref2.apply(this, arguments);
            }

            return save;
        }();

        Users.prototype.followUser = function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(userId, followId) {
                var obj, serverResponse;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (!(userId && followId)) {
                                    _context3.next = 13;
                                    break;
                                }

                                obj = { _id: followId };
                                _context3.prev = 2;
                                _context3.next = 5;
                                return this.data.put(obj, this.data.USER_SERVICE + '/follow/' + userId);

                            case 5:
                                serverResponse = _context3.sent;
                                return _context3.abrupt('return', serverResponse);

                            case 9:
                                _context3.prev = 9;
                                _context3.t0 = _context3['catch'](2);

                                console.log(_context3.t0);
                                return _context3.abrupt('return', undefined);

                            case 13:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[2, 9]]);
            }));

            function followUser(_x3, _x4) {
                return _ref3.apply(this, arguments);
            }

            return followUser;
        }();

        return Users;
    }()) || _class);
});
define('resources/value-converters/date-format',['exports', 'moment'], function (exports, _moment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DateFormatValueConverter = undefined;

  var _moment2 = _interopRequireDefault(_moment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var DateFormatValueConverter = exports.DateFormatValueConverter = function () {
    function DateFormatValueConverter() {
      _classCallCheck(this, DateFormatValueConverter);
    }

    DateFormatValueConverter.prototype.toView = function toView(value) {
      if (value === undefined || value === null) {
        return;
      }

      return (0, _moment2.default)(value).calendar();
    };

    return DateFormatValueConverter;
  }();
});
define('resources/value-converters/gravatar-url',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var GravatarUrlValueConverter = exports.GravatarUrlValueConverter = function () {
    function GravatarUrlValueConverter() {
      _classCallCheck(this, GravatarUrlValueConverter);
    }

    GravatarUrlValueConverter.prototype.toView = function toView(email, size) {
      if (email !== undefined) {
        var size = size || 80;
        var html = '<img class="img-circle" src="https://secure.gravatar.com/avatar/' + CryptoJS.MD5(email.toLowerCase()) + '.jpg?s=' + size + '"/>';
        return html;
      } else {
        return "<span class='glyphicon glyphicon-user'></span>";
      }
    };

    return GravatarUrlValueConverter;
  }();
});
define('aurelia-auth/auth-service',['exports', 'aurelia-dependency-injection', 'aurelia-fetch-client', 'aurelia-event-aggregator', './authentication', './base-config', './oAuth1', './oAuth2', './auth-utilities'], function (exports, _aureliaDependencyInjection, _aureliaFetchClient, _aureliaEventAggregator, _authentication, _baseConfig, _oAuth, _oAuth2, _authUtilities) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AuthService = undefined;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var AuthService = exports.AuthService = (_dec = (0, _aureliaDependencyInjection.inject)(_aureliaFetchClient.HttpClient, _authentication.Authentication, _oAuth.OAuth1, _oAuth2.OAuth2, _baseConfig.BaseConfig, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function AuthService(http, auth, oAuth1, oAuth2, config, eventAggregator) {
      _classCallCheck(this, AuthService);

      this.http = http;
      this.auth = auth;
      this.oAuth1 = oAuth1;
      this.oAuth2 = oAuth2;
      this.config = config.current;
      this.tokenInterceptor = auth.tokenInterceptor;
      this.eventAggregator = eventAggregator;
    }

    AuthService.prototype.getMe = function getMe() {
      var profileUrl = this.auth.getProfileUrl();
      return this.http.fetch(profileUrl).then(_authUtilities.status);
    };

    AuthService.prototype.isAuthenticated = function isAuthenticated() {
      return this.auth.isAuthenticated();
    };

    AuthService.prototype.getTokenPayload = function getTokenPayload() {
      return this.auth.getPayload();
    };

    AuthService.prototype.setToken = function setToken(token) {
      this.auth.setToken(Object.defineProperty({}, this.config.tokenName, { value: token }));
    };

    AuthService.prototype.signup = function signup(displayName, email, password) {
      var _this = this;

      var signupUrl = this.auth.getSignupUrl();
      var content = void 0;
      if (_typeof(arguments[0]) === 'object') {
        content = arguments[0];
      } else {
        content = {
          'displayName': displayName,
          'email': email,
          'password': password
        };
      }

      return this.http.fetch(signupUrl, {
        method: 'post',
        body: (0, _aureliaFetchClient.json)(content)
      }).then(_authUtilities.status).then(function (response) {
        if (_this.config.loginOnSignup) {
          _this.auth.setToken(response);
        } else if (_this.config.signupRedirect) {
          window.location.href = _this.config.signupRedirect;
        }
        _this.eventAggregator.publish('auth:signup', response);
        return response;
      });
    };

    AuthService.prototype.login = function login(email, password) {
      var _this2 = this;

      var loginUrl = this.auth.getLoginUrl();
      var content = void 0;
      if (typeof arguments[1] !== 'string') {
        content = arguments[0];
      } else {
        content = {
          'email': email,
          'password': password
        };
      }

      return this.http.fetch(loginUrl, {
        method: 'post',
        headers: typeof content === 'string' ? { 'Content-Type': 'application/x-www-form-urlencoded' } : {},
        body: typeof content === 'string' ? content : (0, _aureliaFetchClient.json)(content)
      }).then(_authUtilities.status).then(function (response) {
        _this2.auth.setToken(response);
        _this2.eventAggregator.publish('auth:login', response);
        return response;
      });
    };

    AuthService.prototype.logout = function logout(redirectUri) {
      var _this3 = this;

      return this.auth.logout(redirectUri).then(function () {
        _this3.eventAggregator.publish('auth:logout');
      });
    };

    AuthService.prototype.authenticate = function authenticate(name, redirect, userData) {
      var _this4 = this;

      var provider = this.oAuth2;
      if (this.config.providers[name].type === '1.0') {
        provider = this.oAuth1;
      }

      return provider.open(this.config.providers[name], userData || {}).then(function (response) {
        _this4.auth.setToken(response, redirect);
        _this4.eventAggregator.publish('auth:authenticate', response);
        return response;
      });
    };

    AuthService.prototype.unlink = function unlink(provider) {
      var _this5 = this;

      var unlinkUrl = this.config.baseUrl ? (0, _authUtilities.joinUrl)(this.config.baseUrl, this.config.unlinkUrl) : this.config.unlinkUrl;

      if (this.config.unlinkMethod === 'get') {
        return this.http.fetch(unlinkUrl + provider).then(_authUtilities.status).then(function (response) {
          _this5.eventAggregator.publish('auth:unlink', response);
          return response;
        });
      } else if (this.config.unlinkMethod === 'post') {
        return this.http.fetch(unlinkUrl, {
          method: 'post',
          body: (0, _aureliaFetchClient.json)(provider)
        }).then(_authUtilities.status).then(function (response) {
          _this5.eventAggregator.publish('auth:unlink', response);
          return response;
        });
      }
    };

    return AuthService;
  }()) || _class);
});
define('aurelia-auth/authentication',['exports', 'aurelia-dependency-injection', './base-config', './storage', './auth-utilities'], function (exports, _aureliaDependencyInjection, _baseConfig, _storage, _authUtilities) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Authentication = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _dec, _class;

  var Authentication = exports.Authentication = (_dec = (0, _aureliaDependencyInjection.inject)(_storage.Storage, _baseConfig.BaseConfig), _dec(_class = function () {
    function Authentication(storage, config) {
      _classCallCheck(this, Authentication);

      this.storage = storage;
      this.config = config.current;
      this.tokenName = this.config.tokenPrefix ? this.config.tokenPrefix + '_' + this.config.tokenName : this.config.tokenName;
      this.idTokenName = this.config.tokenPrefix ? this.config.tokenPrefix + '_' + this.config.idTokenName : this.config.idTokenName;
    }

    Authentication.prototype.getLoginRoute = function getLoginRoute() {
      return this.config.loginRoute;
    };

    Authentication.prototype.getLoginRedirect = function getLoginRedirect() {
      return this.initialUrl || this.config.loginRedirect;
    };

    Authentication.prototype.getLoginUrl = function getLoginUrl() {
      return this.config.baseUrl ? (0, _authUtilities.joinUrl)(this.config.baseUrl, this.config.loginUrl) : this.config.loginUrl;
    };

    Authentication.prototype.getSignupUrl = function getSignupUrl() {
      return this.config.baseUrl ? (0, _authUtilities.joinUrl)(this.config.baseUrl, this.config.signupUrl) : this.config.signupUrl;
    };

    Authentication.prototype.getProfileUrl = function getProfileUrl() {
      return this.config.baseUrl ? (0, _authUtilities.joinUrl)(this.config.baseUrl, this.config.profileUrl) : this.config.profileUrl;
    };

    Authentication.prototype.getToken = function getToken() {
      return this.storage.get(this.tokenName);
    };

    Authentication.prototype.getPayload = function getPayload() {
      var token = this.storage.get(this.tokenName);
      return this.decomposeToken(token);
    };

    Authentication.prototype.decomposeToken = function decomposeToken(token) {
      if (token && token.split('.').length === 3) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

        try {
          return JSON.parse(decodeURIComponent(escape(window.atob(base64))));
        } catch (error) {
          return null;
        }
      }
    };

    Authentication.prototype.setInitialUrl = function setInitialUrl(url) {
      this.initialUrl = url;
    };

    Authentication.prototype.setToken = function setToken(response, redirect) {
      var accessToken = response && response[this.config.responseTokenProp];
      var tokenToStore = void 0;

      if (accessToken) {
        if ((0, _authUtilities.isObject)(accessToken) && (0, _authUtilities.isObject)(accessToken.data)) {
          response = accessToken;
        } else if ((0, _authUtilities.isString)(accessToken)) {
          tokenToStore = accessToken;
        }
      }

      if (!tokenToStore && response) {
        tokenToStore = this.config.tokenRoot && response[this.config.tokenRoot] ? response[this.config.tokenRoot][this.config.tokenName] : response[this.config.tokenName];
      }

      if (tokenToStore) {
        this.storage.set(this.tokenName, tokenToStore);
      }

      var idToken = response && response[this.config.responseIdTokenProp];

      if (idToken) {
        this.storage.set(this.idTokenName, idToken);
      }

      if (this.config.loginRedirect && !redirect) {
        window.location.href = this.getLoginRedirect();
      } else if (redirect && (0, _authUtilities.isString)(redirect)) {
        window.location.href = window.encodeURI(redirect);
      }
    };

    Authentication.prototype.removeToken = function removeToken() {
      this.storage.remove(this.tokenName);
    };

    Authentication.prototype.isAuthenticated = function isAuthenticated() {
      var token = this.storage.get(this.tokenName);

      if (!token) {
        return false;
      }

      if (token.split('.').length !== 3) {
        return true;
      }

      var exp = void 0;
      try {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        exp = JSON.parse(window.atob(base64)).exp;
      } catch (error) {
        return false;
      }

      if (exp) {
        return Math.round(new Date().getTime() / 1000) <= exp;
      }

      return true;
    };

    Authentication.prototype.logout = function logout(redirect) {
      var _this = this;

      return new Promise(function (resolve) {
        _this.storage.remove(_this.tokenName);

        if (_this.config.logoutRedirect && !redirect) {
          window.location.href = _this.config.logoutRedirect;
        } else if ((0, _authUtilities.isString)(redirect)) {
          window.location.href = redirect;
        }

        resolve();
      });
    };

    _createClass(Authentication, [{
      key: 'tokenInterceptor',
      get: function get() {
        var config = this.config;
        var storage = this.storage;
        var auth = this;
        return {
          request: function request(_request) {
            if (auth.isAuthenticated() && config.httpInterceptor) {
              var tokenName = config.tokenPrefix ? config.tokenPrefix + '_' + config.tokenName : config.tokenName;
              var token = storage.get(tokenName);

              if (config.authHeader && config.authToken) {
                token = config.authToken + ' ' + token;
              }

              _request.headers.set(config.authHeader, token);
            }
            return _request;
          }
        };
      }
    }]);

    return Authentication;
  }()) || _class);
});
define('aurelia-auth/base-config',['exports', './auth-utilities'], function (exports, _authUtilities) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BaseConfig = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var BaseConfig = exports.BaseConfig = function () {
    BaseConfig.prototype.configure = function configure(incomingConfig) {
      (0, _authUtilities.merge)(this._current, incomingConfig);
    };

    _createClass(BaseConfig, [{
      key: 'current',
      get: function get() {
        return this._current;
      }
    }]);

    function BaseConfig() {
      _classCallCheck(this, BaseConfig);

      this._current = {
        httpInterceptor: true,
        loginOnSignup: true,
        baseUrl: '/',
        loginRedirect: '#/',
        logoutRedirect: '#/',
        signupRedirect: '#/login',
        loginUrl: '/auth/login',
        signupUrl: '/auth/signup',
        profileUrl: '/auth/me',
        loginRoute: '/login',
        signupRoute: '/signup',
        tokenRoot: false,
        tokenName: 'token',
        idTokenName: 'id_token',
        tokenPrefix: 'aurelia',
        responseTokenProp: 'access_token',
        responseIdTokenProp: 'id_token',
        unlinkUrl: '/auth/unlink/',
        unlinkMethod: 'get',
        authHeader: 'Authorization',
        authToken: 'Bearer',
        withCredentials: true,
        platform: 'browser',
        storage: 'localStorage',
        providers: {
          identSrv: {
            name: 'identSrv',
            url: '/auth/identSrv',

            redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
            scope: ['profile', 'openid'],
            responseType: 'code',
            scopePrefix: '',
            scopeDelimiter: ' ',
            requiredUrlParams: ['scope', 'nonce'],
            optionalUrlParams: ['display', 'state'],
            state: function state() {
              var rand = Math.random().toString(36).substr(2);
              return encodeURIComponent(rand);
            },
            display: 'popup',
            type: '2.0',
            clientId: 'jsClient',
            nonce: function nonce() {
              var val = ((Date.now() + Math.random()) * Math.random()).toString().replace('.', '');
              return encodeURIComponent(val);
            },
            popupOptions: { width: 452, height: 633 }
          },
          google: {
            name: 'google',
            url: '/auth/google',
            authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
            redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
            scope: ['profile', 'email'],
            scopePrefix: 'openid',
            scopeDelimiter: ' ',
            requiredUrlParams: ['scope'],
            optionalUrlParams: ['display', 'state'],
            display: 'popup',
            type: '2.0',
            state: function state() {
              var rand = Math.random().toString(36).substr(2);
              return encodeURIComponent(rand);
            },
            popupOptions: {
              width: 452,
              height: 633
            }
          },
          facebook: {
            name: 'facebook',
            url: '/auth/facebook',
            authorizationEndpoint: 'https://www.facebook.com/v2.3/dialog/oauth',
            redirectUri: window.location.origin + '/' || window.location.protocol + '//' + window.location.host + '/',
            scope: ['email'],
            scopeDelimiter: ',',
            nonce: function nonce() {
              return Math.random();
            },
            requiredUrlParams: ['nonce', 'display', 'scope'],
            display: 'popup',
            type: '2.0',
            popupOptions: {
              width: 580,
              height: 400
            }
          },
          linkedin: {
            name: 'linkedin',
            url: '/auth/linkedin',
            authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
            redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
            requiredUrlParams: ['state'],
            scope: ['r_emailaddress'],
            scopeDelimiter: ' ',
            state: 'STATE',
            type: '2.0',
            popupOptions: {
              width: 527,
              height: 582
            }
          },
          github: {
            name: 'github',
            url: '/auth/github',
            authorizationEndpoint: 'https://github.com/login/oauth/authorize',
            redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
            optionalUrlParams: ['scope'],
            scope: ['user:email'],
            scopeDelimiter: ' ',
            type: '2.0',
            popupOptions: {
              width: 1020,
              height: 618
            }
          },
          yahoo: {
            name: 'yahoo',
            url: '/auth/yahoo',
            authorizationEndpoint: 'https://api.login.yahoo.com/oauth2/request_auth',
            redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
            scope: [],
            scopeDelimiter: ',',
            type: '2.0',
            popupOptions: {
              width: 559,
              height: 519
            }
          },
          twitter: {
            name: 'twitter',
            url: '/auth/twitter',
            authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
            type: '1.0',
            popupOptions: {
              width: 495,
              height: 645
            }
          },
          live: {
            name: 'live',
            url: '/auth/live',
            authorizationEndpoint: 'https://login.live.com/oauth20_authorize.srf',
            redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
            scope: ['wl.emails'],
            scopeDelimiter: ' ',
            requiredUrlParams: ['display', 'scope'],
            display: 'popup',
            type: '2.0',
            popupOptions: {
              width: 500,
              height: 560
            }
          },
          instagram: {
            name: 'instagram',
            url: '/auth/instagram',
            authorizationEndpoint: 'https://api.instagram.com/oauth/authorize',
            redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
            requiredUrlParams: ['scope'],
            scope: ['basic'],
            scopeDelimiter: '+',
            display: 'popup',
            type: '2.0',
            popupOptions: {
              width: 550,
              height: 369
            }
          }
        }
      };
    }

    return BaseConfig;
  }();
});
define('aurelia-auth/auth-utilities',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.status = status;
  exports.isDefined = isDefined;
  exports.camelCase = camelCase;
  exports.parseQueryString = parseQueryString;
  exports.isString = isString;
  exports.isObject = isObject;
  exports.isFunction = isFunction;
  exports.joinUrl = joinUrl;
  exports.isBlankObject = isBlankObject;
  exports.isArrayLike = isArrayLike;
  exports.isWindow = isWindow;
  exports.extend = extend;
  exports.merge = merge;
  exports.forEach = forEach;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var slice = [].slice;

  function setHashKey(obj, h) {
    if (h) {
      obj.$$hashKey = h;
    } else {
      delete obj.$$hashKey;
    }
  }

  function baseExtend(dst, objs, deep) {
    var h = dst.$$hashKey;

    for (var i = 0, ii = objs.length; i < ii; ++i) {
      var obj = objs[i];
      if (!isObject(obj) && !isFunction(obj)) continue;
      var keys = Object.keys(obj);
      for (var j = 0, jj = keys.length; j < jj; j++) {
        var key = keys[j];
        var src = obj[key];

        if (deep && isObject(src)) {
          if (!isObject(dst[key])) dst[key] = Array.isArray(src) ? [] : {};
          baseExtend(dst[key], [src], true);
        } else {
          dst[key] = src;
        }
      }
    }

    setHashKey(dst, h);
    return dst;
  }

  function status(response) {
    if (response.status >= 200 && response.status < 400) {
      return response.json().catch(function (error) {
        return null;
      });
    }

    throw response;
  }

  function isDefined(value) {
    return typeof value !== 'undefined';
  }

  function camelCase(name) {
    return name.replace(/([\:\-\_]+(.))/g, function (_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter;
    });
  }

  function parseQueryString(keyValue) {
    var key = void 0;
    var value = void 0;
    var obj = {};

    forEach((keyValue || '').split('&'), function (kv) {
      if (kv) {
        value = kv.split('=');
        key = decodeURIComponent(value[0]);
        obj[key] = isDefined(value[1]) ? decodeURIComponent(value[1]) : true;
      }
    });

    return obj;
  }

  function isString(value) {
    return typeof value === 'string';
  }

  function isObject(value) {
    return value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
  }

  function isFunction(value) {
    return typeof value === 'function';
  }

  function joinUrl(baseUrl, url) {
    if (/^(?:[a-z]+:)?\/\//i.test(url)) {
      return url;
    }

    var joined = [baseUrl, url].join('/');
    var normalize = function normalize(str) {
      return str.replace(/[\/]+/g, '/').replace(/\/\?/g, '?').replace(/\/\#/g, '#').replace(/\:\//g, '://');
    };

    return normalize(joined);
  }

  function isBlankObject(value) {
    return value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && !Object.getPrototypeOf(value);
  }

  function isArrayLike(obj) {
    if (obj === null || isWindow(obj)) {
      return false;
    }
  }

  function isWindow(obj) {
    return obj && obj.window === obj;
  }

  function extend(dst) {
    return baseExtend(dst, slice.call(arguments, 1), false);
  }

  function merge(dst) {
    return baseExtend(dst, slice.call(arguments, 1), true);
  }

  function forEach(obj, iterator, context) {
    var key = void 0;
    var length = void 0;
    if (obj) {
      if (isFunction(obj)) {
        for (key in obj) {
          if (key !== 'prototype' && key !== 'length' && key !== 'name' && (!obj.hasOwnProperty || obj.hasOwnProperty(key))) {
            iterator.call(context, obj[key], key, obj);
          }
        }
      } else if (Array.isArray(obj) || isArrayLike(obj)) {
        var isPrimitive = (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object';
        for (key = 0, length = obj.length; key < length; key++) {
          if (isPrimitive || key in obj) {
            iterator.call(context, obj[key], key, obj);
          }
        }
      } else if (obj.forEach && obj.forEach !== forEach) {
        obj.forEach(iterator, context, obj);
      } else if (isBlankObject(obj)) {
        for (key in obj) {
          iterator.call(context, obj[key], key, obj);
        }
      } else if (typeof obj.hasOwnProperty === 'function') {
        for (key in obj) {
          if (obj.hasOwnProperty(key)) {
            iterator.call(context, obj[key], key, obj);
          }
        }
      } else {
        for (key in obj) {
          if (hasOwnProperty.call(obj, key)) {
            iterator.call(context, obj[key], key, obj);
          }
        }
      }
    }
    return obj;
  }
});
define('aurelia-auth/storage',['exports', 'aurelia-dependency-injection', './base-config'], function (exports, _aureliaDependencyInjection, _baseConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Storage = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Storage = exports.Storage = (_dec = (0, _aureliaDependencyInjection.inject)(_baseConfig.BaseConfig), _dec(_class = function () {
    function Storage(config) {
      _classCallCheck(this, Storage);

      this.config = config.current;
      this.storage = this._getStorage(this.config.storage);
    }

    Storage.prototype.get = function get(key) {
      return this.storage.getItem(key);
    };

    Storage.prototype.set = function set(key, value) {
      return this.storage.setItem(key, value);
    };

    Storage.prototype.remove = function remove(key) {
      return this.storage.removeItem(key);
    };

    Storage.prototype._getStorage = function _getStorage(type) {
      if (type === 'localStorage') {
        if ('localStorage' in window && window.localStorage !== null) return localStorage;
        throw new Error('Local Storage is disabled or unavailable.');
      } else if (type === 'sessionStorage') {
        if ('sessionStorage' in window && window.sessionStorage !== null) return sessionStorage;
        throw new Error('Session Storage is disabled or unavailable.');
      }

      throw new Error('Invalid storage type specified: ' + type);
    };

    return Storage;
  }()) || _class);
});
define('aurelia-auth/oAuth1',['exports', 'aurelia-dependency-injection', './auth-utilities', './storage', './popup', './base-config', 'aurelia-fetch-client'], function (exports, _aureliaDependencyInjection, _authUtilities, _storage, _popup, _baseConfig, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.OAuth1 = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var OAuth1 = exports.OAuth1 = (_dec = (0, _aureliaDependencyInjection.inject)(_storage.Storage, _popup.Popup, _aureliaFetchClient.HttpClient, _baseConfig.BaseConfig), _dec(_class = function () {
    function OAuth1(storage, popup, http, config) {
      _classCallCheck(this, OAuth1);

      this.storage = storage;
      this.config = config.current;
      this.popup = popup;
      this.http = http;
      this.defaults = {
        url: null,
        name: null,
        popupOptions: null,
        redirectUri: null,
        authorizationEndpoint: null
      };
    }

    OAuth1.prototype.open = function open(options, userData) {
      var _this = this;

      var current = (0, _authUtilities.extend)({}, this.defaults, options);
      var serverUrl = this.config.baseUrl ? (0, _authUtilities.joinUrl)(this.config.baseUrl, current.url) : current.url;

      if (this.config.platform !== 'mobile') {
        this.popup = this.popup.open('', current.name, current.popupOptions, current.redirectUri);
      }
      return this.http.fetch(serverUrl, {
        method: 'post'
      }).then(_authUtilities.status).then(function (response) {
        if (_this.config.platform === 'mobile') {
          _this.popup = _this.popup.open([current.authorizationEndpoint, _this.buildQueryString(response)].join('?'), current.name, current.popupOptions, current.redirectUri);
        } else {
          _this.popup.popupWindow.location = [current.authorizationEndpoint, _this.buildQueryString(response)].join('?');
        }

        var popupListener = _this.config.platform === 'mobile' ? _this.popup.eventListener(current.redirectUri) : _this.popup.pollPopup();
        return popupListener.then(function (result) {
          return _this.exchangeForToken(result, userData, current);
        });
      });
    };

    OAuth1.prototype.exchangeForToken = function exchangeForToken(oauthData, userData, current) {
      var data = (0, _authUtilities.extend)({}, userData, oauthData);
      var exchangeForTokenUrl = this.config.baseUrl ? (0, _authUtilities.joinUrl)(this.config.baseUrl, current.url) : current.url;
      var credentials = this.config.withCredentials ? 'include' : 'same-origin';

      return this.http.fetch(exchangeForTokenUrl, {
        method: 'post',
        body: (0, _aureliaFetchClient.json)(data),
        credentials: credentials
      }).then(_authUtilities.status);
    };

    OAuth1.prototype.buildQueryString = function buildQueryString(obj) {
      var str = [];
      (0, _authUtilities.forEach)(obj, function (value, key) {
        return str.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
      });
      return str.join('&');
    };

    return OAuth1;
  }()) || _class);
});
define('aurelia-auth/popup',['exports', './auth-utilities', './base-config', 'aurelia-dependency-injection'], function (exports, _authUtilities, _baseConfig, _aureliaDependencyInjection) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Popup = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Popup = exports.Popup = (_dec = (0, _aureliaDependencyInjection.inject)(_baseConfig.BaseConfig), _dec(_class = function () {
    function Popup(config) {
      _classCallCheck(this, Popup);

      this.config = config.current;
      this.popupWindow = null;
      this.polling = null;
      this.url = '';
    }

    Popup.prototype.open = function open(url, windowName, options, redirectUri) {
      this.url = url;
      var optionsString = this.stringifyOptions(this.prepareOptions(options || {}));
      this.popupWindow = window.open(url, windowName, optionsString);
      if (this.popupWindow && this.popupWindow.focus) {
        this.popupWindow.focus();
      }

      return this;
    };

    Popup.prototype.eventListener = function eventListener(redirectUri) {
      var self = this;
      var promise = new Promise(function (resolve, reject) {
        self.popupWindow.addEventListener('loadstart', function (event) {
          if (event.url.indexOf(redirectUri) !== 0) {
            return;
          }

          var parser = document.createElement('a');
          parser.href = event.url;

          if (parser.search || parser.hash) {
            var queryParams = parser.search.substring(1).replace(/\/$/, '');
            var hashParams = parser.hash.substring(1).replace(/\/$/, '');
            var hash = (0, _authUtilities.parseQueryString)(hashParams);
            var qs = (0, _authUtilities.parseQueryString)(queryParams);

            (0, _authUtilities.extend)(qs, hash);

            if (qs.error) {
              reject({
                error: qs.error
              });
            } else {
              resolve(qs);
            }

            self.popupWindow.close();
          }
        });

        popupWindow.addEventListener('exit', function () {
          reject({
            data: 'Provider Popup was closed'
          });
        });

        popupWindow.addEventListener('loaderror', function () {
          deferred.reject({
            data: 'Authorization Failed'
          });
        });
      });
      return promise;
    };

    Popup.prototype.pollPopup = function pollPopup() {
      var _this = this;

      var self = this;
      var promise = new Promise(function (resolve, reject) {
        _this.polling = setInterval(function () {
          try {
            var documentOrigin = document.location.host;
            var popupWindowOrigin = self.popupWindow.location.host;

            if (popupWindowOrigin === documentOrigin && (self.popupWindow.location.search || self.popupWindow.location.hash)) {
              var queryParams = self.popupWindow.location.search.substring(1).replace(/\/$/, '');
              var hashParams = self.popupWindow.location.hash.substring(1).replace(/[\/$]/, '');
              var hash = (0, _authUtilities.parseQueryString)(hashParams);
              var qs = (0, _authUtilities.parseQueryString)(queryParams);

              (0, _authUtilities.extend)(qs, hash);

              if (qs.error) {
                reject({
                  error: qs.error
                });
              } else {
                resolve(qs);
              }

              self.popupWindow.close();
              clearInterval(self.polling);
            }
          } catch (error) {}

          if (!self.popupWindow) {
            clearInterval(self.polling);
            reject({
              data: 'Provider Popup Blocked'
            });
          } else if (self.popupWindow.closed) {
            clearInterval(self.polling);
            reject({
              data: 'Problem poll popup'
            });
          }
        }, 35);
      });
      return promise;
    };

    Popup.prototype.prepareOptions = function prepareOptions(options) {
      var width = options.width || 500;
      var height = options.height || 500;
      return (0, _authUtilities.extend)({
        width: width,
        height: height,
        left: window.screenX + (window.outerWidth - width) / 2,
        top: window.screenY + (window.outerHeight - height) / 2.5
      }, options);
    };

    Popup.prototype.stringifyOptions = function stringifyOptions(options) {
      var parts = [];
      (0, _authUtilities.forEach)(options, function (value, key) {
        parts.push(key + '=' + value);
      });
      return parts.join(',');
    };

    return Popup;
  }()) || _class);
});
define('aurelia-auth/oAuth2',['exports', 'aurelia-dependency-injection', './auth-utilities', './storage', './popup', './base-config', './authentication', 'aurelia-fetch-client'], function (exports, _aureliaDependencyInjection, _authUtilities, _storage, _popup, _baseConfig, _authentication, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.OAuth2 = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var OAuth2 = exports.OAuth2 = (_dec = (0, _aureliaDependencyInjection.inject)(_storage.Storage, _popup.Popup, _aureliaFetchClient.HttpClient, _baseConfig.BaseConfig, _authentication.Authentication), _dec(_class = function () {
    function OAuth2(storage, popup, http, config, auth) {
      _classCallCheck(this, OAuth2);

      this.storage = storage;
      this.config = config.current;
      this.popup = popup;
      this.http = http;
      this.auth = auth;
      this.defaults = {
        url: null,
        name: null,
        state: null,
        scope: null,
        scopeDelimiter: null,
        redirectUri: null,
        popupOptions: null,
        authorizationEndpoint: null,
        responseParams: null,
        requiredUrlParams: null,
        optionalUrlParams: null,
        defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
        responseType: 'code'
      };
    }

    OAuth2.prototype.open = function open(options, userData) {
      var _this = this;

      var current = (0, _authUtilities.extend)({}, this.defaults, options);

      var stateName = current.name + '_state';

      if ((0, _authUtilities.isFunction)(current.state)) {
        this.storage.set(stateName, current.state());
      } else if ((0, _authUtilities.isString)(current.state)) {
        this.storage.set(stateName, current.state);
      }

      var nonceName = current.name + '_nonce';

      if ((0, _authUtilities.isFunction)(current.nonce)) {
        this.storage.set(nonceName, current.nonce());
      } else if ((0, _authUtilities.isString)(current.nonce)) {
        this.storage.set(nonceName, current.nonce);
      }

      var url = current.authorizationEndpoint + '?' + this.buildQueryString(current);

      var openPopup = void 0;
      if (this.config.platform === 'mobile') {
        openPopup = this.popup.open(url, current.name, current.popupOptions, current.redirectUri).eventListener(current.redirectUri);
      } else {
        openPopup = this.popup.open(url, current.name, current.popupOptions, current.redirectUri).pollPopup();
      }

      return openPopup.then(function (oauthData) {
        if (oauthData.state && oauthData.state !== _this.storage.get(stateName)) {
          return Promise.reject('OAuth 2.0 state parameter mismatch.');
        }

        if (current.responseType.toUpperCase().indexOf('TOKEN') !== -1) {
          if (!_this.verifyIdToken(oauthData, current.name)) {
            return Promise.reject('OAuth 2.0 Nonce parameter mismatch.');
          }

          return oauthData;
        }

        return _this.exchangeForToken(oauthData, userData, current);
      });
    };

    OAuth2.prototype.verifyIdToken = function verifyIdToken(oauthData, providerName) {
      var idToken = oauthData && oauthData[this.config.responseIdTokenProp];
      if (!idToken) return true;
      var idTokenObject = this.auth.decomposeToken(idToken);
      if (!idTokenObject) return true;
      var nonceFromToken = idTokenObject.nonce;
      if (!nonceFromToken) return true;
      var nonceInStorage = this.storage.get(providerName + '_nonce');
      if (nonceFromToken !== nonceInStorage) {
        return false;
      }
      return true;
    };

    OAuth2.prototype.exchangeForToken = function exchangeForToken(oauthData, userData, current) {
      var data = (0, _authUtilities.extend)({}, userData, {
        code: oauthData.code,
        clientId: current.clientId,
        redirectUri: current.redirectUri
      });

      if (oauthData.state) {
        data.state = oauthData.state;
      }

      (0, _authUtilities.forEach)(current.responseParams, function (param) {
        return data[param] = oauthData[param];
      });

      var exchangeForTokenUrl = this.config.baseUrl ? (0, _authUtilities.joinUrl)(this.config.baseUrl, current.url) : current.url;
      var credentials = this.config.withCredentials ? 'include' : 'same-origin';

      return this.http.fetch(exchangeForTokenUrl, {
        method: 'post',
        body: (0, _aureliaFetchClient.json)(data),
        credentials: credentials
      }).then(_authUtilities.status);
    };

    OAuth2.prototype.buildQueryString = function buildQueryString(current) {
      var _this2 = this;

      var keyValuePairs = [];
      var urlParams = ['defaultUrlParams', 'requiredUrlParams', 'optionalUrlParams'];

      (0, _authUtilities.forEach)(urlParams, function (params) {
        (0, _authUtilities.forEach)(current[params], function (paramName) {
          var camelizedName = (0, _authUtilities.camelCase)(paramName);
          var paramValue = (0, _authUtilities.isFunction)(current[paramName]) ? current[paramName]() : current[camelizedName];

          if (paramName === 'state') {
            var stateName = current.name + '_state';
            paramValue = encodeURIComponent(_this2.storage.get(stateName));
          }

          if (paramName === 'nonce') {
            var nonceName = current.name + '_nonce';
            paramValue = encodeURIComponent(_this2.storage.get(nonceName));
          }

          if (paramName === 'scope' && Array.isArray(paramValue)) {
            paramValue = paramValue.join(current.scopeDelimiter);

            if (current.scopePrefix) {
              paramValue = [current.scopePrefix, paramValue].join(current.scopeDelimiter);
            }
          }

          keyValuePairs.push([paramName, paramValue]);
        });
      });

      return keyValuePairs.map(function (pair) {
        return pair.join('=');
      }).join('&');
    };

    return OAuth2;
  }()) || _class);
});
define('aurelia-auth/authorize-step',['exports', 'aurelia-dependency-injection', 'aurelia-router', './authentication'], function (exports, _aureliaDependencyInjection, _aureliaRouter, _authentication) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AuthorizeStep = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var AuthorizeStep = exports.AuthorizeStep = (_dec = (0, _aureliaDependencyInjection.inject)(_authentication.Authentication), _dec(_class = function () {
    function AuthorizeStep(auth) {
      _classCallCheck(this, AuthorizeStep);

      this.auth = auth;
    }

    AuthorizeStep.prototype.run = function run(routingContext, next) {
      var isLoggedIn = this.auth.isAuthenticated();
      var loginRoute = this.auth.getLoginRoute();

      if (routingContext.getAllInstructions().some(function (i) {
        return i.config.auth;
      })) {
        if (!isLoggedIn) {
          this.auth.setInitialUrl(window.location.href);
          return next.cancel(new _aureliaRouter.Redirect(loginRoute));
        }
      } else if (isLoggedIn && routingContext.getAllInstructions().some(function (i) {
        return i.fragment === loginRoute;
      })) {
        var loginRedirect = this.auth.getLoginRedirect();
        return next.cancel(new _aureliaRouter.Redirect(loginRedirect));
      }

      return next();
    };

    return AuthorizeStep;
  }()) || _class);
});
define('aurelia-auth/auth-fetch-config',['exports', 'aurelia-dependency-injection', 'aurelia-fetch-client', './authentication'], function (exports, _aureliaDependencyInjection, _aureliaFetchClient, _authentication) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.FetchConfig = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var FetchConfig = exports.FetchConfig = (_dec = (0, _aureliaDependencyInjection.inject)(_aureliaFetchClient.HttpClient, _authentication.Authentication), _dec(_class = function () {
    function FetchConfig(httpClient, authService) {
      _classCallCheck(this, FetchConfig);

      this.httpClient = httpClient;
      this.auth = authService;
    }

    FetchConfig.prototype.configure = function configure() {
      var _this = this;

      this.httpClient.configure(function (httpConfig) {
        httpConfig.withDefaults({
          headers: {
            'Accept': 'application/json'
          }
        }).withInterceptor(_this.auth.tokenInterceptor);
      });
    };

    return FetchConfig;
  }()) || _class);
});
define('aurelia-auth/auth-filter',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var AuthFilterValueConverter = exports.AuthFilterValueConverter = function () {
    function AuthFilterValueConverter() {
      _classCallCheck(this, AuthFilterValueConverter);
    }

    AuthFilterValueConverter.prototype.toView = function toView(routes, isAuthenticated) {
      return routes.filter(function (r) {
        return r.config.auth === undefined || r.config.auth === isAuthenticated;
      });
    };

    return AuthFilterValueConverter;
  }();
});
define('regenerator-runtime/runtime',['require','exports','module'],function (require, exports, module) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `value instanceof AwaitArgument` to determine if the yielded value is
  // meant to be awaited. Some may consider the name of this method too
  // cutesy, but they are curmudgeons.
  runtime.awrap = function(arg) {
    return new AwaitArgument(arg);
  };

  function AwaitArgument(arg) {
    this.arg = arg;
  }

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value instanceof AwaitArgument) {
          return Promise.resolve(value.arg).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" ||
              (method === "throw" && delegate.iterator[method] === undefined)) {
            // A return or throw (when the delegate iterator has no throw
            // method) always terminates the yield* loop.
            context.delegate = null;

            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {
                // If the return method threw an exception, let that
                // exception prevail over the original return or throw.
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              // Continue with the outer return, now that the delegate
              // iterator has been terminated.
              continue;
            }
          }

          var record = tryCatch(
            delegate.iterator[method],
            delegate.iterator,
            arg
          );

          if (record.type === "throw") {
            context.delegate = null;

            // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.
            method = "throw";
            arg = record.arg;
            continue;
          }

          // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.
          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = arg;

        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }

        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(arg) call above.
          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp[toStringTagSymbol] = "Generator";

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n    <router-view></router-view>\n</template>\n"; });
define('text!modules/home.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"col-lg-1 input-group marginTop marginBottom\">\r\n    <span show.bind=\"!showLogon\" click.trigger=\"showRegister()\"  class=\" glyphicon glyphicon-arrow-left leftMargin\">\r\n\t </span>\r\n  </div>\r\n\r\n\r\n  <div class='container'>\r\n    <div class=\"panel panel-default topMargin\">\r\n      <div class=\"panel-body\">\r\n        <div class=\"col-lg-2\">\r\n          <h1>${message}</h1>\r\n        </div>\r\n        <div class=\"col-lg-2 pull-right\">\r\n          <img height=\"100px\" width=\"100px\" src=\"../src/resources/img/chirpLogo.jpg\" />\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"MarginTop\">\r\n      <compose show.bind=\"showLogon\" view=\"./login.html\"></compose>\r\n      <compose show.bind=\"!showLogon\" view=\"./registration.html\"></compose>\r\n    </div>\r\n    \r\n</template>"; });
define('text!modules/login.html', ['module'], function(module) { module.exports = "<template>\r\n    <div class=\"well col-md-3\">\r\n        <form id=\"form\">\r\n            <div id=\"errorMsg\"></div>\r\n            <div class=\"form-group\">\r\n                <label for=\"email\">Email</label>\r\n                <input value.bind=\"email\" type=\"email\" autofocus class=\"form-control\"  id=\"email\" placeholder=\"Email\"></input>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label for=\"password\">Password</label>\r\n                <input value.bind=\"password\" type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Password\"></input>\r\n            </div>\r\n\r\n            <button class=\"btn btn-default\" click.trigger='login()'>Login</button>\r\n            <a href=\"\" class=\"text-muted\" click.trigger=\"showRegister()\">Register</a>\r\n        </form>\r\n    </div>\r\n\r\n</template>"; });
define('text!modules/registration.html', ['module'], function(module) { module.exports = "<template>\r\n<form id=\"RegistrationForm\" >\r\n     \r\n        <div class=\"form-group\">\r\n            <label for=\"exampleInputFirstName\">First name</label>\r\n            <input type=\"text\" class=\"form-control\" id=\"exampleInputFirstName\" \r\n\t\taria-describedby=\"firstNameHelp\" placeholder=\"Enter first name\"\r\n            \tvalue.bind=\"firstName\">\r\n        </div>\r\n\r\n <div class=\"form-group\">\r\n            <label for=\"exampleInputLastName\">Last name</label>\r\n            <input type=\"text\" class=\"form-control\" id=\"exampleInputLastName\" \r\n\t\taria-describedby=\"lastNameHelp\" placeholder=\"Enter last name\"\r\n            \tvalue.bind=\"lastName\">\r\n        </div>\r\n\r\n           <div class=\"form-group\">\r\n            <label for=\"exampleInputEmail1\">Email address</label>\r\n            <input type=\"email\" class=\"form-control\" id=\"exampleInputEmail1\" \r\n            aria-describedby=\"emailHelp\" placeholder=\"Enter email\"\r\n            \tvalue.bind=\"email\">\r\n        </div>\r\n\r\n         <div class=\"form-group\">\r\n            <label for=\"exampleInputscreenName\">screenName</label>\r\n            <input type=\"screenName\" class=\"form-control\" id=\"exampleInputscreenName\" \r\n            aria-describedby=\"pexampleInputscreenNameHelp\" placeholder=\"Enter exampleInputscreenName\"\r\n            \tvalue.bind=\"screenName\">\r\n        </div>\r\n\r\n\r\n          <div class=\"form-group\">\r\n            <label for=\"exampleInputPassword3\">Password</label>\r\n            <input type=\"password\" class=\"form-control\" id=\"exampleInputPassword3\" \r\n            aria-describedby=\"passwordHelp\" placeholder=\"Enter Password\"\r\n            \tvalue.bind=\"password\">\r\n        </div>\r\n\r\n\r\n\r\n\t<button click.delegate=\"save()\" class=\"btn btn-primary\">Submit</button>\r\n</form>\r\n</template>\r\n"; });
define('text!modules/wall.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"container\">\r\n    <h1>Wall</h1>\r\n    <div class=\"row marginBottom marginTop\">\r\n      <div class=\"input-group col-lg-2\">\r\n        <input value.bind=\"searchScreenName\" class=\"form-control\" types=\"text\" placeholder=\"Screen name\">\r\n        <span class=\"input-group-addon\" click.trigger=\"findUser()\">\r\n        <span class=\"glyphicon glyphicon-search\">\r\n      </div>\r\n      \r\n    \r\n<div class=\"col-lg-2 col-lg-offset-8\">\r\n  <span show.bind=\"notMe\" click.trigger=\"home()\" class=\"glyphicon glyphicon-home marginLeft\"></span>\r\n        <span show.bind=\"notMe\" click.trigger=\"follow()\" class=\"glyphicon glyphicon-user marginLeft\"></span>\r\n        <span click.trigger=\"logout()\" class=\"glyphicon glyphicon-log-out marginLeft\"></span>\r\n      </div>\r\n    </div>\r\n\r\n\r\n    <div class=\"panel panel-default\">\r\n      <div class=\"panel-body\">\r\n        <div class=\"col-md-2\">\r\n          <img click.trigger=\"getChirps()\" scr=\"../src/resources/img/chirpLogo.jpg\" />\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"col-nd-2 pull-right\">\r\n        <H2>${users.selectedUser.screenName} </H2>\r\n      </div>\r\n\r\n      <div class=\"panel-body\">\r\n        <p><textarea value.bind=\"newChirp\" id=\"chirp\" class=\"form-control\" rows=\"1\" cols=\"144\"></textarea></p>\r\n        <p><button click.trigger=\"chirp()\" class=\"btn btn-primary \" id=\"btnChirp \">Chirp</button></p>   \r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"panel panel-default \">\r\n      <div class=\"panel-body \">\r\n        <div show.bind=\"wallMessage.length> 0\" innerhtml.bind=\"wallMessage\"></div>\r\n        <ul class=\"list-group\">\r\n          <li class=\"list-group-item\" repeat.for=\"chirp of chirps.chirpArray\">\r\n            <div class=\"media-left\" innerhtml='${chirp.chirpAuthor.email | gravatarurl:40'></div>\r\n            <div class=\"media-body\">\r\n              <div class=\"col-lg-12\">\r\n                <p>${chirp.chirp} <span show.bind=\"chirp.reChirp\">[RC]</span></p>\r\n              </div>\r\n              <div class=\"col-lg-12\">\r\n                <span class=\"smallFont\">${chirp.dateCreated | dateFormat}</span>\r\n                <span click.trigger='like($index)' class=\"glyphicon glyphicon-thumbs-up\"></span> ${chirp.likes}\r\n                <span click.trigger='reChirp(chirp)' class=\"glyphicon glyphicon-retweet\"></span>\r\n              </div>\r\n            </div>\r\n        </ul>\r\n        </li>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- \t<button click.trigger=\"logout()\">Logout</button></i-->\r\n</template>"; });
define('text!resources/img.html', ['module'], function(module) { module.exports = ""; });
//# sourceMappingURL=app-bundle.js.map