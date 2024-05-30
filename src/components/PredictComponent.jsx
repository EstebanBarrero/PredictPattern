import React, { useState } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../index.css";

const PredictComponent = () => {
  const [validated, setValidated] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedDriving_License, setDriving_License] = useState("");
  const [selectedPreviously_Insured, setPreviously_Insured] = useState("");
  const [selectedAge_lt_1_yearrden, setSelected_Age_lt_1_yearrden] = useState("");
  const [selectedVehicle_Age_gt_2_years, setselectedVehicle_Age_gt_2_years] = useState("");
  const [selectedVehicle_damage, setSelectedVehicle_damage] = useState("");
  const [selectedAnnual_Premium, SelectedAnnual_Premium] = useState("");
  const [selectedVintage, SelectedVintage] = useState("");
  const [appointments, setAppointments] = useState([]); // Array para almacenar los resultados
  const [success, setSuccess] = useState(false); // Estado para mensaje de éxito
  const [predictionResult, setPredictionResult] = useState(""); // Estado para almacenar el resultado de la predicción

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      // Almacenar los valores en el array
      const newInsurances = {
        Gender: selectedGender, 
        Age: selectedAge,
        Driving_License: selectedDriving_License,
        Previously_Insured: selectedPreviously_Insured,
        Vehicle_Age_lt_1_Year: selectedAge_lt_1_yearrden,
        Vehicle_Age_gt_2_Years: selectedVehicle_Age_gt_2_years,
        Vehicle_Damage_Yes: selectedVehicle_damage,
        Annual_Premium: selectedAnnual_Premium,
        Vintage: selectedVintage
      };
      setAppointments([...appointments, newInsurances]);

      // Resetear el formulario y los estados
      resetForm();

      // Mostrar mensaje de éxito
      setSuccess(true);

      // Enviar los datos a la URL de predicción
      sendDataToPrediction(newInsurances);
    }
  };

  const resetForm = () => {
    setSelectedGender("");
    setSelectedAge("");
    setDriving_License("");
    setPreviously_Insured("");
    setSelected_Age_lt_1_yearrden("");
    setselectedVehicle_Age_gt_2_years("");
    setSelectedVehicle_damage("");
    setSelectedAnnual_Premium("");
    setSelectedVintage("");
    setValidated(false);
  };

  const sendDataToPrediction = (data) => {
    fetch('https://b731-34-31-173-120.ngrok-free.app/prediction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.text())
      .then(result => {
        setPredictionResult(result); // Guarda el resultado en el estado
      })
      .catch((error) => {
        alert('Error: ' + error);
      });
  };

  const handleCreateModel = () => {
    const newInsurances = {
      Gender: selectedGender,
      Age: selectedAge,
      Driving_License: selectedDriving_License,
      Previously_Insured: selectedPreviously_Insured,
      Vehicle_Age_lt_1_Year: selectedAge_lt_1_yearrden,
      Vehicle_Age_gt_2_Years: selectedVehicle_Age_gt_2_years,
      Vehicle_Damage_Yes: selectedVehicle_damage,
      Annual_Premium: selectedAnnual_Premium,
      Vintage: selectedVintage
    };
    sendDataToPrediction(newInsurances);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", 
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card
        style={{
          height: "40rem",
          width: "45rem",
          backgroundColor: "#ECEBF4",
          borderRadius: "20px",
          overflowX: "auto" // Habilita el scroll horizontal
        }}
      >
        <Card.Body>
          <Card.Title
            className="text-center"
            style={{
              color: "#23294B",
              fontSize: "35px",
              fontWeight: "800",
              marginTop: "30px",
            }}
          >
            Predicción compra de seguros
          </Card.Title>
          <div style={{ margin: "10px" }}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group 
                as={Row} 
                className="mb-3" 
                controlId="formHorizontalLastName"
              >
              <Form.Label 
                column sm={4} 
                style={{ color: "#23294B", fontWeight: "bold" }}
              >
                Género *
              </Form.Label>
              <Col sm={8}>
                <Form.Select
                  required
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                >
                  <option value="" disabled>Selecciona el género</option>
                  <option value="0">Mujer</option>
                  <option value="1">Hombre</option>
                </Form.Select>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Invalid selection.
                </Form.Control.Feedback>
              </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalName"
              >
                <Form.Label
                  column
                  sm={4}
                  style={{ color: "#23294B", fontWeight: "bold" }}
                >
                  Edad *
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Selecciona la edad"
                    value={selectedAge} // Vincula el valor del campo de entrada a selectedAge
                    onChange={(e) => setSelectedAge(e.target.value)} // Maneja el cambio en selectedAge
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Invalid Identification number.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group 
                as={Row} 
                className="mb-3" 
                controlId="formHorizontalLastName"
              >
              <Form.Label 
                column sm={4} 
                style={{ color: "#23294B", fontWeight: "bold" }}
              >
                ¿Licencia de conducción? *
              </Form.Label>
              <Col sm={8}>
                <Form.Select
                  required
                  value={selectedDriving_License}
                  onChange={(e) => setDriving_License(e.target.value)}
                >
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="1">Si</option>
                  <option value="0">No</option>
                </Form.Select>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Invalid selection.
                </Form.Control.Feedback>
              </Col>
              </Form.Group>

              <Form.Group 
                as={Row} 
                className="mb-3" 
                controlId="formHorizontalLastName"
              >
              <Form.Label 
                column sm={4} 
                style={{ color: "#23294B", fontWeight: "bold" }}
              >
                ¿Previamente asegurado? *
              </Form.Label>
              <Col sm={8}>
                <Form.Select
                  required
                  value={selectedPreviously_Insured}
                  onChange={(e) => setPreviously_Insured(e.target.value)}
                >
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="1">Si</option>
                  <option value="0">No</option>
                </Form.Select>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Invalid selection.
                </Form.Control.Feedback>
              </Col>
              </Form.Group>

              <Form.Group 
                as={Row} 
                className="mb-3" 
                controlId="formHorizontalLastName"
              >
              <Form.Label 
                column sm={4} 
                style={{ color: "#23294B", fontWeight: "bold" }}
              >
                ¿Antiguedad del vehículo menor a 1 año? *
              </Form.Label>
              <Col sm={8}>
                <Form.Select
                  required
                  value={selectedAge_lt_1_yearrden}
                  onChange={(e) => setSelected_Age_lt_1_yearrden(e.target.value)}
                >
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="1">Si</option>
                  <option value="0">No</option>
                </Form.Select>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Invalid selection.
                </Form.Control.Feedback>
              </Col>
              </Form.Group>

              <Form.Group 
                as={Row} 
                className="mb-3" 
                controlId="formHorizontalLastName"
              >
              <Form.Label 
                column sm={4} 
                style={{ color: "#23294B", fontWeight: "bold" }}
              >
                ¿Antiguedad del vehículo Mayor a 2 años? *
              </Form.Label>
              <Col sm={8}>
                <Form.Select
                  required
                  value={selectedVehicle_Age_gt_2_years}
                  onChange={(e) => setselectedVehicle_Age_gt_2_years(e.target.value)}
                >
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="1">Si</option>
                  <option value="0">No</option>
                </Form.Select>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Invalid selection.
                </Form.Control.Feedback>
              </Col>
              </Form.Group>

              <Form.Group 
                as={Row} 
                className="mb-3" 
                controlId="formHorizontalLastName"
              >
              <Form.Label 
                column sm={4} 
                style={{ color: "#23294B", fontWeight: "bold" }}
              >
                ¿Ha sufrido daños el vehículo anteriormente? *
              </Form.Label>
              <Col sm={8}>
                <Form.Select
                  required
                  value={selectedVehicle_damage}
                  onChange={(e) => setSelectedVehicle_damage(e.target.value)}
                >
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="1">Si</option>
                  <option value="0">No</option>
                </Form.Select>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Invalid selection.
                </Form.Control.Feedback>
              </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalName"
              >
                <Form.Label
                  column
                  sm={4}
                  style={{ color: "#23294B", fontWeight: "bold" }}
                >
                  Monto de prima al año*
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Monto de prima al año"
                    value={selectedAnnual_Premium}
                    onChange={(e) => SelectedAnnual_Premium(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Invalid Identification number.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalName"
              >
                <Form.Label
                  column
                  sm={4}
                  style={{ color: "#23294B", fontWeight: "bold" }}
                >
                  Antigüedad en la empresa *
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Antigüedad en la empresa"
                    value={selectedVintage}
                    onChange={(e) => SelectedVintage(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Invalid Identification number.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Button
                    type="button"
                    onClick={handleCreateModel}
                    style={{
                      backgroundColor: "#23294B",
                      fontWeight: "bold",
                      width: "200px",
                      marginTop: "10px",
                      marginRight: "60px" // Añade un margen derecho al botón
                    }}
                  >
                  Predecir
                </Button>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalName"
                  style={{ marginBottom: "0" }} // Quita el margen inferior del grupo de formulario para alinear con el botón
                >
                  <Form.Label
                    column
                    sm={5}
                    style={{ color: "#23294B", fontWeight: "bold" }}
                  >
                    Resultado *
                  </Form.Label>
                  <Col sm={15}>
                    <Form.Control required type="text" placeholder={predictionResult} className="input-bloqueado" disabled />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Invalid Identification number.
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </div>            
            </Form>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PredictComponent;