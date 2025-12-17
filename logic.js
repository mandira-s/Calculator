let innerString = '';
let displayString = '';
let buttons = document.querySelectorAll('.button');

Array.from(buttons).forEach((button)=>{
    button.addEventListener('click', (e)=>{
        if(e.target.innerHTML == '='){
            try{
                innerString = eval(innerString);
                displayString = innerString;
                document.querySelector('input').value = displayString;
            }
            catch{
                displayString = "Error";
                innerString = "";
                document.querySelector('input').value = displayString;
            }
        }
        else if(e.target.innerHTML == 'C'){
            displayString = '';
            innerString = '';
            document.querySelector('input').value = displayString;
        }
        else if(e.target.id == 'cross'){
            innerString = innerString.slice(0, innerString.length - 1);
            displayString = displayString.slice(0, displayString.length -1);
            document.querySelector('input').value = displayString;
        }
        else if(e.target.innerHTML == 'x'){
            innerString = innerString + '*';
            displayString = displayString + 'x';
            document.querySelector('input').value = displayString;
        }
        else if(e.target.innerHTML == '÷'){
            innerString = innerString + '/';
            displayString = displayString + '÷';
            document.querySelector('input').value = displayString;
        }
        else if(e.target.innerHTML == '%'){
            innerString = innerString + '/100*';
            displayString = displayString + '%';
            document.querySelector('input').value = displayString;
        }   
        else if(e.target.innerHTML == '()'){
            let lastChar = innerString.slice(-1);
            let open = 0, close = 0;
            for(let c of innerString){
                if(c == '('){
                    open++;
                }
                else if(c == ')'){
                    close++;
                }
            }
            let canClose = open > close && ((lastChar >= '0' && lastChar <= '9') || lastChar == ')');
            if(canClose){
                innerString = innerString + ')';
                displayString = displayString + ')';
            }else{
                innerString = innerString + '(';
                displayString = displayString + '(';
            }
            document.querySelector('input').value = displayString;
        }
        else if(e.target.innerHTML == '+/-'){
            let i = innerString.length - 1;
            while(i >= 0){
                let char = innerString[i];
                if(char == '+' || char == '*' || char == '/' || char == '%' ){
                    break;
                }
                if(char == '-' && i > 0 && "+-*/%".includes(innerString[i-1])){
                    break;
                }
                i--;
            }
            let lastNumStart = i + 1;
            let before = innerString.slice(0, lastNumStart);
            let lastNumber = innerString.slice(lastNumStart);
            if(lastNumber[0] == '-'){
                lastNumber = lastNumber.slice(1);
            } else {
                lastNumber = '-' + lastNumber;
            }
            innerString = before + lastNumber;
            displayString = "";
            for(let j = 0; j < innerString.length; j++){
                let c = innerString[j];
                if(c == '*') displayString += 'x';
                else if(c == '/') displayString += '÷';
                else displayString += c;
            }
            document.querySelector('input').value = displayString;
        }
        else{
            innerString = innerString + e.target.innerHTML;
            displayString = displayString + e.target.innerHTML;
            document.querySelector('input').value = displayString;
        }
    })
})