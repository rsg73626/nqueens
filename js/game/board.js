
var ElementType = {
    queen: 0,
    empty: 1
}

class BoardPosition {

    constructor(x, y) {
        this.x = x
        this.y = y
        this.element = null
    }

}

class BoardNode extends Node {

    constructor(boardPosition, weight = null) {
        super(boardPosition, weight)
    }

    getConnectionWithPosition(x, y) {
        var nodeIndex = this.connections.findIndex(connection => connection.value.x == x && connection.value.y == y)
        if (nodeIndex > -1) {
            return this.connections[nodeIndex]
        }
        return null
    }

    upLeft() {
        if (this.connections.length == 8) {
            return this.connections[0] 
        }
        return this.getConnectionWithPosition(this.value.x - 1, this.value.y - 1)
    }

    left() {
        if (this.connections.length == 8) {
            return this.connections[1] 
        }
        return this.getConnectionWithPosition(this.value.x - 1, this.value.y)
    }

    bottomLeft() {
        if (this.connections.length == 8) {
            return this.connections[2] 
        }
        return this.getConnectionWithPosition(this.value.x - 1, this.value.y + 1)
    }

    up() {
        if (this.connections.length == 8) {
            return this.connections[3] 
        }
        return this.getConnectionWithPosition(this.value.x, this.value.y - 1)
    }

    bottom() {
        if (this.connections.length == 8) {
            return this.connections[4] 
        }
        return this.getConnectionWithPosition(this.value.x, this.value.y + 1)
    }

    upRight() {
        if (this.connections.length == 8) {
            return this.connections[5] 
        }
        return this.getConnectionWithPosition(this.value.x + 1, this.value.y - 1)
    }

    right() {
        if (this.connections.length == 8) {
            return this.connections[6] 
        }
        return this.getConnectionWithPosition(this.value.x + 1, this.value.y)
    }

    bottomRight() {
        if (this.connections.length == 8) {
            return this.connections[7] 
        }
        return this.getConnectionWithPosition(this.value.x + 1, this.value.y + 1)
    }

    horizontalPath(includeNode = false) {
        var path = []
        var aux = this.left()
        while(aux) {
            path.push(aux)
            aux = aux.left()
        }
        if (includeNode) {
            path.push(this)
        }
        aux = this.right()
        while(aux) {
            path.push(aux)
            aux = aux.right()
        }
        return path
    }

    verticalPath(includeNode = false) {
        var path = []
        var aux = this.up()
        while(aux) {
            path.push(aux)
            aux = aux.up()
        }
        if (includeNode) {
            path.push(this)
        }
        aux = this.bottom()
        while(aux) {
            path.push(aux)
            aux = aux.bottom()
        }
        return path
    }

    mainDiagonalPath(includeNode = false) {
        var path = []
        var aux = this.upLeft()
        while(aux) {
            path.push(aux)
            aux = aux.upLeft()
        }
        if (includeNode) {
            path.push(this)
        }
        aux = this.bottomRight()
        while(aux) {
            path.push(aux)
            aux = aux.bottomRight()
        }
        return path
    }

    secondaryDiagonalPath(includeNode = false) {
        var path = []
        var aux = this.bottomLeft()
        while(aux) {
            path.push(aux)
            aux = aux.bottomLeft()
        }
        if (includeNode) {
            path.push(this)
        }
        aux = this.upRight()
        while(aux) {
            path.push(aux)
            aux = aux.upRight()
        }
        return path
    }

    allPath(includeNode = false) {
        var path = this.horizontalPath().concat(this.verticalPath()).concat(this.mainDiagonalPath()).concat(this.secondaryDiagonalPath())
        if (includeNode) {
            path.push(this)
        }
        return path
    }

    setElement(element) {
        if (element != null && element != ElementType.queen && element != ElementType.empty) {
            return
        } 
        this.value.element = element
    }

    hasQueen() {
        return this.value.element == ElementType.queen
    }

    checkHorizontalConflict() {
        var aux = this.left()
        while (aux != null) {
            if (aux.hasQueen()) {
                return true
            }
            aux = aux.left()
        }
        aux = this.right() 
        while(aux != null) {
            if (aux.hasQueen()) {
                return true
            }
            aux = aux.right()
        }
        return false
    }

    checkVerticalConflict() {
        var aux = this.up()
        while (aux != null) {
            if (aux.hasQueen()) {
                return true
            }
            aux = aux.up()
        }
        aux = this.bottom() 
        while(aux != null) {
            if (aux.hasQueen()) {
                return true
            }
            aux = aux.bottom()
        }
        return false
    }

