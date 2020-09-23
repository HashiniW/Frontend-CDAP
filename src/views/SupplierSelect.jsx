import React, { Component } from "react";
import 'react-dropdown/style.css';
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { thArray, tdArray } from "variables/Variables.jsx";
import { Card } from "components/Card/Card.jsx";
import { StatsCardImg } from "components/StatsCard/StatsCardImg.jsx";
import { DatePicker, Select, Table, Spin } from 'antd';
import 'antd/dist/antd.css';

import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";

const { Option } = Select;

class SupplierSelect extends Component {

  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      vegiTiles: [],
      vegiGraph: {},
      vegiTable: [],
      isLoaded: false
    };

    this.loadTiles("https://api.npoint.io/b28290344945893d077a");
    this.loadGraph("https://api.npoint.io/749190dd1ab9b0a882a8");
    this.loadTable("https://api.npoint.io/9de080645ed303df780e");
  }

  tabVegColumns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      align: 'center',
      width: '150px'
    },
    {
      title: 'Vegetable Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: '150px'
    },
    {
      title: 'Demand (kg)',
      dataIndex: 'demand',
      key: 'demand',
      align: 'center',
      width: '150px'
    },
    {
      title: 'Farmer ID',
      dataIndex: 'fId',
      key: 'fId',
      align: 'center',
      width: '150px'
    },
  ];

  tabSupColumns = [
    {
      title: 'Farmer ID',
      dataIndex: 'fId',
      key: 'fId',
      align: 'center',
      width: '150px'
    },
    {
      title: 'Farmer Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: '150px'
    },
    {
      title: 'Contact Number',
      dataIndex: 'number',
      key: 'number',
      align: 'center',
      width: '150px'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
      width: '150px'
    },
  ];

  onChange = date => this.setState({ date })

  loadTiles(url) {
    fetch(url)
      .then(res => res.json())
      .then((result) => {
        this.setState({
          isLoaded: true,
          vegiTiles: result.data
        });
      }, (error) => {
        this.setState({
          isLoaded: true
        });
      })
  }

  loadGraph(url) {
    fetch(url)
      .then(res => res.json())
      .then((result) => {
        this.setState({
          isLoaded: true,
          vegiGraph: result.data
        });
      }, (error) => {
        this.setState({
          isLoaded: true
        });
      })
  }

  loadTable(url) {
    fetch(url)
      .then(res => res.json())
      .then((result) => {
        this.setState({
          isLoaded: true,
          vegiTable: result.data
        });
      }, (error) => {
        this.setState({
          isLoaded: true
        });
      })
  }

  onChangeGraph = (date, dateString) => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    if (dateString == today) {
      this.loadGraph("https://api.npoint.io/052304775de17e01a34e");
    } else {
      this.loadGraph("https://api.npoint.io/749190dd1ab9b0a882a8");
    }

  }

  onChangeTable = (date, dateString) => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    if (dateString == today) {
      this.loadTable("https://api.npoint.io/9de080645ed303df780e");
    } else {
      this.loadTable("https://api.npoint.io/9de080645ed303df780e");
    }

  }

  render() {
    return (
      <div className="content">
        <Grid fluid>

          <Row>
            {this.state.vegiTiles.length == 0 &&
              <Col lg={12} sm={6} style={{ textAlign: 'center' }}><Spin size="large" /></Col>}

            {this.state.vegiTiles.map(element => {
              return <Col lg={4} sm={12}>
                <StatsCardImg
                  image={element.image}
                  statsText={element.name}
                  statsValue={element.value}
                  statsIcon={<i className="fa fa-refresh" />}
                  statsIconText="Updated now"
                />
              </Col>
            })}
          </Row>

          <Row>
            <Col md={12}>
            <Card
                title="Vegetable Price"
                category="Prices according to selected cities"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                    <Row style={{ margin: 10 }}>
                      <Col md={4}>
                        <DatePicker style={{ width: 250 }} onChange={this.onChangeTable} />
                      </Col>
                    </Row>

                    <Table
                      size="small"
                      bordered
                      rowKey={record => record.uid}
                      dataSource={this.state.vegiTable}
                      columns={this.tabVegColumns} />
                  </div>
                }
              />
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Card
                title="Vegetable Price"
                category="Prices according to selected cities"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                    <Row style={{ margin: 10 }}>
                      <Col md={4}>
                        <DatePicker style={{ width: 250 }} onChange={this.onChangeTable} />
                      </Col>
                    </Row>

                    <Table
                      size="small"
                      bordered
                      rowKey={record => record.uid}
                      dataSource={this.state.vegiTable}
                      columns={this.tabSupColumns} />
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default SupplierSelect;
