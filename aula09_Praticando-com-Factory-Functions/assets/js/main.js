// Por motivos de estudo, ou criar uma Factory Function para criar a calculadora

function criaCalculadora() {
    return {
       // Atributos (variáveis dentro do objeto) a partir daqui: 
        display: document.querySelector('.display'),

        // Métodos a partir daqui:
        inicia() {
            this.cliqueBotoes();
            this.pressionaBackSpace();
            this.pressionaEnter();
        },

        pressionaBackSpace() {
            this.display.addEventListener('keydown', e => {
              if (e.keyCode === 8) {
                e.preventDefault();
                this.clearDisplay();
              }
            });
          },

        pressionaEnter() {
            this.display.addEventListener('keyup', e => {
                if (e.keyCode === 13) {
                    this.realizaConta();
                }
            });
        },

        // Botão de igual
        realizaConta() {
            // "eval" tenta passar e executar qualquer string como código js, por isso é preciso cuidado ao usá-la
            let conta = this.display.value;

            try {
                conta = eval(conta);

                if(!conta) {
                    alert('Conta inválida!');
                    return;
                }

                this.display.value = String(conta);
            } catch(e) {
                alert('Conta inválida!');
                return;
            }
        },
        
        // Botão de apagar
        clearDisplay() {
            this.display.value = '';
        },

        // Botão de delete (Tamanho da string - 1).
        deleteOne() {
            this.display.value = this.display.value.slice(0, -1);
        },

        cliqueBotoes() {
            // Capturar o clique nos botões:
            // Arrow functions não podem mudar o elemento que chama o 'this'.
            document.addEventListener('click', (e) => {
                const el = e.target;
                
                if(el.classList.contains('btn-num')) {
                    this.btnParaDisplay(el.innerText);
                }

                if(el.classList.contains('btn-clear')) {
                    this.clearDisplay();
                }

                if(el.classList.contains('btn-del')) {
                    this.deleteOne();
                }

                if(el.classList.contains('btn-eq')) {
                    this.realizaConta();
                }

                this.display.focus();
            }); 
        },

        btnParaDisplay(valor) {
            this.display.value += valor;
        }
    };
}

const calculadora = criaCalculadora();
calculadora.inicia();