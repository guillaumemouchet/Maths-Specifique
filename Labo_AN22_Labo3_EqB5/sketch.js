let matrix = [];

//Received from the Json file
let A;
let B;

//size of the matrix
let n = 0;
let m = 0;

//createElement
let startBtn;
let time;

//For the timer
let startTime;
let endTime;

//for the file opening
let loadedJSON = null;
let fileContent;


let noSolution= 0; //Check if matrix has a solution, 0 if yes, 1 if not

function setup() {
 
  startBtn = createButton("Start");
  startBtn.position(380, 300)
  startBtn.mousePressed(start);
  startBtn.hide();
  
  time = createP("Time :");
  time.position(380,310);
}

async function changeJson(event)
{
  let jsonFile = event.target.files.item(0); //picking the first choosen file
  if(jsonFile)
    {
      fileContent = await jsonFile.text(); //get the content of the json file
      loadJsonFile();
    }
}


function loadJsonFile() {
  //Load the JSON content from the selected file
  loadedJSON = JSON.parse(fileContent); //creating an object of the content of the json file
  onFileLoad();
}
  
//A,B and n are attributes of the json object
function onFileLoad() {
  
    m = loadedJSON.n[0];
    n = m+1;
  
    A = loadedJSON.A;
  
    B = loadedJSON.B;
    
  initialize();
}

/**
*Initialize the matrix with A and B as an nxm size matrix
**/
function initialize() 
{
  let indiceA = 0;
  let indiceB = 0;
  let y = 0;
  let x = 0;
  for (x = 0; x < m; x++) {
    matrix[x] = []; 
    for (y = 0; y < m; y++) {
      matrix[x][y] = A[indiceA++];
    }
    matrix[x][y]= B[indiceB++];
  }  
  
  noSolution = 0;
  startBtn.show();
}


function start()
{
  startBtn.hide(); //hide the button so no other gaussElimination can be started
  
  startTime = new Date();
  gaussElimination();
  solve();
  
  endTime = new Date(); //the timer end before the display
  time.html("Time : " + (endTime.getTime()-startTime.getTime()) + " ms");

  display();
}

function gaussElimination()
{
    let h = 0; /* Pivot row initialization */ 
    let k = 0; /* Pivot column initialization */

    while(h < m && k < n-1)
    {
        let max_i = h;
        /* Looking for highest value in column */
        for(let i = h+1; i < m; i++)
        {
            if(Math.abs(matrix[i][k]) > Math.abs(matrix[max_i][k]))
            {
                max_i = i;
            }
        }
        if (matrix[max_i][k] == 0)
        {
            /* No pivot in column, pass to next column */
            k++;
        }
        else
        {
            /* Swapping rows */
            if(max_i != h)
            {
                for(let j = 0; j < n; j++)
                {
                    let temp = matrix[h][j];
                    matrix[h][j] = matrix[max_i][j];
                    matrix[max_i][j] = temp;    
                }
            }

            /* Reducing lower rows */
            for(let i = h+1; i < m; i++)
            {
                let factor = matrix[i][k] / matrix[h][k];

                matrix[i][k] = 0; 

                for(let j = k+1; j < n; j++)
                {
                    matrix[i][j] = matrix[i][j] - matrix[h][j] * factor;
                }
            }
            h++;
            k++;
        }
    }
}

function solve(checkDet=1)
{
    //Making sure there is an answer
    if(checkDet)
    {
        let det = 1;
        let i = 0; let j = 0;
        for(i,j; i < m; i++, j++)
        {
            det *= matrix[i][j];
        }
        if(det == 0)
        {
            noSolution = 1; //no solution exists, the flag is at 1
            return;
        }
    }
    //Starting from the bottom since matrix is now triangular
    let i = m-1; let j = n-2;
    for(i, j; i >= 0 && j >= 0; i--, j--)
    {
        let val = matrix[i][n-1]/matrix[i][j];
        //Replacing new val in rows above
        for(let k = i-1; k >= 0; k--)
        {
            matrix[k][n-1] -= (matrix[k][j] * val);
        } 
    }

} 

function display(){
  
   document.getElementById('user_table').innerHTML="";//remove old values
 

  for(let i= 0, j= 0; i < m && j < n; i++, j++)
    {
      
        if(matrix[i][j]!= 1)
        { 
            matrix[i][n-1] /= matrix[i][j];
        }
      //creating new rows
      let tdX = document.createElement("td");
      tdX.innerHTML = "x"+(i+1);
      let tdValue = document.createElement("td");
      if(noSolution)//depending on the flag we show the solutions or no solution
        {
          tdValue.innerHTML = "no solution" ;
        }else{
      tdValue.innerHTML = matrix[i][n-1] ;
        }
      let tr = document.createElement("tr");
      tr.appendChild(tdX);
      tr.appendChild(tdValue);
      document.getElementById("user_table").appendChild(tr);
        

    }

}