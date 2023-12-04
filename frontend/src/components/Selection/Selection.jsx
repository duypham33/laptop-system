import './Selection.css';

const Selection = ({title, initVal, opts, onChange}) => {
    return (
        <div className="my-selection">
            <span>{title}</span>
            <select defaultValue={initVal}
            onChange={(evt) => onChange(evt.target.value)}>
                {
                    opts.map((opt, i) => {
                        return <option key={i} value={opt}>{opt}</option>
                    })
                }
            </select>
        </div>
    );
}

export default Selection;