//The functions are refered here as:
// Sinus : sin(x)-x/13
// Asymptote: x/(1-x^2)

//Map to put the borders in it
let boundariesSinus = new Map();
let boundariesAsymptote = new Map();

let delta = 0.1;
let IndiceDichotomie = 0;
let IndiceDelai = 0;

//Display Dichotomie
let displayASinus = [];
let displayBSinus = [];
let displayAAsymptote = [];
let displayBAsymptote = [];

//RESULTS
let resultSinus = [];
let resultAsymptote = [];
let expectedResultSinus = [
  -8.69239,
  -6.83698,
  -2.91541,
  0,
  2.91541,
  6.83698,
  8.69239,
];
let expectedResultAsymptote = [0];

//TEXT AND CHECKBOX
let textError;
let SinusError;
let AsymptoteError;
let functionCheckbox;
let dichotomieCheckbox;

let p52dGraph, x, y;
graphConfig = {
  basicConfig: {
    x: 50,
    y: 50,
    w: 600,
    h: 300,
  },
};

function setup() {
  createP("Auteurs:<li>Alessio Comi</li><li>Benjamin Mouchet</li> <li>Guillaume Mouchet</li>");
  createCanvas(700, 400);
  
  p52dGraph = new P52dGraph(graphConfig);
  
  functionCheckbox = createCheckbox("Switch function", true);
  dichotomieCheckbox = createCheckbox("Show bisection steps ", false);
  textError = createP("f(x) = sin(x)-x/13 error : " + SinusError);

  //Since its in the setup we calculate everything for both function
  //SINUS
  defineBorders("Sinus");
  console.log(boundariesSinus);
  findZeros("Sinus");
  SinusError = errorSinus();

  //Asymptote
  defineBorders("Asymptote");
  console.log(boundariesAsymptote);
  findZeros("Asymptote");
  AsymptoteError = errorAsymptote();
}

function draw() {
  background(20);
  drawGraph();

  if (functionCheckbox.checked()) {
    //SINUS
    drawSinus();
    textError.html("f(x) = sin(x)-x/13 error : " + SinusError);
  } else {
    //Asymptote
    drawAsymptote();
    textError.html("f(x) = x/(1-x^2) error : " + AsymptoteError);
  }

}

function drawGraph() {
  p52dGraph.display();
  p52dGraph.drawSubGrid();
  p52dGraph.drawMainGrid();
  p52dGraph.pan();
  p52dGraph.zoom();
  p52dGraph.markCoords();
  displayDichotomie(); //to have a longer display we draw it with the graph
}

//Functions
//Sinus
function f1(a) {
  return sin(a) - a / 13.0;
}
//Asymptote
function f2(a) {
  return a / (1 - a * a);
}

// Drawing the function sin(x)-x/13.0
function drawSinus() {
  fill(255);
  delta = 0.1;
  for (let xs = -100; xs < 100; xs += delta) {
    const graphX = p52dGraph.getXPixel(xs);
    const graphY = p52dGraph.getYPixel(f1(xs));
    const oldGraphX = p52dGraph.getXPixel(xs - delta);
    const oldGraphY = p52dGraph.getYPixel(f1(xs - delta));
    stroke("red");
    line(oldGraphX, oldGraphY, graphX, graphY);
  }
  p52dGraph.clip();
}

//Drawing the function x/(1-x*x)
function drawAsymptote() {
  fill(255);
  delta = 0.05; //Change to 0.02 for better display but it lags
  for (let xs = -100; xs < 100; xs += delta) {
    const graphX = p52dGraph.getXPixel(xs);
    const graphY = p52dGraph.getYPixel(f2(xs));
    const oldGraphX = p52dGraph.getXPixel(xs - delta);
    const oldGraphY = p52dGraph.getYPixel(f2(xs - delta));
    stroke("red");
    line(oldGraphX, oldGraphY, graphX, graphY);
  }
  p52dGraph.clip();
}

//Function to find the Zeros of the functions
function defineBorders(funct) {
  let a;
  let b;
  //Checking with a window of size 1 if we are in presence of a 0.
  //Condition checks if we are negative or == 0 (Bolzano)
  //Since (+ * - == -) --> we are in presence of a potential 0
  for (a = -100.1, b = -99.1; a <= 100; a += 1, b += 1) {
    if (funct == "Sinus") {
      if (f1(a) * f1(b) <= 0) {
        boundariesSinus.set(a, b);
      }
    } else if (funct == "Asymptote") {
      if (f2(a) * f2(b) <= 0) {
        boundariesAsymptote.set(a, b);
      }
    }
  }
}

