"use strict";

var conceptsAPI = "./db/concepts.json";
var keywordsAPI = "./db/keywords.json";
var personalityAPI = "./db/personality.json";
var toneAPI = "./db/tone.json";
var analyzerAPI = "./db/analyzed.json";
var yelpAPI = "./db/yelp-nr.json";

function HomeCtrl($http, $ionicLoading, geolocation, NgMap, $ionicSlideBoxDelegate, $state, DataStore, $sce, $ionicPlatform) {
  console.log("HomeCtrl");

  var home = this;

  NgMap.getMap()
    .then(function (map) {
      console.log(map.getCenter());
      console.log('markers', map.markers);
      console.log('shapes', map.shapes);
    });

  home.levelLabel = [
    "Broad",
    "Common",
    "Academic",
    "Specialized"
  ]

  home.distance = 6000;

  home.classLabel = [
    "item-positive",
    "item-balanced",
    "item-calm",
    "item-energized",
    "item-assertive"
  ]

  home.iframeTrust = function (url) {
    return $sce.trustAsResourceUrl(url);
  }

  home.previousPlace = function () {
    $ionicSlideBoxDelegate.previous(999);
  }

  home.nextPlace = function () {
    $ionicSlideBoxDelegate.next(999);
  }

  home.locationString = function (c) {
    return `${c.latitude}, ${c.longitude}`;
  }

  home.map = {
    center: {},
    zoom: 18
  };

  function updateMap(lat, long, zoom) {
    home.map = {
      // center: {
      //   latitude: lat,
      //   longitude: long
      // },
      center: `${lat}, ${long}`,
      zoom: zoom || 18
    };
  }

  home.refreshData = function () {
    console.log(`Called`);
    $ionicLoading.show({
      template: '<ion-spinner icon="dots" class="spinner-assertive"></ion-spinner><br>Getting Your Location...',
      animation: 'fade-in'
    });
    geolocation.getLocation()
      .then(function (data) {
        let coords = data.coords;

        getNearbyRestaurant(coords.latitude, coords.longitude);

        updateMap(coords.latitude, coords.longitude);

      });
  }


  let getNearbyRestaurant = function (lat, lng) {
    let r = Math.floor(home.distance * 0.3048);

    $ionicLoading.show({
      template: '<ion-spinner icon="ripple" class="spinner-energized"></ion-spinner><br>Fetching Yelp Data...',
      animation: 'fade-in'
    });

    // $http.get(yelpAPI)
    // $http.get(`http://localhost:1314/nbw/${lat}/${lng}`)
    $http.get(`https://eo.mybluemix.net/nbw/${lat}/${lng}`)
      .success(function (data) {

        console.log(data);

        home.bizs = data.businesses;
        $ionicSlideBoxDelegate.update();
        $ionicLoading.hide();
      });
  }

  //* //////////////////////////////////////////////
  $ionicPlatform.ready(function () {
    home.refreshData();
  });
  // home.getRelatedConcepts();
  // home.getTone();
  // home.getPersonality();

  //*/////////////////////////////////////////////

}
