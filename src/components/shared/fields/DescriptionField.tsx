import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import "./styles.scss";
//@ts-ignore
const DescriptionField = ({ field, form }) => {
  return (
    <div className="myEditor">
      <CKEditor
        editor={ClassicEditor}
        data={field.value}
        onReady={(editor) => {
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(_, editor) => {
          const data = editor.getData();
          form.setFieldValue(field.name, data);
        }}
      />
    </div>
  );
};

export default DescriptionField;