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

class Pricing extends Component {

  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      vegiTiles: [],
      vegiGraph: {},
      vegiTable: [],
      isLoaded: false
    };

    this.loadTiles();
    this.loadGraph("https://api.npoint.io/052304775de17e01a34e");
    this.loadTable();
  }

  columns = [
    {
      title: 'Vegitable name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: '15%'
    },
  ];

  onChange = date => this.setState({ date })

  loadTiles() {
    fetch("https://api.npoint.io/093dc21fae3a3f83c042")
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

  loadTable() {
    fetch("https://api.npoint.io/0cde0e8b27288ab5e298")
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
      this.loadGraph("https://api.npoint.io/b4f66b1c93844e4560fe");
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
              return <Col lg={2} sm={6}>
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
                title="Vegetable Price"
                category="Here is a subtitle for this table"
                content={
                  <div>
                    <Row>
                      <Col md={4}>
                        <DatePicker style={{ width: 250 }} onChange={this.onChangeGraph} />
                      </Col>
                    </Row>

                    <ChartistGraph
                      data={this.state.vegiGraph}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className="legend">
                    <i className="fa fa-circle text-info" />Vegetable A
                    <i className="fa fa-circle text-danger" />Vegetable B
                    <i className="fa fa-circle text-warning" />Vegetable C
                  </div>
                }
              />
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Card
                title="Vegetable Price"
                category="Here is a subtitle for this table"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                    <Row style={{ margin: 10 }}>
                      <Col md={4}>
                        <DatePicker style={{ width: 250 }} />
                      </Col>
                    </Row>

                    <Table
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

export default Pricing;
