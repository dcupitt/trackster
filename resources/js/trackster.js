var Trackster = {};
const API_KEY = "1b8c9e0335c8d1124976766ccd908a46";

$(document).ready(function() {

  Trackster.search = function(tracks) {
    var songTitle = document.getElementById('songTitle');
    var search = songTitle.value;
    Trackster.searchTracksByTitle(search);
    songTitle.value = '';
  };


// /*
//   Given an array of track data, create the HTML row for each.
//   Append each "row" to the container in the body to display all tracks.
// */
  Trackster.renderTracks = function(searchResultsArray) {
    var i = '';  // songIndexNumber
    var x = '';  // imageIndexNumber
    for (i = 0; i < searchResultsArray.length; i++) {
      var href = searchResultsArray[i].url;
      var songName = searchResultsArray[i].name;
      var artist = searchResultsArray[i].artist;
      var listeners = searchResultsArray[i].listeners;
      var image = searchResultsArray[i].image[1]["#text"]
      var htmlSong =
        '<div class="tableRow">' +
          '<div class="col-1"><a href="' + href +'"><i class="fa fa-play-circle-o playButton"></i></a></div>' +
          '<div class="col-4"><p>' + songName + '</p></div>' +
          '<div class="col-2 tablet"><p>' + artist + '</p></div>' +
          '<div class="col-2 tablet"><img src="' + image + '"></div>' +
          '<div class="col-2 desktop"><p>' + listeners + '</p></div>' +
          '</div>';
      var searchResults = document.getElementById('searchResults');
      var resultsDiv = document.createElement( "div" );
      resultsDiv.innerHTML = htmlSong;
      searchResults.appendChild(resultsDiv);
    }
  };


// /*
//   Given a search term as a string, query the LastFM API.
//   Render the tracks given in the API query response.
// */
  Trackster.searchTracksByTitle = function(track) {
    $.ajax({
      url: "http://ws.audioscrobbler.com/2.0/?method=track.search&track="+ track + "&api_key=" + API_KEY + "&format=json",
      datatype: 'jsonp',
      success: function(data) {
        var searchResultsArray = data.results.trackmatches.track;
        Trackster.renderTracks(searchResultsArray);
      }
    });
  };

});
