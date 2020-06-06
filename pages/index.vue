<template>
  <b-container>
    <b-row>
      <b-col>
        <h1>
          THE iDOLM@STER ShinyColors フェスシミュレーター (β)
        </h1>
        <p>
          シャニマスのフェスモードでのアピール値を算出するツールです。
          PCでの閲覧推奨です。
        </p>
        <p>現在ベータ版です。 算出結果が一致しないときがあります。</p>
      </b-col>
    </b-row>
    <br />
    <div>
      <b-tabs content-class="mt-3" pills justified>
        <b-tab title="ユニット情報入力" active>
          <b-row>
            <b-col>
              <h2>保存されたユニットデータ</h2>
            </b-col>
          </b-row>
          <b-row class="justify-content-md-center text-center">
            <b-col sm="6">
              <b-form-select
                v-model="selectedReadUnitIndex"
                :options="savedataReadOptions"
              ></b-form-select>
            </b-col>
            <b-col sm="4">
              <b-button variant="outline-success" @click="loadUnit">
                選択中のデータを読み込む
              </b-button>
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col>
              <h2>フェスユニットアピール値</h2>
              <p>
                フェスユニット編成で表示されているままの数字を入力してください。
              </p>
            </b-col>
          </b-row>
          <b-row cols="5" class="appeal text-center" align-v="center">
            <b-col class="">
              <span class="bold">Position</span>
            </b-col>
            <b-col class="vo h-100" align-v="center">
              <span class="bold">Vo.</span>
            </b-col>
            <b-col class="da h-100" align-v="center">
              <span class="bold">Da.</span>
            </b-col>
            <b-col class="vi h-100" align-v="center">
              <span class="bold">Vi.</span>
            </b-col>
            <b-col class="me h-100" align-v="center">
              <span class="bold">メンタル</span>
            </b-col>
          </b-row>
          <b-row cols="5" class="appeal" align-v="center">
            <b-col class="text-center">
              <span class="bold">Leader</span>
            </b-col>
            <b-col
              v-for="(_, index) in unit.leader.appeals"
              :key="index"
              class="cell-input h-100"
              :class="appealClassIdx[index]"
            >
              <b-form-input
                v-model="unit.leader.appeals[index]"
                type="number"
              />
            </b-col>
          </b-row>

          <b-row cols="5" class="appeal" align-v="center">
            <b-col class="text-center">
              <span class="bold">Vocal</span>
            </b-col>
            <b-col
              v-for="(_, index) in unit.vocal.appeals"
              :key="index"
              class="cell-input h-100"
              :class="appealClassIdx[index]"
            >
              <b-form-input v-model="unit.vocal.appeals[index]" type="number" />
            </b-col>
          </b-row>

          <b-row cols="5" class="appeal" align-v="center">
            <b-col class="text-center">
              <span class="bold">Center</span>
            </b-col>
            <b-col
              v-for="(_, index) in unit.center.appeals"
              :key="index"
              class="cell-input h-100"
              :class="appealClassIdx[index]"
            >
              <b-form-input
                v-model="unit.center.appeals[index]"
                type="number"
              />
            </b-col>
          </b-row>

          <b-row cols="5" class="appeal" align-v="center">
            <b-col class="text-center">
              <span class="bold">Dance</span>
            </b-col>
            <b-col
              v-for="(_, index) in unit.dance.appeals"
              :key="index"
              class="cell-input h-100"
              :class="appealClassIdx[index]"
            >
              <b-form-input v-model="unit.dance.appeals[index]" type="number" />
            </b-col>
          </b-row>

          <b-row cols="5" class="appeal" align-v="center">
            <b-col class="text-center">
              <span class="bold">Visual</span>
            </b-col>
            <b-col
              v-for="(_, index) in unit.visual.appeals"
              :key="index"
              class="cell-input h-100"
              :class="appealClassIdx[index]"
            >
              <b-form-input
                v-model="unit.visual.appeals[index]"
                type="number"
              />
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col sm="2">入力数値の具体例</b-col>
            <b-col sm="10">
              <img
                src="/images/unit-appeal-example.jpg"
                class="img-fluid"
                alt="入力数値の元"
              />
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col>
              <h2>思い出レベル</h2>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="3" class="cell-center">
              <span class="bold">Leader</span>
            </b-col>
            <b-col sm="1" class="cell-center">
              <p>Lv. {{ unit.leader.memory }}</p>
            </b-col>
            <b-col sm="8">
              <b-form-input
                v-model="unit.leader.memory"
                type="range"
                min="0"
                max="5"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="3" class="cell-center">
              <span class="bold">Vocal</span>
            </b-col>
            <b-col sm="1" class="cell-center">
              <p>Lv. {{ unit.vocal.memory }}</p>
            </b-col>
            <b-col sm="8">
              <b-form-input
                v-model="unit.vocal.memory"
                type="range"
                min="0"
                max="5"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="3" class="cell-center">
              <span class="bold">Center</span>
            </b-col>
            <b-col sm="1" class="cell-center">
              <p>Lv. {{ unit.center.memory }}</p>
            </b-col>
            <b-col sm="8">
              <b-form-input
                v-model="unit.center.memory"
                type="range"
                min="0"
                max="5"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="3" class="cell-center">
              <span class="bold">Dance</span>
            </b-col>
            <b-col sm="1" class="cell-center">
              <p>Lv. {{ unit.dance.memory }}</p>
            </b-col>
            <b-col sm="8">
              <b-form-input
                v-model="unit.dance.memory"
                type="range"
                min="0"
                max="5"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="3" class="cell-center">
              <span class="bold">Visual</span>
            </b-col>
            <b-col sm="1" class="cell-center">
              <p>Lv. {{ unit.visual.memory }}</p>
            </b-col>
            <b-col sm="8">
              <b-form-input
                v-model="unit.visual.memory"
                type="range"
                min="0"
                max="5"
              />
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col>
              <h2>フェスユニット表記</h2>
              <p>
                フェスユニット編成の下に表記されている数値と一致するかを確認してください。
              </p>
            </b-col>
          </b-row>
          <b-row align-v="center">
            <b-col>
              <span class="bold"> 思い出: {{ unitCalc.memory.label }} </span>
            </b-col>
          </b-row>
          <b-row cols="4" class="appeal" align-v="center">
            <b-col class="vo cell-center">
              <span class="bold">Vo.</span><br />
              <span class="bold">{{ unitCalc.vo }}</span>
            </b-col>
            <b-col class="da cell-center">
              <span class="bold">Da.</span><br />
              <span class="bold">{{ unitCalc.da }}</span>
            </b-col>
            <b-col class="vi cell-center">
              <span class="bold">Vi.</span><br />
              <span class="bold">{{ unitCalc.vi }}</span>
            </b-col>
            <b-col class="me cell-center">
              <span class="bold">Me.</span><br />
              <span class="bold">{{ unitCalc.me }}</span>
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col sm="2">具体例</b-col>
            <b-col sm="10">
              <img
                src="/images/unit-total-example.jpg"
                class="img-fluid"
                alt="ユニット評価値の具体例"
              />
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col>
              <h2>アビリティ (G.R.A.D.)</h2>
              <p>
                ユニット全体で現在有効となっているアビリティの個数を入力してください。
              </p>
            </b-col>
          </b-row>
          <b-row v-for="item in abilityItems" :key="item.key">
            <b-col sm="3" class="cell-center">
              <span class="bold">{{ item.label }}</span>
            </b-col>
            <b-col sm="1" class="cell-center">
              <span class="bold">
                {{ abilities[item.key] }} {{ item.unit }}
              </span>
            </b-col>
            <b-col sm="8">
              <b-form-input
                :id="`ability-${item.key}`"
                v-model="abilities[item.key]"
                type="range"
                :min="item.min"
                :max="item.max"
              ></b-form-input>
            </b-col>
          </b-row>
          <br />
          <b-row class="justify-content-md-center text-center">
            <b-col sm="2">
              セーブスロットの選択
            </b-col>
            <b-col sm="4">
              <b-form-select
                v-model="selectedWriteUnitIndex"
                :options="savedataWriteOptions"
              ></b-form-select>
            </b-col>
            <b-col sm="4">
              <b-input v-model="unit.name" placeholder="保存用の名前を入力" />
            </b-col>
            <b-col sm="2">
              <b-button variant="outline-success" @click="saveUnit">
                名前を付けて保存
              </b-button>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <ul>
                <li>
                  情報はLocalStorageに保存されるため、別のブラウザには引き継げません。
                </li>
                <li>
                  キャッシュなどの削除によって消去される場合があります。
                </li>
              </ul>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="アピール値計算">
          <b-row>
            <b-col>
              <h2>実アピール値算出</h2>
              <p>
                以下にアピール時の状況を入力することで実際のアピール値を算出します。
              </p>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="3">
              <span class="bold">開始時のテンション</span>
            </b-col>
            <b-col sm="9">
              <b-form-select
                v-model="tention"
                :options="tentionOptions"
              ></b-form-select>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-button
                variant="outline-primary"
                class="float-right"
                @click="firstTurn"
              >
                ターンの初期化
              </b-button>
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col sm="2">
              <span class="bold">現在のターン数</span>
            </b-col>
            <b-col sm="1" class="cell-center">
              {{ appealCalcValues.turn }}
            </b-col>
            <b-col sm="9">
              <b-form-input
                v-model="appealCalcValues.turn"
                type="range"
                min="1"
                max="20"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="3">
              <span class="bold">思い出ゲージ(%)</span>
            </b-col>
            <b-col sm="9">
              <b-form-input
                v-model="appealCalcValues.memory"
                type="number"
                step="0.001"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="3">
              <span class="bold">
                ターン開始時メンタル
              </span>
            </b-col>
            <b-col sm="9">
              <b-form-input v-model="appealCalcValues.mental" type="number" />
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="3">
              <span class="bold">
                アピール・スキルによる思い出ゲージ上昇
              </span>
            </b-col>
            <b-col sm="9">
              <b-form-input
                v-model="appealCalcValues.extraMemoryUp"
                type="number"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-button
                variant="outline-success"
                class="float-right"
                @click="calcNextTurn"
              >
                次ターンへ (思い出自動計算)
              </b-button>
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col sm="3">
              <span class="bold">アピール係数</span>
            </b-col>
            <b-col sm="9">
              <b-form-select
                v-model="appealCalcValues.action"
                :options="appealActionOptions"
              ></b-form-select>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="3">
              <span class="bold">
                アピールポジション
              </span>
            </b-col>
            <b-col sm="9">
              <b-form-select
                id="appealPosition"
                v-model="appealCalcValues.position"
                :options="appealPositionOptions"
                @change="positionChoosed"
              ></b-form-select>
            </b-col>
          </b-row>
          <br />
          <b-row cols="4">
            <b-col> </b-col>
            <b-col class="vo cell-center">
              <span class="bold">Vo.</span>
            </b-col>
            <b-col class="da cell-center">
              <span class="bold">Da.</span>
            </b-col>
            <b-col class="vi cell-center">
              <span class="bold">Vi.</span>
            </b-col>
          </b-row>
          <b-row cols="4">
            <b-col class="cell-col">
              <span class="bold">アピール倍率</span>
            </b-col>
            <b-col class="vo">
              <b-form-input
                v-model="appealCalcValues.factor.vo"
                type="number"
                step="0.001"
              />
            </b-col>
            <b-col class="da">
              <b-form-input
                v-model="appealCalcValues.factor.da"
                type="number"
                step="0.001"
              />
            </b-col>
            <b-col class="vi">
              <b-form-input
                v-model="appealCalcValues.factor.vi"
                type="number"
                step="0.001"
              />
            </b-col>
          </b-row>
          <b-row cols="4">
            <b-col class="cell-col">
              <span class="bold">効果(アイコン, %)</span>
            </b-col>
            <b-col class="vo">
              <b-form-input
                v-model="appealCalcValues.effect.vo"
                type="number"
              />
            </b-col>
            <b-col class="da">
              <b-form-input
                v-model="appealCalcValues.effect.da"
                type="number"
              />
            </b-col>
            <b-col class="vi">
              <b-form-input
                v-model="appealCalcValues.effect.vi"
                type="number"
              />
            </b-col>
          </b-row>
          <b-row cols="4">
            <b-col class="cell-col">
              <span class="bold">パッシブスキル(%)</span>
            </b-col>
            <b-col class="vo">
              <b-form-input
                v-model="appealCalcValues.passive.vo"
                type="number"
              />
            </b-col>
            <b-col class="da">
              <b-form-input
                v-model="appealCalcValues.passive.da"
                type="number"
              />
            </b-col>
            <b-col class="vi">
              <b-form-input
                v-model="appealCalcValues.passive.vi"
                type="number"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col class="cell-col">
              <span class="bold">審査員興味値(%)</span>
            </b-col>
            <b-col class="vo">
              <b-form-input
                v-model="appealCalcValues.interest.vo"
                type="number"
              />
            </b-col>
            <b-col class="da">
              <b-form-input
                v-model="appealCalcValues.interest.da"
                type="number"
              />
            </b-col>
            <b-col class="vi">
              <b-form-input
                v-model="appealCalcValues.interest.vi"
                type="number"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-button
                variant="outline-primary"
                class="float-right"
                @click="clearAppealCalc"
              >
                入力をクリア
              </b-button>
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col>
              <h2>アピールシミュレーション結果</h2>
            </b-col>
          </b-row>
          <b-row cols="4">
            <b-col> </b-col>
            <b-col class="vo cell-center">
              <span class="bold">Vo.</span>
            </b-col>
            <b-col class="da cell-center">
              <span class="bold">Da.</span>
            </b-col>
            <b-col class="vi cell-center">
              <span class="bold">Vi.</span>
            </b-col>
          </b-row>
          <b-row cols="4">
            <b-col class="cell-col">
              <span class="bold">各審査員へのアピール</span>
            </b-col>
            <b-col class="vo cell-center">
              <span class="bold">{{ voAppeal.total }}</span>
              <div v-if="voAppeal.label">(内訳: {{ voAppeal.label }})</div>
            </b-col>
            <b-col class="da cell-center">
              <span class="bold">{{ daAppeal.total }}</span>
              <div v-if="daAppeal.label">(内訳: {{ daAppeal.label }})</div>
            </b-col>
            <b-col class="vi cell-center">
              <span class="bold">{{ viAppeal.total }}</span>
              <div v-if="viAppeal.label">(内訳: {{ viAppeal.label }})</div>
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col>
              <h3>その他シミュレーション結果</h3>
            </b-col>
          </b-row>
          <b-row cols="4">
            <b-col class="cell-col">
              <span class="bold">フェスアピール値</span>
            </b-col>
            <b-col class="vo text-center">
              <span class="bold">{{ fesAppeal.vo }}</span>
            </b-col>
            <b-col class="da text-center">
              <span class="bold">{{ fesAppeal.da }}</span>
            </b-col>
            <b-col class="vi text-center">
              <span class="bold">{{ fesAppeal.vi }}</span>
            </b-col>
          </b-row>
          <b-row cols="4">
            <b-col class="cell-col">
              <span class="bold">アビリティバフ</span>
            </b-col>
            <b-col class="vo text-center">
              <span class="bold">{{ abilityBuff }}</span>
            </b-col>
            <b-col class="da text-center">
              <span class="bold">{{ abilityBuff }}</span>
            </b-col>
            <b-col class="vi text-center">
              <span class="bold">{{ abilityBuff }}</span>
            </b-col>
          </b-row>
          <b-row cols="4">
            <b-col class="cell-col">
              <span class="bold">バフ合計値(%)</span>
            </b-col>
            <b-col class="vo text-center">
              <span class="bold">{{ totalBuff.vo }}</span>
            </b-col>
            <b-col class="da text-center">
              <span class="bold">{{ totalBuff.da }}</span>
            </b-col>
            <b-col class="vi text-center">
              <span class="bold">{{ totalBuff.vi }}</span>
            </b-col>
          </b-row>
          <b-row cols="4">
            <b-col class="cell-col">
              <span class="bold">興味合計値(%)</span>
            </b-col>
            <b-col class="vo text-center">
              <span class="bold">{{ totalInterest.vo }}</span>
            </b-col>
            <b-col class="da text-center">
              <span class="bold">{{ totalInterest.da }}</span>
            </b-col>
            <b-col class="vi text-center">
              <span class="bold">{{ totalInterest.vi }}</span>
            </b-col>
          </b-row>
          <b-row cols="4">
            <b-col class="cell-col">
              <span class="bold">アピール基礎係数</span>
            </b-col>
            <b-col class="vo text-center">
              <span class="bold">{{ baseAppeal.vo }}</span>
            </b-col>
            <b-col class="da text-center">
              <span class="bold">{{ baseAppeal.da }}</span>
            </b-col>
            <b-col class="vi text-center">
              <span class="bold">{{ baseAppeal.vi }}</span>
            </b-col>
          </b-row>
          <br />
        </b-tab>
        <!-- 備考タブ -->
        <b-tab title="備考">
          <b-row>
            <b-col>
              <h2>利用中の計算式</h2>
              <h3>アピール値算出式</h3>
              <ul>
                <li>
                  フェスアピール基礎値 = 2.0 *
                  アピールするアイドルの該当ステータス + 0.5 *
                  (アピールしないアイドルの該当ステータス合計)
                </li>
                <li>
                  基礎係数 = INT(フェスアピール基礎値 * (1 +
                  該当属性バフ合計値(%)/100 + アビリティバフ合計値(%)/100) *
                  アピール係数)
                </li>
                <li>
                  フェスアピール値 = INT(INT(基礎係数 * アピール倍率) *
                  Excellent係数 * (1 + 興味値合計(%)/100))
                </li>
                <li>
                  アピール係数はPerfectなら1.5, Goodなら1.1, Normarlなら1.0,
                  Badなら0.5
                </li>
                <li>
                  Excellent係数はアピール属性と審査員属性が一致した場合2,
                  一致しない場合は1
                </li>
              </ul>
              <h3>単独アビリティバフ算出式</h3>
              <ul>
                <li>
                  スタートダッシュ(%): MAX(10 - (8/9 * (現在ターン数 - 1)), 2)
                </li>
                <li>
                  スロースタート(%): MIN(4 + (16/9 * (現在ターン数 - 1)), 20)
                </li>
                <li>
                  アピールアップ(思い出高) (%): 2 + (思い出ゲージ / 100) * 8
                </li>
                <li>
                  アピールアップ(思い出低) (%): 4 + (1 - 思い出ゲージ / 100) *
                  16
                </li>
              </ul>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </div>
    <br />
    <b-row>
      <b-col>
        <p>
          このページの情報の正当性は一切保証されません。
          また、ページ内の情報を利用したことによって生じた一切の不利益に対してページの製作者は責を負いません。
        </p>
        <p>
          ©BANDAI NAMCO Entertinment Inc. ©BXD Inc.<br />
          当ページ上で用いるゲーム画像の著作権、及びその他知的財産権は
          当該サービスの提供元に帰属します。
        </p>
        <p>
          コンタクト(バグ報告, 改善要望, サービス提供元からの画像削除依頼など)は
          <a
            href="https://github.com/m-kigirai/shinymas-fes-simulator-site"
            target="_blank"
          >
            こちらから。
          </a>
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      selectedReadUnitIndex: "",
      selectedWriteUnitIndex: "0",
      unit: {
        name: "",
        leader: {
          appeals: [0, 0, 0, 0],
          memory: 0
        },
        vocal: {
          appeals: [0, 0, 0, 0],
          memory: 0
        },
        center: {
          appeals: [0, 0, 0, 0],
          memory: 0
        },
        dance: {
          appeals: [0, 0, 0, 0],
          memory: 0
        },
        visual: {
          appeals: [0, 0, 0, 0],
          memory: 0
        }
      },
      abilities: {
        bond: 0, // 有効な絆の個数
        startDash: 0,
        slowStarter: 0,
        appealUpByHighMemory: 0, // アピールUP (思い出高)
        appealUpByLowMemory: 0, // アピールUP (思い出低)
        interest: 0, // 興味
        perfectly: 0, // パーフェクトリィ
        memoryUp: 0 // 思い出UP
      },
      abilityItems: [
        { key: "bond", label: "アイドルの絆", unit: "個", min: 0, max: 20 },
        {
          key: "startDash",
          label: "スタートダッシュ",
          unit: "個",
          min: 0,
          max: 5
        },
        {
          key: "slowStarter",
          label: "スロースターター",
          unit: "個",
          min: 0,
          max: 5
        },
        {
          key: "appealUpByHighMemory",
          label: "アピールUP(思い出高)",
          unit: "個",
          min: 0,
          max: 5
        },
        {
          key: "appealUpByLowMemory",
          label: "アピールUP(思い出低)",
          unit: "個",
          min: 0,
          max: 5
        },
        {
          key: "interest",
          label: "興味UP合計値(%)",
          unit: "%",
          min: -15,
          max: 15
        },
        {
          key: "perfectly",
          label: "パーフェクトリィ",
          unit: "個",
          min: 0,
          max: 5
        },
        {
          key: "memoryUp",
          label: "思い出ゲージ増加量合計(%)",
          unit: "%",
          min: -50,
          max: 25
        }
      ],
      idx: {
        vo: 0,
        da: 1,
        vi: 2,
        me: 3
      },
      appealClassIdx: {
        0: "vo",
        1: "da",
        2: "vi",
        3: "me"
      },
      appealCalcValues: {
        position: "center",
        action: "1.5",
        turn: 1,
        memory: 10,
        extraMemoryUp: 0,
        mental: 1000,
        factor: {
          // アピール倍率
          vo: 0,
          da: 0,
          vi: 0
        },
        effect: {
          // 効果(ユニットに付与されるもの)
          vo: 0,
          da: 0,
          vi: 0
        },
        passive: {
          // パッシブスキル（ターン毎につくもの)
          vo: 0,
          da: 0,
          vi: 0
        },
        interest: {
          // 審査員個別の興味値
          vo: 0,
          da: 0,
          vi: 0
        }
      },
      appealBaseFields: [
        { key: "type", label: "", class: "" },
        { key: "leader", label: "Leader", class: "le" },
        { key: "vocal", label: "Vocal", class: "vo" },
        { key: "center", label: "Center", class: "ce" },
        { key: "dance", label: "Dance", class: "da" },
        { key: "visual", label: "Visual", class: "vi" }
      ],
      appealPositionOptions: [
        { value: "center", text: "Center" },
        { value: "vocal", text: "Vocal担当" },
        { value: "dance", text: "Dance担当" },
        { value: "visual", text: "Visual担当" },
        { value: "leader", text: "Leader" },
        {
          value: "memory",
          text:
            "思い出アピール (Center,　思い出LV倍率 x ユニット補正を自動適用, ver β)"
        }
      ],
      tention: "20",
      tentionOptions: [
        { value: "0", text: "思い出ゲージ0% - 紫の顔(絶不調)" },
        { value: "10", text: "思い出ゲージ10% - 青の顔(不調)" },
        { value: "20", text: "思い出ゲージ20% - 緑の顔(普通)" },
        { value: "30", text: "思い出ゲージ30% - 黄色の顔(好調)" },
        { value: "70", text: "思い出ゲージ70% - 赤の顔(絶好調)" }
      ],
      appealActionOptions: [
        { value: "1.5", text: "Perfect or 思い出Good (1.5倍)" },
        { value: "1.1", text: "Good (1.1倍)" },
        { value: "1.0", text: "Normal (1.0倍)" },
        { value: "0.5", text: "Bad (0.5倍)" }
      ]
    };
  },
  computed: {
    savedataWriteOptions() {
      const label = (index, save) => {
        if (!save.unit) {
          return `${index + 1}: --------`;
        }
        const n = save.unit.name || "No Name";
        return `${index + 1}: ${n}`;
      };
      return this.$store.state.saves.map((save, idx) => {
        return { value: idx, text: label(idx, save) };
      });
    },
    savedataReadOptions() {
      return [
        { value: "", text: "(この状態を読み込むと値をリセットします)" }
      ].concat(this.savedataWriteOptions);
    },
    appealBaseValues() {
      const idx = this.idx;
      const { leader, vocal, center, dance, visual } = this.unit;
      const [voSum, daSum, viSum] = [
        this.appealSum(idx.vo),
        this.appealSum(idx.da),
        this.appealSum(idx.vi)
      ];
      return [
        {
          type: "Vocal",
          leader: 1.5 * leader.appeals[idx.vo] + 0.5 * voSum,
          vocal: 1.5 * vocal.appeals[idx.vo] + 0.5 * voSum,
          center: 1.5 * center.appeals[idx.vo] + 0.5 * voSum,
          dance: 1.5 * dance.appeals[idx.vo] + 0.5 * voSum,
          visual: 1.5 * visual.appeals[idx.vo] + 0.5 * voSum
        },
        {
          type: "Dance",
          leader: 1.5 * leader.appeals[idx.da] + 0.5 * daSum,
          vocal: 1.5 * vocal.appeals[idx.da] + 0.5 * daSum,
          center: 1.5 * center.appeals[idx.da] + 0.5 * daSum,
          dance: 1.5 * dance.appeals[idx.da] + 0.5 * daSum,
          visual: 1.5 * visual.appeals[idx.da] + 0.5 * daSum
        },
        {
          type: "Vocal",
          leader: 1.5 * leader.appeals[idx.vi] + 0.5 * viSum,
          vocal: 1.5 * vocal.appeals[idx.vi] + 0.5 * viSum,
          center: 1.5 * center.appeals[idx.vi] + 0.5 * viSum,
          dance: 1.5 * dance.appeals[idx.vi] + 0.5 * viSum,
          visual: 1.5 * visual.appeals[idx.vi] + 0.5 * viSum
        }
      ];
    },
    calcMemory() {
      const { leader, vocal, center, dance, visual } = this.unit;
      // センターの思い出がLv.5の場合、「基礎倍率」は2.0、Lv.4なら1.4、Lv.3は1.2、Lv.2は1.0、Lv.1は0.8 となる
      const memoryFactors = [0, 0.8, 1.0, 1.2, 1.4, 2.0];
      const memoryFactor = memoryFactors[center.memory];
      // 編成補正: 思い出Lv.5 = 0.075、Lv.4 = 0.05、Lv.3 = 0.03、Lv.2 = 0.02、Lv.1 =Lv.0 = 0
      const lv2factors = [0, 0, 0.02, 0.03, 0.05, 0.075];
      // 小数点誤差の補正
      const unitFactor =
        Math.round(
          10000 *
            (1.0 +
              lv2factors[leader.memory] +
              lv2factors[vocal.memory] +
              lv2factors[dance.memory] +
              lv2factors[visual.memory])
        ) / 10000;
      const lv = center.memory >= 5 ? "MAX" : center.memory;
      const unitFactorLabel = Math.floor(unitFactor * 100) / 100;
      const label = `Lv. ${lv} (編成補正 x ${unitFactorLabel})`;
      return { label, memoryFactor, unitFactor };
    },
    unitCalc() {
      // フェスユニットの数値を計算
      const idx = this.idx;
      const { leader, vocal, center, dance, visual } = this.unit;
      const [vo, da, vi] = [this.voAppeals, this.daAppeals, this.viAppeals];
      const [voSum, daSum, viSum] = [
        this.appealSum(idx.vo),
        this.appealSum(idx.da),
        this.appealSum(idx.vi)
      ];
      return {
        memory: this.calcMemory,
        vo: Math.ceil(1.5 * vocal.appeals[idx.vo] + 0.5 * voSum),
        da: Math.ceil(1.5 * dance.appeals[idx.da] + 0.5 * daSum),
        vi: Math.ceil(1.5 * visual.appeals[idx.vi] + 0.5 * viSum),
        me: this.appealSum(idx.me)
      };
    },
    abilityBuff() {
      // アビリティによる Buff の合計数値(%)を返す
      const bond = this.abilities.bond * 5; // 絆個数 x 5
      const memory = this.appealCalcValues.memory;
      const highMemory =
        this.abilities.appealUpByHighMemory * ((memory / 100) * 8 + 2);
      const lowMemory =
        this.abilities.appealUpByLowMemory * ((1 - memory / 100) * 16 + 4);
      const turnFactor = this.appealCalcValues.turn - 1;
      const startDash =
        this.abilities.startDash * Math.max(2, 10 - (8 / 9) * turnFactor);
      const slowStart =
        this.abilities.slowStarter *
        Math.min(20, 4 + ((2 * 8) / 9) * turnFactor);
      const perfectly = this.abilities.perfectly * 10;
      return this.sum([
        bond,
        highMemory,
        lowMemory,
        startDash,
        slowStart,
        perfectly
      ]);
    },
    fesAppeal() {
      const fesBase = this.appealBaseValues;
      const key =
        this.appealCalcValues.position === "memory"
          ? "center"
          : this.appealCalcValues.position;
      const vo = fesBase[0][key];
      const da = fesBase[1][key];
      const vi = fesBase[2][key];
      return { vo, da, vi };
    },
    totalBuff() {
      const effect = this.appealCalcValues.effect;
      const passive = this.appealCalcValues.passive;
      const ability = this.abilityBuff;
      const vo = this.sum([ability, effect.vo, passive.vo]);
      const da = this.sum([ability, effect.da, passive.da]);
      const vi = this.sum([ability, effect.vi, passive.vi]);
      return { vo, da, vi };
    },
    totalInterest() {
      const interest = this.appealCalcValues.interest;
      const ability = this.abilities.interest;
      const vo = this.sum([ability, interest.vo]);
      const da = this.sum([ability, interest.da]);
      const vi = this.sum([ability, interest.vi]);
      return { vo, da, vi };
    },
    baseAppeal() {
      // フェスアピール基礎値 = 2.0 * アピールするアイドルの該当ステータス + 0.5 * (アピールしないアイドルの該当ステータス)
      // 基礎係数 = INT(フェスアピール基礎値 * 該当属性バフ合計値 * アピール係数 * 興味値)
      const fes = this.fesAppeal; // フェスアピール基礎値
      const buff = this.totalBuff;
      const action = Number(this.appealCalcValues.action); // Perfect とか
      const appealFactor = this.appealCalcValues.factor; // 何倍アピールか
      const calc = (fes, factor, buff, action) => {
        return Math.floor(
          Math.floor(Math.floor(fes * factor) * (1 + buff / 100)) * action
        );
      };
      const vo = calc(fes.vo, appealFactor.vo, buff.vo, action);
      const da = calc(fes.da, appealFactor.da, buff.da, action);
      const vi = calc(fes.vi, appealFactor.vi, buff.vi, action);

      return { vo, da, vi };
    },
    voAppeal() {
      const base = this.baseAppeal;
      const interest = this.totalInterest;
      const vo = Math.floor(Math.floor(base.vo) * 2 * (1 + interest.vo / 100));
      const da = Math.floor(Math.floor(base.da) * (1 + interest.vo / 100));
      const vi = Math.floor(Math.floor(base.vi) * (1 + interest.vo / 100));
      return {
        vo,
        da,
        vi,
        total: vo + da + vi,
        label: this.compositeLabel(vo, da, vi)
      };
    },
    daAppeal() {
      const base = this.baseAppeal;
      const interest = this.totalInterest;
      const vo = Math.floor(Math.floor(base.vo) * (1 + interest.da / 100));
      const da = Math.floor(Math.floor(base.da) * 2 * (1 + interest.da / 100));
      const vi = Math.floor(Math.floor(base.vi) * (1 + interest.da / 100));
      return {
        vo,
        da,
        vi,
        total: vo + da + vi,
        label: this.compositeLabel(vo, da, vi)
      };
    },
    viAppeal() {
      const base = this.baseAppeal;
      const interest = this.totalInterest;
      const vo = Math.floor(Math.floor(base.vo) * (1 + interest.vi / 100));
      const da = Math.floor(Math.floor(base.da) * (1 + interest.vi / 100));
      const vi = Math.floor(Math.floor(base.vi) * 2 * (1 + interest.vi / 100));
      return {
        vo,
        da,
        vi,
        total: vo + da + vi,
        label: this.compositeLabel(vo, da, vi)
      };
    }
  },
  methods: {
    sum(arr) {
      return arr.reduce(
        (prev, curr, index, roarr) => Number(prev) + Number(curr)
      );
    },
    appealSum(idx) {
      const { leader, vocal, center, dance, visual } = this.unit;
      return this.sum([
        leader.appeals[idx],
        vocal.appeals[idx],
        center.appeals[idx],
        dance.appeals[idx],
        visual.appeals[idx]
      ]);
    },
    positionChoosed() {
      if (this.appealCalcValues.position === "memory") {
        // 思い出の場合は各倍率を自動設定
        const memory = this.calcMemory;
        const factor = memory.memoryFactor * memory.unitFactor;
        this.appealCalcValues.factor.vo = factor;
        this.appealCalcValues.factor.da = factor;
        this.appealCalcValues.factor.vi = factor;
        this.appealCalcValues.memory = 100;
        this.appealCalcValues.action = "1.5";
      }
    },
    compositeLabel(vo, da, vi) {
      const ts = [];
      // 複合アピール
      if (vo > 0) {
        ts.push(`Vo: ${vo}`);
      }
      if (da > 0) {
        ts.push(`Da: ${da}`);
      }
      if (vi > 0) {
        ts.push(`Vi: ${vi}`);
      }
      if (ts.length <= 1) {
        // 単一要素のみなのでラベル不要
        return "";
      }
      return ts.join(", ");
    },
    firstTurn() {
      // ターンの初期化
      this.appealCalcValues.mental = Number(this.unitCalc.me);
      this.appealCalcValues.turn = 1;
      this.appealCalcValues.memory = Number(this.tention);
      this.appealCalcValues.extraMemoryUp = 0;
    },
    calcNextTurn() {
      // 次ターンの計算
      // メンタルの割合によって増加量を決定
      const maxMental = Number(this.unitCalc.me);
      const mental = Number(this.appealCalcValues.mental);
      const memoryByMental = (max, curr) => {
        const per = Math.floor((curr / max) * 100);
        if (per >= 100) {
          return 10;
        } else if (per >= 75) {
          return 15;
        } else if (per >= 50) {
          return 17.5;
        } else if (per >= 25) {
          return 20;
        } else if (per >= 5) {
          return 22.5;
        } else {
          return 100;
        }
      };
      // 合計増加量
      const totalUp =
        Number(1 + this.abilities.memoryUp / 100) *
        (Number(this.appealCalcValues.extraMemoryUp) +
          memoryByMental(maxMental, mental));
      // ターン計算
      this.appealCalcValues.turn = Number(this.appealCalcValues.turn) + 1;
      this.appealCalcValues.memory = Math.min(
        100,
        Number(this.appealCalcValues.memory) + totalUp
      );
      this.appealCalcValues.extraMemoryUp = 0;
    },
    clearAppealCalc() {
      // 入力値クリア
      this.$set(this.appealCalcValues, "factor", { vo: 0, da: 0, vi: 0 });
      this.$set(this.appealCalcValues, "effect", { vo: 0, da: 0, vi: 0 });
      this.$set(this.appealCalcValues, "passive", { vo: 0, da: 0, vi: 0 });
      this.$set(this.appealCalcValues, "interest", { vo: 0, da: 0, vi: 0 });
    },
    loadUnit() {
      // ユニットをロード
      console.log(this.selectedReadUnitIndex);
      if (this.selectedReadUnitIndex === "") {
        this.$set(this.unit, "name", "");
        ["leader", "vocal", "center", "dance", "visual"].forEach(k => {
          this.$set(this.unit, k, {
            appeals: [0, 0, 0, 0],
            memory: 0
          });
        });
        this.$set(this, "abilities", {
          bond: 0, // 有効な絆の個数
          startDash: 0,
          slowStarter: 0,
          appealUpByHighMemory: 0, // アピールUP (思い出高)
          appealUpByLowMemory: 0, // アピールUP (思い出低)
          interest: 0, // 興味
          perfectly: 0, // パーフェクトリィ
          memoryUp: 0 // 思い出UP
        });
      } else {
        const index = Number(this.selectedReadUnitIndex);
        const save = this.$store.state.saves[index];
        if (!save.unit) {
          // ユニット情報がない場合は何もしない
          return;
        }
        this.$set(this, "unit", this.$deepCopy(save.unit));
        this.$set(this, "abilities", this.$deepCopy(save.abilities));
      }
    },
    saveUnit() {
      // ユニットを localStorage へ保存
      const now = new Date().toISOString();
      this.unit.savedate = now;
      if (!this.unit.name) {
        this.unit.name = "Untitled";
      }
      this.$store.commit("save", {
        index: this.selectedWriteUnitIndex,
        unit: this.$deepCopy(this.unit),
        abilities: this.$deepCopy(this.abilities)
      });
    }
  }
};
</script>

<style>
h1 {
  padding-top: 20px;
  font-size: 1.5em;
}
h2 {
  font-size: 1.3em;
}
h3 {
  font-size: 1.1em;
}
.appeal {
  height: 3em;
}
.header {
  min-height: 50px;
}
.vo {
  background-color: #fe7bde;
}

.da {
  background-color: #9edcff;
}

.vi {
  background-color: #fcffa0;
}

.me {
  background-color: #ff6fff;
}

.cell-center {
  text-align: center;
}

.bold {
  font-weight: bold;
}

.cell-col {
  min-height: 42px;
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
