var infowindow;
var markersArray = [];
var thumbnailSize = '100px';

$(document ).ready(function() {
	$.getJSON( "images/geocoordinates.json", function(data) {
		initialize(data);
	});
});

function initialize(data) {
	var mapOptions = {
		center : new google.maps.LatLng(52.519171, 13.4060912),
		zoom : 3,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	infowindow = new google.maps.InfoWindow();
	
	fetchPhotos(map, data);
}

function fetchPhotos(map, data) {
	deleteOverlays();
	
	for(var i=0;i<data.length;i++) {
		var latitude = data[i].latitude;
		var longitude = data[i].longitude;
		var path = data[i].path;
		
		addMarker(map, i, latitude, longitude, path, path, "Christian");
	}
}

function addMarker(map, id, lat, lng, title, imgPath, username) {
	var path = 'images/' + imgPath;
	
	var myLatlng = new google.maps.LatLng(lat, lng);
	var marker = new google.maps.Marker({
			position : myLatlng,
			title : title,
		});

	markersArray.push(marker);
	
	var richMarker = new RichMarker({
          position: myLatlng,
          map: map,
          content: '<div class="image-marker">' +
			'<span class="rounded-img" style="background: url(' + path + ') no-repeat center center; width: ' + thumbnailSize + '; height: ' + thumbnailSize + ';">'+
            '<a href="#"><img src="#" style="opacity: 0;" /></a>'+
			'</span>'+
			'<div class="triangle"></div>',
			anchor: RichMarkerPosition.BOTTOM,
			shadow: 'none',
          });

	markersArray.push(richMarker);
}

function deleteOverlays() {
	if (markersArray) {
		for (i in markersArray) {
			markersArray[i].setMap(null);
		}
		markersArray.length = 0;
	}
}

/******Util-Section************/
var delay = (function () {
	var timer = 0;
	return function (callback, ms) {
		clearTimeout(timer);
		timer = setTimeout(callback, ms);
	};
})();
