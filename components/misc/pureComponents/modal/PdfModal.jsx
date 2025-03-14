import React from "react";
import {IoMdClose} from 'react-icons/io'

export default function PdfModal({ pdfModal, setPdfModal, pdf, setPdf }) {
  return (
    <div className="confirmation_box">
      {/* pdf modal full screen  */}
      {pdfModal && (
        <div className="pdfModalFullScreenWapper">
          <IoMdClose
            className="pdf-close cursor-pointer"
            onClick={() => {
              setPdfModal(false);
              setPdf({});
            }}
          />
          {pdf.pdfUrl ? (
            // <Viewer fileUrl={pdf.pdfUrl}  workerUrl="node_modules/pdfjs-dist/build/pdf.worker.js" />
            <object
              className="no-scrollbar"
              data={pdf.pdfUrl}
              type="application/pdf"
              width="100%"
              height="100%"
            />
          ) : (
            <div>
              <div className="pdf-loader">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
