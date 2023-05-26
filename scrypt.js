const screen = document.getElementById('screen');
const subScreen = document.getElementById('subScreen');
const nums = document.querySelectorAll('.numKey');
const operators = document.querySelectorAll('.operatorKey');
const functionKeys = document.querySelectorAll('.functionKey');
const dotKey = document.getElementById('dotKey');
const alertScreen = document.getElementById('alert');
const alertButton = document.getElementById('alertOk');
var lastKey = null
var operatorSign = null

// adiciona evento de clique para cada botão numérico.
nums.forEach(num => {
  num.addEventListener('click', () => {

    if (screen.innerText === '0') {
      screen.innerText = num.innerText;
    } else {
      screen.innerText += num.innerText;
    }
    
  let id = num.id;

  lastKey = id
  console.log(lastKey)
  });
});

// adiciona evento de clique para botão 'ponto/virgula'.
dotKey.addEventListener('click', () => {

  if(lastKey != "operator" || lastKey != "dot"){

    if (dotVerification(screen.innerText) == false) {
      screen.innerText += ".";
      lastKey = "dot"
      console.log(lastKey)
      return
    }
    
  } else {

    if (dotVerification(screen.innerText) == false) {
      backspace();
      screen.innerText += ".";
      lastKey = "dot"
      console.log(lastKey)
      return
    }
  }

  lastKey = "dot"
  console.log(lastKey)

});

// adiciona evento de clique para cada botão de operação.
operators.forEach(operator => {
  operator.addEventListener('click', () => {
    

    let id = operator.id;
    
    switch (id) {

      case "plus":

        
      if(lastKey != "operator"){ //se a última tecla pressionada não for um operador...

        if(operatorVerification(screen.innerText) == true){ //
          console.log('A expressão contém um operador.');
          subScreen.innerText = screen.innerText + " =";
          calculate()
        } 
        
        else {
          console.log('A expressão não contém um operador.');
        }

        screen.innerText += "+";
      }
      else{ //se a última tecla pressionada for um operador...
        
        backspace();
        screen.innerText += "+";
      }

      lastKey = "operator"
      operatorSign = "+"
      console.log(lastKey)
        
        break;

      case "minus":

        if(lastKey != "operator"){

          if(operatorVerification(screen.innerText) == true){
            console.log('A expressão contém um operador.');
            subScreen.innerText = screen.innerText + " =";
            calculate()
          } 
          
          else {
            console.log('A expressão não contém um operador.');
          }

          screen.innerText += "-";
        }
        else{
          backspace();
          screen.innerText += "-";
        }

        lastKey = "operator"
        operatorSign = "-"
        console.log(lastKey)

        break;

      case "multiplication":

        if(lastKey != "operator"){

          if(operatorVerification(screen.innerText) == true){
            console.log('A expressão contém um operador.');
            subScreen.innerText = screen.innerText + " =";
            calculate()
          } 
          
          else {
            console.log('A expressão não contém um operador.');
          }

          screen.innerText += "*";
        }
        else{
          backspace();
          screen.innerText += "*";
        }

        lastKey = "operator"
        operatorSign = "*"
        console.log(lastKey)

        break;

      case "division":

        if(lastKey != "operator"){

          if(operatorVerification(screen.innerText) == true){
            console.log('A expressão contém um operador.');
            subScreen.innerText = screen.innerText + " =";
            calculate()
          } 
          
          else {
            console.log('A expressão não contém um operador.');
          }

          screen.innerText += "/";
        }
        else{
          backspace();
          screen.innerText += "/";
        }

        lastKey = "operator"
        operatorSign = "/"
        console.log(lastKey)

        break;

      case "equals":

        calculate();

          break;
    
    }

  });
});

// adiciona evento de clique para cada botão de função.
functionKeys.forEach(functionKey =>{
  functionKey.addEventListener('click', () =>{

    let id = functionKey.id;
    
    switch (id) {
    
      case "backspace":

        backspace();

          break;

      case "cleanScreen":

        cleanScreen();
        
          break;
    
    }

    lastKey = "functionKey"
    console.log(lastKey)
  })
});

// adiciona evento de clique para o botão do alerta.
alertButton.addEventListener('click',() =>{

  alertScreen.classList.remove("showAlert")

} );


function backspace() {

  let screenValue = screen.innerText;

  screen.innerText = screenValue.slice(0, -1);

  if(screen.innerText === ""){
    cleanScreen()
  }
  
}

function calculate() {
   
  
  try {

  const expression = screen.innerText;
  const result =  eval(expression); // executa a expressão aritmética.

  if (expression.includes(".")) {
    screen.innerText = result.toFixed(2); // exibe o resultado na tela, limitado à duas casas decimais, caso seja um número decimal
  } else {
    screen.innerText = result; // exibe o resultado na tela.
  }
  
  subScreen.innerText = expression + " ="; // exibe expressão na segunda tela (menor).
  console.log(result)

  } catch (error) {

    showAlert() //caso haja algum erro na expressão, é exibido um alerta para o usuário.

  }
  
}

function cleanScreen(){

  screen.innerText = "0";
  subScreen.innerText = "0";

}

function showAlert(){

  alertScreen.classList.add("showAlert")

}

function operatorVerification(expression){

  console.log(expression);

  if (expression.includes("+") || expression.includes("-") || expression.includes("*") || expression.includes("/")) {
    return true
  }
  else{
    return false
  }
}

function dotVerification (expression){

  if (operatorVerification(expression) == true) {

    let terms = expression.split(operatorSign)
    console.log("primeiro termo " + terms[0])
    console.log(operatorSign)
    console.log("segundo termo " + terms[1])

    if (terms[1] === "" || terms[1].includes(".") ) {
      return true
    } else {
      return false
    }
    
  }
  else{

    if (expression.includes(".")) {
      return true
    } else {
      return false
    }
    
  }
}

