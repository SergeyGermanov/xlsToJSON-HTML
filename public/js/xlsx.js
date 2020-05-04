// Uploaded Excel file
let selectedFile;

// upload file button
document
  .getElementById("fileUpload")
  .addEventListener("change", function (event) {
    selectedFile = event.target.files[0];
  });

//   Listener for HTML converter button
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

// Copyright@Sergey Germanov
