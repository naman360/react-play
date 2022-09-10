import { useEffect, useRef } from "react";

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
    iframeRef.current.contentWindow?.postMessage(code, "*");
  }, [code]);

  return <iframe ref={iframeRef} srcDoc={html} sandbox="allow-scripts" />;
};