    checkMainDiagonalConflict() {
        var aux = this.upLeft()
        while (aux != null) {
            if (aux.hasQueen()) {
                return true
            }
            aux = aux.upLeft()
        }
        aux = this.bottomRight() 
        while(aux != null) {
            if (aux.hasQueen()) {
                return true
            }
            aux = aux.bottomRight()
        }
        return false
    }

    checkSecondaryDiagonalConflict() {
        var aux = this.bottomLeft()
        while (aux != null) {
            if (aux.hasQueen()) {
                return true
            }
            aux = aux.bottomLeft()
        }
        aux = this.upRight() 
        while(aux != null) {
            if (aux.hasQueen()) {
                return true
            }
            aux = aux.upRight()
        }
        return false
    }

    checkConflicts() {
        return this.checkHorizontalConflict() || this.checkVerticalConflict() || this.checkMainDiagonalConflict() || this.checkSecondaryDiagonalConflict()
    }

}

class Board extends Graph {

    constructor(size) {
        super()

        this.size   = size
        this.queens = []

        var i = 0
        var j = 0

        for (i = 0; i < size; i++) {
            for (j = 0; j < size; j++) {
                var position = new BoardPosition(i, j)
                var node     = new BoardNode(position)
                this.addNode(node)

                if (i > 0) { 
                    if (j > 0) { 
                        node.addConnection(this.nodes[((i - 1) * size) + j - 1]) // up left
                    }
                    node.addConnection(this.nodes[((i - 1) * size) + j])         // up
                    if  (j < size) { 
                        node.addConnection(this.nodes[((i - 1) * size) + j + 1]) // up right
                    }
                }

                if (j > 0) {
                    node.addConnection(this.nodes[(i * size) + j - 1]) // left
                }
            }
        }

        var checkCompletionFunction = function (board) { //console.log('check completion function')
            return board.queens.length == board.size
        }
    
        var checkAssignmentFunction = function (board, node, value) { //console.log('check assignment function'); //console.log(node)
            return value == ElementType.queen ? !node.checkConflicts() : true
        }
    
        var getNextUnassignedNodeFunction = function (board) { //console.log('get next unassigned node function')
            var index = board.nodes.findIndex(node => node.value.element == null)
            if (index > -1) {
                return board.nodes[index]
            }
            return null
        }
    
        var assignFunction = function (board, node, value) { //console.log('assign function'); //console.log(node)
            node.setElement(value)
            if (value == ElementType.queen) {
                board.queens.push(node)
            }
        }
    
        var unassignFunction = function (board, node, value) { //console.log('unassign function'); //console.log(node)
            node.setElement(null)
            if (value == ElementType.queen) {
                var index = board.queens.findIndex(q=>q.id == node.id)
                if (index > -1) {
                    board.queens.splice(index, 1)
                }
            }
        }
    
        this.csp =  new CSP(this,
                            [ ElementType.queen, ElementType.empty ],
                            checkCompletionFunction,
                            checkAssignmentFunction,
                            getNextUnassignedNodeFunction,
                            assignFunction,
                            unassignFunction)

    }

    printBoard() {

        if (this.nodes.length > 1000) {
            console.log('The board is too large to be printed.')
            return
        }

        this.nodes.forEach(function(node) {
            console.log(node.value)
            console.log('Left node: ')
            console.log(node.getLeftNode())
            console.log('Up node: ')
            console.log(node.getUpNode())
            console.log('Right node: ')
            console.log(node.getRightNode())
            console.log('Bottom node: ')
            console.log(node.getBottomNode())
            console.log('\n')
        })
    }

    getNodeWithPosition(x, y) {
        if (x < this.size && y < this.size) {
            return this.nodes[(x * this.size) + y]
        }
        return null
    }

    setElementInNodeAtPosition(element, x, y) {
        var node = this.getNodeWithPosition(x, y)

        if (node != null && node.value.element == null) {

        }
    }

    printQueens(htmlTag) {

        if (this.nodes.length > 1000) {
            console.log('The graph is too large to be printed.')
            return
        }

        var currentLineStart = this.nodes[0]
        var currentColumnNode = currentLineStart

        while (currentLineStart != null) {

            var lineString = ''

            while (currentColumnNode != null) { 
                var string = currentColumnNode.hasQueen() ? 'Q' : '+'
                lineString += string + ' '
                currentColumnNode = currentColumnNode.right()
            }
            if (htmlTag != null) {
                var p = document.createElement('p')
                p.textContent = lineString
                htmlTag.appendChild(p)
            }
            console.log(lineString + '\n')
            currentLineStart = currentLineStart.bottom()
            currentColumnNode = currentLineStart
        }

    }

}
