import * as React from "react"

function Cross(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={13.828}
      height={13.828}
      viewBox="0 0 13.828 13.828"
      {...props}
      cursor='pointer'
    >
      <defs>
        <style>
          {
            ".prefix__a{fill:none;stroke:red;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}"
          }
        </style>
      </defs>
      <path className="prefix__a" d="M1.414 1.414l11 11M1.414 12.414l11-11" />
    </svg>
  )
}

export default Cross
