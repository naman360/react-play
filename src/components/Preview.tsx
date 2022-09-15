import { useEffect, useRef } from "react";
import "./preview.css";
interface PreviewProps {
  code: string;
}

let html = `
<html>
  <head></head>
  <body>
    <div id="root"></div>
    <script>
      window.addEventListener('message', (event) => {
        eval(event.data);
      },false);
    </script>
  </body>
</html>
`;

export const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    iframeRef.current.srcdoc = html;
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        style={{ backgroundColor: "white" }}
        title="preview-code"
        ref={iframeRef}
        srcDoc={html}
        sandbox="allow-scripts"
      />
    </div>
  );
};
