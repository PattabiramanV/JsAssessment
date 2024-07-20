
"use strict";


//...........2 buttons................//

let addProductForm=document.forms.addproductform;
let updateProductForm=document.forms.updateproductform;


function addProductFun(){

addProductForm.classList.remove('hidden');
updateProductForm.classList.add('hidden');


}

function updateInventoryFun(){

    updateProductForm.classList.remove('hidden');
addProductForm.classList.add('hidden');
    
}

//................Add pproduct form......................//
addProductForm.addEventListener('submit', function(event) {

    event.preventDefault();
    let name = addProductForm.Productname.value;
    let quantity = addProductForm.Quantity.value;

addProductForm.classList.add('hidden');


let obj = {
    'name': name,
    'quantity': quantity
};

productAddFun(obj)
 
addProductForm.reset();

});


//................update inventory form......................//

updateProductForm.addEventListener('submit', function(event) {

    event.preventDefault();
    let name = updateProductForm.Productname.value;
    let quantity = updateProductForm.Quantity.value;
    let recipient=updateProductForm.Recipient.value;

let obj = {
    'name': name,
    'quantity': quantity,
    'recipient':recipient
};
updateProductForm.classList.add('hidden');

inventoryAddFun(obj)
updateProductForm.reset();

});









//................Add pproduct function......................//


    function productAddFun(postData){

        let Url=`http://localhost/jsassessment/demo.php?option=addproduct`;

        if(postData.recipient){
         Url=`http://localhost/jsassessment/demo.php?option=reducequantity`
        }

       fetch(Url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData) 
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
           alert ("sucessFully added product!!!");
           
              getQuantityProducts();

            })
            .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
            });
   

    }


//................update Inventary function......................//

    function inventoryAddFun(postData){


        fetch('http://localhost/jsassessment/demo.php?option=updateproduct', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData) 
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
           
                console.log(data.status);

              if(data.status=='success'){
                alert("Inventory added sucessfully!!!");
                productAddFun(postData);

              }
              else{
                alert(data.message);
              }

                getAllRecipientFun();   
            })
            .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
            });
   

    }



    //..................Get All Quantity Function....................//

    getQuantityProducts();

    function getQuantityProducts(){

        fetch('http://localhost/jsassessment/demo.php', {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json'
            }
          
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
             
         
                showHighQuantityProducts(data.data);
                barChatFun(data.data);
            })
            .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
            });



    }









//..................Show Top 3 Products....................//

let highestproductdiv=document.querySelector('.highestproduct');
 
  function showHighQuantityProducts(data){
    highestproductdiv.innerHTML='';
    data.forEach((item,index) => {

        if(index<3){
        highestproductdiv.innerHTML+=`<a href="#" class="card block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${item.product_name}</h5>
    <p class="font-normal text-gray-700 dark:text-gray-400">${item.quantity}</p>
    </a>`
        }   
    });


  }



  //................Get All Recipient Function.......................//

  getAllRecipientFun()

  
  function getAllRecipientFun(){

   console.log("pppppp");

   fetch('http://localhost/jsassessment/demo.php?option=receipient', {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json'
    }

  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
     
    
     
        allRecipientShowFun(data.data)
      
      
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });


  }


  //...................Show All Reciepient Function.......................//

  let recipientTable=document.querySelector('.recipientdata');

  function allRecipientShowFun(data){

    data.forEach((item,index) => {
       
        recipientTable.innerHTML+=` <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
               
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  ${index+1}
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   ${item.product}
                </th>
                <td class="px-6 py-4">
                   ${item.recipient}
                </td>
                <td class="px-6 py-4">
                  ${item.quantity}
                </td>
              
            </tr>`
    });

  }

  

//......................Show Barchat based on product...................//

// function stringToColor(str) {
//     let hash = 0;
//     for (let i = 0; i < str.length; i++) {
//         hash = str.charCodeAt(i) + ((hash << 5) - hash);
//     }
//     let color = '#';
//     for (let i = 0; i < 3; i++) {
//         const value = (hash >> (i * 8)) & 0xFF;
//         color += ('00' + value.toString(16)).substr(-2);
//     }
//     return color;
// }
// const barColors = xValues.map(name => stringToColor(name));




  function   barChatFun(data){


const xValues = data.map(item => item.product_name);
const yValues = data.map(item => item.quantity);

    var barColors = ["red", "green","blue","orange","brown"];
    
    new Chart("myChart", {
      type: "bar",
      data: {
        labels: xValues,
        datasets: [{
          backgroundColor: barColors,
          data: yValues
        }]
      },
      options: {
        legend: {display: false},
        title: {
          display: true,
          text: "World Wine Production 2018"
        }
      }
    });


  }

  



