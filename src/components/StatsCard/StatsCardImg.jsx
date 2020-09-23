import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

export class StatsCardImg extends Component {
    render() {
        return (
            <div className="card card-stats">
                <div className="content">
                    <Row>
                        <Col xs={5}>
                            <div>
                                <img src={this.props.image} alt="farmer" width="290" />
                            </div>
                            <div className="numbers" style={{ textAlign: 'center' }}>
                                <p>{this.props.statsText}</p>
                                {this.props.statsValue}
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default StatsCardImg;
