const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
//se temos itens dentro do localstorage se for falso (||) ele cria um array vazio
//JSON.parse converte os dados para javascript
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach((elemento) => {
    criaElemento(elemento)
})


form.addEventListener("submit", (evento) =>{
    evento.preventDefault()//ao adicionarmos os dados no campo, ele deixa estatico e não atualiza a página

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    //busca o elemento pelo nome e compara se é igual ao value do elemento nome
    const existe = itens.find(elemento => elemento.nome === nome.value)

    //armazenando dados no localStorage para não perder quando recarrega a página
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    //para essa comparação, se faz necessário criar um id pro itemAtual, por isso o declaramos acima
    if (existe) {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    }else{
        //condição utilizando operador ternário (? :), pega o ultimo id informado, compara e adiciona um
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1: 0
        //mesma coisa do 'nome, quantidade', porém convertidos no formato que desejamos ou evento ou elemento, etc.
        criaElemento(itemAtual)

        itens.push(itemAtual)
    }  

    //localStorage só salva um texto, como itemAtual é um objeto, precisamos convertê-lo em texto usando 
    //stringfy (transforma em string)
    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""

})

//nome e quantidade são os objetos que iremos manipular
function criaElemento (item) {

    //utilizamos classList porque o item é uma classe no html 
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    //utilizamos innerHTML porque o strong é uma tag do html
    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    //coloca no elemento strong um atributo que é o dataset.id
    numeroItem.dataset.id = item.id

    //adiciona um elemento dentro do outro
    novoItem.appendChild(numeroItem)
    //incrementa no innerHTML o numeroItem + o nome
    novoItem.innerHTML += item.nome

    //novo item recebe o elemento botão que foi criado
    novoItem.appendChild(botaoDeleta(item.id))

    //adiciona o novo item na lista (um elemento dentro do outro novamente)
    lista.appendChild(novoItem)

}

function atualizaElemento(item){
   (document.querySelector("[data-id='"+item.id+"']")).innerHTML = item.quantidade
}

//função que cria o botão 
function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    //necessário criar o evento do click dentro do botão pois o novoItem ele não tras essa funcionalidade para esse botão
    //aqui declaramos uma function mesmo, pois o arrow function não declara o this
    elementoBotao.addEventListener("click", function() {
        //this chamado o elemento, parentNode chama o li
        //id se refere ao indice do array
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

//função que remove o elemento
//tag é o elemento e o id é o indice do array para exclusão no localStorage
function deletaElemento(tag, id){
    tag.remove()

    //findIndex vai buscar o indice de um elemento qualquer e compara se o elemento será igual ao id
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens))

}