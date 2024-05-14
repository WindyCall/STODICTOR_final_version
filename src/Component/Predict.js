import { Link } from "react-router-dom";
import { useState } from "react";
import { css } from "@emotion/react";
import RingLoader from "react-spinners/RingLoader";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import { LegendToggleRounded } from "@mui/icons-material";
import { IoLogoWordpress } from "react-icons/io";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Predict(props) {
  const { records, categories, items, setCntArray, onHandlePredicting } = props;

  const [loading, setLoading] = useState(false);

  const [idArray, setIdArray] = useState([]);

  function predict_one_object(x_train, y_train) {
    const inputs = x_train;

    const labels = y_train;

    const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
    const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

    //normalization
    const inputMin = inputTensor.min();
    const inputMax = inputTensor.max();
    const labelMin = labelTensor.min();
    const labelMax = labelTensor.max();
    const nmInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
    const nmLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));

    //build model
    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [1], units: 1, useBias: false }));
    model.add(tf.layers.dense({ units: 1, useBias: false }));

    function trainModel(model, inputs, labels) {
      // Prepare the model for training.
      model.compile({
        optimizer: tf.train.adam(),
        loss: tf.losses.meanSquaredError,
        metrics: ["mse"]
      });

      const batchSize = 32;
      const epochs = 100;

      return model.fit(inputs, labels, {
        batchSize,
        epochs,
        shuffle: false
      });
    }

    trainModel(model, nmInputs, nmLabels);

    const xs = tf.linspace(0, 0, 1);
    const preds = model.predict(xs.reshape([1, 1]));

    const unNormPreds = preds.mul(labelMax.sub(labelMin)).add(labelMin);

    return Array.from(unNormPreds.dataSync())[0];
  }

  function init() {
    const idss = items.map((item) => item.Id);
    const results = [];

    function groupBy(objectArray, property) {
      return objectArray.reduce((acc, obj) => {
        if (!acc[obj[property]]) {
          acc[obj[property]] = [];
        }
        acc[obj[property]].push(obj);
        return acc;
      }, {});
    }

    let output_object = groupBy(records, "Id");

    for (let i = 0; i < items.length; i++) {
      if (output_object[idss[i]] != undefined) {
        let train_x = [];
        let train_y = [];

        for (let j = 0; j < output_object[idss[i]].length; j++) {
          let d1 = new Date(output_object[idss[i]][j].date);
          let d2 = new Date();

          train_x[j] = Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
          train_y[j] = output_object[idss[i]][j].cnt;
        }

        results[i] = predict_one_object(train_x, train_y);
      } else {
        results[i] = 0;
      }
    }

    setIdArray(idss);
    onHandlePredicting(results);
  }

  function startPredicting() {
    setLoading(true);
    init();
    // only to show the effect of loading
    setTimeout(continueExecution, 1000);
    function continueExecution() {
      setLoading(false);
    }
  }

  function getPage() {
    if (loading)
      return (
        <div>
          <RingLoader
            color="#2D7465"
            loading={true}
            css={override}
            size={200}
          />
          <h3 className="WaitForCalcuation"> Please wait for calcuation </h3>
        </div>
      );
    else
      return (
        <div>
          <Link to="/">
            <Button
              variant="outlined"
              style={{ marginLeft: -20, width: 200, marginTop: 10 }}
            >
              {" "}
              Back to DashBoard{" "}
            </Button>
          </Link>
          <h1 className="Predict"> Predict </h1>
          <br />
          <br />
          <Stack spacing={10}>
            <Button
              variant="contained"
              style={{
                marginLeft: 260,
                width: 600,
                height: 60,
                fontSize: 28,
                backgroundColor: "chocolate"
              }}
              onClick={startPredicting}
            >
              {" "}
              Start predicting{" "}
            </Button>
            <Link to="/predict/result">
              <Button
                variant="outlined"
                style={{
                  marginLeft: 260,
                  width: 600,
                  height: 60,
                  fontSize: 28,
                  backgroundColor: "purple",
                  color: "white"
                }}
              >
                View last result
              </Button>
            </Link>
          </Stack>
        </div>
      );
  }

  return <div className="MainpageBox">{getPage()}</div>;
}

export default Predict;
