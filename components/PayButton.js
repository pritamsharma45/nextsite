const PayButton = ({ props, href }) => (
  <a href={href} target="_blank" rel="noreferrer">
    <button className="rounded-md bg-primary-500 py-2 px-4 font-medium text-white sm:py-0">
      {props}
    </button>
  </a>
)

export default PayButton
