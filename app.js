let valorJogado = 100;
let listarNumerosSorteados = [];
let numeroSecreto = gerarNumeroSecreto(valorJogado);
console.log(numeroSecreto);
let NumeroTentativas = 0;
let palavraTentativa = 0;

function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial(){
    exibirTexto("h1", "Jogo do Numero Secreto");
    exibirTexto("p", `Tente adivinhar o número secreto entre 0 e ${valorJogado}`); 
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector("input").value;
    NumeroTentativas++;
    let palavraTentativa = NumeroTentativas > 1 ? "tentativas ":'tentativa';

    if(chute == numeroSecreto){

        exibirTexto("h1", "Parabéns, você acertou!");
        exibirTexto("p", `Você acertou em ${NumeroTentativas} ${palavraTentativa}`);
        document.getElementById("reiniciar").removeAttribute("disabled");

    } else{
        if(chute > numeroSecreto){
            exibirTexto("p", `O número secreto é menor que ${chute}`);
    } else{
        exibirTexto("p", `O número secreto é maior que ${chute}`);
        }
    } 
    limparCampo();
    
}

function gerarNumeroSecreto(numero) {

    let numeroEscolhido = parseInt(Math.random() * numero +1);
    let quantidadeDeElementos = listarNumerosSorteados.length;

    if(quantidadeDeElementos == numero){
        listarNumerosSorteados = [];
    }

    if(listarNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroSecreto(numero);
    }else{
        listarNumerosSorteados.push(numeroEscolhido);
        console.log(listarNumerosSorteados);
        return numeroEscolhido;

    }
}

function limparCampo(){
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroSecreto(valorJogado);
    NumeroTentativas = 0;
    exibirMensagemInicial();
    limparCampo();
    document.getElementById('reiniciar').setAttribute('disabled', true);

}