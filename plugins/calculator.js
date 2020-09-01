// アピール計算用のクラス

import { round } from "~/plugins/utils.js";

class AppealCalculator {
  constructor() {
    this.attributeIndex = {
      vo: 0,
      da: 1,
      vi: 2,
      me: 3
    };
  }

  /**
   * 排列要素を足し合わせます
   */
  sum(arr) {
    return arr.reduce((prev, curr) => Number(prev) + Number(curr));
  }

  /**
   * ユニットの特定属性のアピール合計値を取得します。
   */
  appealSum({ leader, vocal, center, dance, visual }, attributeIndex) {
    return this.sum([
      leader.appeals[attributeIndex],
      vocal.appeals[attributeIndex],
      center.appeals[attributeIndex],
      dance.appeals[attributeIndex],
      visual.appeals[attributeIndex]
    ]);
  }

  /**
   * フェスアピール基礎値を計算します。
   * @param {object} unit ユニットの合計値
   */
  appealBaseValues(unit) {
    const { vo, da, vi } = this.attributeIndex;
    const { leader, vocal, center, dance, visual } = unit;
    const [voSum, daSum, viSum] = [
      this.appealSum(unit, vo),
      this.appealSum(unit, da),
      this.appealSum(unit, vi)
    ];
    return [
      {
        type: "Vocal",
        leader: 1.5 * leader.appeals[vo] + 0.5 * voSum,
        vocal: 1.5 * vocal.appeals[vo] + 0.5 * voSum,
        center: 1.5 * center.appeals[vo] + 0.5 * voSum,
        dance: 1.5 * dance.appeals[vo] + 0.5 * voSum,
        visual: 1.5 * visual.appeals[vo] + 0.5 * voSum
      },
      {
        type: "Dance",
        leader: 1.5 * leader.appeals[da] + 0.5 * daSum,
        vocal: 1.5 * vocal.appeals[da] + 0.5 * daSum,
        center: 1.5 * center.appeals[da] + 0.5 * daSum,
        dance: 1.5 * dance.appeals[da] + 0.5 * daSum,
        visual: 1.5 * visual.appeals[da] + 0.5 * daSum
      },
      {
        type: "Visual",
        leader: 1.5 * leader.appeals[vi] + 0.5 * viSum,
        vocal: 1.5 * vocal.appeals[vi] + 0.5 * viSum,
        center: 1.5 * center.appeals[vi] + 0.5 * viSum,
        dance: 1.5 * dance.appeals[vi] + 0.5 * viSum,
        visual: 1.5 * visual.appeals[vi] + 0.5 * viSum
      }
    ];
  }

  /**
   * ユニット情報を計算します
   * @param {object} unit ユニット情報
   */
  unitInfo(unit) {
    const { vocal, dance, visual, center, leader } = unit;
    const { vo, da, vi, me } = this.attributeIndex;
    // フェスユニットの数値を計算
    const [voSum, daSum, viSum] = [
      this.appealSum(unit, vo),
      this.appealSum(unit, da),
      this.appealSum(unit, vi)
    ];
    // 表示はユニット内の最大値
    const [voMax, daMax, viMax] = [
      Math.max(
        vocal.appeals[vo],
        dance.appeals[vo],
        visual.appeals[vo],
        center.appeals[vo],
        leader.appeals[vo]
      ),
      Math.max(
        vocal.appeals[da],
        dance.appeals[da],
        visual.appeals[da],
        center.appeals[da],
        leader.appeals[da]
      ),
      Math.max(
        vocal.appeals[vi],
        dance.appeals[vi],
        visual.appeals[vi],
        center.appeals[vi],
        leader.appeals[vi]
      )
    ];
    return {
      memory: this.memoryInfo(unit),
      vo: Math.ceil(1.5 * voMax + 0.5 * voSum),
      da: Math.ceil(1.5 * daMax + 0.5 * daSum),
      vi: Math.ceil(1.5 * viMax + 0.5 * viSum),
      me: this.appealSum(unit, me)
    };
  }

  /**
   * 思い出情報を計算します
   * @param {object} unit ユニット情報
   */
  memoryInfo({ leader, vocal, center, dance, visual }) {
    // センターの思い出がLv.5の場合、「基礎倍率」は2.0、Lv.4なら1.4、Lv.3は1.2、Lv.2は1.0、Lv.1は0.8 となる
    const memoryFactors = [0, 0.8, 1.0, 1.2, 1.4, 2.0];
    const memoryFactor = memoryFactors[center.memory];
    // 編成補正: 思い出Lv.5 = 0.075、Lv.4 = 0.05、Lv.3 = 0.03、Lv.2 = 0.02、Lv.1 =Lv.0 = 0
    const lv2factors = [0, 0, 0.02, 0.03, 0.05, 0.075];
    // 小数点誤差の補正
    const unitFactor = round(
      1.0 +
        lv2factors[leader.memory] +
        lv2factors[vocal.memory] +
        lv2factors[dance.memory] +
        lv2factors[visual.memory],
      3
    );
    const lv = center.memory >= 5 ? "MAX" : center.memory;
    const unitFactorLabel = Math.floor(unitFactor * 100) / 100;
    const label = `Lv. ${lv} (編成補正 x ${unitFactorLabel})`;
    return { label, memoryFactor, unitFactor };
  }

