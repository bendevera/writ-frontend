import React from 'react';
import history from '../../history';
import { diffChars } from 'diff';
import TextAnalysis from './TextAnalysis';
import ButtonBar from './ButtonBar';
import { getSentiment } from '../../util';
import './Work.css';


class Work extends React.Component {
    constructor(props) {
        super(props)
        let versionData = this.props.versions.sort((a, b) => (a.number > b.number) ? 1 : -1)
        this.state = {
            title: this.props.title,
            versions: versionData,
            workId: this.props.workId,
            mode: 'Single',
            text: this.props.text,
            currNum: this.props.currNum,
            texts: {
                one: this.props.texts.one,
                two: this.props.texts.two
            },
            currNums: {
                one: this.props.currNums.one,
                two: this.props.currNums.two
            },
            showAnalysis: false,
            diffChars: [],
            diffAdded: [],
            diffRemoved: [],
            sentiments: {
                one: null,
                two: null
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("Receiving props")
        console.log(nextProps)
        if (nextProps.text != this.props.text || nextProps.versions.length > this.props.versions.length) {
            console.log("Setting...")
            // var newVersions = nextProps.versions 
            // newVersions.map((item) => {
            //     if (item.number == nextProps.)
            // })
            this.setState({
                workId: nextProps.workId,
                title: nextProps.title,
                text: nextProps.text,
                currNum: nextProps.currNum,
                versions: nextProps.versions
            })
        }
        if (nextProps.workId == null) {
            console.log("HAVE NULL workID")
            history.push('/works')
        }
    }

    componentDidMount() {
        this.state.versions.map(item => {
            if (item.number == 1) {
                this.setState({
                    text: item.text
                })
            }
        })
    }

    handleChange = (e) => {
        const value = e.target.value;
        if (e.target.name == "text") {
            let newVersions = this.state.versions
            this.state.versions.map((item, index) => {
                if (item.number == this.state.currNum) {
                    newVersions[index].text = value
                    newVersions[index].unsavedChanges = true
                }
            })
            this.setState({
                ...this.state,
                [e.target.name]: value,
                versions: newVersions
            })
        } else {
            this.setState({
                ...this.state,
                [e.target.name]: value
            })
        }
    }

    handleTextsChange = (e) => {
        const value = e.target.value;
        let newTexts = this.state.texts;
        let newVersions = this.state.versions
        if (e.target.name == "text-one") {
            this.state.versions.map((item, index) => {
                if (item.number == this.state.currNums.one) {
                    newVersions[index].text = value
                    newVersions[index].unsavedChanges = true
                }
            })
            newTexts.one = value;
        } else {
            this.state.versions.map((item, index) => {
                if (item.number == this.state.currNums.two) {
                    newVersions[index].text = value
                    newVersions[index].unsavedChanges = true
                }
            })
            newTexts.two = value;
        }
        this.setState({
            texts: newTexts,
            versions: newVersions
        })
    }

    getAnalysis = () => {
        this.getSentiment(this.state.texts.one, 1)
        this.getSentiment(this.state.texts.two, 2)
        let colorCodes = diffChars(this.state.texts.one, this.state.texts.two)
        console.log("DIFF CHARS")
        console.log(colorCodes)
        let diffAdded = []
        let diffRemoved = []
        colorCodes.map(item => {
            if (item.added) {
                diffAdded.push(item)
            } else if (item.removed) {
                diffRemoved.push(item)
            } else {
                diffAdded.push(item)
                diffRemoved.push(item)
            }
        })
        this.setState({
            showAnalysis: true,
            diffChars: colorCodes,
            diffAdded: diffAdded,
            diffRemoved: diffRemoved
        })
    }

    hideAnalysis = () => {
        this.setState({
            showAnalysis: false
        })
    }

    getSentiment = (text, num) => {
        console.log("Getting sentiment for: "+text)
        getSentiment(text)
        .then(result => {
            console.log(result)
            let newSentiments = this.state.sentiments
            if (num == 1) {
                newSentiments.one = result
            } else {
                newSentiments.two = result 
            }
            this.setState({
                sentiments: newSentiments
            })
        })
    }

    versionChange = (e) => {
        var currValue = e.target.getAttribute("value");
        this.state.versions.map((item) => {
            if (item.number == currValue) {
                if (this.state.mode === 'Comparison') {
                    let newNums = this.state.currNums 
                    newNums.two = newNums.one 
                    newNums.one = item.number 
                    let newTexts = this.state.texts 
                    newTexts.two = newTexts.one 
                    newTexts.one = item.text 
                    this.setState({
                        currNums: newNums,
                        texts: newTexts
                    })
                } else {
                    this.setState({
                        currNum: item.number,
                        text: item.text
                    })
                }
            }
        })
    }

    handleSave = (e) => {
        let newVersions = this.state.versions
        if (this.state.mode === 'Comparison') {
            const dataOne = {
                workId: this.state.workId,
                title: this.state.title,
                text: this.state.texts.one,
                number: this.state.currNums.one
            }
            this.props.sendSave(dataOne)
            const dataTwo = {
                workId: this.state.workId,
                title: this.state.title,
                text: this.state.texts.two,
                number: this.state.currNums.two
            }
            this.props.sendSave(dataTwo)
            this.state.versions.map((item, index) => {
                if (item.number == this.state.currNums.one || item.number == this.state.currNums.two) {
                    newVersions[index].unsavedChanges = false
                }
            })
            this.setState({
                versions: newVersions
            })
        } else {
            const data = {
                workId: this.state.workId,
                title: this.state.title,
                text: this.state.text,
                number: this.state.currNum
            }
            this.props.sendSave(data)
            this.state.versions.map((item, index) => {
                if (item.number == this.state.currNum) {
                    newVersions[index].unsavedChanges = false
                }
            })
            this.setState({
                versions: newVersions
            })
        }
    }

    handleNew = (e) => {
        this.props.createVersion(this.state.workId, this.state.currNum)
    }

    handleDelete = (e) => {
        if (this.state.versions.length == 1) {
            alert("Can't delete the last version of a Work.")
        } else {
            this.props.removeVersion(this.state.workId, this.state.currNum)
            var newVersions = this.state.versions
            var spliceNum = 0
            for (var i=0;i<newVersions.length;i++) {
                if (newVersions[i].number == this.state.currNum) {
                    spliceNum = i
                } else {
                    if (newVersions[i].number > this.state.currNum) {
                        newVersions[i].number = newVersions[i].number - 1
                    }
                }
            }
            newVersions.splice(spliceNum, 1)
            this.setState({
                versions: newVersions,
                text: newVersions[0].text,
                currNum: newVersions[0].number
            })
        }
    }

    changeMode = (e) => {
        const newMode = this.state.mode === 'Single' ? 'Comparison' : 'Single';
        if (newMode === 'Comparison') {
            let newTexts = {}
            this.state.versions.map(item => {
                if (item.number == this.state.currNums.one) {
                    newTexts.one = item.text
                } else if (item.number == this.state.currNums.two) {
                    newTexts.two = item.text
                }
            })
            this.setState({
                mode: newMode,
                texts: newTexts
            })
        } else {
            let newText = ''
            this.state.versions.map(item => {
                if (item.number == this.state.currNum) {
                    newText = item.text
                }
            })
            this.setState({
                mode: newMode,
                text: newText
            })
        }
    }

    render() {
        if (this.state.mode == 'Single') {
            return (
                <div className="container my-2">
                    <ButtonBar
                        versions={this.state.versions}
                        mode={this.state.mode}
                        changeMode={this.changeMode}
                        versionChange={this.versionChange}
                        handleDelete={this.handleDelete}
                        handleSave={this.handleSave}
                        handleNew={this.handleNew}
                        currNum={this.state.currNum}
                        currNums={this.state.currNums}
                        hideAnalysis={this.hideAnalysis}
                        getAnalysis={this.getAnalysis}
                        showAnalysis={this.state.showAnalysis} />
                    <input 
                        name="title" 
                        value={this.state.title} 
                        className="version-title" 
                        onChange={this.handleChange} />
                    <textarea 
                        name="text" 
                        className="version-text bg-light" 
                        value={this.state.text}
                        onChange={this.handleChange}></textarea>
                </div>
            )
        } else {
            if (this.state.showAnalysis) {
                return (
                    <div className="container my-2">
                        <ButtonBar
                            versions={this.state.versions}
                            mode={this.state.mode}
                            changeMode={this.changeMode}
                            versionChange={this.versionChange}
                            handleDelete={this.handleDelete}
                            handleSave={this.handleSave}
                            handleNew={this.handleNew}
                            currNum={this.state.currNum}
                            currNums={this.state.currNums}
                            hideAnalysis={this.hideAnalysis}
                            getAnalysis={this.getAnalysis}
                            showAnalysis={this.state.showAnalysis} />
                        <input 
                            name="title" 
                            value={this.state.title} 
                            className="version-title" 
                            onChange={this.handleChange} />
                        <div className="row">
                            <div className="col">
                                <TextAnalysis 
                                    data={this.state.diffRemoved} 
                                    removed={true}
                                    sentiment={this.state.sentiments.one} />
                            </div>
                            <div className="col">
                                <TextAnalysis 
                                    data={this.state.diffAdded} 
                                    removed={false}
                                    sentiment={this.state.sentiments.two} />
                            </div>
                        </div>
                    </div>
                )
            }
            return (
                <div className="container my-2">
                    <ButtonBar
                        versions={this.state.versions}
                        mode={this.state.mode}
                        changeMode={this.changeMode}
                        versionChange={this.versionChange}
                        handleDelete={this.handleDelete}
                        handleSave={this.handleSave}
                        handleNew={this.handleNew}
                        currNum={this.state.currNum}
                        currNums={this.state.currNums}
                        hideAnalysis={this.hideAnalysis}
                        getAnalysis={this.getAnalysis} 
                        showAnalysis={this.state.showAnalysis}/>
                    <input 
                        name="title" 
                        value={this.state.title} 
                        className="version-title" 
                        onChange={this.handleChange} />
                    <div className="row">
                        <div className="col">
                            <textarea 
                            name="text-one" 
                            className="version-text bg-light" 
                            value={this.state.texts.one}
                            onChange={this.handleTextsChange}></textarea>
                        </div>
                        <div className="col">
                            <textarea 
                            name="text-two" 
                            className="version-text bg-light" 
                            value={this.state.texts.two}
                            onChange={this.handleTextsChange}></textarea>
                        </div>
                    </div>
                </div>
            )
        }
    }
}


export default Work;