import "./style.css";
function Index({ name, onclick, type }) {
  return (
    <div>
      <button type={type} className="GeneralButton" onClick={onclick}>
        {name}
      </button>
    </div>
  );
}

export default Index;
