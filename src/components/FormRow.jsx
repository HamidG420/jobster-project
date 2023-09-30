const FormRow = ({ type, name, value, changeHandler, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={changeHandler}
        className="form-input"
      />
    </div>
  );
};
export default FormRow;
