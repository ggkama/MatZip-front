import ImageUploader from "../util/ImageUploader";

const ImageSection = ({
  images,
  setImages,
  setError,
  deletedImagePaths,
  setDeletedImagePaths,
  initialImages,
  changedImages,
  setChangedImages,
  isEdit,
}) => (
  <ImageUploader
    isEdit={isEdit}
    images={images}
    setImages={setImages}
    setError={setError}
    deletedImagePaths={deletedImagePaths}
    setDeletedImagePaths={setDeletedImagePaths}
    initialImages={initialImages}
    changedImages={changedImages}
    setChangedImages={setChangedImages}
  />
);

export default ImageSection;
