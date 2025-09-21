const PayButton = ({ props, href }) => (
  <a href={href} target="_blank" rel="noreferrer">
    <button className="bg-primary-500 rounded-md px-4 py-2 font-medium text-white sm:py-0">
      {props}
    </button>
  </a>
)

export default PayButton
