let datas = [
  {
    id: 0,
    value: 75,
  },
  {
    id: 1,
    value: 20,
  },
  {
    id: 2,
    value: 80,
  },
  {
    id: 3,
    value: 100,
  },
  {
    id: 4,
    value: 70,
  },
];

document.addEventListener("DOMContentLoaded", () => {
  updateComponent();
});

function updateComponent() {
  makeDeleteBox();
  makeDetailBox();
}

function makeDetailBox() {
  const detail_area = document.getElementById("detail_area");
  detail_area.value = JSON.stringify(datas, null, 2);
  console.log(datas);
  console.log(JSON.stringify(datas));
}

function makeDeleteBox() {
  const values_box = document.querySelector(".values_box");
  values_box.innerHTML = "";

  datas.forEach((data) => {
    const tr = document.createElement("tr");
    tr.dataset.id = data.id;

    tr.innerHTML = `
    <td>${data.id}</td>
    <td>${data.value}</td>
    <td><button onClick="deleteValue(${data.id})">삭제</button></td>
    `;

    values_box.appendChild(tr);
  });
}

function addValue() {
  let input_id = document.getElementById("input_id").value;
  let input_value = document.getElementById("input_value").value;

  if (input_id <= 0 || input_value <= 0) {
    alert("음수는 입력할 수 없습니다.");
    return;
  }

  if (datas.filter((data) => data.id == input_id).length > 0) {
    alert("중복된 아이디입니다. 다른 아이디를 설정해주세요.");
  } else {
    alert(`ID : ${input_id}, 값 : ${input_value} 등록 완료되었습니다.`);
    datas.push({ id: input_id, value: input_value });
    updateComponent();
  }
}

function deleteValue(id) {
  if (confirm("정말 삭제하시겠습니까 ?")) {
    datas = datas.filter((data) => data.id != id);
    updateComponent();
  }
}