  /**
   * G.R.A.D.アビリティによる Buff の合計数値(%)を返す
   */
  abilityBuff(abilities, { memory, turn }) {
    // 絆個数 x 5
    const bond = abilities.bond * 5;
    // 思い出高/低
    const highMemory =
      abilities.appealUpByHighMemory * ((memory / 100) * 8 + 2);
    const lowMemory =
      abilities.appealUpByLowMemory * ((1 - memory / 100) * 16 + 4);
    // スタートダッシュとスロースターター
    const turnFactor = turn - 1;
    const startDash =
      abilities.startDash * Math.max(2, 10 - (8 / 9) * turnFactor);
    const slowStart =
      abilities.slowStarter * Math.min(20, 4 + ((2 * 8) / 9) * turnFactor);
    // パーフェクトリィ (仮)
    const perfectly = abilities.perfectly * 10;
    return this.sum([
      bond,
      highMemory,
      lowMemory,
      startDash,
      slowStart,
      perfectly
    ]);
  }

  /**
   * 実際に有効となるバフの合計値(%)を返します
   * @param {*} abilities
   * @param {*} param1
   */
  totalBuff(abilities, { effect, passive, memory, turn }) {
    const ability = this.abilityBuff(abilities, { memory, turn });
    const vo = this.sum([ability, effect.vo, passive.vo]);
    const da = this.sum([ability, effect.da, passive.da]);
    const vi = this.sum([ability, effect.vi, passive.vi]);
    return { vo, da, vi };
  }

  /**
   * 累積興味値(実数)を算出します
   */
  totalInterest(appealCalcValues, abilities, ignoreDown) {
    // 全審査員につくアビリティ分
    let abilityEffect = 1;
    for (let i = 0; i < abilities.interestUp; i++) {
      // 人気者: 3% UP
      abilityEffect = abilityEffect * 1.03;
    }
    if (!ignoreDown) {
      // 興味DOWN無視以外
      for (let i = 0; i < abilities.interestDown; i++) {
        // 控えめ: 3% DOWN
        abilityEffect = abilityEffect * 0.97;
      }
    }
    // 審査員個別の効果
    const pred = v => {
      return Math.abs(Number(v)) > 0;
    };
    const productions = (prev, curr) => {
      const per = Number(curr);
      const ignore = ignoreDown && per < 0;
      return ignore ? prev : prev * (1 + per / 100);
    };
    const vo = appealCalcValues.interest.vo
      .filter(pred)
      .reduce(productions, abilityEffect);
    const da = appealCalcValues.interest.da
      .filter(pred)
      .reduce(productions, abilityEffect);
    const vi = appealCalcValues.interest.vi
      .filter(pred)
      .reduce(productions, abilityEffect);
    return {
      vo: round(vo, 5),
      da: round(da, 5),
      vi: round(vi, 5)
    };
  }

