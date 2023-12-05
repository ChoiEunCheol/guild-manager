const express = require("express");
const router = express.Router();

function inputController(req, res) {
  res.send(`
    <form action="/addMembers" method="post" id="memberForm">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name">
      <button type="button" onclick="addName()">Add Name</button>
      <button type="submit">Add Members</button>
      <ul id="nameList"></ul>
      <input type="hidden" id="namesInput" name="names" value="">
    </form>
    <script>
    // names 배열 초기화
    let namesArray = [];

    function addName() {
      const nameInput = document.getElementById('name');
      const name = nameInput.value.trim();

      if (name !== '') {
        namesArray.push(name);
        nameInput.value = '';

        // 추가된 이름을 화면에 표시
        const nameList = document.getElementById('nameList');
        const listItem = document.createElement('li');
        listItem.textContent = name;
        nameList.appendChild(listItem);
      }
    }

    // form submit 이벤트 시 namesInput에 배열 값을 할당
    document.getElementById('memberForm').addEventListener('submit', function (event) {
      const namesInput = document.getElementById('namesInput');
      namesInput.value = JSON.stringify(namesArray);
    });    </script>
  `);
}

module.exports = { inputController, router };
