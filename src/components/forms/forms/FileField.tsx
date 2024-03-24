const FileInput = ({ field, form }: { field: any, form: any }) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        //@ts-ignore
        form.setFieldValue(field.name, event.currentTarget.files[0]);
    };

    return <input type="file" id={field.name} name={field.name} onChange={handleChange} />;
};


export default FileInput;