  /**
   * 背水や渾身などの倍率を計算します
   * @param {*} unit ユニット情報
   * @param {*} appealCalcValues アピール計算用基礎オブジェクト
   * @param {*} type 背水(haisui)や渾身(konshin)など
   * @param {*} factor {vo, da, vi} の最大倍率
   */
  extraAppealFactor(unit, appealCalcValues, type, factor) {
    const { memory, mental, attention, effectCount } = appealCalcValues;
    const innerFactor = type => {
      const maxMental = Number(this.unitInfo(unit).me);
      const men = Number(mental);
      const per = maxMental === 0 ? 1 : men / maxMental;
      if (type === "haisui") {
        // 背水の場合
        const v = 1 - 0.8 * per;
        return { vo: v, da: v, vi: v };
      }
      if (type === "konshin") {
        // 渾身の場合
        const v = Math.max(0.2, 1.6 * per - 0.6);
        return { vo: v, da: v, vi: v };
      }
      const mem = Number(memory);
      if (type === "shinnai") {
        // 親愛の場合
        const v = 0.8 * (mem / 100) + 0.2;
        return { vo: v, da: v, vi: v };
      }
      const minmax = (x, y, z) => {
        return Math.max(x, Math.min(y, z));
      };
      if (type === "tyouhatsu") {
        // 挑発(注目度高)
        const att = minmax(0, Number(attention), 200);
        const v = 0.4 * (att / 100) + 0.2;
        return { vo: v, da: v, vi: v };
      }
      if (type === "onmitsu") {
        // 挑発(注目度低)
        const att = minmax(-50, Number(attention), 50);
        const v = -0.8 * (att / 100) + 0.6;
        return { vo: v, da: v, vi: v };
      }
      if (type === "deleteUp") {
        // バフ消去
        const vo = 0.2 * (1 + minmax(0, Number(effectCount.up.vo), 4));
        const da = 0.2 * (1 + minmax(0, Number(effectCount.up.da), 4));
        const vi = 0.2 * (1 + minmax(0, Number(effectCount.up.vi), 4));
        return { vo, da, vi };
      }
      if (type.startsWith("deleteUp")) {
        // 特定バフ消去
        const buff = [
          type.includes("Vo") ? Number(effectCount.up.vo) : 0,
          type.includes("Da") ? Number(effectCount.up.da) : 0,
          type.includes("Vi") ? Number(effectCount.up.vi) : 0
        ].reduce((prev, curr) => prev + curr);
        const factor = 0.2 * (1 + minmax(0, buff, 4));
        return { vo: factor, da: factor, vi: factor };
      }
      if (type === "deleteDown") {
        // デバフ消去
        const vo = 0.2 * (1 + minmax(0, Number(effectCount.down.vo), 4));
        const da = 0.2 * (1 + minmax(0, Number(effectCount.down.da), 4));
        const vi = 0.2 * (1 + minmax(0, Number(effectCount.down.vi), 4));
        return { vo, da, vi };
      }
      if (type.startsWith("deleteDown")) {
        // 特定デバフ消去
        const buff = [
          type.includes("Vo") ? Number(effectCount.down.vo) : 0,
          type.includes("Da") ? Number(effectCount.down.da) : 0,
          type.includes("Vi") ? Number(effectCount.down.vi) : 0
        ].reduce((prev, curr) => prev + curr);
        const factor = 0.2 * (1 + minmax(0, buff, 4));
        return { vo: factor, da: factor, vi: factor };
      }
      // それ以外 (通常補正)
      return { vo: 1, da: 1, vi: 1 };
    };
    const inner = innerFactor(type);
    return {
      vo: round(factor.vo * inner.vo, 4),
      da: round(factor.da * inner.da, 4),
      vi: round(factor.vi * inner.vi, 4)
    };
  }

  /**
   * 何倍アピールかを計算して返します
   * @param {*} unit ユニット情報
   * @param {*} appealCalcValues アピール計算用基礎オブジェクト
   * @param {*} type 背水(haisui)や渾身(konshin)など
   * @param {*} factor {vo, da, vi} の最大倍率
   */
  appealFactor(
    unit,
    appealCalcValues,
    selectedAppealTemplate,
    appealTemplates
  ) {
    if (selectedAppealTemplate === "") {
      // 画面入力をそのまま返す
      return appealCalcValues.factor;
    }
    // それ以外の場合はアピールテンプレートの内容を算出
    const index = Number(selectedAppealTemplate);
    const selected = appealTemplates[index];
    if (!selected) {
      // 例外時
      return appealCalcValues.factor;
    }
    return this.extraAppealFactor(
      unit,
      appealCalcValues,
      selected.type,
      selected.factor
    );
  }

  /**
   * 追撃分のアピールを抽出するための述語を返します。
   */
  getAppendAppealTypePredicate() {
    return type => {
      return type !== "" && type !== "buff" && !type.startsWith("link");
    };
  }

  /**
   * Linkアピールを抽出するための述語を返します。
   */
  getExtraAppealTypePredicate() {
    return type => {
      return type.startsWith("link");
    };
  }

  /**
   * 追撃分のアピール倍率を算出して返します
   * @param {*} unit ユニット情報
   * @param {*} appealCalcValues アピール情報
   * @param {*} selected アピールテンプレートで選ばれた情報
   * @param {*} predicate アピール倍率抽出判定用の述語
   */
  appendAppealFactor(unit, appealCalcValues, selected, predicate) {
    if (!selected) {
      return [{ vo: 0, da: 0, vi: 0 }];
    }

    // 追加アピールを取得
    const appendAppeals = selected.append.filter(v => predicate(v.type));
    return appendAppeals.map(ap => {
      const type = ap.type.startsWith("link") ? ap.type.substr(5) : ap.type;
      const factor = this.extraAppealFactor(
        unit,
        appealCalcValues,
        type,
        ap.factor
      );
      return {
        type,
        factor
      };
    });
  }

  /**
   * 思い出アピール実施時に true を返します
   * @param {object} selectedAppealTemplate アピールテンプレート(ショートカット)で選択されている内容
   * @param {object} appealCalcValues 入力情報
   */
  selectedMemory(selectedAppealTemplate, { position }) {
    return !this.selectedAppealTemplate && position === "memory";
  }

