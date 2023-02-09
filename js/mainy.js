const form = document.getElementById("novoItem")


form.addEventListener("submit", (evento) =>{
    evento.preventDefault()

    adicionaItem(evento.target["nome"].value, evento.target["quantidade"].value)
})

function adicionaItem(nome, quantidade) {
    const novoItem = document.createElement("li")
    novoItem.classList.add("item")

    const novoNumero = document.createElement("strong")
    novoNumero.innerHTML = quantidade

    novoItem.appendChild(novoNumero)
    novoItem.innerHTML += nome

    const lista = document.getElementById("lista")
    lista.appendChild(novoItem)

}