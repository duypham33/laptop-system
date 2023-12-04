import "./LaptopTable.css";

const LaptopTable = ({laptops}) => {
    const getProduct = (laptop) => {
        return laptop["Company"] + ", " + laptop["TypeName"] + ", " + laptop["OpSys"];
    }

    const getProperties = (laptop) => {
        return laptop["Ram"] + " RAM, " + laptop["Memory"] + ", " + laptop["Cpu"]
        + ", " + laptop["Gpu"];
    }

    return (
        <table className="laptop-table">
            <tr>
                <th>Product</th>
                <th>Properties</th>
                <th>Resolution</th>
                <th>Price</th>
            </tr>
            {
                laptops.map((laptop, i) => {
                    return <tr key={i}>
                        <td>{getProduct(laptop)}</td>
                        <td>{getProperties(laptop)}</td>
                        <td>{laptop["ScreenResolution"]}</td>
                        <td>${laptop["Price"].toLocaleString()}</td>
                    </tr>
                })
            }
        </table>
    );
}

export default LaptopTable;