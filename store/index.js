export const strict = false;

export const state = () => ({
  saves: [
    { index: 0, unit: undefined },
    { index: 1, unit: undefined },
    { index: 2, unit: undefined },
    { index: 3, unit: undefined },
    { index: 4, unit: undefined },
    { index: 5, unit: undefined },
    { index: 6, unit: undefined },
    { index: 7, unit: undefined },
    { index: 8, unit: undefined },
    { index: 9, unit: undefined }
  ]
});

export const getters = {};
export const mutations = {
  save(state, { index, unit, abilities }) {
    const idx = Number(index);
    const newSave = { unit, abilities, index: idx };
    const newSaves = state.saves.map((save, index) => {
      return idx === index ? newSave : save;
    });
    state.saves = newSaves;
  },
  clear(state, index) {
    state.saves[index].unit = undefined;
  }
};
export const actions = {};
