import React from 'react'
import { Card, Button, Form, Input, Row, Col, Select } from 'antd'


class Connection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
     initialConnectionOptions : {
      host: import.meta.env.VITE_MQTT_HOST,
      port: import.meta.env.VITE_MQTT_PORT,
      protocol: import.meta.env.VITE_MQTT_PROTOCOL,
      username: import.meta.env.VITE_MQTT_USERNAME,
      password: import.meta.env.VITE_MQTT_PASSWORD,
      clientId: 'mqttx_' + Math.random().toString(16).substring(2, 8),
    },
    }
  }

  formRef = React.createRef()

  handleProtocolChange = (value) => {
    this.formRef.current.setFieldsValue({
      port: import.meta.env.VITE_MQTT_PORT,
    })
  }

  onFinish = (values) => {
    const { protocol, host, clientId, port, username, password } = values
    const url = `${protocol}://${host}:${port}/mqtt`
    const options = {
      clientId,
      username,
      password,
      clean: true,
      reconnectPeriod: 1000, // ms
      connectTimeout: 30 * 1000, // ms
    }
    this.props.connect(url, options)
  }

  handleConnect = () => {
    this.formRef.current.submit()
  }

  render() {
    const ConnectionForm = (
      <Form
        ref={this.formRef}
        layout="vertical"
        name="basic"
        initialValues={this.state.initialConnectionOptions}
        onFinish={this.onFinish}
      >
        <Row gutter={20}>
          <Col span={8}>
            <Form.Item label="Protocol" name="protocol">
              <Select onChange={this.handleProtocolChange}>
                <Select.Option value="mqtts">mqtts</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Host" name="host">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Port" name="port">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Client ID" name="clientId">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Username" name="username">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Password" name="password">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    )

    return (
      <Card
        title="Connection"
        actions={[
          <Button type="primary" onClick={this.handleConnect}>
            {this.props.connectBtn}
          </Button>,
          <Button danger onClick={this.props.disconnect}>
            Disconnect
          </Button>,
        ]}
      >
        {ConnectionForm}
      </Card>
    )
  }
}

export default Connection