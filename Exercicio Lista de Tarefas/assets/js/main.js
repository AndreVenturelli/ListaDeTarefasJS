const inputTarefa = document.querySelector('.inputTarefa');
const btnTarefa = document.querySelector('.btnTarefa');
const tarefas = document.querySelector('.tarefas');

//função pra adicionar as tarefas na lista
// é o local do html chamado de ul
// o nome da variavel escolhida foi "li"
function criaLi(){
    const li = document.createElement('li');
    return li;
}

//isso serviu para testar a função de adicionar
//tarefas pressionando a tecla enter
//utilizando o codigo da tecla
/*inputTarefa.addEventListener('keypress', function(e){
    if(e.keyCode === 13){
        console.log('Enter pressionado');
    }
}); */
inputTarefa.addEventListener('keypress', function(e){
    if(e.keyCode === 13){
        if(!inputTarefa.value)return;
        criaTarefa(inputTarefa.value);
    }
});

function limpaInput(){
    inputTarefa.value = '';
    inputTarefa.focus();//volta o foco pro input
}

function  criaBotaoApagar(li){
    li.innerText += '  ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    //botaoApagar.classList.add('apagar');
    botaoApagar.setAttribute('class', 'Apagar');
    li.appendChild(botaoApagar);
}

function criaTarefa(textoInput){
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefa();
}

btnTarefa.addEventListener('click', function(e){
    if(!inputTarefa.value)return;
    criaTarefa(inputTarefa.value);
})

document.addEventListener('click', function(e){
    const tarefinha = e.target;

    if (tarefinha.classList.contains('Apagar')){
        tarefinha.parentElement.remove();
        salvarTarefa();
    }
});

function salvarTarefa(){
    const liTarefas = tarefas.querySelectorAll('li');
    const listinhaTarefas = [];

    for (let tarefas of liTarefas){
        let textoTarefa = tarefas.innerText;
        textoTarefa = textoTarefa.replace('Apagar', '').trim();
        listinhaTarefas.push(textoTarefa);

    }
    // para salvar as tarefas tive que 
    //transformar tudo em JSONstring
    //e tbm utilizar o localStorage
    //pois ele apenas salva string
    const tarefasJSON = JSON.stringify(listinhaTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

//com essa função mesmo recarregando a pagina
//as tarefas não somem, continuam lá
function recarregaTarefaSalva(){
    const tarefa = localStorage.getItem('tarefas');
    const tarefaSalva = JSON.parse(tarefa);
    for (let tarefa of tarefaSalva){
        criaTarefa(tarefa);
    }
}
recarregaTarefaSalva();