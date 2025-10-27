//入力
a = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
];

//正解の値
b = [
    [0],
    [1],
    [1],
    [0]
];

//隠れ層計算の結果(ニューロン2個)
let result_h1 = [];
let result_h2 = [];

//出力層の結果
let output_result = [];

//重み・バイアス
w1 = Math.random() * 2 - 1;
w2 = Math.random() * 2 - 1;
w3 = Math.random() * 2 - 1;
w4 = Math.random() * 2 - 1;
w_output1 = Math.random() * 2 - 1;
w_output2 = Math.random() * 2 - 1;
bias1 = Math.random() * 2 - 1;
bias2 = Math.random() * 2 - 1;
bias_output = Math.random() * 2 - 1;

//隠れ層
function hide() {
    for (let i = 0; i < a.length; i++) {
        //ニューロン1
        let x1 = a[i][0] * w1 + a[i][1] * w2 + bias1;
        result_h1.push(sigmoid(x1));
        //ニューロン2
        let x2 = a[i][0] * w3 + a[i][1] * w4 + bias2;
        result_h2.push(sigmoid(x2));
    }
}

//シグモイド関数
function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

//出力層
function output() {
    for (let i = 0; i < a.length; i++) {
        let x = result_h1[i] * w_output1 + result_h2[i] * w_output2 + bias_output;
        output_result.push(sigmoid(x));
    }
}

//誤差
let errors = [];

function marginOfError() {
    for (let i = 0; i < b.length; i++) {
        errors.push(b[i][0] - output_result[i]);
    }
}

let lr = 0.5;

//重み・バイアス更新
function update() {
    for (let i = 0; i < errors.length; i++) {
        let w_o1 = w_output1;
        let w_o2 = w_output2;

        let gradient = errors[i] * (output_result[i] * (1 - output_result[i]));

        w_output1 = w_output1 + lr * gradient * result_h1[i];

        w_output2 = w_output2 + lr * gradient * result_h2[i];

        bias_output = bias_output + lr * gradient;

        let hide1_error = gradient * w_o1;
        let hide1_gradient = hide1_error * (result_h1[i] * (1 - result_h1[i]));
        w1 = w1 + lr * hide1_gradient * a[i][0];
        w2 = w2 + lr * hide1_gradient * a[i][1];


        let hide2_error = gradient * w_o2;
        let hide2_gradient = hide2_error * (result_h2[i] * (1 - result_h2[i]));
        w3 = w3 + lr * hide2_gradient * a[i][0];
        w4 = w4 + lr * hide2_gradient * a[i][1];

        bias1 = bias1 + lr * hide1_gradient;
        bias2 = bias2 + lr * hide2_gradient;
    }
}

//画面表示用
const text = document.getElementById('text');
//ループ用
let count = 0;

//学習(epochループ)
function epochLoop() {
    count++;
    //配列の初期化
    result_h1 = [];
    result_h2 = [];
    output_result = [];
    errors = [];

    hide();
    output();
    marginOfError();
    update();

    if (count % 5 === 0) {
        text.innerHTML = "Epoch: " + count + "<br>"
            + "Output_result: " + output_result.join(", ") + "<br>"
            + "Errors: " + errors.join(", ");
    }
    if (count <= 5000) {
        requestAnimationFrame(epochLoop);
    }
}
epochLoop();
