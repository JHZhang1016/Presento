import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import flourite from 'flourite';

const Code = ({ content }) => {
  const code = content.codeContent ? content.codeContent : '';
  const fontsizeStyle = content.fontSize ? content.fontSize : '1';
  const language = flourite(code).language.toLowerCase();

  return (
    <>
      <SyntaxHighlighter language={language}
        customStyle={{ fontSize: `${fontsizeStyle}em`, overflowX: 'auto', overflowY: 'scroll', weight: '100%', height: '100%', margin: '0' }
        }
        showLineNumbers
        wrapLongLines={true}
      >
        {code}
      </SyntaxHighlighter>
    </>
  );
};

export default Code;