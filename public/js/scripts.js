// Places Demo
// Vinayak Mishra <viks@vnykmshr.com>
// Scripts.js

// the "g" vars
var gMap;
var gService;
var google;

// initializes maps and places api
function initPlacesApi() {
  if (typeof google === 'undefined') return;

  // could we do away with map instance?
  gMap = new google.maps.Map(document.getElementById('map'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoom: 15
  });

  // initialze google places service
  gService = new google.maps.places.PlacesService(gMap);
}

// initialize search field
function initSelect2() {
  if (!$('#placesTF').length) return;

  $('#placesTF').select2({
    placeholder: "Enter a location",
    minimumInputLength: 3,
    query: debounce(1000, doQuery),
    formatSelection: format,
    formatResult: format,
    dropdownCssClass: 'bigdrop'
  });
}

// perform Places API query
function doQuery(query) {
  if (typeof gService === 'undefined') return empty();

  var request = {
    query: query.term
  };

  gService.textSearch(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      if (!results.length) results = [results];

      var response = {
        results: results.map(function (item) {
          return item.formatted_address || '';
        })
      };

      query.callback(response);
    } else {
      query.callback(empty());
    }
  });
}

// format result entry
function format(item) {
  return item;
}

// empty results when no match found
function empty() {
  return {
    results: []
  };
}

// Returns a function that calls the original fn function only if no invocations
// have been made within the last quietMillis milliseconds.
function debounce(quietMillis, fn, ctx) {
  ctx = ctx || undefined;
  var timeout;
  return function () {
    var args = arguments;
    window.clearTimeout(timeout);
    timeout = window.setTimeout(function () {
      fn.apply(ctx, args);
    }, quietMillis);
  };
}

// Wake me up when page load ends!
$(function () {
  // initialize places api
  initPlacesApi();

  // initialize location search
  initSelect2();
});
