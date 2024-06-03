import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Container, Row, Col } from "reactstrap";
import { verifyOrders, clearErrors } from "../../actions/orderActions";
// import { clearCart } from "../../actions/cartActions";

const VerifyOrderDetails = () => {
    const dispatch = useDispatch();
    let { id, token } = useParams();

    useEffect(() => {
        dispatch(verifyOrders(token, id));
        // dispatch(clearCart());
    }, [dispatch, id, token]);

    return (
        <div className="bg-zinc-100 min-h-screen d-flex justify-content-center align-items-center">
            <Container className="bg-white p-4 d-flex flex-column align-items-center rounded-xl mb-20" style={{ maxWidth: "500px" }}>
                <h2 className="mt-4">Payment Successful!</h2>
                <p className="text-zinc-500">Payment successful!</p>
                <Link to="/orders/me">
                    <Button color="danger" size="lg" block>
                        Check Orders
                    </Button>
                </Link>
            </Container>
        </div>
    );
};

export default VerifyOrderDetails;

