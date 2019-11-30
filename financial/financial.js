function createRow(propArr) //создаем новую строку таблицы с введенными пользователем значениями в соотв инпут
{
	const newRow = document.createElement('tr');
   
	const td1 = document.createElement('td');
	const td2 = document.createElement('td');
	const td3 = document.createElement('td');
	const td4 = document.createElement('td');
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	//checkbox.classList.add('no-border');

	const text = document.createElement('input');
	text.type = 'text';
	text.value = propArr[0].value;

	const day = document.createElement('input');
	day.type = 'date';
	day.value = propArr[1].value;


	const cash = document.createElement('input');
	cash.type = 'number';
	cash.step = 'any';
	cash.innerText = propArr[2].value;
	cash.value = propArr[2].value;

	cash.className = 'cash ' + propArr[3];
	

	td1.append(checkbox);
	td2.append(text);
	td3.append(day);
	td4.append(cash);

	newRow.append(td1);
	newRow.append(td2);
	newRow.append(td3);
	newRow.append(td4);
	

	return newRow; 


}


const table1 = document.getElementById("table1"); 
const table2 = document.getElementById("table2");

const inputProfitPurpose = document.getElementById("profitPurpose");//ячейки таблицы инпут по поступлениям
const inputProfitDate = document.getElementById("profitDate");
const inputProfitValue = document.getElementById("profitValue");
let profitArr = [inputProfitPurpose, inputProfitDate, inputProfitValue, "profit"];// массив для компактной передачи параметров в функцию (поступления)

const inputSpendingPurpose = document.getElementById("spendingPurpose");//ячейки таблицы инпут по расходам
const inputSpendingDate = document.getElementById("spendingDate");
const inputSpendingValue = document.getElementById("spendingValue");
let spendingArr = [inputSpendingPurpose, inputSpendingDate, inputSpendingValue, "spending"];// массив для компактной передачи параметров в функцию (траты)


const FirstTableRow = document.getElementById("editableProfit");
const SecondTableRow = document.getElementById("editableSpending");

let arr1 = [];
let arr2 = [];
let conclusionSum = [0,0];
$('#buttonadd1').on('click', addRow);
$('#buttonadd2').on('click', addRow);
$('#del_1').on('click', deleteRow);
$('#edit').on('click', editRow);


//	recount(arr1, profitArr[2], $('#profitConclusion'),0);

function recount (array, inputValue, concClass, indexConcArr) {
	
	
	let sum = array.reduce((prevItem,item) => prevItem + item);
	concClass.val(sum);
	conclusionSum[indexConcArr] = sum;
	$('#conc').val(conclusionSum[0] - conclusionSum[1]);
	  
  }  
//рефакторить функцию добалвения строики
	function addRow()  {
  
  if (this.id == "buttonadd1") {
	const rowItem = createRow(profitArr);

	if (!profitArr[0].value || !profitArr[2].value) return; 
	table1.insertBefore(rowItem, FirstTableRow); 
	arr1.push(+inputProfitValue.value);
	recount(arr1, profitArr[2], $('#profitConclusion'),0);
  
	profitArr[0].value='';
	profitArr[2].value='';
	}

	else  {

	const rowItem = createRow(spendingArr);
	if (!spendingArr[0].value || !spendingArr[2].value) return; 
	table2.insertBefore(rowItem, SecondTableRow); 
	arr2.push(+inputSpendingValue.value);
	recount(arr2, spendingArr[2], $('#spendingConclusion'),
  1);
  
 	spendingArr[0].value ='';
	spendingArr[2].value = '';

	}
}
//рефакторить функцию добалвения строики
		function deleteRow() {
		let elementCollection = $('tr').has('input:checked');
     	let element = elementCollection.find('td .cash');
        for (let i in element) {
        	if (element[i].value) {
        		if (element[i].classList[1] === 'profit') {
        		arr1[arr1.indexOf(+element[i].value)] = 0;      
        		recount(arr1, profitArr[2], $('#profitConclusion'),0);
        		}	
            
            
        		else {
        		arr2[arr2.indexOf(+element[i].value)] = 0;
        		recount(arr2, spendingArr[2], $('#spendingConclusion'), 1);

        		}
        	} 
                       
        }
        elementCollection.remove();
        }
  	
		function editRow() {
   
    let arrValues = $("input.cash"); 
   
		for (let i of arrValues) {  
     
     if ($(i).hasClass("spending")) {
    $(i).on("change", searchIndex(i, arr2));
    recount(arr2, spendingArr[2], $('#spendingConclusion'), 1);
    }
    else {
    $(i).on("change", searchIndex(i, arr1)); 
    recount(arr1, profitArr[2], $('#profitConclusion'),0);
    }
    }   	
    }    
// вспомогательная функция для обновления данных таблички после внесения изменений в суммы
     function searchIndex(jqObject, array) { 
     let oldIndex = array.indexOf(+(jqObject.textContent));
   jqObject.textContent = array[oldIndex] = (Number($(jqObject).val())); 
    
    }
		
    