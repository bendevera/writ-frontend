import React from 'react';

const TextAnalysis = (props) => {
    var sentimentSection;
    if (props.sentiment) {
        let barWidth = Math.floor(props.sentiment.confidence * 100).toString() + "%"
        if (props.sentiment.class == "positive") {
            sentimentSection = (
                <div className="progress">
                    <div className="progress-bar progress-bar-striped bg-success" style={{width: barWidth}}>sentiment analysis</div>
                </div>
            )
        } else {
            sentimentSection = (
                <div className="progress">
                    <div className="progress-bar progress-bar-striped bg-danger" style={{width: barWidth}}>sentiment analysis</div>
                </div>
            )
        }
    } else {
        sentimentSection = (
            <div></div>
        )
    }
    if (props.removed) {
        return (
            <div>
                {sentimentSection}
                <div style={{display: "inline-block"}} className="version-analysis bg-light">

                    {props.data.map((item, index) => {
                        let value = item.value.replace(/(?:\r\n|\r|\n)/g, '<br>');
                        if (item.removed) {
                            return (
                                <mark key={index} style={{
                                    backgroundColor: "#fcb3b1",
                                    color: "black"
                                    }}
                                    dangerouslySetInnerHTML={{__html: value}}
                                    />
                            )
                        } else {
                            return (
                                <mark key={index} style={{
                                    color: "black"
                                    }}
                                    className="bg-light"
                                    dangerouslySetInnerHTML={{__html: value}}
                                    />
                            )
                        }
                    })}
                </div>
            </div>
        )
    } else {
        return (
            <div>
                {sentimentSection}
                <div style={{display: "inline-block"}} className="version-analysis bg-light">
                    {props.data.map((item, index) => {
                        let value = item.value.replace(/(?:\r\n|\r|\n)/g, '<br>');
                        if (item.added) {
                            return (
                                <mark key={index} style={{
                                    backgroundColor: "#b0ffc5",
                                    color: "black"
                                    }}
                                    dangerouslySetInnerHTML={{__html: value}}
                                    />
                            )
                        } else {
                            return (
                                <mark key={index} style={{
                                    color: "black"
                                    }}
                                    className="bg-light"
                                    dangerouslySetInnerHTML={{__html: value}}
                                    />
                            )
                        }
                    })}
                </div>
            </div>
        )
    }
}

export default TextAnalysis;