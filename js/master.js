let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let tbody = document.getElementById("tbody");
mood = "create";
// Global var 
let temp;

// function getTotal 
function getTotal() {
   if (price.value !== "") {
      let res = (+price.value + +taxes.value + +ads.value) - +discount.value;
      total.innerHTML = res;
      total.style.backgroundColor = "#040";
   }
   else {
      total.innerHTML = '';
      total.style.backgroundColor = "#a00d02";
   }
}

// create product 

let dataproduct = [];

if (localStorage.product != null) {
   dataproduct = JSON.parse(localStorage.product);
 
}

create.onclick = function () {
   let newproduct = {
      title:title.value.toLowerCase(),
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value.toLowerCase(),
   }


   if (title.value != '' && price.value != '' && category.value != '' && count.value <= 100 ){

         if (mood === "create"){
            if (newproduct.count > 1)
            {
               for (let i = 0 ; i < newproduct.count ; i++ ){
                  dataproduct.push(newproduct);
               }
            }
            else{
               dataproduct.push(newproduct);
            }
         }
         else {
            dataproduct[temp] = newproduct;
            count.style.display = "block";
            mood = "create";
            create.innerHTML = "create";
         }
          // clear inputs 
          clearData();
   }

   localStorage.setItem("product", JSON.stringify(dataproduct));
   // add data to table
   ReadData();

}

// clear inputs 
function clearData() {
   title.value = "";
   price.value = "";
   taxes.value = "";
   ads.value = "";
   discount.value = "";
   total.innerHTML = "";
   count.value = "";
   category.value = "";
}

// Read data 
function ReadData() {
   getTotal();
   let table = '';
   for (let i = 0; i < dataproduct.length; i++) {
         table += `
         <tr>
            <td>${i+1}</td>
            <td>${dataproduct[i].title}</td>
            <td>${dataproduct[i].price}</td>
            <td>${dataproduct[i].taxes}</td>
            <td>${dataproduct[i].ads}</td>
            <td>${dataproduct[i].discount}</td>
            <td>${dataproduct[i].total}</td>
            <td>${dataproduct[i].category}</td>
            <td><button id="update" onclick="updateData(${i})">Update</button></td>
            <td><button id="delete" onclick="deleteData(${i})" > Delete </button></td>
          </tr>
      `
   }

  
   document.getElementById("tbody").innerHTML = table;
   

   //  clear all button
   let btnDelete = document.getElementById('deleteAll');
   if(dataproduct.length > 0) {
       btnDelete.innerHTML = `<button id = "clearAll"> delete All ( ${dataproduct.length} )</button>`;      
       document.getElementById("clearAll").addEventListener("click" , clear);

   }
   else {
          btnDelete.innerHTML = ``;
   }
}


ReadData();

// delete  item from table
 function deleteData(i){
   dataproduct.splice(i , 1);
   localStorage.product = JSON.stringify(dataproduct);
   ReadData();
   console.log(i);
}

// delete All Data 
function clear() {
   localStorage.clear();
   dataproduct.splice(0);
   ReadData();
}



// update 
function updateData(i){
   getTotal();
   title.value = dataproduct[i].title;
   price.value = dataproduct[i].price;
   taxes.value = dataproduct[i].taxes;
   ads.value = dataproduct[i].ads;
   discount.value = dataproduct[i].discount;
   category.value = dataproduct[i].category;
   getTotal();
   count.style.display ="none";
   create.innerHTML = `Updata`;
   mood = "update";
   temp = i;
   scroll({
      top:0,
      behavior:"smooth",
   });
} 


//  search
let searchMood ="";
function getSearch(id){
   let search = document.getElementById("search");
   if (id === "SearchTitle") {
      searchMood = "title";  
       search.placeholder = "search By Title";
   }
   else {
      searchMood = "cateogry";    
      search.placeholder = "search By cateogry";  
   }
   search.focus();
   search.value = "";
   
} 

function searchData(value){ 
  
  let  table = '';
   if (searchMood === 'title'){

         for (let i = 0  ; i < dataproduct.length ; i++){
               if (dataproduct[i].title.toLowerCase().includes(value.toLowerCase())){

                  table += `
                  <tr>
                     <td>${i+1}</td>
                     <td>${dataproduct[i].title}</td>
                     <td>${dataproduct[i].price}</td>
                     <td>${dataproduct[i].taxes}</td>
                     <td>${dataproduct[i].ads}</td>
                     <td>${dataproduct[i].discount}</td>
                     <td>${dataproduct[i].total}</td>
                     <td>${dataproduct[i].category}</td>
                     <td><button id="update" onclick="updateData(${i})">Update</button></td>
                     <td><button id="delete" onclick="deleteData(${i})" > Delete </button></td>
                  </tr>
               `
               }
         }   
   }
   
    else {
      for (let i = 0  ; i< dataproduct.length ; i++){
         if (dataproduct[i].category.toLowerCase().includes(value.toLowerCase())){

            table += `
            <tr>
               <td>${i +1 }</td>
               <td>${dataproduct[i].title}</td>
               <td>${dataproduct[i].price}</td>
               <td>${dataproduct[i].taxes}</td>
               <td>${dataproduct[i].ads}</td>
               <td>${dataproduct[i].discount}</td>
               <td>${dataproduct[i].total}</td>
               <td>${dataproduct[i].category}</td>
               <td><button id="update" onclick="updateData(${i})">Update</button></td>
               <td><button id="delete" onclick="deleteData(${i})" > Delete </button></td>
            </tr>
         `
         }
   } 
    }
    document.getElementById("tbody").innerHTML = table; 

   console.log(tbody);
}
