function recommend_time_block(prices, n) {
  // prices: an array of prices
  // n: number of contiguous blocks to recommend
  // returns: start and end times with the lowest average price

  // Filter to 8.30am - 5.30pm
  prices = prices.slice(17, 35);
  var total_price = Array(prices.length - n + 1);
  var hours = [...Array(prices.length).keys()].map(function (x) {
    return 8.5 + 0.5 * x;
  });

  // Calculate the total price for each block
  for (var i = 0; i < total_price.length; i++) {
    total_price[i] = prices.slice(i, i + n).reduce(function (a, b) {
      return a + b;
    });
  }

  // Return indices of sorted total prices
  var sorted_indices = total_price
    .map(function (x, i) {
      return i;
    })
    .sort(function (a, b) {
      return total_price[a] - total_price[b];
    });

  // Return the start hours corresponding to the lowest total price
  return sorted_indices.map(function (x) {
    return hours[x];
  });
}

var dummy_data = [
  174.82, 177.51, 173.67, 162.14, 146.08, 131.13, 122.58, 123.04, 131.48,
  144.28, 157.29, 168.04, 176.7, 185.74, 198.22, 215.97, 238.36, 262.21, 282.96,
  296.35, 299.88, 293.76, 280.77, 265.51, 253.15, 248.02, 252.48, 266.1, 285.55,
  305.43, 319.77, 324.12, 317.4, 302.65, 286.31, 275.85, 276.75, 289.96, 311.08,
  331.8, 343.14, 339.13, 319.36, 289.13, 257.17, 231.92, 218.07, 214.96,
];

console.log(recommend_time_block(dummy_data, 1));

/* 
Output:
    [11.5, 12, 11, 12.5, 10.5, 13, 10, 8.5, 9.5, 9, 13.5, 15.5, 14, 15, 14.5]
    for 2 hour contiguous blocks
*/
