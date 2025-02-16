const HeadingDescription = (props) => {
  return (
    <div className="pt-6">
      <h2 className="text-xl font-semibold">
        {props?.index} {props.heading}
      </h2>
      <p>{props.description}</p>
    </div>
  );
};

export default HeadingDescription;
