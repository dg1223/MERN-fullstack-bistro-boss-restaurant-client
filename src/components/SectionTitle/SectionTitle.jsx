const SectionTitle = ({ header, subHeader }) => {
  return (
    <div className="w-3/12 mx-auto text-center my-8">
      {" "}
      {/* md:w-3/12 */}
      <h3 className="text-yellow-600">---{subHeader}---</h3>
      <p className="text-4xl uppercase border-y-4 py-4 mb-2">{header}</p>
    </div>
  );
};

export default SectionTitle;
