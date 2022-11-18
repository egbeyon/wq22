const Reserve = require('../models/reserve');
const Product = require('../models/product');
const Farm = require('../models/farm');

const farmUserModeling = async (farms, username) => {
  const userReserves = await Reserve.find({ username: username });

  if (userReserves.length) {
    let farmResult = {};
    userReserves.map(userReserve => {
      const id = userReserve.farmId;
      farmResult.hasOwnProperty(id) ? ++farmResult[id] : (farmResult[id] = 1);
    });

    const sortedFarmResult = [];
    for (let farm in farmResult) {
      sortedFarmResult.push([farm, farmResult[farm]]);
    }

    sortedFarmResult.sort((a, b) => {
      return b[1] - a[1];
    });
    console.log(sortedFarmResult);

    const newFarms = JSON.parse(JSON.stringify(farms));
    let i = 0;
    let extractedObj;
    for (let sortedFarm of sortedFarmResult) {
      newFarms.forEach((farm, index) => {
        if (farm._id === sortedFarm[0]) {
          console.log('FOUND');
          extractedObj = newFarms.splice(index, 1);
        }
      });
      newFarms.splice(i, 0, extractedObj[0]);
      i++;
    }

    console.log(newFarms);

    return newFarms;
  } else {
    return farms;
  }
};

const productsUserModeling = async username => {
  userPreference = {
    quantity: {},
    price: {}
  };

  const userReserves = JSON.parse(
    JSON.stringify(await Reserve.find({ username: username }))
  );
  const Allproducts = JSON.parse(JSON.stringify(await Product.find({})));

  const productsGotten = userReserves.map(reserve => {
    for (let product of Allproducts) {
      if (product._id == reserve.productId) {
        return product;
      }
    }
  });

  productsGotten.map(product => {
    let typos = product.typo.replace(/\s*,\s*/g, ',').split(',');
    for (let typo of typos) {
      userPreference.typo[typo]
        ? ++userPreference.typo[typo]
        : (userPreference.typo[typo] = 1);
    }

  //find products that are available for order
  const availableProducts = availableProductsFilter(Allproducts);
  const productsNotGotten = productsNotGottenFilter(availableProducts, userReserves);

  const productsRated = findRates(productsNotGotten, userPreference);

  productsRated.sort((a, b) => {
    return b[1] - a[1];
  });

  const productsToObject = productsRated.map(array => {
    return array[0];
  });
  return productsToObject;
});
}

const findRates = (productsNotGotten, userPreference) => {
  const result = [];
  let rate;
  for (let product of productsNotGotten) {
    rate = 0;
    for (let pref in userPreference) {
      rate += getRateOfProperty(pref, userPreference, product);
      //TODO we can use weights here
      console.log(rate, pref);
    }
    if (rate !== 0) result.push([product, rate]);
  }
  return result;
};

const getRateOfProperty = (pref, userPreference, product) => {
  let rate = 0;
  const values = Object.keys(userPreference[pref]).map(key => {
    return [key, userPreference[pref][key]];
  });
  let productValues = product[pref].replace(/\s*,\s*/g, ',').split(',');
  for (value of values) {
    if (productValues.length) {
      for (productValue of productValues) {
        if (productValue == value[0]) {
          rate += value[1];
        }
      }
    }
  }

  return rate;
};

const availableProductsFilter = Allproducts => {
  const today = new Date();
  const returnProducts = [];
  Allproducts.map(product => {
    let releaseDate = new Date(product.releaseDate);
    let endDate = new Date(product.endDate);
    if (today >= releaseDate && today <= endDate) {
      returnProducts.push(product);
    }
  });
  return returnProducts;
};

const productsNotGottenFilter = (availableProducts, userReservations) => {
  const returnProducts = [];
  availableProducts.map(product => {
    let isFirst = [];
    for (let reservation of userReservations) {
      if (reservation.productId == product._id) {
        isFirst.push(false);
      } else {
        isFirst.push(true);
      }
    }

    if (isFirst.every(Boolean)) {
      returnProducts.push(product);
    }
  });
  return returnProducts
};


const userModel = {
  farmUserModeling,
  productsUserModeling
};

module.exports = userModel;
