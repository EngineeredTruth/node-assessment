var users = require('./users.json');

module.exports = {
    getUsers: function(req, res, next) {
        if (req.query.language) {
            let results = [];
            users.forEach(function(currentVal) {
                if (currentVal.language == req.query.language) {
                    results.push(currentVal);
                }
            });
            res.json(results);
        } else if (req.query.age){
          let results = [];
          users.forEach(function(currentVal) {
              if (currentVal.age == req.query.age) {
                  results.push(currentVal);
              }
          });
          res.json(results);
        } else if (req.query.city) {
          let results = [];
          users.forEach(function(currentVal) {
              if (currentVal.city == req.query.city) {
                  results.push(currentVal);
              }
          });
          res.json(results);
        } else if (req.query.state) {
          let results = [];
          users.forEach(function(currentVal) {
              if (currentVal.state == req.query.state) {
                  results.push(currentVal);
              }
          });
          res.json(results);
        } else if (req.query.gender) {
          let results = [];
          users.forEach(function(currentVal) {
              if (currentVal.gender == req.query.gender) {
                  results.push(currentVal);
              }
          });
          res.json(results);
        }
        else {
            res.json(users);
        }
    },
    getUsersType: function(req, res, next) {

        let results = [];
        users.forEach(function(currentVal) {
            if (currentVal.type === req.params.type) {
                results.push(currentVal);
            }
        });
        res.json(results);
        //if nothing then just return array
    },
    createUser: function(req, res, next) {
        console.log(req.body);
        let newUser = {};
        newUser.id = users.length;
        newUser.first_name = req.body.first_name;
        newUser.last_name = req.body.last_name;
        newUser.email = req.body.email;
        newUser.gender = req.body.gender;
        newUser.language = req.body.language;
        newUser.age = req.body.age;
        newUser.city = req.body.city;
        newUser.state = req.body.state;
        newUser.type = req.body.type;
        newUser.favorites = req.body.favorites;

        if (req.params.type) {
            newUser.type = req.params.type;
        }

        users.push(newUser);

        res.status(200).json(newUser);

        console.log(users[users.length - 1]);
    },
    changeLanguage: function(req, res, next) {
        // console.log(req.params.userId);
        let id = parseInt(req.params.userId);
        users.forEach(function(currentVal, index) {
            if (currentVal.id === id) {
                console.log(currentVal);
                currentVal.language = req.body.language;
                res.status(200).json(currentVal);
            }
        })

    },
    addForum: function(req, res, next) {
        let id = parseInt(req.params.userId);
        users.forEach(function(currentVal, index) {
            if (currentVal.id === id) {
                console.log(currentVal);
                currentVal.favorites.push(req.body.add);
                res.status(200).json(currentVal);
            }
        })

    },
    deleteForum: function(req, res, next) {
        let id = parseInt(req.params.userId);
        users.forEach(function(currentVal, index) {
            if (currentVal.id === id) {
                currentVal.favorites.forEach(function(currentV, i) {
                    if (currentV === req.body.favorite) {
                        console.log(currentVal);
                        currentVal.favorites.splice(i, 1);
                        res.status(200).json(currentVal);
                    }
                })
            }
        })
    },
    deleteUser: function(req, res, next){
      let id = parseInt(req.params.userId);
      let status = 404;
      console.log(status);
      users.forEach(function(currentVal, index){
        if(currentVal.id === id){
          console.log("There are ", users.length, " users");
          users.splice(index,1);
          console.log("User deleted, there are now ", users.length, " users");
          status = 200;
        }
      })
      res.sendStatus(status);
    },
    updateUser: function(req, res, next){
      let id = parseInt(req.params.userId);
      users.forEach(function(currentVal, index){
        if(currentVal.id ===id){
          for(var prop in req.body){
            console.log(prop);
            console.log(currentVal);
            currentVal[prop] = req.body[prop];
          }
          res.status(200).json(currentVal);
        }
      })
    }
}
