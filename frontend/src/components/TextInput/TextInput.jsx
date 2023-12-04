import './TextInput.css';

const TextInput= ({initVal, placeholder, onChange, onSubmit}) => {
    return (
        <input className="my-input" placeholder={placeholder}
        defaultValue={initVal}
        onChange={(evt) => onChange(evt.target.value)}
        onKeyDown={(evt) => {
            if(evt.key === "Enter") onSubmit();
        }} />
    );
}

export default TextInput;