function findZeros(funct) {
  if (funct == "Sinus") {
    boundariesSinus.forEach((values, keys) => {
      let a = dichotomie(keys, values, funct);
      resultSinus.push(a);
    });
    console.log(resultSinus);
  } else if (funct == "Asymptote") {
    boundariesAsymptote.forEach((values, keys) => {
      let a = dichotomie(keys, values, funct);
      //Condition makes sure we are in presence of a 0 and not an asymptote
      if (!(f2(a) > 1 || f2(a) < -1)) {
        resultAsymptote.push(a);
      }
    });
    console.log(resultAsymptote);
  }
}

//Calculate a functions zeros with a bisection approach. Inputs: left border a, right border b and function to evaluate.
function dichotomie(a, b, funct) {
  
  let fa = 0;
  let mNew = a + b;
  let mOld = 2 * mNew;
  let couleurStroke = 255;
  
  while (Math.abs(mNew - mOld) > Number.EPSILON) {
    //to save time we push directly the values of the borders in an array, to display them later
    
    if (funct == "Sinus") {
      fa = f1(a);
      displayASinus.push(a);
      displayBSinus.push(b);
    } else if (funct == "Asymptote") {
      fa = f2(a);
      displayAAsymptote.push(a);
      displayBAsymptote.push(b);
    }
    
    mOld = mNew;
    mNew = (a + b) / 2;
    let fm = 0;
    
    if (funct == "Sinus") {
      fm = f1(mNew);
    } else if (funct == "Asymptote") {
      fm = f2(mNew);
    }
    
    if (fm * fa <= 0) {
      b = mNew;
    } else {
      a = mNew;
      fa = fm;
    }
  }
  return mNew;
}

//Used to draw the bisection, with the values calculated in the setup
function displayDichotomie() {
  if (dichotomieCheckbox.checked()) { //Checking if we need to display the dichotomie
    if (functionCheckbox.checked())
    { //SINUS
      let a = p52dGraph.getXPixel(displayASinus[IndiceDichotomie]);
      let b = p52dGraph.getXPixel(displayBSinus[IndiceDichotomie]);
      stroke(127, 255, 0);
      line(a, p52dGraph.getYPixel(-10), a, p52dGraph.getYPixel(10));
      line(b, p52dGraph.getYPixel(-10), b, p52dGraph.getYPixel(10));
      timerDichotomieSinus();
    } else 
    { // ASYMPTOTE
      let a = p52dGraph.getXPixel(displayAAsymptote[IndiceDichotomie]);
      let b = p52dGraph.getXPixel(displayBAsymptote[IndiceDichotomie]);
      stroke(127, 255, 0);
      line(a, p52dGraph.getYPixel(-10), a, p52dGraph.getYPixel(10));
      line(b, p52dGraph.getYPixel(-10), b, p52dGraph.getYPixel(10));
      timerDichotomieAsymptote();
    }
  }
}

//Used to delay the display of the bisection and show the border and loop on the values
function timerDichotomieAsymptote() {
  if (IndiceDelai == 20) {
    if (displayAAsymptote.length > IndiceDichotomie) {
      IndiceDichotomie++;
      IndiceDelai = 0;
      //console.log(displayAAsymptote.length) //Total size of 156 for all 3 dichotomies so each one has 52 values in it 
      //We can make it quicker by skipping all the values so close from 0 we cant se the difference
      if(IndiceDichotomie % 10==0)
        {
          IndiceDichotomie+=42;
        }
    } else {
      IndiceDichotomie = 0;
    }
  } else {
    IndiceDelai++;
  }
}

//Used to delai the display of the dichotomy and show the border and loop on the values
function timerDichotomieSinus() {
  if (IndiceDelai == 20) {
    
    if (displayASinus.length > IndiceDichotomie) {
      IndiceDichotomie++;
      IndiceDelai = 0;
      
      //console.log(displayASinus.length) //Total size of 364 for all 7 dichotomy so each one has 52 values in it 
      //We can make it quicker by skipping all the values so close from 0 we cant se the difference
      if(IndiceDichotomie % 10==0)
        {
          IndiceDichotomie+=42;
        }
    } else {
      IndiceDichotomie = 0;
    }
  } else {
    IndiceDelai++;
  }
}

//Calculate error between the expected and the real results
function errorSinus() {
  let error = 0;
  for (let a = 0; a < expectedResultSinus.length; a++) {
    error += abs(expectedResultSinus[a] - resultSinus[a]);
  }
  return error / expectedResultSinus.length;
}

//Calculate error between the expected and the real results
function errorAsymptote() {
  let error = 0;
  for (let a = 0; a < expectedResultAsymptote.length; a++) {
    error += abs(expectedResultAsymptote[a] - resultAsymptote[a]);
  }
  return error / expectedResultAsymptote.length;
}
