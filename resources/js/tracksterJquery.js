var Trackster = {};
const API_KEY = "1b8c9e0335c8d1124976766ccd908a46";
var ENTER_KEY = 13;

$(document).ready( function() {
  var searchInput = $("#songTitle")

  $("#searchButton").click(function () {
    var trackSearch = searchInput.val();
    Trackster.searchTracksByTitle(trackSearch);
    searchInput.val("");
  });

  searchInput.on('keyup', function (e) {
    var trackSearch = searchInput.val();
    if (e.which !== ENTER_KEY || !trackSearch) {
    	return;
    }
    Trackster.searchTracksByTitle(trackSearch);
    searchInput.val("");
  });

  // /*
  //   Given an array of track data, create the HTML for a Bootstrap row for each.
  //   Append each "row" to the container in the body to display all tracks.
  // */
  Trackster.renderTracks = function(searchResultsArray) {
    var $searchResults = $( "#searchResults" )

    $searchResults.empty();

    for (var trackIndex = 0; trackIndex < searchResultsArray.length; trackIndex++) {
      var track = searchResultsArray[trackIndex];
      var image = searchResultsArray[trackIndex].image[1]["#text"]
      var htmlSong =
        '<div class="tableRow">' +
          '<div class="col-1"><a href="' + track.url +'"><i class="fa fa-play-circle-o playButton"></i></a></div>' +
          '<div class="col-4"><p>' + track.name + '</p></div>' +
          '<div class="col-3 tablet"><p>' + track.artist + '</p></div>' +
          '<div class="col-2 tablet"><img src="' + image + '"></div>' +
          '<div class="col-2 desktop"><p>' + track.listeners + '</p></div>' +
          '</div>';

      $searchResults.append(htmlSong);
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
