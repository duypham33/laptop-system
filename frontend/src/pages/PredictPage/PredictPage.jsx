import { useRef, useState } from "react";
import { companyOpts, cpuOpts, diskOpts, gpuOpts, initData, osOpts, ramOpts, typenameOpts } from "../../constants/optConstants";
import "./PredictPage.css";
import Selection from "../../components/Selection/Selection";
import axios from "axios";
import LaptopTable from "../../components/LaptopTable/LaptopTable";

const PredictPage = () => {
  const dataRef = useRef(initData);
  const [range, setRange] = useState(null);
  const [laptops, setLaptops] = useState([]);

  const parseNumber = (field) => {
    if(dataRef.current[field] === null) return;
    dataRef.current[field] = parseInt(dataRef.current[field]);
  }
  
  const onSubmit = () => {
    Object.keys(dataRef.current).forEach(key => {
      if(dataRef.current[key] === ''){
        dataRef.current[key] = null;
      }
    });

    parseNumber("ram");
    parseNumber("disk");

    axios.post('http://localhost:5000/predict', dataRef.current)
    .then(res => {
      setRange({
        min: res.data.min,
        max: res.data.max
      });

      setLaptops(res.data.relevants);
    });
  }

  return (
    <div className="predict-page">
      <span>Please, select <span className="notice">AT LEAST </span> 
      one of the following options: 
        Operating System, RAM, DISK, CPU, and GPU
      </span>

      <Selection title={"Company"} initVal={dataRef.current.company}
      opts={companyOpts} onChange={(val) => dataRef.current.company = val} />

    <Selection title={"Type"} initVal={dataRef.current.typename}
      opts={typenameOpts} onChange={(val) => dataRef.current.typename = val} />

    <Selection title={"Operating System"} initVal={dataRef.current.os}
      opts={osOpts} onChange={(val) => dataRef.current.os = val} />

    <Selection title={"RAM (GB)"} initVal={dataRef.current.ram}
      opts={ramOpts} onChange={(val) => dataRef.current.ram = val} />

    <Selection title={"Disk (GB)"} initVal={dataRef.current.disk}
      opts={diskOpts} onChange={(val) => dataRef.current.disk = val} />

    <Selection title={"CPU"} initVal={dataRef.current.cpu}
      opts={cpuOpts} onChange={(val) => dataRef.current.cpu = val} />

    <Selection title={"GPU"} initVal={dataRef.current.gpu}
      opts={gpuOpts} onChange={(val) => dataRef.current.gpu = val} />
    
    <button onClick={onSubmit}>Submit</button>
    

    {
      range !== null && <span className="result">
          <b>Predicted Price Range:</b> ${range.min.toLocaleString()} to ${range.max.toLocaleString()}
      </span>
    }
    
    <br></br>
    
    {
      laptops.length > 0 && <>
        <span className="relevant-title">Relevant Laptops</span>
        <LaptopTable laptops={laptops} />
      </>
    }
    </div>
  );
}

export default PredictPage;