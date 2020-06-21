<template>
  <b-container>
    <b-row>
      <b-col>
        <h1>
          THE iDOLM@STER ShinyColors フェス計算機 (β)
        </h1>
        <p>
          シャニマスのフェスモードでのアピール値を計算/シミュレーションするツールです。
          現在β版であり、結果が一致しないときがあります。
        </p>
        <b-alert show>
          2020/06/22 - アピールテンプレート機能を作成しました。
        </b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <p><a href="/usage">利用方法の説明はこちら</a></p>
      </b-col>
    </b-row>
    <br />
    <div>
      <b-tabs content-class="mt-3" pills justified>
        <b-tab title="ユニット情報" active>
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
          <b-row>
            <b-col>
              <b-button
                variant="outline-primary"
                class="float-right"
                @click="gotoTop"
              >
                ページの一番上に戻る
              </b-button>
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col>
              <h2>アピールテンプレート登録 (任意)</h2>
              <p>
                事前にアピールのパターンを登録することで、特殊条件のアピール倍率自動算出や段階的なアピールの算出が可能です。<br />
                多段アピールやリンクアピール込みなどを一括して計算する場合はここで事前にアピールを登録しておいてください。
              </p>
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col sm="2" class="label-input-col">
              <span class="bold">アピール名称: </span>
              <b-form-input v-model="appealTemplateValues.name" type="text" />
            </b-col>
            <b-col sm="2">
              <span class="bold label-input-col">実施ポジション: </span>
              <b-form-select
                v-model="appealTemplateValues.position"
                :options="appealTemplatePositionOptions"
              ></b-form-select>
            </b-col>
            <b-col sm="2" class="vo label-input-col">
              <span class="bold">Vo.(最大)倍率: </span>
              <b-form-input
                v-model="appealTemplateValues.factor.vo"
                type="number"
              />
            </b-col>
            <b-col sm="2" class="da label-input-col">
              <span class="bold">Da.(最大)倍率: </span>
              <b-form-input
                v-model="appealTemplateValues.factor.da"
                type="number"
              />
            </b-col>
            <b-col sm="2" class="vi label-input-col">
              <span class="bold">Vi.(最大)倍率: </span>
              <b-form-input
                v-model="appealTemplateValues.factor.vi"
                type="number"
              />
            </b-col>
            <b-col sm="2" class="label-input-col other">
              <span class="bold">倍率変動設定: </span>
              <b-form-select
                v-model="appealTemplateValues.type"
                :options="appealTemplateTypeOptions"
                @change="changedAppealTemplateValueType"
              ></b-form-select>
            </b-col>
          </b-row>
          <b-row v-for="index of 5" :key="index">
            <b-col sm="4" class="label-input-col">
              <span class="bold">追加効果 {{ index }}</span>
              <b-form-select
                v-model="appealTemplateValues.append[index - 1].type"
                :options="appealAppendTemplateTypeOptions"
              ></b-form-select>
            </b-col>
            <b-col sm="2" class="vo label-input-col">
              <span class="bold">
                Vo.
                {{
                  appealTemplateValues.append[index - 1].type === "buff"
                    ? "バフ増加量(%)"
                    : "(最大)倍率"
                }}:
              </span>
              <b-form-input
                v-model="appealTemplateValues.append[index - 1].factor.vo"
                type="number"
              />
            </b-col>
            <b-col sm="2" class="da label-input-col">
              <span class="bold">
                Da.
                {{
                  appealTemplateValues.append[index - 1].type === "buff"
                    ? "バフ増加量(%)"
                    : "(最大)倍率"
                }}:
              </span>
              <b-form-input
                v-model="appealTemplateValues.append[index - 1].factor.da"
                type="number"
              />
            </b-col>
            <b-col sm="2" class="vi label-input-col">
              <span class="bold">
                Vi.
                {{
                  appealTemplateValues.append[index - 1].type === "buff"
                    ? "バフ増加量(%)"
                    : "(最大)倍率"
                }}:
              </span>
              <b-form-input
                v-model="appealTemplateValues.append[index - 1].factor.vi"
                type="number"
              />
            </b-col>
            <b-col sm="2" class="label-input-col other"></b-col>
            <b-col
              v-if="appealTemplateValues.append[index - 1].type === 'buff'"
              sm="4"
              class="label-input-col"
            ></b-col>
            <b-col
              v-if="appealTemplateValues.append[index - 1].type === 'buff'"
              sm="2"
              class="label-input-col other"
            >
              <span class="bold">
                メンタル増加量(%):
              </span>
              <b-form-input
                v-model="appealTemplateValues.append[index - 1].mental"
                type="number"
              />
            </b-col>
            <b-col
              v-if="appealTemplateValues.append[index - 1].type === 'buff'"
              sm="2"
              class="label-input-col other"
            >
              <span class="bold">
                注目度増加量(%):
              </span>
              <b-form-input
                v-model="appealTemplateValues.append[index - 1].attention"
                type="number"
              />
            </b-col>
            <b-col
              v-if="appealTemplateValues.append[index - 1].type === 'buff'"
              sm="2"
              class="label-input-col other"
            >
              <span class="bold">
                思い出ゲージ増加量:
              </span>
              <b-form-input
                v-model="appealTemplateValues.append[index - 1].memory"
                type="number"
              />
            </b-col>
            <b-col
              v-if="appealTemplateValues.append[index - 1].type === 'buff'"
              sm="2"
              class="label-input-col other"
            >
              <span class="bold">
                興味値増加量(%):
              </span>
              <b-form-input
                v-model="appealTemplateValues.append[index - 1].interest"
                type="number"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-button
                variant="outline-success"
                class="float-right"
                @click="addAppealTemplate"
              >
                追加
              </b-button>
              <b-button
                variant="outline-primary"
                class="float-right"
                @click="clearAppealTemplateInput"
              >
                入力内容をクリア
              </b-button>
            </b-col>
          </b-row>
          <br />
          <b-row class="justify-content-md-center text-center">
            <b-col sm="3">
              アピールテンプレート一覧
            </b-col>
            <b-col sm="9">
              <b-form-select
                v-model="selectedAppealTemplate"
                :options="appealTemplateChooseOptions"
              ></b-form-select>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-button
                variant="outline-success"
                class="float-right"
                @click="loadAppealTemplate"
              >
                選択中の要素を読み込み
              </b-button>
              <b-button
                variant="outline-primary"
                class="float-right"
                @click="deleteAppealTemplate"
              >
                選択中の要素を削除
              </b-button>

              <b-button
                variant="outline-danger"
                class="float-right"
                @click="deleteAllAppealTemplate"
              >
                全てのショートカットを削除
              </b-button>
            </b-col>
          </b-row>
        </b-tab>
        <!-- -->
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
              <span class="bold">計算モード</span>
            </b-col>
            <b-col sm="9">
              <b-form-select
                v-model="calcMode"
                :options="modeOptions"
              ></b-form-select>
            </b-col>
          </b-row>
          <b-row v-if="detailMode">
            <b-col sm="3">
              <span class="bold">
                累計注目度(%)
              </span>
            </b-col>
            <b-col sm="9">
              <b-form-input
                v-model="appealCalcValues.attention"
                type="number"
              />
            </b-col>
          </b-row>
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
              <span class="bold">アピールテンプレート</span>
            </b-col>
            <b-col sm="9">
              <b-form-select
                v-model="selectedAppealTemplate"
                :options="appealTemplateChooseOptions"
                @change="templateChoosed"
              ></b-form-select>
            </b-col>
          </b-row>
          <b-row v-if="!templateSelected">
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
          <b-row v-if="templateSelected" cols="4">
            <b-col class="cell-col">
              <span class="bold">アピール倍率(自動計算)</span>
            </b-col>
            <b-col class="vo">
              <b-form-input
                v-model="appealFactor.vo"
                type="number"
                step="0.001"
                :disabled="true"
              />
            </b-col>
            <b-col class="da">
              <b-form-input
                v-model="appealFactor.da"
                type="number"
                step="0.001"
                :disabled="true"
              />
            </b-col>
            <b-col class="vi">
              <b-form-input
                v-model="appealFactor.vi"
                type="number"
                step="0.001"
                :disabled="true"
              />
            </b-col>
          </b-row>
          <b-row v-else cols="4">
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
          <b-row v-if="selectedMemory" cols="4">
            <b-col class="cell-col">
              <span class="bold">ユニット思い出補正</span>
            </b-col>
            <b-col class="vo">
              <b-form-input
                v-model="calcMemory.unitFactor"
                type="number"
                step="0.001"
                :disabled="true"
              />
            </b-col>
            <b-col class="da">
              <b-form-input
                v-model="calcMemory.unitFactor"
                type="number"
                step="0.001"
                :disabled="true"
              />
            </b-col>
            <b-col class="vi">
              <b-form-input
                v-model="calcMemory.unitFactor"
                type="number"
                step="0.001"
                :disabled="true"
              />
            </b-col>
          </b-row>
          <b-row v-if="detailMode" cols="4">
            <b-col class="cell-col">
              <span class="bold">バフ個数</span>
            </b-col>
            <b-col class="vo">
              <b-form-input
                v-model="appealCalcValues.effectCount.up.vo"
                type="number"
              />
            </b-col>
            <b-col class="da">
              <b-form-input
                v-model="appealCalcValues.effectCount.up.da"
                type="number"
              />
            </b-col>
            <b-col class="vi">
              <b-form-input
                v-model="appealCalcValues.effectCount.up.vi"
                type="number"
              />
            </b-col>
          </b-row>
          <b-row v-if="detailMode" cols="4">
            <b-col class="cell-col">
              <span class="bold">デバフ個数</span>
            </b-col>
            <b-col class="vo">
              <b-form-input
                v-model="appealCalcValues.effectCount.down.vo"
                type="number"
              />
            </b-col>
            <b-col class="da">
              <b-form-input
                v-model="appealCalcValues.effectCount.down.da"
                type="number"
              />
            </b-col>
            <b-col class="vi">
              <b-form-input
                v-model="appealCalcValues.effectCount.down.vi"
                type="number"
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
          <b-row v-for="n of detailMode ? 5 : 3" :key="n">
            <b-col class="cell-col">
              <span class="bold">興味値UP/DOWN {{ n }} (%)</span>
            </b-col>
            <b-col class="vo">
              <b-form-input
                v-model="appealCalcValues.interest.vo[n - 1]"
                type="number"
              />
            </b-col>
            <b-col class="da">
              <b-form-input
                v-model="appealCalcValues.interest.da[n - 1]"
                type="number"
              />
            </b-col>
            <b-col class="vi">
              <b-form-input
                v-model="appealCalcValues.interest.vi[n - 1]"
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
              <div v-if="voAppeal.label">({{ voAppeal.label }})</div>
            </b-col>
            <b-col class="da cell-center">
              <span class="bold">{{ daAppeal.total }}</span>
              <div v-if="daAppeal.label">({{ daAppeal.label }})</div>
            </b-col>
            <b-col class="vi cell-center">
              <span class="bold">{{ viAppeal.total }}</span>
              <div v-if="viAppeal.label">({{ viAppeal.label }})</div>
            </b-col>
          </b-row>
          <b-row v-if="showAppendAppeal" cols="4">
            <b-col class="cell-col">
              <span class="bold">アピール追撃</span>
            </b-col>
            <b-col class="vo cell-center">
              <span class="bold">追撃合計: {{ voAppendAppeal.total }}</span>
              <div v-for="item in voAppendAppeal.details" :key="item.idx">
                <span> * {{ item.appeal }}</span>
                <span v-if="item.text">- {{ item.text }}</span>
              </div>
            </b-col>
            <b-col class="da cell-center">
              <span class="bold">追撃合計: {{ daAppendAppeal.total }}</span>
              <div v-for="item in daAppendAppeal.details" :key="item.idx">
                <span> * {{ item.appeal }}</span>
                <span v-if="item.text">- {{ item.text }}</span>
              </div>
            </b-col>
            <b-col class="vi cell-center">
              <span class="bold">追撃合計: {{ viAppendAppeal.total }}</span>
              <div v-for="item in viAppendAppeal.details" :key="item.idx">
                <span> * {{ item.appeal }}</span>
                <span v-if="item.text">- {{ item.text }}</span>
              </div>
            </b-col>
          </b-row>
          <b-row v-if="appendBuff.valid" cols="4">
            <b-col class="cell-col">
              <span class="bold">アピール時バフ</span>
            </b-col>
            <b-col class="vo cell-center">
              <span> Vo. {{ appendBuff.vo.buff }} %</span><br />
              <span> バフ: {{ appendBuff.vo.count.up }}個</span><br />
              <span> デバフ: {{ appendBuff.vo.count.down }}個</span>
            </b-col>
            <b-col class="da cell-center">
              <span> Da. {{ appendBuff.da.buff }} %</span><br />
              <span> バフ: {{ appendBuff.da.count.up }}個</span><br />
              <span> デバフ: {{ appendBuff.da.count.down }}個</span>
            </b-col>
            <b-col class="vi cell-center">
              <span> Vi. {{ appendBuff.vi.buff }} %</span><br />
              <span> バフ: {{ appendBuff.vi.count.up }}個</span><br />
              <span> デバフ: {{ appendBuff.vi.count.down }}個</span>
            </b-col>
          </b-row>
          <b-row v-if="appendBuff.validOther" cols="4">
            <b-col class="cell-col">
              <span class="bold">その他アピール効果</span>
            </b-col>
            <b-col sm="9" class="cell-center other">
              <span v-if="appendBuff.mental > 0">
                メンタル回復: +{{ appendBuff.mental }} <br />
              </span>
              <span v-if="appendBuff.mental < 0">
                メンタル減少: {{ appendBuff.mental }} <br />
              </span>
              <span v-if="appendBuff.memory > 0">
                思い出ゲージ上昇: +{{ appendBuff.memory }} <br />
              </span>
              <span v-if="appendBuff.mental < 0">
                思い出ゲージ減少: {{ appendBuff.memory }} <br />
              </span>
              <span v-if="appendBuff.attention > 0">
                注目度増加: +{{ appendBuff.attention }} <br />
              </span>
              <span v-if="appendBuff.attention < 0">
                注目度減少: {{ appendBuff.attention }} <br />
              </span>
              <span>興味度追加倍率: x{{ appendBuff.interest }}</span>
            </b-col>
          </b-row>
          <b-row v-if="showLinkAppeal" cols="4">
            <b-col class="cell-col">
              <span class="bold">LINKアピール</span>
            </b-col>
            <b-col class="vo cell-center">
              <span class="bold">
                LINKアピール合計: {{ voLinkAppeal.total }}
              </span>
              <div v-for="item in voLinkAppeal.details" :key="item.idx">
                <span> * {{ item.appeal }}</span>
                <span v-if="item.text">- {{ item.text }}</span>
              </div>
            </b-col>
            <b-col class="da cell-center">
              <span class="bold">
                LINKアピール合計: {{ daLinkAppeal.total }}
              </span>
              <div v-for="item in daLinkAppeal.details" :key="item.idx">
                <span> * {{ item.appeal }}</span>
                <span v-if="item.text">- {{ item.text }}</span>
              </div>
            </b-col>
            <b-col class="vi cell-center">
              <span class="bold">
                LINKアピール合計: {{ viLinkAppeal.total }}
              </span>
              <div v-for="item in viLinkAppeal.details" :key="item.idx">
                <span> * {{ item.appeal }}</span>
                <span v-if="item.text">- {{ item.text }}</span>
              </div>
            </b-col>
          </b-row>
          <b-row v-if="showAppendAppeal" cols="4">
            <b-col class="cell-col">
              <span class="bold">アピール累計(LINKなし)</span>
            </b-col>
            <b-col class="vo cell-center">
              <span class="bold">
                LINKなし累計: {{ totalAppealWithoutLink.vo }}
              </span>
            </b-col>
            <b-col class="da cell-center">
              <span class="bold">
                LINKなし累計: {{ totalAppealWithoutLink.da }}
              </span>
            </b-col>
            <b-col class="vi cell-center">
              <span class="bold">
                LINKなし累計: {{ totalAppealWithoutLink.vi }}
              </span>
            </b-col>
          </b-row>
          <b-row v-if="showLinkAppeal" cols="4">
            <b-col class="cell-col">
              <span class="bold">アピール累計(LINK込み)</span>
            </b-col>
            <b-col class="vo cell-center">
              <span class="bold">
                LINK込み累計: {{ totalAppealWithLink.vo }}
              </span>
            </b-col>
            <b-col class="da cell-center">
              <span class="bold">
                LINK込み累計: {{ totalAppealWithLink.da }}
              </span>
            </b-col>
            <b-col class="vi cell-center">
              <span class="bold">
                LINK込み累計: {{ totalAppealWithLink.vi }}
              </span>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="3">
              <span class="bold">アピールテンプレート</span>
            </b-col>
            <b-col sm="9">
              <b-form-select
                v-model="selectedAppealTemplate"
                :options="appealTemplateChooseOptions"
                @change="templateChoosed"
              ></b-form-select>
            </b-col>
          </b-row>

          <br />
          <!-- その他計算結果 -->
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
              <span class="bold">{{ totalBuff.vo }} %</span>
            </b-col>
            <b-col class="da text-center">
              <span class="bold">{{ totalBuff.da }} %</span>
            </b-col>
            <b-col class="vi text-center">
              <span class="bold">{{ totalBuff.vi }} %</span>
            </b-col>
          </b-row>
          <b-row cols="4">
            <b-col class="cell-col">
              <span class="bold">最終興味値補正(%)</span>
            </b-col>
            <b-col class="vo text-center">
              <span class="bold">{{ totalInterest.vo * 100 }} %</span>
            </b-col>
            <b-col class="da text-center">
              <span class="bold">{{ totalInterest.da * 100 }} %</span>
            </b-col>
            <b-col class="vi text-center">
              <span class="bold">{{ totalInterest.vi * 100 }} %</span>
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
      </b-tabs>
    </div>
    <br />
    <b-row>
      <b-col>
        <a
          href="https://twitter.com/share?ref_src=twsrc%5Etfw"
          class="twitter-share-button"
          data-text="シャニマス フェス計算機 - "
          data-url="https://kind-agnesi-553039.netlify.app/"
          data-lang="ja"
          data-show-count="false"
        >
          Tweet
        </a>
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charset="utf-8"
        ></script>
      </b-col>
    </b-row>
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
          <a href="https://forms.gle/XH1UKV3uaSU98tz58" target="_blank">
            問い合わせ用Google Form
          </a>
          から。
        </p>
        <p>
          Developed by
          <a href="https://twitter.com/m_kigirai" target="_blank">
            Twitter: @m_kigirai
          </a>
          with
          <a
            href="https://github.com/m-kigirai/shinymas-fes-simulator-site"
            target="_blank"
          >
            Github
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
        interestUp: 0, // 人気者
        interestDown: 0, // ひかえめ
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
          key: "interestUp",
          label: "人気者 (※他ユニットも含む)",
          unit: "個",
          min: 0,
          max: 30
        },
        {
          key: "interestDown",
          label: "ひかえめ (※他ユニットも含む)",
          unit: "個",
          min: 0,
          max: 30
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
      appealTemplateValues: {
        name: "", // 名称
        position: "center", // アピール実施者
        type: "", // 特殊倍率設定 (背水など)
        factor: {
          // 倍率
          vo: 0,
          da: 0,
          vi: 0
        },
        append: Array(8)
          .fill(0)
          .map(_ => {
            return {
              type: "",
              factor: { vo: 0, da: 0, vi: 0 },
              interest: 0,
              mental: 0,
              attention: 0,
              memory: 0
            };
          })
      },
      selectedAppealTemplate: "",
      appealTemplateInputMode: "",
      appealTemplateInputModeOptions: [
        { value: "", text: "通常モード" },
        {
          value: "detail",
          text:
            "詳細入力モード(メンタルや注目度などの詳細条件を入力する項目を追加します)"
        }
      ],
      // アピールテンプレート登録の実施者オプション
      appealTemplatePositionOptions: [
        { value: "center", text: "Center" },
        { value: "vocal", text: "Vocal担当" },
        { value: "dance", text: "Dance担当" },
        { value: "visual", text: "Visual担当" },
        { value: "leader", text: "Leader" }
      ],
      // アピールのタイプ
      appealTemplateTypeOptions: [
        { value: "", text: "通常" },
        { value: "konshin", text: "メンタルが多いほど効果UP" },
        { value: "haisui", text: "メンタルが少ないほど効果UP" },
        { value: "shinnai", text: "思い出ゲージが多いほど効果UP" },
        { value: "tyouhatsu", text: "注目度が高いほど効果UP" },
        { value: "onmitsu", text: "注目度が低いほど効果UP" },
        { value: "deleteUp", text: "消去: (同属性の)UPが多いほど効果UP" },
        { value: "deleteUpVo", text: "消去:Vo.UPが多いほど効果UP" },
        { value: "deleteUpDa", text: "消去:Da.UPが多いほど効果UP" },
        { value: "deleteUpVi", text: "消去:Vi.UPが多いほど効果UP" },
        { value: "deleteUpVoDa", text: "消去:Vo.&Da.UPが多いほど効果UP" },
        { value: "deleteUpVoVi", text: "消去:Vo.&Vi.UPが多いほど効果UP" },
        { value: "deleteUpDaVi", text: "消去:Da.&Vi.UPが多いほど効果UP" },
        { value: "deleteUpVoDaVi", text: "消去:Vo.&Da.&Vi.UPが多いほど効果UP" },
        { value: "deleteDown", text: "消去:(同属性の)DOWNが多いほど効果UP" },
        { value: "deleteDownVo", text: "消去:Vo.DOWNが多いほど効果UP" },
        { value: "deleteDownDa", text: "消去:Da.DOWNが多いほど効果UP" },
        { value: "deleteDownVi", text: "消去:Vi.DOWNが多いほど効果UP" },
        { value: "deleteDownVoDa", text: "消去:Vo.&Da.DOWNが多いほど効果UP" },
        { value: "deleteDownVoVi", text: "消去:Vo.&Vi.DOWNが多いほど効果UP" },
        { value: "deleteDownDaVi", text: "消去:Da.&Vi.DOWNが多いほど効果UP" },
        {
          value: "deleteDownVoDaVi",
          text: "消去:Vo.&Da.&Vi.DOWNが多いほど効果UP"
        },
        { value: "memory5", text: "思い出アピール(Lv.MAX)" },
        { value: "memory4", text: "思い出アピール(Lv.4)" },
        { value: "memory3", text: "思い出アピール(Lv.3)" },
        { value: "memory2", text: "思い出アピール(Lv.2)" },
        { value: "memory1", text: "思い出アピール(Lv.1)" }
      ],
      // アピールの追加効果
      appealAppendTemplateTypeOptions: [
        { value: "", text: "--------" },
        { value: "buff", text: "バフ・デバフ付与" },
        { value: "", text: "-=-=-追撃アピール一覧-=-=-" },
        { value: "normal", text: "アピール: 通常" },
        { value: "konshin", text: "アピール: メンタルが多いほど効果UP" },
        { value: "haisui", text: "アピール: メンタルが少ないほど効果UP" },
        { value: "shinnai", text: "アピール: 思い出ゲージが多いほど効果UP" },
        { value: "tyouhatsu", text: "アピール: 注目度が高いほど効果UP" },
        { value: "onmitsu", text: "アピール: 注目度が低いほど効果UP" },
        {
          value: "deleteUp",
          text: "アピール: 消去: (同属性の)UPが多いほど効果UP"
        },
        { value: "deleteUpVo", text: "アピール: 消去:Vo.UPが多いほど効果UP" },
        { value: "deleteUpDa", text: "アピール: 消去:Da.UPが多いほど効果UP" },
        { value: "deleteUpVi", text: "アピール: 消去:Vi.UPが多いほど効果UP" },
        {
          value: "deleteUpVoDa",
          text: "アピール: 消去:Vo.&Da.UPが多いほど効果UP"
        },
        {
          value: "deleteUpVoVi",
          text: "アピール: 消去:Vo.&Vi.UPが多いほど効果UP"
        },
        {
          value: "deleteUpDaVi",
          text: "アピール: 消去:Da.&Vi.UPが多いほど効果UP"
        },
        {
          value: "deleteUpVoDaVi",
          text: "アピール: 消去:Vo.&Da.&Vi.UPが多いほど効果UP"
        },
        {
          value: "deleteDown",
          text: "アピール: 消去:(同属性の)DOWNが多いほど効果UP"
        },
        {
          value: "deleteDownVo",
          text: "アピール: 消去:Vo.DOWNが多いほど効果UP"
        },
        {
          value: "deleteDownDa",
          text: "アピール: 消去:Da.DOWNが多いほど効果UP"
        },
        {
          value: "deleteDownVi",
          text: "アピール: 消去:Vi.DOWNが多いほど効果UP"
        },
        {
          value: "deleteDownVoDa",
          text: "アピール: 消去:Vo.&Da.DOWNが多いほど効果UP"
        },
        {
          value: "deleteDownVoVi",
          text: "アピール: 消去:Vo.&Vi.DOWNが多いほど効果UP"
        },
        {
          value: "deleteDownDaVi",
          text: "アピール: 消去:Da.&Vi.DOWNが多いほど効果UP"
        },
        {
          value: "deleteDownVoDaVi",
          text: "アピール: 消去:Vo.&Da.&Vi.DOWNが多いほど効果UP"
        },
        { value: "", text: "-=-=-LINKアピール一覧-=-=-" },
        { value: "link-normal", text: "LINK: 通常アピール" },
        { value: "link-konshin", text: "LINK: メンタルが多いほど効果UP" },
        { value: "link-haisui", text: "LINK: メンタルが少ないほど効果UP" },
        { value: "link-shinnai", text: "LINK: 思い出ゲージが多いほど効果UP" },
        { value: "link-tyouhatsu", text: "LINK: 注目度が高いほど効果UP" },
        { value: "link-onmitsu", text: "LINK: 注目度が低いほど効果UP" },
        {
          value: "link-deleteUp",
          text: "LINK: 消去: (同属性の)UPが多いほど効果UP"
        },
        { value: "link-deleteUpVo", text: "LINK: 消去:Vo.UPが多いほど効果UP" },
        { value: "link-deleteUpDa", text: "LINK: 消去:Da.UPが多いほど効果UP" },
        { value: "link-deleteUpVi", text: "LINK: 消去:Vi.UPが多いほど効果UP" },
        {
          value: "link-deleteUpVoDa",
          text: "LINK: 消去:Vo.&Da.UPが多いほど効果UP"
        },
        {
          value: "link-deleteUpVoVi",
          text: "LINK: 消去:Vo.&Vi.UPが多いほど効果UP"
        },
        {
          value: "link-deleteUpDaVi",
          text: "LINK: 消去:Da.&Vi.UPが多いほど効果UP"
        },
        {
          value: "link-deleteUpVoDaVi",
          text: "LINK: 消去:Vo.&Da.&Vi.UPが多いほど効果UP"
        },
        {
          value: "link-deleteDown",
          text: "LINK: 消去:(同属性の)DOWNが多いほど効果UP"
        },
        {
          value: "link-deleteDownVo",
          text: "LINK: 消去:Vo.DOWNが多いほど効果UP"
        },
        {
          value: "link-deleteDownDa",
          text: "LINK: 消去:Da.DOWNが多いほど効果UP"
        },
        {
          value: "link-deleteDownVi",
          text: "LINK: 消去:Vi.DOWNが多いほど効果UP"
        },
        {
          value: "link-deleteDownVoDa",
          text: "LINK: 消去:Vo.&Da.DOWNが多いほど効果UP"
        },
        {
          value: "link-deleteDownVoVi",
          text: "LINK: 消去:Vo.&Vi.DOWNが多いほど効果UP"
        },
        {
          value: "link-deleteDownDaVi",
          text: "LINK: 消去:Da.&Vi.DOWNが多いほど効果UP"
        },
        {
          value: "deleteDownVoDaVi",
          text: "LINK: 消去:Vo.&Da.&Vi.DOWNが多いほど効果UP"
        }
      ],
      appealCalcValues: {
        position: "center",
        action: "1.5",
        turn: 1,
        memory: 10,
        extraMemoryUp: 0,
        mental: 1000,
        attention: 0,
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
        effectCount: {
          // 効果個数 (一部算出に利用)
          up: {
            vo: 0,
            da: 0,
            vi: 0
          },
          down: {
            vo: 0,
            da: 0,
            vi: 0
          }
        },
        passive: {
          // パッシブスキル（ターン毎につくもの)
          vo: 0,
          da: 0,
          vi: 0
        },
        interest: {
          // 審査員付与の興味値
          vo: [0, 0, 0, 0, 0],
          da: [0, 0, 0, 0, 0],
          vi: [0, 0, 0, 0, 0]
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
      ],
      calcMode: "normal",
      modeOptions: [
        { value: "normal", text: "通常" },
        {
          value: "detail",
          text:
            "詳細モード(入力項目が増えます, アピール倍率自動算出で必要な場合があります)"
        }
      ]
    };
  },
  computed: {
    detailMode() {
      return this.calcMode === "detail";
    },
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
    appealTemplateChooseOptions() {
      // アピールテンプレート一覧を作成
      const findText = (options, value) => {
        const candidate = options.filter(v => v.value === value);
        return candidate.length > 0 ? candidate[0].text : undefined;
      };
      const factorLabel = tpl => {
        const xs = [
          { type: "Vo", dynamic: tpl.type !== "", factor: tpl.factor.vo },
          { type: "Da", dynamic: tpl.type !== "", factor: tpl.factor.da },
          { type: "Vi", dynamic: tpl.type !== "", factor: tpl.factor.vi }
        ];
        const eachLabels = xs
          .filter(f => f.factor > 0)
          .map(f => {
            const maxlabel = f.dynamic ? "最大" : "";
            return `${f.type}: ${maxlabel}${f.factor}倍`;
          });
        return eachLabels.join(" + ");
      };
      const saved = this.$store.getters.getTemplates.map((tpl, index) => {
        const pos = findText(this.appealTemplatePositionOptions, tpl.position);
        const extra = findText(this.appealTemplateTypeOptions, tpl.type);
        const factor = factorLabel(tpl);
        if (!tpl.name) {
          // 名前入力なしの場合: 倍率 + 特殊効果
          return {
            value: index,
            text: `${index + 1}: ${pos} - ${factor} (${extra})`
          };
        } else {
          // 名前入力ありの場合: 倍率 + 特殊効果
          return {
            value: index,
            text: `${index + 1}: ${tpl.name} ${pos} - ${factor} (${extra})`
          };
        }
      });
      return [{ value: "", text: "--------" }].concat(saved);
    },
    appealBaseValues() {
      return this.$calc.appealBaseValues(this.idx, this.unit);
    },
    calcMemory() {
      return this.$calc.memoryInfo(this.unit);
    },
    unitCalc() {
      return this.$calc.unitInfo(this.unit);
    },
    abilityBuff() {
      // アビリティによる Buff の合計数値(%)を返す
      return this.$calc.abilityBuff(this.abilities, this.appealCalcValues);
    },
    fesAppeal() {
      const position = this.$calc.appealPosition(
        this.selectedAppealTemplate,
        this.$store.getters.getTemplates,
        this.appealCalcValues
      );
      return this.$calc.fesAppeal(this.unit, position);
    },
    totalBuff() {
      return this.$calc.totalBuff(this.abilities, this.appealCalcValues);
    },
    totalInterest() {
      // 累計興味値を算出
      return this.$calc.totalInterest(this.appealCalcValues, this.abilities);
    },
    templateSelected() {
      return this.selectedAppealTemplate !== "";
    },
    appealFactor() {
      return this.$calc.appealFactor(
        this.unit,
        this.appealCalcValues,
        this.selectedAppealTemplate,
        this.$store.getters.getTemplates
      );
    },
    baseAppeal() {
      const position = this.$calc.appealPosition(
        this.selectedAppealTemplate,
        this.$store.getters.getTemplates,
        this.appealCalcValues
      );
      return this.$calc.baseAppeal(
        position,
        this.unit,
        this.appealFactor,
        this.appealCalcValues,
        this.abilities
      );
    },
    selectedMemory() {
      // 思い出計算が有効な場合 true
      if (this.templateSelected) {
        const index = this.selectedAppealTemplate;
        const template = this.$store.getters.getTemplates[index];
        return template !== undefined && template.type.startsWith("memory");
      }
      return this.appealCalcValues.position === "memory";
    },
    voAppeal() {
      const memoryFactor = this.selectedMemory ? this.calcMemory.unitFactor : 1;
      const appeal = this.$calc.voAppeal(
        this.baseAppeal,
        this.totalInterest,
        memoryFactor
      );
      appeal.label = this.compositeLabel(appeal.vo, appeal.da, appeal.vi);
      return appeal;
    },
    daAppeal() {
      const memoryFactor = this.selectedMemory ? this.calcMemory.unitFactor : 1;
      const appeal = this.$calc.daAppeal(
        this.baseAppeal,
        this.totalInterest,
        memoryFactor
      );
      appeal.label = this.compositeLabel(appeal.vo, appeal.da, appeal.vi);
      return appeal;
    },
    viAppeal() {
      const memoryFactor = this.selectedMemory ? this.calcMemory.unitFactor : 1;
      const appeal = this.$calc.viAppeal(
        this.baseAppeal,
        this.totalInterest,
        memoryFactor
      );
      appeal.label = this.compositeLabel(appeal.vo, appeal.da, appeal.vi);
      return appeal;
    },
    appealEmpty() {
      return { vo: 0, da: 0, vi: 0, total: 0, label: "" };
    },
    voAppendAppeal() {
      return this.calcAppendAppeal(
        this.$calc.voAppeal,
        this.appealCalcValues,
        this.totalInterest,
        this.$calc.getAppendAppealTypePredicate(),
        false
      );
    },
    daAppendAppeal() {
      return this.calcAppendAppeal(
        this.$calc.daAppeal,
        this.appealCalcValues,
        this.totalInterest,
        this.$calc.getAppendAppealTypePredicate(),
        false
      );
    },
    viAppendAppeal() {
      return this.calcAppendAppeal(
        this.$calc.viAppeal,
        this.appealCalcValues,
        this.totalInterest,
        this.$calc.getAppendAppealTypePredicate(),
        false
      );
    },
    showAppendAppeal() {
      const total =
        this.voAppendAppeal.total +
        this.daAppendAppeal.total +
        this.viAppendAppeal.total;
      return total > 0;
    },
    appendBuff() {
      // 追撃によるアピールバフ. LINKにのみ乗る
      const base = () => {
        return { buff: 0, count: { up: 0, down: 0 } };
      };
      const result = {
        valid: false,
        validOther: false,
        vo: base(),
        da: base(),
        vi: base(),
        memory: 0,
        mental: 0,
        attention: 0,
        interest: 1
      };
      if (this.selectedAppealTemplate === "") {
        return result;
      }
      // アピールテンプレートから算出
      const position = this.$calc.appealPosition(
        this.selectedAppealTemplate,
        this.$store.getters.getTemplates,
        this.appealCalcValues
      );
      const index = Number(this.selectedAppealTemplate);
      const selected = this.$store.getters.getTemplates[index];
      if (selected === undefined) {
        return result;
      }
      const buffs = selected.append.filter(ap => ap.type === "buff");

      // バフの合計値を算出
      buffs.forEach(buff => {
        const vo = Number(buff.factor.vo);
        if (vo > 0) {
          result.vo.buff += vo;
          result.vo.count.up += 1;
          result.valid = true;
        } else if (vo < 0) {
          result.vo.buff += vo;
          result.vo.count.down += 1;
          result.valid = true;
        }

        const da = Number(buff.factor.da);
        if (da > 0) {
          result.da.buff += da;
          result.da.count.up += 1;
          result.valid = true;
        } else if (da < 0) {
          result.da.buff += da;
          result.da.count.down += 1;
          result.valid = true;
        }

        const vi = Number(buff.factor.vi);
        if (vi > 0) {
          result.vi.buff += vi;
          result.vi.count.up += 1;
          result.valid = true;
        } else if (vi < 0) {
          result.vi.buff += vi;
          result.vi.count.down += 1;
          result.valid = true;
        }

        const interest = Number(buff.interest);
        if (interest !== 0) {
          result.interest = this.$round(
            result.interest * (1 + interest / 100),
            5
          );
          result.validOther = true;
        }

        const mental = Number(buff.mental);
        if (mental !== 0) {
          if (mental > 0) {
            // メンタル増加は最大値参照
            result.mental = Math.floor(
              this.$calc.unitInfo(this.unit).me * (mental / 100)
            );
          } else {
            // メンタル減少は現在値参照
            result.mental = Math.floor(
              this.appealCalcValues.mental * (mental / 100)
            );
          }
          result.validOther = true;
        }

        const attention = Number(buff.attention);
        if (attention !== 0) {
          result.attention += attention;
          result.validOther = true;
        }

        const memory = Number(buff.memory);
        if (memory !== 0) {
          if (memory > 0) {
            result.memory += this.$round(
              memory * (1 + this.abilities.memoryUp / 100),
              5
            );
          } else {
            // 減少量にはバフはきかない
            result.memory += memory;
          }
          result.validOther = true;
        }
      });
      return result;
    },
    showLinkAppeal() {
      const index = Number(this.selectedAppealTemplate);
      const selected = this.$store.getters.getTemplates[index];
      if (selected === undefined) {
        return false;
      }
      const links = selected.append.filter(ap => ap.type.startsWith("link"));
      return links.length > 0;
    },
    copyWithBuff() {
      const buff = this.appendBuff;
      const maxMental = this.$calc.unitInfo(this.unit).me;
      const copied = this.$deepCopy(this.appealCalcValues);
      const add = (s1, s2) => Number(s1) + Number(s2);
      if (buff.valid) {
        copied.effect.vo = add(copied.effect.vo, buff.vo.buff);
        copied.effect.da = add(copied.effect.da, buff.da.buff);
        copied.effect.vi = add(copied.effect.vi, buff.vi.buff);
        copied.effectCount.up.vo = add(
          copied.effectCount.up.vo,
          buff.vo.count.up
        );
        copied.effectCount.up.da = add(
          copied.effectCount.up.da,
          buff.da.count.up
        );
        copied.effectCount.up.vi = add(
          copied.effectCount.up.vi,
          buff.vi.count.up
        );
        copied.effectCount.down.vo = add(
          copied.effectCount.down.vo,
          buff.vo.count.down
        );
        copied.effectCount.down.da = add(
          copied.effectCount.down.da,
          buff.da.count.down
        );
        copied.effectCount.down.vi = add(
          copied.effectCount.down.vi,
          buff.vi.count.down
        );
        copied.attention = add(copied.attention, buff.attention);
        copied.memory = Math.min(100, Math.max(copied.memory + buff.memory, 0));
        copied.mental = Math.min(
          maxMental,
          Math.max(copied.mental + buff.mental, 1)
        );
      }
      return copied;
    },
    voLinkAppeal() {
      // LINKアピールにはバフを加算する
      const buff = this.appendBuff;
      const interest = this.totalInterest;
      return this.calcAppendAppeal(
        this.$calc.voAppeal,
        this.copyWithBuff,
        {
          vo: this.$round(interest.vo * buff.interest, 5),
          da: this.$round(interest.da * buff.interest, 5),
          vi: this.$round(interest.vi * buff.interest, 5)
        },
        this.$calc.getExtraAppealTypePredicate(),
        false
      );
    },
    daLinkAppeal() {
      const buff = this.appendBuff;
      const interest = this.totalInterest;
      return this.calcAppendAppeal(
        this.$calc.daAppeal,
        this.copyWithBuff,
        {
          vo: this.$round(interest.vo * buff.interest, 5),
          da: this.$round(interest.da * buff.interest, 5),
          vi: this.$round(interest.vi * buff.interest, 5)
        },
        this.$calc.getExtraAppealTypePredicate(),
        false
      );
    },
    viLinkAppeal() {
      const buff = this.appendBuff;
      const interest = this.totalInterest;
      return this.calcAppendAppeal(
        this.$calc.viAppeal,
        this.copyWithBuff,
        {
          vo: this.$round(interest.vo * buff.interest, 5),
          da: this.$round(interest.da * buff.interest, 5),
          vi: this.$round(interest.vi * buff.interest, 5)
        },
        this.$calc.getExtraAppealTypePredicate(),
        false
      );
    },
    totalAppealWithoutLink() {
      // アピール累計 (LINKなし)
      return {
        vo: this.voAppeal.total + this.voAppendAppeal.total,
        da: this.daAppeal.total + this.daAppendAppeal.total,
        vi: this.viAppeal.total + this.viAppendAppeal.total
      };
    },
    totalAppealWithLink() {
      // アピール累計  (LINKあり)
      const withoutLink = this.totalAppealWithoutLink;
      return {
        vo: this.voLinkAppeal.total + withoutLink.vo,
        da: this.daLinkAppeal.total + withoutLink.da,
        vi: this.viLinkAppeal.total + withoutLink.vi
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
        const factor = memory.memoryFactor;
        this.$set(this.appealCalcValues, "factor", factor);
        this.$set(this.appealCalcValues, "memory", 100);
        this.$set(this.appealCalcValues, "action", "1.5");
      }
    },
    templateChoosed() {
      // テンプレートの選択時
      if (this.selectedAppealTemplate === undefined) {
        // 何もない場合は読み込まない
        return;
      }
      const index = Number(this.selectedAppealTemplate);
      const val = this.$store.getters.getTemplates[index];
      if (val === undefined || !val.type.startsWith("memory")) {
        return;
      }
      // 思い出を選択した場合、関連値を自動更新する
      this.$set(this.appealCalcValues, "memory", 100);
      this.$set(this.appealCalcValues, "action", "1.5");
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
      this.$set(this.appealCalcValues, "effectCount", {
        up: { vo: 0, da: 0, vi: 0 },
        down: { vo: 0, da: 0, vi: 0 }
      });
      this.$set(this.appealCalcValues, "passive", { vo: 0, da: 0, vi: 0 });
      this.$set(this.appealCalcValues, "interest", {
        vo: [0, 0, 0, 0, 0],
        da: [0, 0, 0, 0, 0],
        vi: [0, 0, 0, 0, 0]
      });
    },
    loadUnit() {
      // ユニットをロード
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
          interestUp: 0, // 人気者
          interestDown: 0, // ひかえめ
          perfectly: 0, // パーフェクトリィ
          memoryUp: 0 // 思い出UP
        });
      } else {
        const index = Number(this.selectedReadUnitIndex);
        const save = this.$store.getters.load(index);
        if (!save.unit) {
          // ユニット情報がない場合は何もしない
          return;
        }
        this.$set(this, "unit", this.$deepCopy(save.unit));
        this.$set(this, "abilities", this.$deepCopy(save.abilities));
      }
      // メンタル初期化
      this.firstTurn();
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
    },
    gotoTop() {
      // ウインドウを一番上に戻す
      window.scrollTo(0, 0);
    },
    clearAppealTemplateInput() {
      // 入力は初期化
      this.$set(this, "appealTemplateValues", {
        name: "",
        position: "center",
        type: "",
        factor: { vo: 0, da: 0, vi: 0 },
        append: Array(8)
          .fill(0)
          .map(_ => {
            return {
              type: "",
              factor: { vo: 0, da: 0, vi: 0 },
              interest: 0,
              mental: 0,
              attention: 0,
              memory: 0
            };
          })
      });
    },
    addAppealTemplate() {
      // アピールテンプレートを追加
      this.$store.commit("addAppealTemplate", this.appealTemplateValues);
      this.clearAppealTemplateInput();
    },
    loadAppealTemplate() {
      // 選択中のアピールテンプレートを読み込み
      if (this.selectedAppealTemplate === undefined) {
        // 何もない場合は読み込まない
        return;
      }
      const index = Number(this.selectedAppealTemplate);
      const val = this.$deepCopy(this.$store.getters.getTemplates[index]);
      this.$set(this, "appealTemplateValues", val);
    },
    deleteAppealTemplate() {
      // 選択中のアピールテンプレートを削除
      this.$store.commit("deleteAppealTemplate", this.selectedAppealTemplate);
    },
    deleteAllAppealTemplate() {
      // 選択中のアピールテンプレートを削除
      this.$store.commit("deleteAllAppealTemplate");
    },
    changedAppealTemplateValueType() {
      // 倍率変動設定が変化した場合の自動設定
      if (!this.appealTemplateValues.type.startsWith("memory")) {
        return;
      }
      // 思い出の場合のみ自動設定
      const mem = (label => {
        if (label === "memory1") {
          return 0.8;
        }
        if (label === "memory2") {
          return 1.0;
        }
        if (label === "memory3") {
          return 1.2;
        }
        if (label === "memory4") {
          return 1.4;
        }
        if (label === "memory5") {
          return 2.0;
        }
        return 0;
      })(this.appealTemplateValues.type);
      // 値を自動設定
      this.$set(this.appealTemplateValues, "position", "center");
      this.$set(this.appealTemplateValues.factor, "vo", mem);
      this.$set(this.appealTemplateValues.factor, "da", mem);
      this.$set(this.appealTemplateValues.factor, "vi", mem);
    },
    createAppealLabel(factor, type) {
      // アピール倍率のラベル化
      const options = this.appealAppendTemplateTypeOptions.filter(opt => {
        return opt.value === type;
      });
      if (options.length <= 0) {
        return "";
      }
      const token = [];
      if (factor.vo > 0) {
        token.push(`Vo.${factor.vo}倍`);
      }
      if (factor.da > 0) {
        token.push(`Da.${factor.da}倍`);
      }
      if (factor.vi > 0) {
        token.push(`Vi.${factor.vi}倍`);
      }
      const text = token.join("+");
      return `${text} (${options[0].text})`;
    },
    calcAppendAppeal(
      appealFunction,
      appealCalcValues,
      totalInterest,
      typePredicate,
      selectedMemory
    ) {
      // 追撃分の計算
      if (this.selectedAppealTemplate === "") {
        return this.appealEmpty;
      }
      // アピールテンプレートから算出
      const position = this.$calc.appealPosition(
        this.selectedAppealTemplate,
        this.$store.getters.getTemplates,
        this.appealCalcValues
      );
      const index = Number(this.selectedAppealTemplate);
      const selected = this.$store.getters.getTemplates[index];
      if (selected === undefined) {
        return this.appealEmpty;
      }
      const factors = this.$calc.appendAppealFactor(
        this.unit,
        appealCalcValues,
        selected,
        typePredicate
      );
      const memoryFactor = selectedMemory ? this.calcMemory.unitFactor : 1;

      const appeal = factors.map(f => {
        const base = this.$calc.baseAppeal(
          position,
          this.unit,
          f.factor,
          appealCalcValues,
          this.abilities
        );
        const label = this.createAppealLabel(f.factor, f.type);
        const appeal = appealFunction(base, totalInterest, memoryFactor);
        console.log(f.factor);
        console.log(appeal);
        const subtotal = appeal.vo + appeal.da + appeal.vi;
        return { ...appeal, subtotal, label };
      });
      const total = appeal.reduce((prev, current) => {
        return prev + current.vo + current.da + current.vi;
      }, 0);
      const details = appeal.map((ap, idx) => {
        return {
          idx,
          text: this.compositeLabel(ap.vo, ap.da, ap.vi),
          appeal: ap.label
        };
      });
      console.log(details);
      return {
        total,
        details
      };
    }
  }
};
</script>

<style>
.appeal {
  height: 3em;
}

.header {
  min-height: 50px;
}

.cell-col {
  min-height: 42px;
}

.label-input-col {
  min-height: 72px;
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
