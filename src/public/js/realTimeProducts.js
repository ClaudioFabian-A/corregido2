const io = io();


io.on("sendData", (prodList) => {
    upDataProdList(prodList);
});
function upDataProdList(prodList) {
    const div = document.getElementById("prodContainer");

    let List = prodList;
    let EList = "";
    div.innerHTML = "";
    List.forEach((product) => {
        EList += `<div id=${product.id}>
        <div>
        <img src=${product.product} />
        <p>${product.title}</p>
        <p>${product.category}</p>
        <p>${product.description}</p>
        <p>${product.price}</p>
        <p>${product.code}</p>
        <p>${product.stock}</p>

        </div>
    </div>`;
        div.innerHTML = EList;

    });

}
const prodForm = document.getElementById("idForm");
prodForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let title = prodForm.elements.title.value;
    let description = prodForm.elements.value.description;
    let stock = prodForm.elements.value.stock;
    let thumbnail = prodForm.elements.value.thumbnail;
    let category = prodForm.elements.value.category;
    let price = prodForm.elements.value.category;
    let code = prodForm.elements.value.code;

    io.emit("addProduct", {
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


document.getElementById("buttonSubmitDelete").addEventListener("click", (e) => {
    const deleteElementId = document.getElementById('pid');
    const deleteById = parseInt(deleteElementId.value);
    io.emit("deleteById", deleteById);
    deleteElementId.value = "";
    console.log('listo');

})
// console.log(socket);