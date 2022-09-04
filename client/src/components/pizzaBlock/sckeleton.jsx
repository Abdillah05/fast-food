import React from "react"
import ContentLoader from "react-content-loader"

const Sckeleton = (props) => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={400}
        height={500}
        viewBox="0 0 500 600"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="134" cy="144" r="125" />
        <rect x="-2" y="319" rx="10" ry="10" width="280" height="32" />
        <rect x="-2" y="368" rx="10" ry="10" width="280" height="88" />
        <rect x="-2" y="470" rx="10" ry="10" width="95" height="30" />
        <rect x="123" y="473" rx="25" ry="25" width="152" height="45" />
    </ContentLoader>
)

export default Sckeleton