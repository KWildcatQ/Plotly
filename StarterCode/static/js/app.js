  // Import .json and meta-data
  function metaData(sample){
    d3.json("https://kwildcatq.github.io/Plotly-Challenge-HW/data/samples.json").then((data) => {
      var sampleNames = data.names;
      var metaData = data.metadata;
      var resultArray = metaData.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
    //console.log(result);
    //Setting panel to user selection and fetching/displaying values
    var panel = d3.select("#sample-metadata");
      panel.html ("");
      Object.entries(result).forEach(function([key, value]) {
        panel.append("h6").text(value);
      })
    }
  )}

// Event Listener for OptionChange
  function optionChanged(input) {
  metaData(input);
  console.log(input);
  chartSetup(input);
}

// This function is called when a dropdown menu item is selected
  function updatePlotly() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  // Assigning value of the dropdown menu option to a variable
  var dataset = dropdownMenu.property("value");
  console.log(dataset);}

// Setting .json file into a variable/reading json data
  var selector = d3.select("#selDataset");
    d3.json("https://kwildcatq.github.io/Plotly-Challenge-HW/data/samples.json").then((data) => {
   // Call updatePlotly() when a change takes place to the DOM
    var sampleNames = data.names;
   // Obtaining IDs for drop down menu
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value",sample);
      //Test of ID data in drop down menu
      //console.log(sample)
      })
    });

// Importing .json data for and chart setup
  function chartSetup(sample){
    d3.json("https://kwildcatq.github.io/Plotly-Challenge-HW/data/samples.json").then((data) => {
      var sampleNames = data.names;
      var samples = data.samples;
      var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
  
      var values = result.sample_values;
      var ids = result.otu_ids;
      var labels = result.otu_labels;
      console.log(result);
      // Create Bubble Chart
      var trace1 = {
        x: ids,
        y: values, 
        text: labels,
        mode: 'markers',
        marker: {
          size: values,
          color: ids,
          
        }
      };
      var bubbleData = [trace1];
      
      var bubbleLayout = {
        title: '',
        showlegend: false,
        height: 600, 
        width: 600
      };
      
      Plotly.newPlot('bubble', bubbleData, bubbleLayout);

      // Creating 'filter' of top 10 OTUs. 
      var yticks = ids
        .slice(0, 10)
        .map(function(otuID) {
          return `OTU ${otuID}`
        })
        .reverse();

      // Create Bar Chart
      var trace2= {
        x: values.slice(0, 10).reverse(),
        y: yticks,
        type: 'bar',
        text: labels,
        orientation: 'h',
        marker: {
          size: values,
          color: 'rgb'
        }
      };
      
      var barData = [trace2];
      
      var barLayout = {
        title: 'Top 10 OTUs',
        font: {
          family:'Raleway, sans-serif'
        },
        showlegend: false,
      };
      
      Plotly.newPlot('bar', barData, barLayout);
    }
  )};
    

