// Uploaded Excel file
let selectedFile;

// upload file button
document
  .getElementById("fileUpload")
  .addEventListener("change", function (event) {
    selectedFile = event.target.files[0];
  });

//   Listener for HTML converter button
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
      obj = document.querySelectorAll('#htmlData tr');
      addDeleteBtn(obj);

    };
  }


});

//   Listener for JSON converter button
document.getElementById("uploadExcel").addEventListener("click", function () {
  if (selectedFile) {
    console.log("File is ready");
    let fileReader = new FileReader();
    fileReader.onload = function (event) {
      let data = event.target.result;
      let worbook = XLSX.read(data, {
        type: "binary",
      });
      worbook.SheetNames.forEach((sheet) => {
        let rowObject = XLSX.utils.sheet_to_row_object_array(
          worbook.Sheets[sheet]
        );
        let jsonObject = JSON.stringify(rowObject);
        document.getElementById("jsonData").innerHTML = jsonObject;
      });
    };
    fileReader.readAsBinaryString(selectedFile);
  }
});


// delete row from myTable
function deleteRow(row) {
  var rowObj = row.parentNode.parentNode.rowIndex;
  document.querySelector("#htmlData table").deleteRow(rowObj);
}


// create a var with all rows in the tabel

// add a delete button to every row
function addDeleteBtn(obj) {
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

// select one column
function columnSelect(number) {
  let obj = document.querySelectorAll(`table td:nth-child(${number})`);
  obj.forEach(el => {
    el.style.backgroundColor = "red";
  });
}



// Copyright@Sergey Germanov
