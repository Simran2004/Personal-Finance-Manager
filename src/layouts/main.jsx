// rrd imports
import { Outlet, useLoaderData } from "react-router-dom";

//assets
import wave from "../assets/wave.svg";

//helper function
import { fetchData } from "../helpers";

//components
import Nav from "../components/Nav";
import { useState } from "react";

import features from "../features.css"

//loader function
export function mainLoader()
{
    const userName=fetchData("userName");
    return { userName }
}


const Main = () => {
   const {userName} = useLoaderData()
  return (
  
    <div className="layout">
      <Nav userName={userName}/>
      <main>
     <Outlet/>
     </main>
     <Operations/>
     <img src={wave} alt="" />
    </div>   
  )
}






function Operations() {
  return (
    <>
      <div className="operations">
        <div className="operationsContainer">
          <h5 className="operationHeading">FEATURES</h5>
          <h4 className="operationsPara">
            Reviewing Transactions, Monitoring Your Spending and tracking your
            net worth
          </h4>
          <Operationsfunc />
        </div>
      </div>
    </>
  );
}

function Operationsfunc() {
  const [feature, setFeature] = useState(1);

  return (
    <>
      <div className="operationsFeatures">
        <div className="featuresButtons">
          <button
            className={`btn ${feature == 1 ? "activebtn" : ""}`}
            onClick={() => setFeature(1)}
          >
            01. Tracking
          </button>
          <button
            className={`btn ${feature == 2 ? "activebtn" : ""}`}
            onClick={() => setFeature(2)}
          >
            02. Managing
          </button>
          <button
            className={`btn ${feature == 3 ? "activebtn" : ""}`}
            onClick={() => setFeature(3)}
          >
            03. Categorization
          </button>
        </div>
        <Conditionfeature value={feature} />
      </div>
    </>
  );
}

function Conditionfeature(props) {
  if (props.value == 1) {
    return (
      <>
        <Btnsdesc
          contentHeading="◉ Track your monthly spending and more."
          contentdesc="Review your transactions, track your spending by category and receive
          monthly insights that help you better understand your money habits."
        />
      </>
    );
  } else if (props.value == 3) {
    return (
      <>
        <Btnsdesc
          contentHeading="◉ Automatically categorize your transactions."
          contentdesc="By automatically categorizing every transaction, our app provides you an in-depth analysis of your spending habits, allowing you to effortlessly track where your money is going."
        />
      </>
    );
  } else {
    return (
      <>
        <Btnsdesc
          contentHeading="◉ Manage Your Finances Anytime, Effortlessly."
          contentdesc="Your finance manager app offers a comprehensive suite of tools to help you take control of your finances. From effortless expense tracking to timely bill reminders."
        />
      </>
    );
  }
}

function Btnsdesc(props) {
  return (
    <>
      <div className="btndesc">
        <h2 className="btnHeading">{props.contentHeading} </h2>
        <p className="btnPara">{props.contentdesc}</p>
      </div>
    </>
  );
}
export default Main