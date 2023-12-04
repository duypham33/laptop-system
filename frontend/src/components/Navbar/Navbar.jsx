import "./Navbar.css";

const Navbar = ({val, onChange}) => {
    return (
        <div className="top-navbar">
            <span className={val === 0 ? 'active' : ''}
            onClick={() => onChange(0)}>Search</span>
            <span className={val === 1 ? 'active' : ''}
            onClick={() => onChange(1)}>Predict price</span>
        </div>
    );
}

export default Navbar;