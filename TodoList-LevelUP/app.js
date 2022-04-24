/* seleciona a div mais externa - a que vamos mudar o background
const container = document.querySelector(".container")*/
/* acessar a lista de atividades */
const listaAtividades = document.querySelector(".lista_atividades")
/* acessar a lista de Concluidos */
const listaConcluidos = document.querySelector(".listaConcluidos")
/* acessa a tela do personagem */
const personagem = document.querySelector(".caixaPersonagem")
/* input de atividades */
const input = document.querySelector(".input")
/* erro */
const erro = document.querySelector(".erro")
/* botão de cadastrar que aciona a função cadastrarAtividade() */
const botaoCadastra = document.querySelector(".botao_adc")
/* botão Limpar Lista */
const botaoLimparLista = document.querySelector(".botao_del_todos")
const botaoLimparListaConcluidos = document.querySelector(".botao_del_todos_concluidos")
/* acessa as paletas */
const paleta1= document.getElementById('paleta1');
const paleta2= document.getElementById('paleta2');
const paleta3= document.getElementById('paleta3');


var contador=0;

/* Arrays */
const arrayToDoList = []
const arrayConcluidos = []


//botão de mudar personagens
paleta1.addEventListener('click', () => definePersonagem('luffy') )
paleta2.addEventListener('click', () => definePersonagem('goku'))
paleta3.addEventListener('click', () => definePersonagem('naruto'))

//botão (+) de adicionar atividade
botaoCadastra.addEventListener('click', ()=> cadastraAtividade())
//limpar lista
botaoLimparLista.addEventListener('click',()=> removeAtividades())
botaoLimparListaConcluidos.addEventListener('click', ()=> removeConcluidos())



function definePersonagem(heroi){
    alert('vai alterar para '+ heroi)
    personagem.style.background= "#f3f3f3 url('"+heroi+"-.png') no-repeat center"
    
}

/* Criar as Atividades na Lista */

function criaAtividade(){
    contador=contador+1;

    const atividade = document.createElement("div")
    atividade.classList.add('atividade') //CSS
   

    const atividade_texto = document.createElement("div")
    atividade_texto.classList.add('texto_atividade')
    atividade_texto.setAttribute('id','atividade_'+contador)
    atividade_texto.textContent = input.value //define o texto do elemento - guardar o valor inserido pelo usuário
   
   
    const botaoLimpar = document.createElement('button')
    botaoLimpar.textContent = 'limpar'
    botaoLimpar.classList.add('botao_del')
    botaoLimpar.addEventListener('click', ()=> removeUmaAtividade(atividade, atividade_texto))

    const botaoConcluir = document.createElement('button')
    botaoConcluir.textContent = 'OK'
    botaoConcluir.classList.add('botao_concluir')
    botaoConcluir.addEventListener('click', ()=> concluiAtividade(atividade))

   
    listaAtividades.appendChild(atividade)
    atividade.appendChild(atividade_texto)
    atividade.appendChild(botaoLimpar)
    atividade.appendChild(botaoConcluir)
    arrayToDoList.push(atividade_texto.textContent)
   

}



function cadastraAtividade(){
    if(input.value.length > 3){
        erro.style.display = "none";
        criaAtividade();

    }else{
        erro.style.display = "grid";
        erro.innerHTML = `${input.value} não é uma atividade válida!`
    }
    limpaInput();
}



window.addEventListener("keypress", (e) => {
    if(e.key === "Enter"){
        cadastraAtividade();
    }
});

function limpaInput(){
    input.value = "";
}


console.log(arrayToDoList)
console.log(arrayConcluidos)

/* Conclui atividades */

function concluiAtividade(atividade){
    contador += 1
    const itemConcluido = atividade.textContent.substring(0, atividade.textContent.length -8)  //remove o texto 'limparOk' no final

    if(arrayConcluidos.indexOf(itemConcluido) !== -1){
        alert("Voce ja concluiu essa atividade")
    }else{
    const concluido = document.createElement("div")
    concluido.classList.add('concluido')

    const concluido_texto = document.createElement("div")
    concluido_texto.classList.add('texto_concluido')
    concluido_texto.setAttribute('id','concluido_'+contador)
    concluido_texto.textContent = itemConcluido

    const botaoLimpar = document.createElement('button')
    botaoLimpar.textContent = 'limpar'
    botaoLimpar.classList.add('botao_del')
    botaoLimpar.addEventListener('click', ()=> removeUmConcluido(concluido, concluido_texto))


    listaConcluidos.appendChild(concluido)
    concluido.appendChild(botaoLimpar)
    concluido.appendChild(concluido_texto)
    arrayConcluidos.push(concluido_texto.textContent)
    
    }
}

function definePorcentagem(arrayToDoList,arrayConcluidos){

    porcentagem =  (arrayConcluidos.length)/(arrayToDoList.length) *100
    alert('voce concluiu '+porcentagem+'%')
    defineLevel(porcentagem)

}

function defineLevel(porcentagem){
    
    
    valorDiv = personagem.getAttribute('style') //pega o valor setado da DIV caixaPersonagem como string
    finalNome = valorDiv.indexOf("-")  //necessario para separar o nome do heroi
    heroi = valorDiv.substring(17,finalNome) //cria uma substring somente com o nome do heroi
    console.log(heroi)
    
    if (porcentagem <= 25){
        alert('voce ainda esta no começo, usando: '+porcentagem+' de sua energia'+heroi)
        personagem.style.background= "#f3f3f3 url('"+heroi+"-.png') no-repeat center"
    }else if (porcentagem >25 && porcentagem <= 50 ){
        alert('usando '+porcentagem+' de seu poder, voce vai para a sua primeira transformação')
        personagem.style.background= "#f3f3f3 url('"+heroi+"-lvl2.png') no-repeat center"
    }else if(porcentagem >50 && porcentagem <= 75){
        alert('usando '+porcentagem+' de seu poder, voce vai para a sua segunda transformação')
        personagem.style.background= "#f3f3f3 url('"+heroi+"-lvl3.png') no-repeat center"
    }else if (porcentagem === 100){
        alert('usando '+porcentagem+' de seu poder! chegou ao nível máximo')
        personagem.style.background= "#f3f3f3 url('"+heroi+"-lvl4.png') no-repeat center"
    }
    
    
}



/* Limpar as atividades e concluidos */

function removeUmConcluido(concluido, concluido_texto){
    let apagarNoArray = concluido_texto.innerHTML
    let indice = arrayConcluidos.indexOf(apagarNoArray)
    arrayConcluidos.splice(indice, 1)

    listaConcluidos.removeChild(concluido)

}

function removeUmaAtividade(atividade,atividade_texto ){
    let apagarNoArray = atividade_texto.innerHTML
    let indice = arrayToDoList.indexOf(apagarNoArray)
    arrayToDoList.splice(indice, 1)
    
    listaAtividades.removeChild(atividade)

}

function removeConcluidos(){
    while(listaConcluidos.firstElementChild){ //enquanto houver elementos filhos
        arrayConcluidos.pop()
        listaConcluidos.removeChild(listaConcluidos.firstElementChild)
    }
}

function removeAtividades(){
    while(listaAtividades.firstElementChild){ //enquanto houver elementos filhos
        arrayToDoList.pop()
        listaAtividades.removeChild(listaAtividades.firstElementChild)
    }
}

