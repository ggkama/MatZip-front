import ImageUploader from "../util/ImageUploader";

const ImageSection = ({
  images,
  setImages,
  setError,
  deletedImagePaths,
  setDeletedImagePaths,
  initialImages,
}) => (
  <ImageUploader
    images={images}
    setImages={setImages}
    setError={setError}
    deletedImagePaths={deletedImagePaths}
    setDeletedImagePaths={setDeletedImagePaths}
    initialImages={initialImages}
  />
);

export default ImageSection;
