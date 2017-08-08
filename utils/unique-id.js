let idCounter = localStorage.getItem('id') || 0;

function uniqueId(prefix) {
  const id = ++idCounter;
  localStorage.setItem('id', id);
  return prefix+id;
}

export default uniqueId;
