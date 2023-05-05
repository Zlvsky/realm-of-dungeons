const length = 15;

const initInventory = [...Array(length)].map((el, i) => {
  return { slotIndex: i, item: null };
});

export default initInventory;
