const socket = io();

const addButton = document.getElementById('buttonSubmit');
const deleteButton = document.getElementById('buttonSubmitDelete');


addButton.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        const data = 
    }
})
io.on("sendData", (prodList) => {
    upDataProdList(prodList);
});
function divProd(prodList) {
    const cardProd = document.getElementById("prodContainer");

    let cartsList = prodList;
    let cartEList = "";
    cardProd.innerHTML = "";
    cartsList.forEach((e) => {
        cartEList += ` <div id=${e.id}>
        <img src=${e.thumbnail} />
        <p>${e.title}</p>
        <p>${e.category}</p>
        <p>${e.description}</p>
        <p>${e.price}</p>
        <p>${e.code}</p>


    </div>`;
        cardProd.innerHTML = cartEList;

    });

}
const prodForm = document.getElementById("idForm");
prodForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let title = prodForm.e.title.value;
    let description = prodForm.e.value.description;
    let stock = prodForm.e.value.stock;
    let thumbnail = prodForm.e.value.thumbnail;
    let category = prodForm.e.value.category;
    let price = prodForm.e.value.category;
    let code = prodForm.e.value.code;

    io.emit("addProduct",{s
        title,
        description,
        stock,
        thumbnail,
        category,
        price,
        code,

    });
    prodForm.reset();

})

console.log(socket);