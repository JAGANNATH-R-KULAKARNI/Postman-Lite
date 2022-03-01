var data = { a: 1, b: 2 };

const PrettyPrintJson = (props) => {
  return (
    <div style={{ overflow: "scroll", maxHeight: "500px", minHeight: "430px" }}>
      <pre>{JSON.stringify(props.info ? props.info["data"] : {}, null, 2)}</pre>
    </div>
  );
};

export default PrettyPrintJson;
