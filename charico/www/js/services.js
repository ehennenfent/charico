angular.module('starter.services', [])

.factory('Charities', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var charities = [{
    id: 0,
    name: 'And Justice For All',
    description: 'Help provide relief and education for children in developing countries',
    face: 'https://pbs.twimg.com/profile_images/542228885476081665/MyOfVNsK.png',
    url: 'http://google.com'
  }, {
    id: 1,
    name: 'Midwest Food Bank',
    description: 'Assist with relief for disaster victims, refugees, and the homeless.',
    face: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/The_Salvation_Army.svg/868px-The_Salvation_Army.svg.png',
    url: 'http://google.com'
  }, {
    id: 2,
    name: 'EFF',
    description: 'Support cancer research and treatment for current patients.',
    face: 'http://www.chem.hawaii.edu/Bil301/ACSAstrochemistry/logo1.jpg',
    url: 'http://google.com'
  }, {
    id: 3,
    name: 'Venture for America',
    description: 'Node.js is the only real dev language.',
    face: 'http://ih1.redbubble.net/image.53589211.4056/fc,550x550,white.u1.jpg',
    url: 'http://google.com'
  }, {
    id: 4,
    name: 'Water.org',
    description: 'Help respond to disasters worldwide.',
    face: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Flag_of_the_ICRC.svg/360px-Flag_of_the_ICRC.svg.png',
    url: 'http://google.com'
    }, {
      id: 5,
      name: 'Doctors Without Borders',
      description: 'Node.js is the only real dev language.',
      face: 'http://ih1.redbubble.net/image.53589211.4056/fc,550x550,white.u1.jpg',
      url: 'http://google.com'
    }, {
      id: 6,
      name: 'Heifer International',
      description: 'Node.js is the only real dev language.',
      face: 'http://ih1.redbubble.net/image.53589211.4056/fc,550x550,white.u1.jpg',
      url: 'http://google.com'
    }, {
      id: 7,
      name: 'Amnesty International',
      description: 'Node.js is the only real dev language.',
      face: 'http://ih1.redbubble.net/image.53589211.4056/fc,550x550,white.u1.jpg',
      url: 'http://google.com'
    }];
  if(window.localStorage.getItem("charityOrder") !== null){
        var sorting = JSON.parse(window.localStorage.getItem("charityOrder"));
        console.log(sorting);
        charities = charities.map(function(charity) {
            var n = sorting.indexOf(charity.id);
            sorting[n] = '';
            return [n, charity];
        }).sort().map(function(j) { return j[1];});
    }

  return {
    all: function() {
      return charities;
    },
    moveItem: function(item, fromIndex, toIndex) {
      charities.splice(fromIndex, 1);
      charities.splice(toIndex, 0, item);
      window.localStorage.setItem("charityOrder", JSON.stringify(charities.map(function(charity){return charity.id;} )));
      return charities;
    },
    remove: function(charity) {
      charities.splice(charities.indexOf(charity), 1);
    },
    get: function(charityId) {
      for (var i = 0; i < charities.length; i++) {
        if (charities[i].id === parseInt(charityId)) {
          return charities[i];
        }
      }
      return null;
    }
  };
});
