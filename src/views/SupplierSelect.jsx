import React, { Component } from "react";
import 'react-dropdown/style.css';
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { thArray, tdArray } from "variables/Variables.jsx";
import { Card } from "components/Card/Card.jsx";
import { StatsCardImg } from "components/StatsCard/StatsCardImg.jsx";
import { DatePicker, Select, Table, Spin, Input } from 'antd';
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

    this.loadTiles();
    this.loadGraph("https://api.npoint.io/749190dd1ab9b0a882a8");
    this.loadTable({ "vegi_name": "carrot" });
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
      title: 'Demand (kg)',
      dataIndex: 'demand',
      key: 'demand',
      align: 'center',
      width: '150px'
    },
    {
      title: 'Vegetable Name',
      dataIndex: 'vegName',
      key: 'vegName',
      align: 'center',
      width: '150px'
    },

    {
      title: 'Farmer ID',
      dataIndex: 'supplierId',
      key: 'supplierId',
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
      dataIndex: 'fname',
      key: 'fname',
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
    {

      title: 'Contact Number',
      dataIndex: 'contactNo',
      key: 'contactNo',
      align: 'center',
      width: '150px'
    },


  ];

  onChange = date => this.setState({ date })

  loadTiles() {
    fetch('http://127.0.0.1:5000/get-suplier-list', {
      method: 'POST',
      body: {}
    })
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

  loadTable(body) {
    fetch('http://127.0.0.1:5000/get-best-farmer', {
      method: 'POST',
      body: body
    })
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

  onChangeGraph = (date, dateString, veg) => {

    var today = new Date();
    var c1 = veg;
    var t1 = veg;
    var p1 = veg;
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    c1 = 'carrot';
    t1 = 'Tomato';
    p1 = 'Pumpkin';
    // p1 = 14;
    if (veg == c1) {
      this.loadGraph("https://api.npoint.io/5aa0f931d0334237f6e9");
    } else if (veg == t1) {
      this.loadGraph("https://api.npoint.io/6c7037a9749b66f574cd");
    }
    else
      this.loadGraph("https://api.npoint.io/1faa91570700a1cdf45a");

  }

  onChangeTable = (date, dateString, id) => {

    var today = new Date();
    var f1 = id;
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    f1 = '18'

    if (id == f1) {
      this.loadTable("https://api.npoint.io/952971825daaf5bbf491");
    } else {
      this.loadTable("https://api.npoint.io/daf2c4854715fd777657");
    }

  }

  searchPrice = (event, veg) => {
    var val = event.target.value;
    var val1 = event.target.value;
    var val2 = event.target.value;

    this.loadTable({ "vegi_name": val });

    // if (val == 'carrot') {
    //   this.loadTable("https://api.npoint.io/5aa0f931d0334237f6e9");
    // } else if (val1 == 'Tomato') {
    //   this.loadTable("https://api.npoint.io/6c7037a9749b66f574cd");
    // }
    // else
    //   this.loadTable("https://api.npoint.io/1faa91570700a1cdf45a");
  }

  searchId = (event, id) => {
    var val = event.target.value;
    if (val == '18') {
      this.loadTable("https://api.npoint.io/952971825daaf5bbf491");
    }
    else
      this.loadTable("https://api.npoint.io/daf2c4854715fd777657");
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
                  statsValue={element.NIC}
                  statsIcon={<i className="fa fa-refresh" />}
                  statsIconText="Updated now"
                />
              </Col>
            })}
          </Row>

          <Row>
            <Col md={12}>
              <Card
                title="Best Farmer"
                category="Sorting vegetables and Farmers"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                    <Row style={{ margin: 10 }}>
                      <Col md={4}>
                        <Input placeholder="Search" onChange={this.searchPrice} />
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
                title="Best Farmer"
                category="Best Farmer of the month"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                    <Row style={{ margin: 10 }}>
                      <Col md={4}>
                        <Input placeholder="Search" onChange={this.searchId} />
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
