import React, { Component } from "react";
import 'react-dropdown/style.css';
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { thArray, tdArray } from "variables/Variables.jsx";
import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
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

class Demanding extends Component {

  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      vegiTiles: [],
      vegiGraph: {},
      vegiTable: [],
      isLoaded: false
    };

    this.loadTiles("https://api.npoint.io/376743ee3cf408549e9f");
    this.loadGraph("https://api.npoint.io/6f38d0388457e7ba0171");
    this.loadTable("https://api.npoint.io/ebd7d9cd4e556b3ea454");
  }

  columns = [
    {
      title: 'Vegitable Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: '150px'
    },
    {
      title: 'Store',
      dataIndex: 'store',
      key: 'store',
      align: 'center',
      width: '100px'
    },
    {
      title: 'Store Name',
      dataIndex: 'storeName',
      key: 'storeName',
      align: 'center',
      width: '150px'
    },
    {
      title: 'Sales (kg)',
      dataIndex: 'sales',
      key: 'sales',
      align: 'center',
      width: '15%'
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
    var tomorrow = new Date();
    var week1 = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    tomorrow = yyyy + '-' + mm + '-' + dd;
    week1 = '2020-09-13';
     
    if (dateString == today) {
      this.loadGraph("https://api.npoint.io/9ec8bc8f713e2a86e001");
    }else if(dateString == tomorrow){
      this.loadGraph("https://api.npoint.io/9153199bf8201861b52b");
    }else if(dateString == week1){
      this.loadGraph("https://api.npoint.io/34ab859d07c8ce9cb09c");
    }
    else {
      this.loadGraph(" https://api.npoint.io/717d7460e6d0c252b37c");
    }

  }

  onChangeTable = (date, dateString) => {

    var today = new Date();
    var tomorrow = new Date();
    var week1 = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    tomorrow = yyyy + '-' + mm + '-' + dd;
    week1 = '2020-09-13';

    if (dateString == today) {
      this.loadTable("https://api.npoint.io/9babe588499de5d36954");
    }else if(dateString == tomorrow){
      this.loadTable("https://api.npoint.io/366beee770ebac70342d");
    }else if(dateString == week1){
      this.loadTable("https://api.npoint.io/97e9541de53600fb0c8e");
    }
    else {
      this.loadTable("https://api.npoint.io/70baa28d36bc6d387098");
    }

  }

  render() {
    return (
      <div className="content">
        <Grid fluid>

          <Row>
            {this.state.vegiTiles.length == 0 &&
              <Col lg={6} sm={6} style={{ textAlign: 'center' }}><Spin size="large" /></Col>}

            {this.state.vegiTiles.map(element => {
              return <Col lg={2} sm={12}>
                <StatsCard
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
                statsIcon="fa fa-history"
                id="chartHours"
                title="Vegetable Demand"
                category="Demand according to selected outlets"
                content={
                  <div>
                    <Row>
                      <Col md={4}>
                        <DatePicker style={{ width: 250 }} onChange={this.onChangeGraph} />
                      </Col>
                    </Row>

                    <ChartistGraph
                      data={this.state.vegiGraph}
                      type="Bar"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className="legend">
                    <i className="fa fa-circle text-info" />Wattala
                    <i className="fa fa-circle text-danger" />Dambulla
                    <i className="fa fa-circle text-warning" />Nuwaraeliya
                  </div>
                }
              />
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Card
                title="Vegetable Demand"
                category="Demand in different outlets"
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
                      columns={this.columns} />
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

export default Demanding;
