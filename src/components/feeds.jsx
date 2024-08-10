import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Modal, Button } from 'react-bootstrap';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const Feeds = () => {
  const [sensorData, setSensorData] = useState([]);
  const [selectedTimestamp, setSelectedTimestamp] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [sortDirection, setSortDirection] = useState('Ascending');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/sensor-data');
        setSensorData(response.data);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    fetchSensorData();
  }, []);

  const handleRowClick = (timestamp) => {
    setSelectedTimestamp(timestamp);
    setShowModal(true);
    const selectedData = sensorData.find(data => data.timestamp === timestamp);
    setModalData(selectedData);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTimestamp(null);
    setModalData({});
  };

  const onViewDetail = (timestamp) => {
    const formattedTimestamp = moment(timestamp).format('YYYY-MM-DDTHH:mm:ss');
    navigate(`/detail/${formattedTimestamp.replace("T"," ")}`);
  };

  const formatTimestamp = (timestamp) => {
    return moment(timestamp).locale('id').format('LLLL');
  };

  const toggleSort = () => {
    setSortDirection(prevDirection => prevDirection === 'Ascending' ? 'Descending' : 'Ascending');
  };

  const sortedData = React.useMemo(() => {
    let sortableData = [...sensorData];
    sortableData.sort((a, b) => {
      if (a.timestamp < b.timestamp) {
        return sortDirection === 'Ascending' ? -1 : 1;
      }
      if (a.timestamp > b.timestamp) {
        return sortDirection === 'Ascending' ? 1 : -1;
      }
      return 0;
    });
    return sortableData;
  }, [sensorData, sortDirection]);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Sensor Feeds</h1>
      <Button onClick={toggleSort} className="mb-3">
        Sort by {sortDirection}
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>accelX</th>
            <th>accelY</th>
            <th>accelZ</th>
            <th>Temperature</th>
            <th>Turbidity</th>
            <th>PH Sensor</th>
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((data, index) => (
            <tr key={index} onClick={() => handleRowClick(data.timestamp)} style={{ cursor: 'pointer' }}>
              <td>{formatTimestamp(data.timestamp)}</td>
              <td>{data.accelX}</td>
              <td>{data.accelY}</td>
              <td>{data.accelZ}</td>
              <td>{data.temperature}</td>
              <td>{data.turbidity}</td>
              <td>{data.phsensor}</td>
              <td>{data.latitude}</td>
              <td>{data.longitude}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detail Data - Timestamp : {formatTimestamp(selectedTimestamp)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>accelX : </strong> {modalData.accelX} m/s2</p>
          <p><strong>accelY : </strong> {modalData.accelY} m/s2</p>
          <p><strong>accelZ : </strong> {modalData.accelZ} m/s2</p>
          <p><strong>Temperature : </strong> {modalData.temperature} °C</p>
          <p><strong>Turbidity : </strong> {modalData.turbidity} NTU</p>
          <p><strong>PH Sensor : </strong> {modalData.phsensor} pH</p>
          <p><strong>Latitude : </strong> {modalData.latitude} </p>
          <p><strong>Longitude : </strong> {modalData.longitude} </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Feeds;
