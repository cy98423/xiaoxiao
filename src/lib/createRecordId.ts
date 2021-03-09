let id: number =
  parseInt(window.localStorage.getItem("_idMaxRecord") || "0") || 0;
function createRecordId() {
  id++;
  window.localStorage.setItem("_idMaxRecord", id.toString());
  return id;
}

export default createRecordId;
