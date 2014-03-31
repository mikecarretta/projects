// wunderground.com  api  dc78f7e3ed16d1b7
// http://api.wunderground.com/api/dc78f7e3ed16d1b7/forecast/q/06615.json
// forecast.simpleforecast.forecastday / data , high.fahrenheit , conditions
(function() {
  var App = {
    init: function(config) {
      this.zip();
    },

    zip: function() {
      var that = this;
      $('#submit').on('click', function(){
        $('.message').addClass('hide');
        var zipVal = $('#zipcode').val();

        if (zipVal.length === 5) {
          return that.api();
          // console.log(that);
        } else {
          // Error Message
          $('.message').removeClass('hide').html('').append(
            zipVal + ' is not a zip code. Please enter 6 numbers.')
        }
      })
    },

    api: function() {

      var self = this;

      $('.loader').removeClass('hide');

      var zip = $('#zipcode').val();
      var apiUrl = 'http://api.wunderground.com/api/dc78f7e3ed16d1b7/forecast/q/';

        $.ajax({
          url : apiUrl + zip + '.json',
          dataType : "jsonp",
          success : function(data) {
            $('.loader').addClass('hide');
            var fiveDayUrl = data.forecast.simpleforecast.forecastday;
            // console.log(fiveDayUrl);

            self.records = $.map(fiveDayUrl, function(apiData) {
              return {
                day: apiData.date.day,
                mo: apiData.date.monthname_short,
                yr: apiData.date.year,
                hi: apiData.high.fahrenheit,
                low: apiData.low.fahrenheit,
                icon: apiData.icon
              };
            });
          self.attachTemplate();
        },
        error: function(error) {
          $('.loader').addClass('hide');
          $('.message').removeClass('hide').html('').append(
            'Sorry, could not connect to the wunderground.com api');
        }
      });
    },

    attachTemplate: function() {
      console.log(this.records);

      var source   = $("#weather").html();
      var template = Handlebars.compile(source);
      $(".forecast").html(template( this.records ));
    }
  };

  App.init();

})();

/*
zipVal.('^[0-9]+$')

  onclick
  if value.length = 5 & numeric
  else display error message
  get input value from text field
  display spinner
  make ajax call
  on success display temp with icons
  change background color
    case
      0-49 blue
      50-70 orange
      71-89 orange-red
      90-100+ red
*/
