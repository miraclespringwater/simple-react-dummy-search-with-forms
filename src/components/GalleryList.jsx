import GalleryShow from "./GalleryShow";

const GalleryList = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <GalleryShow key={item.id} item={item} />
      ))}
    </div>
  );
};

export default GalleryList;
