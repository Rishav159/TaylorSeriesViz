
var margin, w, h,width,height;
width = 1200;
height = 600;
margin = {
    top: 20,
    right: 10,
    bottom: 40,
    left: 40
};
w = width - margin.right;
h = height - margin.top - margin.bottom;
var maxRange = [-10, 10];
var xScale = d3.scale.linear().domain(maxRange).range([0, w]);
var yScale = d3.scale.linear().domain([-1.2, 1.2]).range([h, 0]);



function polynomial(coefs){
    return function(x) {
        var y = 0;
        for(var i = 0; i < coefs.length; i++) {
            y += coefs[i] * Math.pow(x,i);
        }
        return y;
    }
};

$(document).ready(function () {
    svg = d3.select('#graph').append('svg').attr('width', w + margin.left + margin.right).attr('height', h + margin.top + margin.bottom).append('g').attr('transform', "translate(" + margin.left + ", " + margin.top + ")");
    drawGraph(svg);
    var actualLine = drawLine(svg,actualFunction(),"blue");
    var taylor = polynomial(getTaylorSeries(1));
    var taylorLine = drawLine(svg,taylor,"yellow");
    $('#slider').on('input',function() {
        var val = parseInt($('#slider').val());
        taylor = polynomial(getTaylorSeries(val));
        animateLine(taylorLine,taylor)
    });
    $('#slider').val(0);
});
function drawGraph(svg) {
    svg.append("defs").append("clipPath").attr("id", "clip").append("rect").attr("width", w).attr("height", h);
    var xAxis = d3.svg.axis().scale(xScale).ticks(10).orient('bottom');
    svg.append('g').attr('class', 'x axis').attr("transform", "translate(0," + (h / 2) + ")").call(xAxis);
    var yAxis = d3.svg.axis().scale(yScale).ticks(10).orient('left');
    svg.append('g').attr('class', 'y axis').attr("transform", "translate(" + (w / 2) + ",0)").call(yAxis);

}

function generateData(f) {
    return d3.range(-500, 500).map(function (i) {
        return [i/50, f(i/50)];
    });
}

function drawLine(svg,f,color) {
    var data = generateData(f);
    var line = d3.svg.line().x(function (d) {
        return xScale(d[0]);
    }).y(function (d) {
        return yScale(d[1]);
    }).interpolate('basis');
    var g = svg.append('g').attr('clip-path', 'url(#clip)');
    return g.append('path').attr('class', 'line').data([data]).attr('d', line).style('fill', 'none').style('stroke', color).style('stroke-width', '2px');
}
function animateLine(path,f) {
    var data = generateData(f);
    var line = d3.svg.line().x(function (d) {
        return xScale(d[0]);
    }).y(function (d) {
        return yScale(d[1]);
    }).interpolate('basis'); 
    path.data([data]).transition().duration(2000).attr('d',line);
}