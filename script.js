let products = [
  {
    id: 1,
    name: "iPhone 15",
    price: 2500,
    category: "smartphone",
    description: "Apple şirkətinin yeni nəsil telefonu",
    stock: 10,
    is_active: true,
  },
  {
    id: 2,
    name: "Huawei",
    price: 2300,
    category: "smartphone",
    description: "Huawei smartfonları qabaqcıl texnologiyası",
    stock: 8,
    is_active: false,
  },
  {
    id: 3,
    name: "Asus Vivobook",
    price: 3200,
    category: "laptop",
    description:
      "Discover ASUS Vivobook, the perfect laptop for everyday use and casual tasks.",
    stock: 5,
    is_active: true,
  },
];

let id = 1000;

let name = "";
let price = 0;
let category = "";
let description = "";
let stock = 0;

function getName() {
  const value = prompt("Product name:");
  if (value && value.trim().length > 0) {
    name = value.trim();
  } else {
    getName();
  }
}

function getPrice() {
  const value = prompt("Product price:");
  if (!isNaN(value) && value > 0) {
    price = Number(value);
  } else {
    getPrice();
  }
}

function getCategory() {
  const value = prompt("Product category:");
  if (value && value.trim().length > 0) {
    category = value.trim();
  } else {
    getCategory();
  }
}

function getDescription() {
  const value = prompt("Product description:");
  if (value && value.trim().length > 0) {
    description = value.trim();
  } else {
    getDescription();
  }
}

function getStock() {
  const value = prompt("Product stock:");
  if (!isNaN(value) && value >= 0) {
    stock = value;
  } else {
    getStock();
  }
}

const addProduct = () => {
  getName();
  getPrice();
  getCategory();
  getDescription();
  getStock();

  const newProduct = {
    id: id + 1,
    name,
    price,
    category,
    description,
    stock,
    is_active: false,
  };
  products.push(newProduct);
  console.log("Yeni mehsul elave olundu", newProduct);
};

console.log(addProduct());

const listProducts = () => {
  if (products.length) {
    console.log(products);
  } else {
    console.log("Mehsul yoxdu");
  }
};
console.log(listProducts());

const editProducts = (id) => {
const product = products.find(item => item.id === id);
if(product){
  const updatedList= products.map(item=>{
    if(item.id===product.id){
      return {
        ...product,
        stock:3400,
      }
    }else{
      return item
    }
  });
  products=updatedList
  console.log("Mehsul melumatlari deyisildi", products[id-1]);
}
};

console.log(editProducts(2));

const showProductDetails=(id)=> {
  const product = products.find(item => item.id === id);
  if (product) {
      console.log(product);
  }else{
    console.log("Axtardiginiz mehsul tapilmadi");
  }
}

console.log(showProductDetails(3));

const deleteProduct=(id)=>{
  const isDelete = confirm("Mehsul silinsin?");
  if(isDelete){
   const updatedList = products.filter((item)=>item.id!==id);
   products=updatedList
   console.log("Silindi", updatedList);
  }
}

console.log(deleteProduct(2));

const searchProduct = () => {
  const searchedValue = prompt("Axtardiginiz mehsulun adini daxil edin:");

  if (searchedValue && searchedValue.trim().length > 0) {
  const foundProducts = products.filter((item) =>
  item.name.toLocaleLowerCase("az").includes(searchedValue.toLocaleLowerCase("az"))
);
    if (foundProducts) {
      console.log("Tapilan mehsul:", foundProducts);
    } else {
      console.log("Bele bir mehsul tapilmadi.");
    }
  }
};

console.log(searchProduct());

const productStatus = (id) => {
  const product = products.find(item => item.id === id);
  if (product) {
    const updatedList = products.map(item => {
      if (item.id === product.id) {
        return {
          ...product,
          is_active: true,
        };
      } else {
        return item;
      }
    });
    products = updatedList;
    console.log("mehhsulun aktivlik statusu deyisdi:", products[id - 1]);
  }
};

console.log(productStatus(2));

const sortProducts = (order = "asc") => {
  if (order === "asc") {
    const updatedList = products.sort((a, b) => a.price - b.price);
    console.log("Artan qiymətə görə sıralandı:", updatedList);
  } else {
    const updatedList = products.sort((a, b) => b.price - a.price);
    console.log("Azalan qiymətə görə sıralandı:", updatedList);
  }
};

console.log(sortProducts("asc"));
console.log(sortProducts("desc") );

let basket = [
  { product_id: 1, quantity: 2 },
  { product_id: 2, quantity: 4 },
];


const showBasket = () => {
  if (basket.length === 0) {
    console.log("sebet bosdur");
  }

  let total = 0;
  for (let item of basket) {
    const product = products.find(p => p.id === item.product_id);

    if (!product) {
      console.log(`ID-si ${item.product_id} olan məhsul tapılmadı.`);
      return;
    }

    const totalPrice = product.price * item.quantity;
   total = total + totalPrice;


    console.log(`${product.name} ${item.quantity} eded - ${totalPrice} azn`);
  }

  console.log("total", total);
};


const addToBasket = (product_id, quantity) => {
  const product = products.find(item => item.id === product_id);

  if (!product) {
    console.log("mehsul tapilmadi.");
  }

  if (!product?.is_active) {
    console.log("bu mehsul aktiv deyil.");
  }
  if (product.stock < quantity) {
    console.log("stok kifayet deyil.");
  }

  let item = basket.find(item => item.product_id === product_id);

  if (item) {
    item.quantity += quantity;
  } else {
    basket.push({ product_id, quantity });
  }

  console.log("Mehsul sebete elave olundu.");
};



const removeFromBasket = product_id => {
  basket = basket.filter(item => item.product_id !== product_id);
  console.log("Mehsul sebetden silindi.");
};

const clearBasket = () => {
  basket = [];
  console.log("sebet tamamile temizlendi.");
};


addToBasket(1, 1);     
addToBasket(3, 2);    
showBasket();           
removeFromBasket(1);    
showBasket();          
clearBasket();          