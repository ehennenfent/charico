angular.module('starter.services', [])

.factory('Charities', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var charities = [{
    id: 0,
    name: 'Save the Children',
    description: 'Help provide relief and education for children in developing countries',
    face: 'https://pbs.twimg.com/profile_images/542228885476081665/MyOfVNsK.png'
  }, {
    id: 1,
    name: 'Salvation Army',
    description: 'Assist with relief for disaster victims, refugees, and the homeless.',
    face: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/The_Salvation_Army.svg/868px-The_Salvation_Army.svg.png'
  }, {
    id: 2,
    name: 'American Cancer Society',
    description: 'Support cancer research and treatment for current patients.',
    face: 'http://www.chem.hawaii.edu/Bil301/ACSAstrochemistry/logo1.jpg'
  }, {
    id: 3,
    name: 'HH Cirque du Twerque',
    description: 'Node.js is the only real dev language.',
    face: 'http://ih1.redbubble.net/image.53589211.4056/fc,550x550,white.u1.jpg'
  }, {
    id: 4,
    name: 'International Red Cross',
    description: 'Help respond to disasters worldwide.',
    face: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Flag_of_the_ICRC.svg/360px-Flag_of_the_ICRC.svg.png'
  }];

  return {
    all: function() {
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
