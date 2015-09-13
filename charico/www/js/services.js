angular.module('starter.services', [])

.factory('Charities', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var charities = [{
    id: 0,
    name: 'And Justice For All',
    description: 'And Justice For All provides legal assistance to the disadvantaged, making sure counsel and assistance are available to those who need it most.',
    face: 'http://andjusticeforall.org/wp-content/uploads/2012/10/libertylogo.png',
    url: 'http://andjusticeforall.org/'
  }, {
    id: 1,
    name: 'Midwest Food Bank',
    description: 'Midwest Food Bank feeds thousands of the neediest people in the Midwest by operating a network of food banks.',
    face: 'http://www.midwestfoodbank.org/assets/img/logo.png',
    url: 'http://midwestfoodbank.org'
  }, {
    id: 2,
    name: 'EFF',
    description: 'The EFF fights for the digital and electronic civil rights of people across the world, providing legal services and influencing internet policy.',
    face: 'https://www.eff.org/files/2014/01/24/eff-logo-plain-300.jpg',
    url: 'http://eff.org'
  }, {
    id: 3,
    name: 'Venture for America',
    description: 'Venture for America builds and revitalizes our economy by placing empowering bright and driven students to make an impact through entrepreneurship.',
    face: 'http://havaspr.com/us/wp-content/uploads/2012/12/Venture-for-America-618-328.jpg',
    url: 'http://ventureforamerica.org'
  }, {
    id: 4,
    name: 'Water.org',
    description: 'Water.org provides lifesaving water to the neediest people in the world, building clean wells that change communities forever.',
    face: 'http://water.org/static/image/logo.png?v=1.1',
    url: 'http://water.org'
    }, {
      id: 5,
      name: 'Doctors Without Borders',
      description: 'Doctors Without Borders sends doctors across the world to provide life-saving medical care for some of the neediest people in the world.',
      face: 'http://cdn.doctorswithoutborders.org/sites/all/themes/unified_template/ut_zen/logo.png',
      url: 'http://doctorswithoutborders.org'
    }, {
      id: 6,
      name: 'Heifer International',
      description: 'Heifer International empowers the world\'s poorest to change their lifestyle by providing them with a path to economic success through livestock.',
      face: 'http://www.heifer.org/resources/images/logo.png',
      url: 'http://heifer.org'
    }, {
      id: 7,
      name: 'Amnesty International',
      description: 'Amnesty International fights for peace and human rights across the world, championing campaigns to protect the defenseless.',
      face: 'http://thenewsdoctors.com/wp-content/uploads/2014/09/amnesty-international11.jpg',
      url: 'http://amnestyusa.org/'
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
