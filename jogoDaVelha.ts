function jogoDaVelha() {
    let table = ['1','2','3',
                '4','5','6',
                '7','8','9']
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

    function printTabuleiro() {
        console.log(`${table[0]}|${table[1]}|${table[2]}`)
        console.log('------')
        console.log(`${table[3]}|${table[4]}|${table[5]}`)
        console.log('------')
        console.log(`${table[6]}|${table[7]}|${table[8]}`)
    }

    function verificaJogada(pJogada, pMarcador) {
        if (pJogada === null && pJogada === undefined) return false // previne uma jogada invalida

        const jogada = Number(pJogada)-1 // converte a jogada para número

        // Verifica se já foi jogado nesse lugar
        if (table[jogada] === 'X' || table[jogada] === 'O') {
            console.log('Já fizeram essa jogada')
            return false
        }

        table[jogada] = pMarcador
    }

    let marcador
    function selecionaMarcador() {
        input = prompt('Você jogará com X ou com O? ')
        marcador = input === 'X' || input === 'O' ? input : null
    }

    const player = prompt('Digite seu nome: ')
    
    selecionaMarcador()    
    const marcadorHumano = input
    const marcadorMaquina = marcadorHumano === 'X' ? 'O' : 'X'

    while (playing) { 
        // Limpa o console.
        console.clear()

        if (verificaVitoria() === marcadorHumano) {
            printTabuleiro()
            console.log('Você venceu!')
            break
        }

        if (verificaVitoria() === marcadorMaquina) {
            printTabuleiro()
            console.log('A máquina venceu!')
            break
        }
        console.log('Para jogar digite o número no tabuleiro que representa sua jogada.');
        console.log('O número no tabuleiro será substituido pelo seu marcador.');
        
        printTabuleiro()

        // Jogada da máquina. A máquina joga até a jogada ser válida.
        verificaJogada(Math.floor(Math.random() * 10), marcadorMaquina)

        // Jogada do player. O player joga até a jogada ser válida.
        const jogada = prompt('Digite o número da sua jogada: ')
        verificaJogada(jogada, marcadorHumano)
    }
}
