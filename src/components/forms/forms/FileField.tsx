const FileInput = ({ field, form }) => {

    const handleChange = (event) => {
        form.setFieldValue(field.name, event.currentTarget.files[0]);
    };

    return <input type="file" id={field.name} name={field.name} onChange={handleChange} />;
};

export default FileInput;