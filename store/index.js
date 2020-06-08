export const strict = false;

const version = "2020-06-06";

export const state = () => ({
  saves: [
    { index: 0, unit: undefined, version },
    { index: 1, unit: undefined, version },
    { index: 2, unit: undefined, version },
    { index: 3, unit: undefined, version },
    { index: 4, unit: undefined, version },
    { index: 5, unit: undefined, version },
    { index: 6, unit: undefined, version },
    { index: 7, unit: undefined, version },
    { index: 8, unit: undefined, version },
    { index: 9, unit: undefined, version }
  ],
  appealTemplates: []
});

export const getters = {
  load: state => index => {
    const save = state.saves[index];
    if (save.version === version) {
      return save;
    }
    // version が異なり、フォーマットが変わっている
    if (!save.version) {
      // -> 2020-06-06
      delete save.abilities.interest;
      save.abilities.interestUp = 0;
      save.abilities.interestDown = 0;
      save.version = "2020-06-06";
    }
    // 以後、version 変更による構造の追加分を記載
    return save;
  }
};
export const mutations = {
  save(state, { index, unit, abilities }) {
    const idx = Number(index);
    const newSave = { unit, abilities, index: idx, version };
    const newSaves = state.saves.map((save, index) => {
      return idx === index ? newSave : save;
    });
    state.saves = newSaves;
  },
  clear(state, index) {
    state.saves[index].unit = undefined;
  },
  addAppealTemplate(state, tpl) {
    state.appealTemplates.push(tpl);
  },
  deleteAppealTemplate(state, index) {
    if (index === "") {
      return;
    }
    const target = Number(index);
    state.appealTemplates = state.appealTemplates.filter((v, idx) => {
      return idx !== target;
    });
  },
  deleteAllAppealTemplate(state) {
    state.appealTemplates = [];
  }
};
export const actions = {};
