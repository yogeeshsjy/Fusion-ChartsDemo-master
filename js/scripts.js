(function(){
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.setShowPrintMargin();
  var inputFormat = "json";
  chartType = "column3d",
  chartSeries = "single",
  json4single = { 
    "chart": 
    { 
      "caption" : "Weekly Sales Summary" ,    
      "xAxisName" : "Week", 
      "yAxisName" : "Sales",  
      "numberPrefix" : "$" ,
      "bgColor":"#272822",
      "bgImage":'img/back.png',
      "showBorder":0
    },

    "data" : 
    [ 
    { "label" : "Week 1", "value" : "14400" },
    { "label" : "Week 2", "value" : "19600" }, 
    { "label" : "Week 3", "value" : "24000" }, 
    { "label" : "Week 4", "value" : "15700" } 
    ]
  },
  json4multiple = {
    "chart": {
      "caption": "Country Comparison",
      "showlabels": "1",
      "showvalues": "0",
      "decimals": "0",
      "numberprefix": "$",
      "bgColor":"#272822",
      "bgImage":'img/back.png',
      "showBorder":0
    },
    "categories": [
    {
      "category": [
      {
        "label": "Austria"
      },
      {
        "label": "Brazil"
      },
      {
        "label": "France"
      },
      {
        "label": "Germany"
      },
      {
        "label": "USA"
      }
      ]
    }
    ],
    "dataset": [
    {
      "seriesname": "1996",
      "color": "AFD8F8",
      "showvalues": "0",
      "data": [
      {
        "value": "25601.34"
      },
      {
        "value": "20148.82"
      },
      {
        "value": "17372.76"
      },
      {
        "value": "35407.15"
      },
      {
        "value": "38105.68"
      }
      ]
    },
    {
      "seriesname": "1997",
      "color": "F6BD0F",
      "showvalues": "0",
      "data": [
      {
        "value": "57401.85"
      },
      {
        "value": "41941.19"
      },
      {
        "value": "45263.37"
      },
      {
        "value": "117320.16"
      },
      {
        "value": "114845.27"
      }
      ]
    },
    {
      "seriesname": "1998",
      "color": "8BBA00",
      "showvalues": "0",
      "data": [
      {
        "value": "45000.65"
      },
      {
        "value": "44835.76"
      },
      {
        "value": "18722.18"
      },
      {
        "value": "77557.31"
      },
      {
        "value": "92633.68"
      }
      ]
    }
    ]
  },
  xml4single = "<chart  caption='Weekly Sales Summary' \n\t\txAxisName='Week' \n\t\tyAxisName='Sales' \n\t\tbgImage='img/back.png' \n\t\tshowBorder='0' \n\t\tbgColor='#272822' \n\t\tnumberPrefix='$'>\n"+ 
  "\t<set label='Week 1' value='14400' /> \n"+
  "\t<set label='Week 2' value='19600' /> \n"+
  "\t<set label='Week 3' value='24000' /> \n"+
  "\t<set label='Week 4' value='15700' /> \n"+
  "</chart>";
  xml4multiple = "<chart caption='Country Comparison' \n\t\t bgColor='#202020' \n\t\tshowLabels='1' \n\t\tshowvalues='0' \n\t\tdecimals='0' \n\t\tbgImage='img/back.png' \n\t\tshowBorder='0' \n\t\tnumberPrefix='$'>\n"+
  "\t<categories>\n"+
  "\t\t<category label='Austria' />\n"+
  "\t\t<category label='Brazil' />\n"+
  "\t\t<category label='France' />\n"+
  "\t\t<category label='Germany' />\n"+
  "\t\t<category label='USA' />\n"+
  "\t</categories>\n"+
  "\t<dataset seriesName='1996' color='AFD8F8' showValues='0'>\n"+
  "\t\t<set value='25601.34' />\n"+
  "\t\t<set value='20148.82' />\n"+
  "\t\t<set value='17372.76' />\n"+
  "\t\t<set value='35407.15' />\n"+
  "\t\t<set value='38105.68' />\n"+
  "\t</dataset>\n"+
  "\t<dataset seriesName='1997' color='F6BD0F' showValues='0'>\n"+
  "\t\t<set value='57401.85' />\n"+
  "\t\t<set value='41941.19' />\n"+
  "\t\t<set value='45263.37' />\n"+
  "\t\t<set value='117320.16' />\n"+
  "\t\t<set value='114845.27' />\n"+
  "\t</dataset>\n"+
  "\t<dataset seriesName='1998' color='8BBA00' showValues='0'>\n"+
  "\t\t<set value='45000.65' />\n"+
  "\t\t<set value='44835.76' />\n"+
  "\t\t<set value='18722.18' />\n"+
  "\t\t<set value='77557.31' />\n"+
  "\t\t<set value='92633.68' />\n"+
  "\t</dataset>\n"+
  "</chart>";

  //Initialize myChart
  var myChart = new FusionCharts( { 
    type: chartType,   
    width: '500',    
    height: '300',   
    debugMode : false 
  }); 
  
  if (chartSeries === "single") {
    //Default json Chart Values
    jsonObj =  json4single;
    xmlObj = xml4single;
  } else {
    jsonObj = json4multiple;
    xmlObj = xml4multiple;
  } 

  //Default Input Format
  editor.getSession().setMode("ace/mode/json"); //Set editor to JSON mode
  editor.getSession().setValue(JSON.stringify(jsonObj,null,"\t"),1); //Paste default chart values to the editor
  
  //Render the Chart for the first time
  myChart.setJSONData(jsonObj);
  myChart.render("chartContainer"); 
  

  // On changing Chart Type
  $("select.chartType").on("change",function(){
    chartType = this.value;
    myChart = new FusionCharts( { 
      type: chartType,   
      width: '500',    
      height: '300',   
      debugMode : false 
    }); 
    if(inputFormat === "json") {
      myChart.setJSONData(jsonObj);
      myChart.render("chartContainer"); 
    } else {
      myChart.setXMLData(xmlObj);
      myChart.render("chartContainer");
    };
  });

  //On Changing Input Format
  $("select.inputFormat").on("change",function(){
    inputFormat = this.value;
    myChart = new FusionCharts( { 
      type: chartType,   
      width: '500',    
      height: '300',   
      debugMode : false 
    }); 
    if(inputFormat === "xml") {
      editor.getSession().setMode("ace/mode/xml");
      editor.getSession().setValue(xmlObj);
      myChart.setXMLData(xmlObj);
      myChart.render("chartContainer"); 
    } else {
      editor.getSession().setMode("ace/mode/json");
      editor.getSession().setValue(JSON.stringify(jsonObj,null,"\t"));
      myChart.setJSONData(jsonObj);
      myChart.render("chartContainer"); 
    };
  });

  //On changing series type
  $("select.seriesType").on("change",function(){
    chartSeries = this.value;
    if(chartSeries === "single") {
     $(".multiple-series").hide();
     $(".single-series").show();
     chartType = "column3d";
     jsonObj = json4single;
     xmlObj = xml4single;
   } else if(chartSeries === "multiple"){
    $(".multiple-series").show();
    $(".single-series").hide();
    chartType = "mscolumn2d";
    jsonObj = json4multiple;
    xmlObj = xml4multiple;
  };

  //Create a new Chart
  myChart = new FusionCharts( { 
    type: chartType,   
    width: '500',    
    height: '300',   
    debugMode : false 
  }); 

  if(inputFormat === "xml") {
    editor.getSession().setMode("ace/mode/xml");
    editor.getSession().setValue(xmlObj);
    myChart.setXMLData(xmlObj);
    myChart.render("chartContainer"); 
  } else {
    console.log("I Created");
    editor.getSession().setMode("ace/mode/json");
    editor.getSession().setValue(JSON.stringify(jsonObj,null,"\t"));
    myChart.setJSONData(jsonObj);
    myChart.render("chartContainer"); 
  };

});

  //Thanks to Stack Overflow Question for this function
  function throttle(f, delay){
    var timer = null;
    return function(){
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = window.setTimeout(function(){
        f.apply(context, args);
      },
      delay || 1000);
    };
  }

  //Render Chart on Change of Data Function
  $("#editor").on("keyup",throttle(function(e){
    $("window").resize();
    var c= String.fromCharCode(e.keyCode);
    var isWord = c.match(/\w/);
    var isBackspaceOrDelete = (e.keyCode == 8 || e.keyCode == 46);
    if(isWord || isBackspaceOrDelete) {
      if(inputFormat === "json") {
        jsonObj = editor.getValue();
        myChart.setJSONData(jsonObj);
        myChart.render("chartContainer"); 
      } else {
        xmlObj = editor.getValue();
        myChart.setXMLData(xmlObj);
        myChart.render("chartContainer");
      };
    }
  }));
  

  //Themes
  $("select.editorTheme").on("change",function(){
    editor.setTheme("ace/theme/"+this.value);
  });

  $(".introtoggle").on("click",function(e){
    e.preventDefault();
    $(".intro").slideToggle(200);
    $(".showtext").slideToggle(200);
  });


})();