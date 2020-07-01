/*
    CSP

    Essa classe possui a implementação do algoritmo apresentado no pseudocódigo da 
Figura 3 no arquivo de documentação. Ela foi implementada de maneira genérica e 
necessita de alguns parâmetros para a criação de instâncias a partir dela. Uma vez 
modelado o problema que se quer resolver como uma CSP, e instanciado o objeto, o 
algoritmo para a sua resolução pode ser executado invocando a função solve da 
instância criada – essa função retorna um valor booleano indicando se foi possível 
encontrar a solução do problema ou não. A seguir, da um dos argumentos que devem ser 
passados na construção do objeto são explicados (os valores entre parêntesis no final 
são os nomes de cada um dos argumentos na implementação).

    •	Um grafo, contendo os dados do problema (graph).

    •	Uma lista, contendo os valores do domínio do problema (domain).

    •	Uma função para verificar se o problema foi solucionado. Essa função é 
invocada durante a execução da implementação do pseudocódigo da Figura 3, que é 
executado a partir da chamada da função solve. Ela deve receber um grafo e retornar 
um valor booleano (checkCompletionFunction).

    •	Uma função para verificar se é possível atribuir um valor do domínio à um nó do 
grafo. Essa função é invocada durante a execução da implementação do pseudocódigo da 
Figura 3, que é executado a partir da chamada da função solve. Ela deve receber um grafo, 
um nó do grafo, um valor do domínio e retornar um valor booleano (checkAssignmentFunction).

    •	Uma função para pegar o próximo nó do grafo que ainda não possui valor. Essa função 
é invocada durante a execução da implementação do pseudocódigo da Figura 3, que é executado 
a partir da chamada da função solve. Ela deve receber um grafo e retornar um nó do grafo ou 
nulo (getNextUnassignedNodeFunction).

    •	Uma função para atribuir um valor do domínio à um nó do grafo. Essa função é invocada
durante a execução da implementação do pseudocódigo da Figura 3, que é executado a partir da 
chamada da função solve. Ela deve receber um grafo, um nó do grafo, um valor do domínio e não
possui retorno (assignFunction). 

    •	Uma função para remover um valor do domínio de um nó do grafo. Essa função é invocada 
durante a execução da implementação do pseudocódigo da Figura 3, que é executado a partir da 
chamada da função solve. Ela deve receber um grafo, um nó do grafo, um valor do domínio e não 
possui retorno (unassignFunction).

*/


class CSP {

    constructor(graph, 
                domain, 
                checkCompletionFunction, 
                checkAssignmentFunction, 
                getNextUnassignedNodeFunction, 
                assignFunction, 
                unassignFunction) {

            this.graph  = graph
            this.domain = domain

            this.checkCompletionFunction       = checkCompletionFunction
            this.checkAssignmentFunction       = checkAssignmentFunction
            this.getNextUnassignedNodeFunction = getNextUnassignedNodeFunction
            this.assignFunction                = assignFunction
            this.unassignFunction              = unassignFunction

    }

    solve() {
    
        var csp = this
    
        function recursiveBacktracking() { //console.log('recursive')
            if (csp.checkCompletionFunction(csp.graph)) {
                return true
            }
            
            var unassignedNode = csp.getNextUnassignedNodeFunction(csp.graph)
            if (unassignedNode == null) {
                return false
            }
    
            var i = 0
            for (i = 0; i < csp.domain.length; i++) {
                var value = csp.domain[i]
                if (csp.checkAssignmentFunction(csp.graph, unassignedNode, value)) {
                    csp.assignFunction(csp.graph, unassignedNode, value)
                    var result = recursiveBacktracking()
                    if (result) {
                        return true
                    }
                    csp.unassignFunction(csp.graph, unassignedNode, value)
                }
            }
    
            return false
        }
    
        return recursiveBacktracking()
    
    }

}