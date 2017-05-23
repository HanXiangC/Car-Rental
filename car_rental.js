// Customer Object
var customerInfoInitial = {
    id: "Generic ID",
    name: "Jameson Higgleston",
    carRented: null,
};



var carInfoInitial = {
    id: "testID",
    producer: "testProducer",
    model: "testMode",
    rentalPricePerDay: 6,
    available: true,
    customer: null,
    rentalDuration: 0,
};

var Customer = function (customerInfo) {
    this.id = customerInfo.id;
    this.name = customerInfo.name;
    this.carRented = customerInfo.carRented;
};

// Car Object
var Car = function (carInfo) {

  this.id = carInfo.id;
  this.producer = carInfo.producer;
  this.model = carInfo.model;
  this.rentalPricePerDay = carInfo.rentalPricePerDay;
  this.available = true;

  this.quotePrice = function(rentalDuration){
    return this.rentalPricePerDay * rentalDuration;
  }

  this.reserve = function(customer, rentalDuration){
    if(this.available){
      this.available = false;
      this.customer = customer;
      this.rentalDuration = rentalDuration;
      return true;
    }else{
      return false;
    }
  }

  this.return = function(){
    if(this.available){
      return "Sorry, this car has already been returned.";
    }else{
      this.available = true;
      this.customer = null;
      this.rentalDuration = null;
    }
  }

};



var Vendor = function(name) {
  this.name = name;
  this.cars = [];
  this.customers = [];

  this.findCarIndex = function (carID) {
    return this.cars.findIndex(function(car){
      return car.id === carID ? true : false ;
    });
  };

  this.findCustomerIndex = function (customerID) {
    return this.customers.findIndex(function(customer){
      return customer.id === customerID ? true : false ;
    });
  };

  this.getCar = function (carID) {
    return this.cars.find(function(car){
      return car.id === carID ? true : false ;
    });
  };

  this.getCustomer = function (customerID) {
    return this.customers.find(function(customer){
      return customer.id === customerID ? true : false ;
    });
  };

  this.addCar = function(carObj) {
    if(this.getCar(carObj.id)){
      console.log("ID already exists");
    }else{
      this.cars.push(carObj);
      console.log("Car added to warehouse");
    }
  }

  this.addCustomer = function(customerObj) {
    if(this.getCustomer(customerObj.id)){
      console.log("ID already exists");
    }else{
      this.customers.push(customerObj);
      console.log("Customer added to warehouse");
    }
  }

  this.removeCar = function(carID){
    if(this.findCarIndex(carID) >= 0){
      this.cars.splice(this.findCarIndex(carID), this.findCarIndex(carID) + 1);
      console.log("Car deleted");
    }else{
      console.log("Car not found")
    }
  }
  this.removeCustomer = function(customerID){
    if(this.findCustomerIndex(customerID) >= 0){
      this.customers.splice(this.findCustomerIndex(customerID), this.findCustomerIndex(customerID) + 1);
      console.log("Customer deleted");
    }else{
      console.log("Customer not found")
    }
  }

  this.isAvailable = function(x){
    if(x.available){
      return true;
    }
    return false;
  }

  this.availableCars = function(){
    var newArray = this.cars.filter(isAvailable);
    return newArray;
  }



  this.rentCar = function(customerID, rentalDuration){
    var availableCars = this.availableCars();
    if(availableCars.length == 0){
      console.log("All our cars have been rented");
    }else{
      if(this.getCustomer(customerID)){
        this.getCustomer(customerID).carRented = availableCars[0];
        availableCars[0].reserve(this.getCustomer(customerID), rentalDuration);
        console.log("The car has been reserved");
      }else{
        console.log("Please provide a valid customerID");
      }
    }
  }


//  - The `totalRevenue` function takes no arguments. Use the array.reduce to sum up the revenues for each car.

  this.returnCar = function(customerID){

    if(this.getCustomer(customerID)){
      this.getCustomer(customerID).carRented.return();
      this.getCustomer(customerID).carRented = null;
      console.log( "Thank you for using our service");
    }else{
      console.log("Please provide a valid customerID");
    }
  }

  // FRONTLINE **********************************



  this.totalRevenue = function(){
    return this.cars.reduce(function(acc, obj){ return acc + obj.quotePrice(obj.rentalDuration); }, 0)
  }

};


// Codes you can run to test your code
var customerInfo = {
  id: "001",
  name: "Sherman"
};

var customerA = new Customer(customerInfo);

var carInfo = {
  id: "001",
  producer: "Toyota",
  model: "Subra",
  rentalPricePerDay: 200,
};

var carA = new Car(carInfo);

var vendor = new Vendor('Jens Limited');
vendor.addCustomer(customerA);
vendor.addCar(carA);

console.log(vendor.availableCars());
console.log(vendor.availableCars());

vendor.rentCar(customerA.id, 5);
vendor.totalRevenue();
vendor.removeCustomer("001")
vendor.removeCar("001")
