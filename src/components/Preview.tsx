import { useEffect, useRef } from "react";
import "../css/preview.css";

interface PreviewProps {
  code: string;
  err: string;
}

const html = `
<html>
  <head></head>
  <body>
    <div id="root"></div>
    <script>
      const handleError = (err) => {
        const root = document.getElementById("root");
        root.innerHTML = '<div style="color:red;">' + err + '</div>';
        console.error(err);
      };

      document.write = function(content) {
        const root = document.getElementById("root");
        if (root) {
          root.innerHTML += content;
        }
      }

      window.addEventListener("error", (event) => {
        event.preventDefault();
        handleError(event.error);
      });

      window.addEventListener("message", (event) => {
        try {
          eval(event.data);
        } catch (err) {
          handleError(err);
        }
      }, false);
    </script>
  </body>
</html>
`;

export const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    // iframeRef.current.srcdoc = html;
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
        sandbox="allow-scripts allow-forms"
      />
      {err && <div className="preview-error">{err}</div>}
    </div>
  );
};
