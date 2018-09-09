//Return the function that you need to approximate
function actualFunction() {
    return function(x) {
        return Math.cos(x);
    }
}
//Return the coefficients for the taylor series upto 'max' terms
function getTaylorSeries(max) {
    var series = [];
    var sign = 1;
    for(var i = 0; i < max; i++) {
        if(i%2 == 0){
            series.push(sign* (1 / (factorial(i))));
            sign = sign*-1;
        }else{
            series.push(0);
        }   
    }
    return series;
}

var facts = [];
function factorial (n) {
  if (n == 0 || n == 1)
    return 1;
  if (facts[n] > 0)
    return facts[n];
  facts[n] = factorial(n-1) * n;
  return facts[n];
};