  /**
   * アピールを実施するポジションを取得します。
   * @param {*} selectedAppealTemplate
   * @param {*} appealTemplates
   * @param {*} appealCalcValues
   */
  appealPosition(selectedAppealTemplate, appealTemplates, appealCalcValues) {
    if (selectedAppealTemplate !== "") {
      const index = Number(selectedAppealTemplate);
      if (index < appealTemplates.length) {
        return appealTemplates[index].position;
      }
    }
    if (this.selectedMemory(selectedAppealTemplate, appealCalcValues)) {
      return "center";
    }
    return appealCalcValues.position;
  }

  /**
   * フェスアピール値を計算します
   */
  fesAppeal(unit, position) {
    const fesBase = this.appealBaseValues(unit);
    const vo = fesBase[0][position];
    const da = fesBase[1][position];
    const vi = fesBase[2][position];
    return { vo, da, vi };
  }

  /**
   * 基礎係数を算出します
   */
  baseAppeal(position, unit, appealFactor, appealCalcValues, abilities) {
    // フェスアピール基礎値 = 2.0 * アピールするアイドルの該当ステータス
    //                      + 0.5 * (アピールしないアイドルの該当ステータス)
    // 基礎係数 = INT(フェスアピール基礎値 * 該当属性バフ合計値 * アピール係数)
    const fes = this.fesAppeal(unit, position);
    const buff = this.totalBuff(abilities, appealCalcValues);
    const action = Number(appealCalcValues.action); // Perfect とか
    const calc = (fes, factor, buff, action) => {
      return Math.floor(Math.floor(fes * factor * (1 + buff / 100)) * action);
    };

    const vo = calc(fes.vo, appealFactor.vo, buff.vo, action);
    const da = calc(fes.da, appealFactor.da, buff.da, action);
    const vi = calc(fes.vi, appealFactor.vi, buff.vi, action);
    return { vo, da, vi };
  }

  /**
   * Voアピール実施時の結果を返します
   * @param {*} base AppealCalculator.baseAppeal の結果
   * @param {*} interest AppealCalculator.totalInterest の結果
   * @param {number} memoryFactor 通常アピール時は1, 思い出アピール時は1から1.3までのユニット係数
   */
  voAppeal(base, interest, memoryFactor) {
    memoryFactor = memoryFactor === undefined ? 1 : memoryFactor;
    const vo = Math.floor(
      Math.floor(memoryFactor * Math.floor(base.vo) * 2) * interest.vo
    );
    const da = Math.floor(
      Math.floor(memoryFactor * Math.floor(base.da)) * interest.vo
    );
    const vi = Math.floor(
      Math.floor(memoryFactor * Math.floor(base.vi)) * interest.vo
    );
    return {
      vo,
      da,
      vi,
      total: vo + da + vi
    };
  }

  /**
   * Daアピール実施時の結果を返します
   * @param {*} base AppealCalculator.baseAppeal の結果
   * @param {*} interest AppealCalculator.totalInterest の結果
   * @param {number} memoryFactor 通常アピール時は1, 思い出アピール時は1から1.3までのユニット係数
   */
  daAppeal(base, interest, memoryFactor) {
    memoryFactor = memoryFactor === undefined ? 1 : memoryFactor;
    const vo = Math.floor(
      Math.floor(memoryFactor * Math.floor(base.vo)) * interest.da
    );
    const da = Math.floor(
      Math.floor(memoryFactor * Math.floor(base.da) * 2) * interest.da
    );
    const vi = Math.floor(
      Math.floor(memoryFactor * Math.floor(base.vi)) * interest.da
    );
    return {
      vo,
      da,
      vi,
      total: vo + da + vi
    };
  }

  /**
   * Viアピール実施時の結果を返します
   * @param {*} base AppealCalculator.baseAppeal の結果
   * @param {*} interest AppealCalculator.totalInterest の結果
   * @param {number} memoryFactor 通常アピール時は1, 思い出アピール時は1から1.3までのユニット係数
   */
  viAppeal(base, interest, memoryFactor) {
    memoryFactor = memoryFactor === undefined ? 1 : memoryFactor;
    const vo = Math.floor(
      Math.floor(memoryFactor * Math.floor(base.vo)) * interest.vi
    );
    const da = Math.floor(
      Math.floor(memoryFactor * Math.floor(base.da)) * interest.vi
    );
    const vi = Math.floor(
      Math.floor(memoryFactor * Math.floor(base.vi) * 2) * interest.vi
    );
    return {
      vo,
      da,
      vi,
      total: vo + da + vi
    };
  }
}

export default (_, inject) => {
  inject("calc", new AppealCalculator());
};
