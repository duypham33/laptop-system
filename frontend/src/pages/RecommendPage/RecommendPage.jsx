import { useRef, useState } from "react";
import "./RecommendPage.css";
import TextInput from "../../components/TextInput/TextInput";
import LaptopTable from "../../components/LaptopTable/LaptopTable";
import axios from "axios";

const RecommendPage = () => {
    const kwRef = useRef('');
    const [laptops, setLaptops] = useState([]);

    const onSubmit = () => {
        const description = kwRef.current.trim();
        if(description === '') return;
        
        axios.post('http://localhost:5000/recommend', {description})
        .then(res => setLaptops(res.data));
    }

    return (
        <div className="recommend-page">
            <TextInput initVal={kwRef.current} placeholder={"Search by any"}
            onChange={(val) => kwRef.current = val} onSubmit={onSubmit} />

            <LaptopTable laptops={laptops} />
        </div>
    )
}

export default RecommendPage;