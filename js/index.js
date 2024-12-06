var productTitleInput = document.getElementById("productTitle");
var productPriceInput = document.getElementById("priceProduct");
var productCategoryInput = document.getElementById("categoryProduct");
var productImageInput = document.getElementById("productImage");
var productDescriptionInput = document.getElementById("descriptionProduct");
var searchBtnProduct = document.getElementById("searchBtnProduct");
var inputs = document.querySelectorAll("input");
var textarea = document.querySelector("textarea");
var cancelBtn = document.getElementById("cancelBtn");
var cardAddProduct =document.getElementById("cardAddProduct");
var addBtnProduct = document.getElementById("addBtnProduct");
var updateBtn =document.getElementById("updateBtn");
var productList =[];


if(JSON.parse(localStorage.getItem("allProduct"))!==null){
  productList =JSON.parse(localStorage.getItem("allProduct"));
  displayProduct();
}  

function addProduct(){
  if(validateForm(productTitleInput)&&validateForm(productCategoryInput)&&validateForm(productDescriptionInput)&&validateForm(productPriceInput)){
    var product ={
      title: productTitleInput.value,
      price: productPriceInput.value,
      Category : productCategoryInput.value,
      Image :`/images/${productImageInput.files[0]?.name}`,
      Description : productDescriptionInput.value
    };
    
    productList.push(product);
    
    localStorage.setItem("allProduct", JSON.stringify(productList));
    
    clearForm();
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    });
    cardAddProduct.classList.add("d-none");
    displayProduct();
  }else{
    Swal.fire({
      title: "Oops! It looks like some fields are empty. Please fill them out to continue.",
      icon: "error",  
      showClass: {
        popup: "animate__animated animate__fadeInUp animate__faster",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutDown animate__faster",
      },
    });
  }
  }
  

  function displayProduct(list){
    var blackBox = ``;
  
    for(var i=0; i<productList.length; i++){
      blackBox += ` <tr>
                    <td>${i+1}</td>
                    <td>${productList[i].title}</td>
                    <td>${productList[i].price}</td>
                    <td>${productList[i].Category}</td>
                    <td>${productList[i].Description}</td>
                    <td class="w-25"><img src="${productList[i].Image}" class="img-fluid w-50" alt="productImage"></td>
                    <td class="d-flex flex-column gap-5 py-5">
                        <button class="btn" onclick="editProduct(${i})"><i class="bi bi-pencil-square"></i> Edit</button>
                        <button class="btn" onclick="deleteProduct(${i})"><i class="bi bi-trash"></i> Delete</button>
                    </td>
                </tr>`;
    }
      document.getElementById("productList").innerHTML = blackBox;
  }

  
  

  
  function clearForm() {
    productTitleInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productImageInput.value = "";
    productDescriptionInput.value = "";
    inputs.forEach(input =>{
      (input.classList.remove("is-valid"))
    })
    textarea.classList.remove("is-valid");
  } 
  
document.getElementById("cancelBtn").addEventListener("click",function(){
  cardAddProduct.classList.add("d-none");
})


document.getElementById("addBtnProduct").addEventListener("click",function(){
  cardAddProduct.classList.remove("d-none");
})




var updateIndex;
function editProduct(editIndex){
  updateIndex = editIndex;
  productTitleInput.value = productList[editIndex].title;
  productPriceInput.value = productList[editIndex].price;
  productCategoryInput.value = productList[editIndex].Category;
  productImageInput.src= productList[editIndex].Image;
  productDescriptionInput.value = productList[editIndex].Description;
  cardAddProduct.classList.remove("d-none");
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
  
  
}


function updateProduct(){
  if (
    validateForm(productTitleInput) &&
    validateForm(productCategoryInput) &&
    validateForm(productDescriptionInput) &&
    validateForm(productPriceInput) &&
    validateForm(productImageInput)
  ) {
    productList[updateIndex].title = productTitleInput.value;
    productList[updateIndex].price = productPriceInput.value;
    productList[updateIndex].Category = productCategoryInput.value;
    productList[updateIndex].Description = productDescriptionInput.value;
    productList[updateIndex].Image =`/images/${productImageInput.files[0]?.name}`;
    localStorage.setItem("allProduct", JSON.stringify(productList));
    displayProduct(productList);
    clearForm()
    cardAddProduct.classList.add("d-none");
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    });
  }
}

function deleteProduct(deletedIndex) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
      productList.splice(deletedIndex, 1);
      localStorage.setItem("allProduct", JSON.stringify(productList));
      displayProduct(productList);
    }
  });
}


function searchProduct(){
  
  var char = searchBtnProduct.value.trim().toLowerCase();
  var blackBox =``;
  var found = false;
  
  for (var i = 0; i < productList.length; i++) {

    if (productList[i].title.toLowerCase().includes(char.toLowerCase()))
      {
        var found = true;
        productList[i].name=productList[i].title.toLowerCase().replaceAll(char,`<span class="text-danger">${char}</span>`)

        blackBox +=`<tr>
        <td>${i+1}</td>
        <td class="text-capitalize">${productList[i].name}</td>
                    <td>${productList[i].price}</td>
                    <td>${productList[i].Category}</td>
                    <td>${productList[i].Description}</td>
                    <td class="w-25 "><img src="${productList[i].Image}" class="img-fluid w-50" alt="productImage"></td>
                    <td class="d-flex flex-column gap-5 py-5">
                    <button class="btn" onclick="editProduct(${productList.indexOf(productList[i])})"><i class="bi bi-pencil-square"></i> Edit</button>
                        <button class="btn" onclick="deleteProduct(${productList.indexOf(productList[i])})"><i class="bi bi-trash"></i> Delete</button>
                    </td>
                </tr>`;

    }
  }
  if (found) {
    document.getElementById("productList").innerHTML = blackBox;
  } else {
    Swal.fire("No matching products found!"); 
    document.getElementById("productList").innerHTML = "";
  }
}


document.getElementById("filterBtn").addEventListener("click", () => {
  var char = searchBtnProduct.value.trim().toLowerCase();  
  if (char) {
    productList.sort((a, b) => a.price - b.price);
      searchProduct(char);  
    } else {
      productList.sort((a, b) => a.price - b.price);
      displayProduct(productList);  
  }
});



var tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
var tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))


  function validateForm(input){
    if(input.value.length === 0){
        input.classList.remove("is-valid");
        input.classList.remove("is-invalid");
        input.nextElementSibling.classList.replace("d-block","d-none")
        return;
    }
      var regex ={
        productTitle :/^[A-Z][a-z]{2,15}$/,
        priceProduct :/^(60000|[6-9]\d{3}|[1-5]\d{4})$/,
        categoryProduct :/^(laptop|iphone|Tv|ipad|screen)$/,
        descriptionProduct :/^\w{0,250}|null$/,
        productImage:/\.(jpg|jpeg|png|gif|bmp|webp)$/i
      };
  
      var isValid  = regex[input.id].test(input.value);
  
  if(isValid){
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    input.nextElementSibling.classList.replace("d-block","d-none");
  }else{
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    input.nextElementSibling.classList.replace("d-none","d-block");
  }
  }