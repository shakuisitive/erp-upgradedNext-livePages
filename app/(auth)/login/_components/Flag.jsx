import React from "react";

export default function Flag({ flagSrc, btnText }) {
  return (
    <li>
      <figure className="flag">
        <img src={flagSrc} alt="Country Flag" loading="lazy" />
      </figure>
      <button type="button" className="btn rounded-pill px-4 py-2 cta-btn">
        {btnText}
      </button>
    </li>
  );
}
