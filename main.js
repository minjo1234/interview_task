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

let updateDatas = [];

document.addEventListener("DOMContentLoaded", () => {
  updateComponent();
});

function updateComponent() {
  makeGraph();
  makeUpdateBox();
  makeDetailBox();
}

function makeGraph() {
  const maxValue = Math.max(...datas.map((d) => d.value));
  const graph = document.getElementById("graph");
  const yAxis = document.getElementById("y-axis");
  const xAxis = document.getElementById("x-axis");

  graph.innerHTML = "";
  yAxis.innerHTML = "";
  xAxis.innerHTML = "";

  const numTicks = 5;
  const tickInternal = maxValue / numTicks;

  for (let i = 0; i <= numTicks; i++) {
    const yTick = document.createElement("div");
    yTick.className = "y-Tick";
    yTick.textContent = Math.round(maxValue - tickInternal * i);
    yAxis.appendChild(yTick);
  }

  datas.forEach((data) => {
    const barContainer = document.createElement("div");
    barContainer.style.width = 100 / datas.length + "%";

    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = (data.value / maxValue) * 100 + "%";

    const XLabel = document.createElement("div");
    XLabel.className = "x-label";
    XLabel.textContent = data.id;
    xAxis.appendChild(XLabel);

    barContainer.appendChild(bar);
    graph.appendChild(barContainer);
  });
}

function makeDetailBox() {
  const detail_area = document.getElementById("detail_area");
  detail_area.value = JSON.stringify(datas, null, 2);
}

function makeUpdateBox() {
  const values_box = document.querySelector(".values_box");
  values_box.innerHTML = "";

  datas.forEach((data) => {
    const tr = document.createElement("tr");
    tr.dataset.id = data.id;

    tr.innerHTML = `
    <td>${data.id}</td>
    <td><input type="number" value="${data.value}" placeholder="VALUE" onchange="changeValue(${data.id}, this.value)" /></td>
    <td><span style="color: red; cursor: pointer" onClick="deleteValue(${data.id})">삭제</span></td>
    `;

    values_box.appendChild(tr);
  });
}

function addValue() {
  let input_id = Number(document.getElementById("input_id").value);
  let input_value = Number(document.getElementById("input_value").value);

  if (input_id < 0 || input_value < 0) {
    alert("음수는 입력할 수 없습니다.");
    return;
  }

  if (datas.filter((data) => data.id === input_id).length > 0) {
    alert("중복된 아이디입니다. 다른 아이디를 설정해주세요.");
  } else {
    alert(`ID : ${input_id}, 값 : ${input_value} 등록 완료되었습니다.`);

    datas.push({ id: input_id, value: input_value });

    document.getElementById("input_id").value = "";
    document.getElementById("input_value").value = "";
    updateComponent();
  }
}

function deleteValue(id) {
  if (confirm("정말 삭제하시겠습니까 ?")) {
    datas = datas.filter((data) => data.id != id);
    updateComponent();
    alert("삭제가 완료되었습니다.");
  }
}

function changeValue(id, value) {
  if (Number(value) < 0) {
    alert("value값은 음수를 입력할 수 없습니다. 다시 입력해주세요. ");
  } else {
    updateDatas.push({ id: id, value: Number(value) });
  }
}

function updateValue() {
  if (updateDatas.length > 0) {
    updateDatas.forEach((update) => {
      const target = datas.find((data) => data.id === update.id);
      if (target) {
        target.value = update.value;
      }
      updateComponent();
      updateDatas = [];
      alert("변경이 완료되었습니다.");
    });
  } else {
    alert("변경된 값이 존재하지 않습니다.");
  }
}

function update_detailBox() {
  const detail_area = document.getElementById("detail_area");
  const allowedKeys = ["id", "value"];
  let parsed;

  try {
    parsed = JSON.parse(detail_area.value);
  } catch (e) {
    alert("유호하지 않은 형식입니다.");
    return;
  }

  for (const item of parsed) {
    if (typeof item !== "object" || item === null) {
      alert("유호하지 않은 형식입니다.");
      return;
    }

    const keys = Object.keys(item);

    for (const key of keys) {
      if (!allowedKeys.includes(key)) {
        alert(`허용되지 않은 필드: "${key}"`);
        return;
      }
    }

    if (typeof item.id !== "number") {
      alert("id 값은 숫자를 입력해주세요.");
      return;
    }

    if (typeof item.value !== "number" || item.value <= 0) {
      alert("value 값은 숫자를 입력해주세요.");
      return;
    }

    if (typeof item.value < 0) {
      alert("value값은 음수를 입력할 수 없습니다. 다시 입력해주세요. ");
      return;
    }
  }

  const ids = parsed.map((p) => p.id);
  const setIds = new Set(ids);

  if (ids.length !== setIds.size) {
    alert("중복된 아이디입니다. 다른 아이디를 설정해주세요.");
    return;
  }

  datas = parsed;
  updateComponent();
  alert("데이터 변경이 완료되었습니다.");
}
