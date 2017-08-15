import React , { Component, PropTypes } from 'react';

const Echarts = window.echarts;

export default class XbEcharts extends Component {
  static propTypes = {
    option: PropTypes.object.isRequired,
    className: React.PropTypes.string,
    style: React.PropTypes.object,
    theme: React.PropTypes.string
  };
  componentDidMount() {
    this.renderEchartDom();
    window.addEventListener('resize', this.resizeEcharts.bind(this));
  }
  componentDidUpdate (prevProps, prevState) {
    this.renderEchartDom();
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.resizeEcharts.bind(this));
    Echarts.dispose(this.echartsDom);
  }
  resizeEcharts(){
    let echartObj = this.getEchartsInstance();
    if(echartObj){
      echartObj.resize();
    }
  }
  renderEchartDom () {
    let echartObj = this.getEchartsInstance()
    echartObj.showLoading()
    echartObj.setOption(this.props.option);
    echartObj.hideLoading();
    return echartObj
  }
  getEchartsInstance () {
    if(!this.echartsDom){
      return
    }
    return Echarts.getInstanceByDom(this.echartsDom) || Echarts.init(this.echartsDom, 'wonderland')
  }
  render () {
    let style = this.props.style || {height: '300px'}
    return (
        <div ref={(div) => this.echartsDom = div}
            className={this.props.className}
            style={style} />
    )
  }
}
