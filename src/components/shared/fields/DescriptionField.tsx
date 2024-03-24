import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import "./styles.scss";

const DescriptionField = ({ field, form }) => {
  return (
    <div className="myEditor">
      <CKEditor
        editor={ClassicEditor}
        data={field.value}
        onReady={(editor) => {
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          form.setFieldValue(field.name, data);
        }}
      />
    </div>
  );
};

export default DescriptionField;