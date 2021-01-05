window.onload = function () {
  var chart = new CanvasJS.Chart('chartContainer', {
    title: {
      text: 'Hourly Weather Forecast',
      fontFamily: 'sans-serif',
      fontColor: '#43a047',
      fontSize: '18',
      padding: '20',
    },
    axisY: {
      title: 'Temperature, °F',
      titleFontFamily: 'sans-serif',
      includeZero: false,
      suffix: ' ',
      maximum: 140,
      minimum: 0,
      gridThickness: 0,
    },
    toolTip: {
      shared: false,
    },
    data: [
      {
        type: 'splineArea',
        name: 'Precipitation',
        fillOpacity: 0.1,
        color: '#2196f3',
        indexLabelFontSize: 14,
        indexLabelFontColor: '#1565c0',
        indexLabelFormatter: formatter_Precip,
        yValueFormatString: "Precipitation: #'%'",
        dataPoints: [
          { label: '8:00 AM', y: 20, name: 'cloudy' },
          { label: '9:00 AM', y: 25, name: 'cloudy' },
          { label: '10:00 AM', y: 40, name: 'cloudy' },
          { label: '11:00 AM', y: 50, name: 'cloudy' },
          { label: '12:00 AM', y: 60, name: 'rainy' },
          { label: '1:00 PM', y: 70, name: 'rainy' },
          { label: '2:00 PM', y: 80, name: 'rainy' },
          { label: '3:00 PM', y: 90, name: 'thunderstorm' },
          { label: '4:00 PM', y: 90, name: 'thunderstorm' },
          { label: '5:00 PM', y: 70, name: 'rainy' },
          { label: '6:00 PM', y: 50, name: 'rainy' },
        ],
      },
      {
        type: 'spline',
        fillOpacity: 0.1,
        name: 'Temperature',
        color: '#2e7d32',
        indexLabelFontSize: 14,
        indexLabelFontColor: '#2e7d32',
        indexLabelFormatter: formatter_Temp,
        yValueFormatString: '## °F',
        dataPoints: [
          { label: '8:00 AM', y: 87 },
          { label: '9:00 AM', y: 88 },
          { label: '10:00 AM', y: 85 },
          { label: '11:00 AM', y: 84 },
          { label: '12:00 PM', y: 82 },
          { label: '1:00 PM', y: 80 },
          { label: '2:00 PM', y: 80 },
          { label: '3:00 PM', y: 78 },
          { label: '4:00 PM', y: 76 },
          { label: '5:00 PM', y: 76 },
          { label: '6:00 PM', y: 74 },
        ],
      },
    ],
  });
  chart.render();

  var images = [];

  addImages(chart);

  function addImages(chart) {
    for (var i = 0; i < chart.data[0].dataPoints.length; i++) {
      var dpsName = chart.data[0].dataPoints[i].name;
      if (dpsName == 'cloudy') {
        images.push($('<img>').attr('src', 'img/icons/cloudy.png'));
      } else if (dpsName == 'rainy') {
        images.push($('<img>').attr('src', 'img/icons/rainy.png'));
      } else if (dpsName == 'sunny') {
        images.push($('<img>').attr('src', 'img/icons/sunny.png'));
      } else if (dpsName == 'thunderstorm') {
        images.push($('<img>').attr('src', 'img/icons/thunderstorm.png'));
      }

      images[i]
        .attr('class', dpsName)
        .appendTo($('#chartContainer>.canvasjs-chart-container'));
      positionImage(images[i], i);
    }
  }

  function positionImage(image, index) {
    var imageCenter = chart.axisX[0].convertValueToPixel(
      chart.data[0].dataPoints[index].x
    );
    var imageTop = chart.axisY[0].convertValueToPixel(chart.axisY[0].maximum);

    image.width('40px').css({
      left: imageCenter - 20 + 'px',
      position: 'absolute',
      top: imageTop + 'px',
      position: 'absolute',
    });
  }

  $(window).resize(function () {
    var cloudyCounter = 0,
      rainyCounter = 0,
      sunnyCounter = 0,
      thunderstormCounter = 0;
    var imageCenter = 0;
    for (var i = 0; i < chart.data[0].dataPoints.length; i++) {
      imageCenter =
        chart.axisX[0].convertValueToPixel(chart.data[0].dataPoints[i].x) - 20;
      if (chart.data[0].dataPoints[i].name == 'cloudy') {
        $('.cloudy')
          .eq(cloudyCounter++)
          .css({ left: imageCenter });
      } else if (chart.data[0].dataPoints[i].name == 'rainy') {
        $('.rainy')
          .eq(rainyCounter++)
          .css({ left: imageCenter });
      } else if (chart.data[0].dataPoints[i].name == 'sunny') {
        $('.sunny')
          .eq(sunnyCounter++)
          .css({ left: imageCenter });
      } else if (chart.data[0].dataPoints[i].name == 'thunderstorm') {
        $('.thunderstorm')
          .eq(thunderstormCounter++)
          .css({ left: imageCenter });
      }
    }
  });

  function formatter_Precip(e) {
    if (e.dataPoint.x === 0) {
      return 'Precip. ' + e.dataPoint.y + '%';
    } else {
      return e.dataPoint.y + '%';
    }
  }

  function formatter_Temp(e) {
    if (e.dataPoint.x === 0) {
      return 'Temp ' + e.dataPoint.y + '°F';
    } else {
      return e.dataPoint.y + '°F';
    }
  }
};
