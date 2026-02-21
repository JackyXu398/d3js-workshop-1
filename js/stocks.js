// ============================================================================
// STOCK PRICE VISUALIZATION ASSIGNMENT
// ============================================================================
// Your task: Complete this script to create a multi-line chart showing
// stock prices for Apple (AAPL), Google (GOOG), and Amazon (AMZN)
// 
// Follow the TODO comments and refer to demo.js Section 5 for guidance
// ============================================================================


// ============================================================================
// DATA LOADING
// ============================================================================
// Load CSV files for three stocks in parallel
// Pattern: d3.csv("filename").then(data => ({name: "SYMBOL", values: data}))


let stocks = await Promise.all([
    d3.csv("data/AAPL.csv").then(data => ({ name: "AAPL", values: data })),
    d3.csv("data/GOOG.csv").then(data => ({ name: "GOOG", values: data })),
    d3.csv("data/AMZN.csv").then(data => ({ name: "AMZN", values: data })),
    d3.csv("data/IBM.csv").then(data => ({ name: "IBM", values: data })),  
    d3.csv("data/MSFT.csv").then(data => ({ name: "MSFT", values: data })) 
]);

console.log("Loaded stocks:", stocks);


// ============================================================================
// DATA PROCESSING
// ============================================================================
// Convert string values to proper types (dates and numbers)
// Remember: CSV data loads as strings!

stocks.forEach(stock => {
    stock.values.forEach(d => {
        // Parse the date string into a JavaScript Date object
        d.Date = new Date(d.Date);
        
        // Use the unary plus operator (+) to convert string values to numbers
        d.Close = +d.Close;
        d.Open = +d.Open;
        d.High = +d.High;
        d.Low = +d.Low;
        d.Volume = +d.Volume;
    });

    // Sort data chronologically to ensure the line path connects points correctly
    stock.values.sort((a, b) => a.Date - b.Date);
});

console.log("Processed first stock:", stocks[0].values[0]);


// ============================================================================
// CHART DIMENSIONS
// ============================================================================
// Set up the size and margins for the chart
// This is provided - the margin convention is standard D3 practice

const margin = { top: 50, right: 160, bottom: 50, left: 100 };
const width = 1000 - margin.left - margin.right;
const height = 800 - margin.top - margin.bottom;


// ============================================================================
// SVG SETUP
// ============================================================================
// Create the SVG container and add a group for margins
// This is provided - focus on the scales and drawing instead

const svg = d3.select('#chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);


// ============================================================================
// CREATE SCALES
// ============================================================================
// Scales map data values to pixel positions

// Create a flat array of all data points to find global min/max values
const allValues = stocks.flatMap(s => s.values);

// X Scale: Maps Date objects to horizontal pixel positions
const x = d3.scaleUtc()
    .domain(d3.extent(allValues, d => d.Date)) // Gets [minDate, maxDate]
    .range([0, width]);

// Y Scale: Maps Price numbers to vertical pixel positions
const y = d3.scaleLinear()
    .domain([
        d3.min(allValues, d => d.Close),
        d3.max(allValues, d => d.Close)
    ])
    .range([height, 0]); // SVG y=0 is at the top, so we invert the range

// Color Scale: Assigns a unique color to each stock name
const color = d3.scaleOrdinal(d3.schemeCategory10)
    .domain(stocks.map(d => d.name));


// ============================================================================
// ADD AXES
// ============================================================================
// Create and position the x and y axes

// X Axis - Shows years along the bottom
const xAxis = d3.axisBottom(x).ticks(d3.timeYear.every(1)).tickFormat(d3.timeFormat('%Y'));
svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis);

svg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis)
    .selectAll('text')
    .style('font-size', '12px');

// Y Axis - Shows prices along the left side
const yAxis = d3.axisLeft(y).tickFormat(d => `$${d}`);
svg.append('g')
    .call(yAxis);

svg.append('g')
    .attr('class', 'y-axis')
    .call(yAxis)
    .selectAll('text')
    .style('font-size', '12px');


// ============================================================================
// DRAW LINES
// ============================================================================
// Create a line for each stock

// TODO: Create a line generator using d3.line()
// Define and append the X-axis (bottom)


// Define and append the Y-axis (left)


// Line generator: Maps data points to a path string
const line = d3.line()
    .x(d => x(d.Date))
    .y(d => y(d.Close))
    .curve(d3.curveMonotoneX); // Smooths the line

// Draw a path element for each stock
stocks.forEach(stock => {
    svg.append('path')
        .datum(stock.values) // Use .datum for a single continuous path
        .attr('fill', 'none')
        .attr('stroke', color(stock.name))
        .attr('stroke-width', 2)
        .attr('d', line);
});

// ============================================================================
// ADD LABELS
// ============================================================================
// Add title and axis labels to make the chart readable
// ============================================================================
// ADD LABELS
// ============================================================================

// Chart Title
svg.append('text')
    .attr('class', 'chart-title')
    .attr('x', width / 2) // Centers the title
    .attr('y', -margin.top / 2) // Places it in the top margin area
    .attr('text-anchor', 'middle')
    .style('font-size', '18px')
    .style('font-weight', 'bold')
    .text("Historical Stock Prices: AAPL, GOOG, AMZN");

// X Axis Label
svg.append('text')
    .attr('class', 'x-axis-label')
    .attr('x', width / 2) // Centers the label
    .attr('y', height + margin.bottom - 10) // Positions it below the x-axis
    .attr('text-anchor', 'middle')
    .style('font-size', '14px')
    .text("Year");

// Y Axis Label
svg.append('text')
    .attr('class', 'y-axis-label')
    .attr('transform', 'rotate(-90)') // Rotates the text 90 degrees counter-clockwise
    .attr('x', -height / 2) // Centers it vertically relative to chart height
    .attr('y', -margin.left + 40) // Offsets it to the left of the axis
    .attr('text-anchor', 'middle')
    .style('font-size', '14px')
    .text("Stock Price (USD)");
    



// ============================================================================
// ADD LEGEND
// ============================================================================
// Create a legend showing which color represents which stock

const legend = svg.append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(${width + 20}, 0)`);


stocks.forEach((stock, i) => {
    const legendRow = legend.append('g')
        .attr('transform', `translate(0, ${i * 20})`);

    // Colored line segment for the legend
    legendRow.append('line')
        .attr('x1', 0)
        .attr('y1', 10)
        .attr('x2', 20)
        .attr('y2', 10)
        .attr('stroke', color(stock.name))
        .attr('stroke-width', 2);

    // Stock name text
    legendRow.append('text')
        .attr('x', 25)
        .attr('y', 14) // Slightly offset to align with the line
        .attr('text-anchor', 'start')
        .style('font-size', '12px')
        .text(stock.name);
});



// ============================================================================
// BONUS
// ============================================================================

/**
 * Edit the code above to also add IBM and MSFT stock price visualization
 */
// Modify the DATA LOADING section like this:
