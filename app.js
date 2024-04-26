function showText() {
  var inputText = document.getElementById("inputText").value;
  var arraryInsert = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

  if (inputText !== null && inputText.trim() !== "") {
    var lines = inputText.split(/\r?\n/); // Chia văn bản thành mảng các dòng
    lines = lines.filter(function (line) {
      return line.trim() !== "";
    });
    var output = document.getElementById("output");
    output.innerHTML = ""; // Xóa bỏ nội dung cũ trong phần output

    lines.forEach(function (line, index) {
      // Kiểm tra xem dòng có chứa đường dẫn hợp lệ không
      var line = line.trim().toLowerCase();
      if (isURL(line)) {
        var paragraph = document.createElement("div");
        paragraph.classList.add("links");
        if (isHTTPS(line)) {
          line = line.toLowerCase();
          arraryInsert.forEach(function (value, idx) {
            if (line.endsWith("/")) {
              paragraph.innerHTML += "<span>" + line + value + "</span>"; // Thêm giá trị từ mảng arraryInsert vào cuối mỗi dòng
            } else {
              paragraph.innerHTML += "<span>" + line + "/" + value + "</span>"; // Thêm giá trị từ mảng arraryInsert vào cuối mỗi dòng
            }
          });
        } else {
          arraryInsert.forEach(function (value, idx) {
            // Kiểm tra nếu line bắt đầu bằng "http://", thì thay thế nó thành "https://"
            var modifiedLine = line.startsWith("http://")
              ? line.replace("http://", "https://")
              : line;

            if (
              !modifiedLine.includes("https://") &&
              !modifiedLine.includes("http://")
            ) {
              modifiedLine = "https://" + modifiedLine;
            }
            if (modifiedLine.endsWith("/")) {
              paragraph.innerHTML +=
                "<span>" + modifiedLine + value + "</span>"; // Thêm giá trị từ mảng arraryInsert vào cuối mỗi dòng
            } else {
              paragraph.innerHTML +=
                "<span>" + modifiedLine + "/" + value + "</span>"; // Thêm giá trị từ mảng arraryInsert vào cuối mỗi dòng
            }
          });
        }
        // Tạo một thẻ <br> mới
        var brElement = document.createElement("p");

        // Thêm thẻ <br> vào cuối phần tử <div>
        paragraph.appendChild(brElement);

        buttonCopy();
        output.appendChild(paragraph); // Thêm dòng vào phần output
      } else {
        alert(line + " nội dung này không hợp lệ");
      }
    });
  } else {
    alert("Vui lòng nhập nội dung");
  }
}

function isURL(str) {
  // Biểu thức chính quy để kiểm tra URL
  var urlRegex = /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/\S*)?$/i;
  // Kiểm tra xem chuỗi có khớp với biểu thức chính quy không
  return urlRegex.test(str);
}

// Hàm kiểm tra xem một chuỗi có phải là URL hợp lệ không
function isHTTPS(str) {
  var urlRegex =
    /^(https:\/\/)[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/i;
  return urlRegex.test(str);
}

function addSubDomain() {
  var inputText = document.getElementById("inputText").value;
  var arrValueToAdd = ["ad", "dk", "qc", "ld"];

  // Lấy phần tử output
  var output = document.getElementById("output");

  // Xóa bỏ nội dung hiện tại của phần tử output
  output.innerHTML = "";

  // Chia các đường link thành mảng dựa trên dấu xuống dòng
  var urls = inputText.split(/\r?\n/);

  var errFlag = false;

  if (inputText !== null && inputText.trim() !== "") {
    var urls = inputText.split(/\r?\n/); // Chia văn bản thành mảng các dòng
    urls = urls.filter(function (url) {
      return url.trim() !== "";
    });

    urls.forEach(function (url) {
      var url = url.trim().toLowerCase();
      // Kiểm tra nếu đường link không có tiền tố "http://" hoặc "https://"
      if (!url.includes("https://") && !url.includes("http://")) {
        url = "https://" + url; // Thêm tiền tố "https://" vào URL
      }

      if (!isURL(url)) {
        alert("Nội dung nhập vào không phải là một đường dẫn hợp lệ.");
        errFlag = true;
        return; // Dừng lặp nếu có lỗi
      }

      var paragraph = document.createElement("div");
      paragraph.classList.add("links");
      paragraph.innerHTML += "<span>" + url + "</span>";

      arrValueToAdd.forEach(function (valueToAdd) {
        var modifiedText = url.replace(
          /^(https?:\/\/)(.*?)/,
          function (match, p1, p2, p3) {
            return "<span>" + p1 + valueToAdd + "."; // Thực hiện thay thế và trả về kết quả
          }
        );
        paragraph.innerHTML += modifiedText.toLowerCase();

        output.appendChild(paragraph);

        buttonCopy();
      });

      paragraph.innerHTML += "<p></p>";
    });
  }
}
function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(function () {
      alert("Đã sao chép đoạn văn bản!");
    })
    .catch(function (err) {
      console.error("Lỗi khi sao chép vào clipboard: ", err);
    });
}
function buttonCopy() {
  var copyButton = document.createElement("button");
  copyButton.textContent = "Sao chép";
  copyButton.classList.add("copy-button");
  var copyButtonContainer = document.getElementById("copyButtonContainer");
  copyButton.addEventListener("click", function () {
    copyToClipboard(output.innerText);
  });

  copyButtonContainer.innerHTML = ""; // Xóa bỏ nút "Sao chép" cũ (nếu có)
  copyButtonContainer.appendChild(copyButton); // Thêm nút "Sao chép" mới vào phần tử chứa nút
}

// call intro
//introJs().pause();
