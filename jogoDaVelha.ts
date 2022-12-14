function jogoDaVelha() {
    let table = ['1','2','3',
                 '4','5','6',
                 '7','8','9']

    let pesoJogo = [0.9,0.6,0.9,
                    0.6,0.3,0.6,
                    0.9,0.6,0.9]

    let pesosHumano = [-0.9,-0.6,-0.9,
                       -0.6,-0.3,-0.6,
                       -0.9,-0.6,-0.9]
                
    let playing = true
    let input

    // retorna o marcador do vencedor ou uma string vazia.
    function verificaVitoria() {
        if (table[0] === table[1] && table[1] === table[2]) return table[0] // linha 0,1,2
        if (table[3] === table[4] && table[4] === table[5]) return table[3] // linha 3,4,5
        if (table[6] === table[7] && table[7] === table[8]) return table[6] // linha 6,7,8
        if (table[0] === table[4] && table[4] === table[8]) return table[0] // diagonal 0,4,8
        if (table[2] === table[4] && table[4] === table[6]) return table[2] // diagonal 2,4,6
        if (table[0] === table[3] && table[3] === table[6]) return table[0] // coluna 0,3,6
        if (table[1] === table[4] && table[4] === table[7]) return table[1] // coluna 1,4,7
        if (table[2] === table[5] && table[5] === table[8]) return table[2] // coluna 2,5,8
        return ''
    }

    function verificaVelha() {
        if (table[0] !== '1' && 
            table[1] !== '2' &&
            table[2] !== '3' && 
            table[3] !== '4' && 
            table[4] !== '5' && 
            table[5] !== '6' && 
            table[6] !== '7' && 
            table[7] !== '8' && 
            table[8] !== '9') return true

        return false
    }

    function printTabuleiro() {
        console.log(`${table[0]}|${table[1]}|${table[2]}`)
        console.log('------')
        console.log(`${table[3]}|${table[4]}|${table[5]}`)
        console.log('------')
        console.log(`${table[6]}|${table[7]}|${table[8]}`)
    }

    function verificaJogada(pJogada, pMarcador) {
        if (pJogada === null || pJogada === undefined || pJogada === '' || pJogada < 0 || pJogada > 9) return false // previne uma jogada invalida

        const jogada = Number(pJogada)-1 // converte a jogada para n??mero

        // Verifica se j?? foi jogado nesse lugar
        if (table[jogada] === 'X' || table[jogada] === 'O') {
            console.log('J?? fizeram essa jogada')
            return false
        }

        table[jogada] = pMarcador
        return true
    }

    function selecionarMarcador() {
        input = prompt('Voc?? jogar?? com X ou com O? ')
        return input === 'X' || input === 'O' ? false : true
    }

    function exibirInstrucoes() {
        console.clear()
        printTabuleiro()
        console.log('Para jogar digite o n??mero no tabuleiro que representa sua jogada.');
        console.log('O n??mero no tabuleiro ser?? substituido pelo seu marcador.');
    }

    const player = prompt('Digite seu nome: ')
    while (selecionarMarcador()) { }

    const marcadorHumano = input
    const marcadorMaquina = marcadorHumano === 'X' ? 'O' : 'X'    

    function equacaoDePrecicao(pesoQuadrante1, pesoQuadrante2, pesoQuadrante3, pQuadranteJogada) {
        return (((pesoQuadrante1+pesoQuadrante2+pesoQuadrante3)/3) * pQuadranteJogada)
    }

    // retorna o marcador.
    function predicao() {
        let jogada = -1
        const jogadasPossiveis = [
            [0,1,2], // linha
            [3,4,5], // linha
            [6,7,8], // linha
            [0,4,8], // diagonal
            [2,4,6], // diagonal
            [0,3,6], // coluna
            [1,4,7], // coluna
            [2,5,8], // coluna
        ]        

        let jogadasPossiveisCalculadas
        table.forEach(quadranteJogada => {
            jogadasPossiveis.forEach(e => {
                jogadasPossiveisCalculadas.push(
                    {
                        resultado: equacaoDePrecicao(pesoJogo[e[0]],pesoJogo[e[1]],pesoJogo[e[2]], quadranteJogada),
                        jogada: quadranteJogada
                    }
                )
            })

            const melhorJogada = jogadasPossiveisCalculadas.map(e => { if (e.resultado <= 0) return e })
            jogada = melhorJogada.jogada
        })
        
        return jogada
    }

    function jogadaMaquina() {
        const fatorHumano = Math.floor(Math.random() * (9 - 1) + 1) // Fator humano simulado.

        const melhorJogadaPrevista = predicao()
        
        const jogadaHumana = table.find(marcadorHumano)
        if (jogadaHumana === undefined) return fatorHumano
        
        if (Math.floor(Math.random())  < 1) {
            return melhorJogadaPrevista
        }

        return fatorHumano
    }

    while (playing) {
        if (verificaVitoria() === marcadorHumano) {
            console.clear()
            printTabuleiro()
            console.log(`${player}, Voc?? venceu!`)
            break
        }

        if (verificaVitoria() === marcadorMaquina) {
            console.clear()
            printTabuleiro()
            console.log('A m??quina venceu!')
            break
        }

        if (verificaVelha()) {
            console.clear()
            printTabuleiro()
            console.log('Empate!')
            break
        }

        let maquinaJogando = true
        while (maquinaJogando) {
            // Jogada da m??quina. A m??quina joga at?? a jogada ser v??lida.
            if(verificaJogada(jogadaMaquina(), marcadorMaquina)) {
                maquinaJogando = false
                break
            }
            maquinaJogando = true
        }

        exibirInstrucoes()

        let playerJogando = true
        while (playerJogando) {
            // Jogada do player. O player joga at?? a jogada ser v??lida.
            const jogada = prompt('Digite o n??mero da sua jogada: ')
            if(verificaJogada(jogada, marcadorHumano)) {
                playerJogando = false
                break
            }
            playerJogando = true
        }

        exibirInstrucoes()
    }
}
