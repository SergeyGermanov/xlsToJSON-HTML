// Uploaded Excel file
let selectedFile;

// upload file button
document
  .getElementById("fileUpload")
  .addEventListener("change", function (event) {
    selectedFile = event.target.files[0];
  });

//   Listener for HTML converter button
// create a table with EXCEL file content
let obj;
document.querySelector("#uploadHTML").addEventListener("click", function () {
  if (selectedFile) {
    console.log("HTML File is Ready");
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(selectedFile);

    fileReader.onload = function (e) {
      let data = e.target.result;
      let worbook = XLSX.read(data, { type: "array" });
      let htmlStr;
      worbook.SheetNames.forEach((sheet) => {
        htmlStr = XLSX.utils.sheet_to_html(worbook.Sheets[sheet]);
      });

      document.querySelector("#htmlData").innerHTML = htmlStr;

      // add Edit button for the TABLE
      document.querySelector('#editBtn').style.display = 'inline';
      // add Border Show button for the TABLE
      document.querySelector('#bordersBtn').style.display = 'inline';


    };
  }
});

// event Listener for Edit btn. It creates delete BTN for rows and columns
document.querySelector('#editBtn').addEventListener('click', function () {
  obj = document.querySelectorAll('#htmlData tr');
  addDeleteRowBtn(obj);
  createRow();
});

//   Listener for JSON converter button
// document.getElementById("uploadExcel").addEventListener("click", function () {
//   if (selectedFile) {
//     console.log("File is ready");
//     let fileReader = new FileReader();
//     fileReader.onload = function (event) {
//       let data = event.target.result;
//       let worbook = XLSX.read(data, {
//         type: "binary",
//       });
//       worbook.SheetNames.forEach((sheet) => {
//         let rowObject = XLSX.utils.sheet_to_row_object_array(
//           worbook.Sheets[sheet]
//         );
//         let jsonObject = JSON.stringify(rowObject);
//         document.getElementById("jsonData").innerHTML = jsonObject;
//       });
//     };
//     fileReader.readAsBinaryString(selectedFile);
//   }
// });


// delete row from myTable
function deleteRow(row) {
  var rowObj = row.parentNode.parentNode.rowIndex;
  document.querySelector("#htmlData table").deleteRow(rowObj);
}


// create a var with all rows in the tabel

// add a delete button to every row
function addDeleteRowBtn(obj) {
  obj.forEach(tr => {
    let td = document.createElement('td');
    let btn = document.createElement('input');
    btn.setAttribute('type', 'button');
    btn.setAttribute('value', 'Delete Row');
    btn.setAttribute('onclick', 'deleteRow(this)');
    td.appendChild(btn);
    tr.insertBefore(td, tr.childNodes[0]);
    console.log(tr);
  });
}

// function to create an upper row with delete buttons
function createRow() {
  let table = document.querySelector('#htmlData table');
  let len = document.querySelector('#htmlData table').rows[0].cells.length;
  console.log(len);
  let row = table.insertRow(0);

  for (let i = 0; i < len; i++) {
    let cell = row.insertCell(i);
    if (i === 0) {
      cell.innerHTML = '';
    } else {
      let btn = document.createElement('input');
      btn.setAttribute('type', 'button');
      btn.setAttribute('value', 'Delete Row');
      btn.setAttribute('onclick', `columnDelete(this)`);
      cell.appendChild(btn);
    }
  }

}

// select one column and Delete
function columnDelete(cell) {
  let index = cell.parentNode.cellIndex + 1;
  let obj = document.querySelectorAll(`table td:nth-child(${index})`);
  obj.forEach(el => {
    el.remove();
  });
}

// add borders

document.querySelector('#bordersBtn').addEventListener('click', function () {
  let tr = document.querySelectorAll('#htmlData tr');
  tr.forEach((el, index) => {
    index % 2 === 0 ? el.classList.toggle('colorOdd') : el.classList.toggle('colorEven');
  });
});



// Copyright@Sergey Germanov
