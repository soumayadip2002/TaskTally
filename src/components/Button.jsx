const Button = ({ action }) => {
  return (
    <button className="bg-[#713ABE] py-2 px-5 mt-5 capitalize rounded-sm hover:bg-[#B15EFF] transition-all delay-75">
      {action}
    </button>
  );
};

export default Button;
