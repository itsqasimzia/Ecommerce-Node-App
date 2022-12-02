const bundleCartItems = (cartList) => {
    const sum = cartList.reduce(function(sums,entry){
        sums[entry.productname] = (sums[entry.productname] || 0) + 1;
        return sums;
       },{});

    let uniqueObjArray = [...new Map(cartList.map((item) => [item["productname"], item])).values()].map(item =>  {
     for (const [key,value] of Object.entries(sum)) {
       if (item.productname === key) {
           item[`count`] = value
       }
     }
     return item
    }) 
    return uniqueObjArray  
}


module.exports = {
    bundleCartItems
}