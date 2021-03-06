import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";
import rocket from "../../images/rocket.svg";
import { backendUrl } from "../../config";

function AnonymousUserDetails() {
  const { id } = useParams();
  const [shoeDetail, setShoeDetail] = useState([]);

  useEffect(() => {
    fetch(`${backendUrl}/shoes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setShoeDetail(data);
      })
      .catch((e) => console.error(e));
  }, [id]);

  const formatDate = useCallback((shoe) => {
    try {
      return new Intl.DateTimeFormat("pl-PL").format(new Date(shoe.date).getTime());
    } catch (e) {
      return shoe?.date;
    }
  }, []);

  return (
    <div className="shoe-detail shoe-detail-anonymous">
      <Card>
        <Container>
          <Row xs={1} md={2}>
            <Col>
              <Card.Img variant="top" src={shoeDetail.url} />
            </Col>
            <Col>
              <Card.Body>
                <Card.Title>{shoeDetail.model}</Card.Title>
                <Card.Text>Drop date: {formatDate(shoeDetail)}</Card.Text>
                <Card.Text>{shoeDetail.price} EUR</Card.Text>
                <Card.Text>
                  {(() => {
                    if (shoeDetail.resell === 1) {
                      return (
                        <>
                          <div className="rocket-img">
                            <img src={rocket} alt="rocket"></img>
                          </div>
                          <span>Resell value is high</span>
                        </>
                      );
                    } else if (shoeDetail.resell === 2) {
                      return (
                        <>
                          <div className="resell">
                            <div className="rocket-img">
                              <img src={rocket} alt="rocket"></img>
                            </div>
                            <div className="rocket-img">
                              <img src={rocket} alt="rocket"></img>
                            </div>
                          </div>
                          <span>Resell value is very high</span>
                        </>
                      );
                    }
                  })()}
                </Card.Text>
                <Button href="https://www.nike.com/pl/launch?s=upcoming" target="_blank" className="shop-button">
                  Go to shop
                </Button>
              </Card.Body>
            </Col>
          </Row>
        </Container>
      </Card>
    </div>
  );
}

export default AnonymousUserDetails;
