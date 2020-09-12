<template>
  <b-container>
    <b-row>
      <b-col>
        <h1>
          簡易アピール差分早見表
        </h1>
        <p><a href="/">計算ページに戻る</a></p>
      </b-col>
    </b-row>
    <br />
    <b-tabs variant="success" content-class="mt-3" pills justified>
      <b-tab title="計算用情報入力" active>
        <b-row>
          <b-col>
            <p>
              アピールする属性を決め、そのユニットに表示されている数値、アピール実施ポジションを入力します。<br />
              (Da.アピールを実施し、ユニットの数値が画像に表示されているものの場合、左から600,
              514, 1573, 1923, 406 を入力します。)<br />
              入力後、算出結果のタブを開いてください。
            </p>
            <img
              src="/images/unit-appeal-example.jpg"
              class="img-fluid"
              style="max-width: 100%"
              alt="入力数値の元"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col v-for="n of 5" :key="'position' + n" style="max-width: 20%">
            <b-form-group :label="posLabels[n] + ':'">
              <b-form-input
                v-model="appeals[n]"
                type="number"
                class="cell-input"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group label="アピール実施ポジション">
              <b-form-radio-group v-model="appealPosition">
                <b-form-radio v-for="n of 5" :key="'select' + n" :value="n">
                  {{ posLabels[n] }}
                </b-form-radio>
              </b-form-radio-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="2">
            <span>アピール倍率</span>
          </b-col>
          <b-col sm="2" class="cell-center">
            <span class="bold"> {{ appealFactor }} 倍アピール </span>
          </b-col>
          <b-col sm="8">
            <b-form-input
              v-model="appealFactor"
              type="range"
              min="0.1"
              max="9.9"
              step="0.1"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="2">
            <span>アピール増加差分</span>
          </b-col>
          <b-col sm="2" class="cell-center">
            <span class="bold"> {{ diffStep }} </span>
          </b-col>
          <b-col sm="8">
            <b-form-input
              v-model="diffStep"
              type="range"
              min="1"
              max="100"
              step="1"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="2">
            <span>表示する最小バフ (%)</span>
          </b-col>
          <b-col sm="2" class="cell-center">
            <span class="bold"> {{ buffRange.min }} </span>
          </b-col>
          <b-col sm="8">
            <b-form-input
              v-model="buffRange.min"
              type="range"
              min="0"
              max="1000"
              step="10"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="2">
            <span>表示する最大バフ (%)</span>
          </b-col>
          <b-col sm="2" class="cell-center">
            <span class="bold"> {{ buffRange.max }} </span>
          </b-col>
          <b-col sm="8">
            <b-form-input
              v-model="buffRange.max"
              type="range"
              min="0"
              max="1000"
              step="10"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="2">
            <span>バフ(%)増加差分</span>
          </b-col>
          <b-col sm="2" class="cell-center">
            <span class="bold"> {{ buffStep }} </span>
          </b-col>
          <b-col sm="8">
            <b-form-input
              v-model="buffStep"
              type="range"
              min="1"
              max="20"
              step="1"
            />
          </b-col>
        </b-row>
      </b-tab>
      <b-tab title="算出結果">
        <b-row>
          <b-col>
            <ul>
              <li>
                ポジション:
                <span class="bold"> {{ posLabels[appealPosition] }} </span>,
                アピール倍率: <span class="bold"> {{ appealFactor }} 倍</span>,
                フェスアピール基礎値:
                <span class="bold">{{ fesBase(0) }}</span>
              </li>
              <li>
                計算結果は全てPerfectアピール,
                Excellentアピールを実施した時のものです
              </li>
              <li>
                １行目の「アピール
                +X」は「アピールするアイドルの該当属性の数値が X
                増えた場合」を意味しています
              </li>

              <li>
                アピール値の後の括弧 (+X/+Y)
                はそれぞれ「１つ上の項目（１つ小さいバフの場合）との差分」「１つ左の項目（１つ小さいアピール増加分）との差分」を意味しています
              </li>
            </ul>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-table
              striped
              hover
              :items="calcResults"
              :fields="calcHeaders"
            ></b-table>
          </b-col>
        </b-row>
      </b-tab>
    </b-tabs>
    <br />
    <common-footer />
  </b-container>
</template>

<script>
import CommonFooter from "~/components/CommonFooter.vue";
export default {
  components: {
    CommonFooter
  },
  data() {
    return {
      posLabels: ["", "Leader", "Vocal", "Center", "Dance", "Visual"],
      appeals: [0, 0, 0, 0, 0, 0],
      appealPosition: 3,
      appealFactor: 3.5, // アピール倍率
      diffStep: 10, // 表示のステップ
      buffStep: 5, // バフのステップ
      buffRange: {
        max: 300,
        min: 100
      }
    };
  },
  computed: {
    calcHeaders() {
      const bias = Number(this.diffStep);
      return [
        {
          key: "buff",
          label: "累計バフ",
          tdClass: "table-cell"
        }
      ].concat(
        Array(3)
          .fill()
          .map((_, i) => {
            const diff = i * bias;
            const label = i === 0 ? "補正なし" : `アピール +${diff}`;
            return { key: `diff${i}`, label, tdClass: "table-cell" };
          })
      );
    },
    calcResults() {
      // 現在の入力結果から必要な値を返す
      const apps = this.appeals.map(v => Number(v));
      const factor = Number(this.appealFactor);
      const range = Number(this.buffRange.max) - Number(this.buffRange.min);
      const calc = (fes, buff) => {
        return (
          Math.floor(Math.floor(fes * (1 + buff / 100) * 1.5) * factor) * 2
        );
      };
      const step = Number(this.diffStep);
      const buffStep = Number(this.buffStep);
      const itemLength = range >= 0 ? Math.floor((range + 1) / buffStep) : 0;
      const items = Array(itemLength)
        .fill()
        .map((_, i) => {
          const buff = Number(this.buffRange.min) + i * buffStep;
          const res = { buff: buff + " (%)" };
          Array(3)
            .fill()
            .forEach((v, idx) => {
              const bias = idx * step;
              const fes = this.fesBase(bias);
              const calculated = calc(this.fesBase(bias), buff);
              const baseDiff =
                idx === 0
                  ? 0
                  : calculated - calc(this.fesBase(bias - step), buff);
              const buffDiff =
                i === 0
                  ? 0
                  : calculated - calc(this.fesBase(bias), buff - buffStep);
              res["diff" + idx] = `${calculated} (+${buffDiff} / +${baseDiff})`;
            });
          return res;
        });
      return items;
    }
  },
  methods: {
    fesBase(bias) {
      const apps = this.appeals.map(v => Number(v));
      return (
        1.5 * (bias + apps[this.appealPosition]) +
        0.5 * (apps.reduce((a, b) => a + b) + bias)
      );
    }
  }
};
</script>

<style>
.img-fluid {
  padding-bottom: 0.5em;
}

.cell-col {
  min-height: 42px;
}

.label-input-col {
  min-height: 72px;
}

.table-cell {
  width: 25%;
}

@media screen and (max-width: 800px) {
  .cell-input {
    padding-left: 5px;
    padding-right: 5px;
  }
  .cell-col {
    min-height: 70px;
  }
}
</style>
