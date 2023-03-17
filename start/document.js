/*jshint esversion: 6 */
import dynamic from 'next/dynamic';
const DocumentModule = dynamic(()=>import('/start/documentModule'),{ssr:false});

const DocumentResult = ({children}) => {
    return(
        <>
            <DocumentModule />
            <div className="result">{children}</div>
        </>
    );
}

export default DocumentResult;