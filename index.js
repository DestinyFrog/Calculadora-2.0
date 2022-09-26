const display = document.getElementById('display');
const history = document.getElementById('historic');
var opera = [];
var numbers = [];
var sent;

function cl(){
    display.value = '';
}
function typ(ch){
    if(display.value.includes('=')){
        let antValue = history.textContent;
        history.textContent = '';
        history.textContent += display.value+"\n"+antValue;
        del();
    }

    if(ch == '()'){
        if(display.value.includes('(') == false){
            display.value += '( ';
        }else{
            display.value += ' )';
        }
    }else if(ch === '-x'){
        display.value += '-';
    }else if(!isNaN(ch) || ch === '.'){
        display.value += ch.toString();
    }else{
        display.value += ' '+ch.toString()+' ';
    }

    if(display.value[0] === ' '){
        display.value = display.value.substring(1);
    }
};
function del(){
    display.value = display.value.substring(0, display.value.length - 1);
}
function Init (){
    sent = display.value;
    expr = sent.substr(sent.lastIndexOf("\n")+1).split(" ")

    expr.forEach(function (b){
        if (isNaN(b) == false ){
            numbers.push(parseFloat(b))
        }else{
            opera.push(b);
        }
    })

    filterBrackets('(',')');
    filter('¨');
    filter('^');
    filter('/');
    filter('*');
    filter('-');
    filter('+');

    let result = numbers[0];
    let antValue = history.textContent;
    history.textContent = '';
    history.textContent += display.value+' = '+result+'\n'+antValue;
    display.value = result;

    opera.length = 0
    numbers.length = 0
}
function filterBrackets(open, close){
    if(opera.includes(open)){
        let op = opera.slice();
        let nu = numbers.slice();

        let id = op.indexOf(open);
        let di = op.indexOf(close);

        op.splice(0, id + 1);
        op.splice(di, op.length);
        nu.splice(0, id);
        nu.splice(di, nu.length);

        while(op.includes('¨') == true){
            let idxe = op.indexOf('¨')
            nu[idxe] = Operate('¨', [nu[idxe], nu[idxe+1]])
            nu.splice(idxe + 1, 1)
            op.splice(idxe, 1)
        }
        while(op.includes('^') == true){
            let idxe = op.indexOf('^')
            nu[idxe] = Operate('^', [nu[idxe], nu[idxe+1]])
            nu.splice(idxe + 1, 1)
            op.splice(idxe, 1)
        }
        while(op.includes('/') == true){
            let idxe = op.indexOf('/')
            nu[idxe] = Operate('/', [nu[idxe], nu[idxe+1]])
            nu.splice(idxe + 1, 1)
            op.splice(idxe, 1)
        }
        while(op.includes('*') == true){
            let idxe = op.indexOf('*')
            nu[idxe] = Operate('*', [nu[idxe], nu[idxe+1]])
            nu.splice(idxe + 1, 1)
            op.splice(idxe, 1)
        }
        while(op.includes('-') == true){
            let idxe = op.indexOf('-')
            nu[idxe] = Operate('-', [nu[idxe], nu[idxe+1]])
            nu.splice(idxe + 1, 1)
            op.splice(idxe, 1)
        }
        while(op.includes('+') == true){
            let idxe = op.indexOf('+')
            nu[idxe] = Operate('+', [nu[idxe], nu[idxe+1]])
            nu.splice(idxe + 1, 1)
            op.splice(idxe, 1)
        }

        numbers[id] = nu[0];
        opera.splice(id, di + 1);
        numbers.splice(id + 1, di - 1);

        console.log(opera);
        console.log(numbers);
    }
}
function filter(operation){
    while(opera.includes(operation) == true){
        idx = opera.indexOf(operation)
        numbers[idx] = Operate(operation, [numbers[idx], numbers[idx+1]])
        numbers.splice(idx + 1, 1)
        opera.splice(idx, 1)
    }
}
function Operate(operation, nums){
    a = nums[0]
    b = nums[1]

    switch(operation){
        case '+':
            return a + b
        case '-':
            return a - b
        case '*':
            return a * b
        case '/':
            return a / b
        case '^':
            return Math.pow(a, b)
        case '¨':
            if(a === 2){
                return Math.sqrt(b);
            }else{
                return Math.cbrt(b);
            }
        default:
            return NaN
    }
}