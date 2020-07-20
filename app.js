let totalExpense=0;
let allExpense=[];

function addExpenseToTotal() {
    let expenses={};
    let moment="";
    // read value from inputAmount
    let inputElement = (document.getElementById("inputAmount")||{});
    let textAmount = inputElement.value;
    let inputDescEl = (document.getElementById("inputDesc")||{});
    let textDesc = inputDescEl.value;
    // convert it to number
    let expense = Number(textAmount);
    expenses={
        amount : expense,
        desc : textDesc
    }
    expenses.moment=new Date();
    // console.log(expenses.moment);
    // add that value to totalExpense
    totalExpense = totalExpense + expense;
    allExpense.push(expenses);
    document.getElementById("inputAmount").value= null ;
    // console.log(textDesc);
    document.getElementById("inputDesc").value= null;
    updateTotal();

    renderListarr(allExpense);

}

function updateTotal(){
    const headingEl=(document.getElementById("headingTotal")||{});
    let someText = `Total: ${totalExpense}`;
    headingEl.textContent=someText;
}

function deleteItem(dateValue,amount){
    // console.log('the function was called',dateValue);
    let newArr=[];
    for(let i=0;i<allExpense.length;i++){
        if(allExpense[i].moment.valueOf()!==dateValue){
            newArr.push(allExpense[i]);
        }
    }
    renderListarr(newArr);
    totalExpense=totalExpense-amount;
    updateTotal();
}

function renderListarr(arrOfList){
    const expenseArr = arrOfList.map(expense1 => {
        return `
        <li class="list-group-item d-flex justify-content-between">
             <div class="d-flex flex-column">
                ${expense1.desc}
                <small class="text-muted">${expense1.moment.toLocaleDateString('en-US',{
                    year:'numeric',
                    month:'long',
                    day:'numeric'
                    })}</small>
            </div>
            <div>
                <span class="px-5">
                    ${expense1.amount}
                </span>
                <button type="button" class="btn btn-outline-danger btn-sm" 
                onclick="deleteItem(${expense1.moment.valueOf()},${expense1.amount})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </li>
        `
    });

    const joinArr = expenseArr.join(" ");
    const tableElementEl = (document.getElementById("tableElement")||{});
    tableElementEl.innerHTML= joinArr; 
    allExpense=arrOfList;
}
