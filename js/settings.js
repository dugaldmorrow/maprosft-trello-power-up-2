/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

t.render(function() {
  return Promise.all([
    t.get('board', 'shared', TEAM_NAME_KEY),
    t.get('board', 'shared', TEAM_TOKEN_KEY)
  ])
  .spread(function(teamName, token) {
    if (teamName) {
      var maprosoftTeamNameTextField = document.getElementById(TEAM_NAME_KEY);
      maprosoftTeamNameTextField.value = teamName;
    }
    if (token) {
      var maprosoftTokenTextField = document.getElementById(TEAM_TOKEN_KEY);
      maprosoftTokenTextField.value = token;
    }
  })
  .then(function(){
    t.sizeTo('#settings-content')
    .done();
  })
});

//document.getElementById('save').addEventListener('click', function() {
//  return t.set('board', 'private', 'vegetable', 'Broccoli')
//  .then(function() {
//    return t.set('board', 'shared', TEAM_TOKEN_KEY, maprosoftTokenTextField.value);
//  })
//  .then(function() {
//    return t.set('board', 'shared', TEAM_NAME_KEY, maprosoftTeamNameTextField.value);
//  })
//  .then(function() {
//    //updateSharedMapInfoCache(t);
//
//    return doGet(retrieveSharedMapsUrl).then(function(sharedMapInfo) {
//      //var sharedMapInfo = '{"teamName":"demo","mapNames":["General","Stack Panel","Libraries","Parks","Park Highlights","First Fleet Park","Commuting","Driving Directions","Map Rulers"]}';
//      return t.set('board', 'shared', CACHED_SHARED_MAP_INFO_KEY, sharedMapInfo);
//    });
//  })
//  .then(function() {
//    t.closePopup();
//  });
//});

var buildRetrieveSharedMapsUrl = function(teamName, token) {
  return 'https://www.maprosoft.com/app/shared?team=' + teamName + '&getSharedMapNames=yes';
};

document.getElementById('save').addEventListener('click', function() {
  var maprosoftTeamNameTextField = document.getElementById(TEAM_NAME_KEY);
  var maprosoftTokenTextField = document.getElementById(TEAM_TOKEN_KEY);
  var teamName = maprosoftTeamNameTextField.value;
  var token = maprosoftTokenTextField.value;
  return Promise.all([
    t.set('board', 'shared', TEAM_NAME_KEY, teamName),
    t.set('board', 'shared', TEAM_TOKEN_KEY, token),
    doGet(buildRetrieveSharedMapsUrl(teamName, token)).then(function(sharedMapInfo) {
      var sharedMapInfoJson = JSON.stringify(sharedMapInfo);
      return t.set('board', 'shared', CACHED_SHARED_MAP_INFO_KEY, sharedMapInfoJson);
    })
  ])
  //.spread(function(teamName, token, sharedMapInfo) {
  //  console.log('saved team name and token');
  //})
  .then(function() {
    t.closePopup();
  })
});


//t.render(function(){
//  return Promise.all([
//    t.get('board', 'shared', 'fruit'),
//    t.get('board', 'private', 'vegetable')
//  ])
//      .spread(function(savedFruit, savedVegetable) {
//        if (savedFruit && /[a-z]+/.test(savedFruit)) {
//          fruitSelector.value = savedFruit;
//        }
//        if (savedVegetable && /[a-z]+/.test(savedVegetable)) {
//          vegetableSelector.value = savedVegetable;
//        }
//      })
//      .then(function(){
//        t.sizeTo('#settings-content')
//            .done();
//      })
//});
//
//document.getElementById('save').addEventListener('click', function() {
//  return t.set('board', 'private', 'vegetable', 'Broccoli')
//      .then(function() {
//        return t.set('board', 'shared', 'fruit', fruitSelector.value);
//      })
//      .then(function() {
//        t.closePopup();
//      });
//});
