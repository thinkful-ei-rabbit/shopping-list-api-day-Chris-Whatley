//import item from './item';

const items = [];
let hideCheckeditems = false;
let error = null;

const findById = function (id) {
  return this.items.find(currentItem => currentItem.id === id);
};

const addItem = function (item) {
  this.items.push(item)
};

// const findAndToggleChecked = function (id) {
//   const currentItem = this.findById(id);
//   currentItem.checked = !currentItem.checked;
// };

const findAndUpdate = function (id, newData) {
  let currentItem = this.findById(id)
  Object.assign(currentItem, newData)
};

const findAndDelete = function (id) {
  this.items = this.items.filter(currentItem => currentItem.id !== id);
};

const toggleCheckedFilter = function () {
  this.hideCheckedItems = !this.hideCheckedItems;
};

function createError(error){
  this.error = error;
}

export default {
  items,
  hideCheckeditems,
  findById,
  addItem,
  //findAndToggleChecked,
  findAndUpdate,
  findAndDelete,
  toggleCheckedFilter,
  error,
  createError
};