arr = [1, 2, 3];
const arr2 = arr.map(x => x*2).reverse();
arr2[1] = 10;
console.log(arr)
console.log(arr2);