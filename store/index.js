export const strict = false;

const saveVersion = "2020-06-06";
const templateVersion = "2020-06-21";

export const state = () => ({
  saves: [
    { index: 0, unit: undefined, saveVersion },
    { index: 1, unit: undefined, saveVersion },
    { index: 2, unit: undefined, saveVersion },
    { index: 3, unit: undefined, saveVersion },
    { index: 4, unit: undefined, saveVersion },
    { index: 5, unit: undefined, saveVersion },
    { index: 6, unit: undefined, saveVersion },
    { index: 7, unit: undefined, saveVersion },
    { index: 8, unit: undefined, saveVersion },
    { index: 9, unit: undefined, saveVersion }
  ],
  appealTemplates: []
});

export const getters = {
  load: state => index => {
    const save = state.saves[index];
    if (save.version === saveVersion) {
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
  },
  getTemplates: state => {
    // 保存されているアピールテンプレートを取得
    state.appealTemplates.forEach(v => {
      if (v.version === templateVersion) {
        return;
      }
      // version が異なり、フォーマットが変わっているので変換
      if (!v.version) {
        // -> 2020-06-21
        // 追加分と version を追加
        v.append = Array(8)
          .fill(0)
          .map(v => {
            return {
              type: "",
              factor: { vo: 0, da: 0, vi: 0 },
              mental: 0,
              memory: 0,
              attention: 0,
              interest: 0
            };
          });
        v.version = "2020-06-21";
      }
    });
    return state.appealTemplates;
  }
};
export const mutations = {
  save(state, { index, unit, abilities }) {
    const idx = Number(index);
    const newSave = { unit, abilities, index: idx, version: saveVersion };
    const newSaves = state.saves.map((save, index) => {
      return idx === index ? newSave : save;
    });
    state.saves = newSaves;
  },
  clear(state, index) {
    state.saves[index].unit = undefined;
  },
  addAppealTemplate(state, tpl) {
    tpl.version = templateVersion;
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
