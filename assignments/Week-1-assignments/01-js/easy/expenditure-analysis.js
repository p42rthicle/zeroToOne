/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]

  Once you've implemented the logic, test your code by running
  - `npm run test-expenditure-analysis`
*/

function calculateTotalSpentByCategory(transactions) {
  let categoryWiseMap = {}

  for (let trans of transactions) {
    var key = trans.category
    categoryWiseMap[key] = (categoryWiseMap[key] || 0) + trans.price
  }

  let result = [];
  for (let key in categoryWiseMap) {
    result.push({ category: key, totalSpent: categoryWiseMap[key] });
  }

  // OR
  return Object.keys(categoryWiseMap).map(category =>({
    category: category,
    totalSpent: categoryWiseMap[category]
  }))
}

module.exports = calculateTotalSpentByCategory;
