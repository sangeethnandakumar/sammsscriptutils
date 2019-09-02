import React, {Component} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

class CodeBlock extends Component {
    render() {
        return (
            <SyntaxHighlighter language={this.props.lang} style={dracula} className={"codeblock"}>
                {this.props.code}
            </SyntaxHighlighter>
        );
    }
};

export default CodeBlock;