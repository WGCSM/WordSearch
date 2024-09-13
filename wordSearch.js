
let matrix = [
                ['D', 'E','Y', 'Q','A', 'U','G'],
                ['X', 'R','G', 'T','U', 'A','V'],
                ['S', 'C','A', 'S','A', 'B','E'],
                ['X', 'A','J', 'G','U', 'H','V'],
                ['F', 'M','O', 'R','O', 'L','B'],
                ['G', 'A','H', 'J','E', 'N','E']
            ];

function loadmatrix(){

    let table = document.getElementById("table");

    for (let i = 0; i<matrix.length; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j<matrix[0].length; j++) {
            let cell = document.createElement("td");
            cell.setAttribute("id",i.toString()+j.toString());
            let letter = document.createTextNode(matrix[i][j]);
            cell.appendChild(letter);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}


function searchWord(){

    let inputWord = document.getElementById("word");
    let letterPositions =[];
    const word = inputWord.value;
    const startingLetter = word.charAt(0);

    for (let i = 0; i<matrix.length; i++) {
        for (let j = 0; j<matrix[0].length; j++) {

            if(matrix[i][j].toLowerCase() == startingLetter.toLowerCase()){

                if(checkDiagonal(i,j,word,"","right")!==false){
                    letterPositions = checkDiagonal(i,j,word,"","right");
                }
                if(checkDiagonal(i,j,word,"","left")!==false){
                    letterPositions = checkDiagonal(i,j,word,"","left");
                }

                if(checkDiagonal(i,j,word,"down","")!==false){
                    letterPositions = checkDiagonal(i,j,word,"down","");
                }

                if(checkDiagonal(i,j,word,"up","")!==false){
                    letterPositions = checkDiagonal(i,j,word,"up","");
                }

                if(checkDiagonal(i,j,word,"up","left")!==false){
                    letterPositions = checkDiagonal(i,j,word,"up","left");
                }

                if(checkDiagonal(i,j,word,"up","right")!==false){
                    letterPositions = checkDiagonal(i,j,word,"up","right");
                }

                if(checkDiagonal(i,j,word,"down","right")!==false){
                    letterPositions = checkDiagonal(i,j,word,"down","right");
                }

                if(checkDiagonal(i,j,word,"down","left")!==false){
                    letterPositions = checkDiagonal(i,j,word,"down","left");
                }
            }
        }
    }

    if(letterPositions.length==0){
        alert("The word could not be found");
    }else{
        paintCells(letterPositions);
    }
}

function checkDiagonal(i,j,word,updown,leftRight){

    let letterPositions = [];
    let columnMultiplier =0;
    let rowMultiplier = 0;

    if(leftRight!=""){
        rowMultiplier = leftRight=="left" ? -1 : 1;
    }

    if(updown!=""){
        columnMultiplier = updown=="up" ? -1 : 1;
    }

    for(let x=0;x<word.length; x++){

        let rowPosition = i+(rowMultiplier*x);
        let columnPosition = j+(columnMultiplier*x);
       
        if((0<=rowPosition && rowPosition<matrix.length) && (0<=columnPosition && columnPosition<matrix[0].length)){
            if((matrix[rowPosition][columnPosition].toLowerCase() == word.charAt(x).toLowerCase())){
                letterPositions.push([rowPosition,columnPosition]);
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
    return letterPositions;

}

function clearWords(){

    for (let i = 0; i<matrix.length; i++) {
        for (let j = 0; j<matrix[0].length; j++) {
            console.log(i+" "+j);
            cell = document.getElementById(i.toString()+j.toString());
            cell.style.background = 'white';
        }
     
    }
}

function paintCells(positionsArray){
    for(let x=0;x<positionsArray.length; x++){
        cell = document.getElementById(positionsArray[x][0].toString()+positionsArray[x][1].toString());
        cell.style.background = 'cyan';
    }

    alert("The word starts at "+(positionsArray[0][0]+1)+","+(positionsArray[0][1]+1)+" and ends in"+(positionsArray[positionsArray.length-1][0]+1)+","+(positionsArray[positionsArray.length-1][1]+1));
}



