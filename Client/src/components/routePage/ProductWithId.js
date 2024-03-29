import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import axios from "axios";

import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Alert from "@material-ui/lab/Alert/Alert";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";

function ProductWithId(props) {
    const [rows, setRows] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [transition, setTransition] = React.useState(undefined);
    const [snackbarMessage, setSnackbarMessage] = useState();
    let product_id = props.location.pathname.substring(10);

    //άνοιγμα snackBar
    const snackBarOpen = () => {
        setOpen(true);
    };

    // κλείσιμο snackBar
    const snackBarClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        (async () => {
            try {
                const result = await axios.get(`/products/${product_id}`)
                setRows({...result.data[0]});
            } catch (error) {
                console.error(error);
                snackBarOpen();
                setSnackbarMessage(<><Alert severity="error">Server error!</Alert></>);
            }
            ;
        })();
    }, [product_id]);

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Κωδικός</TableCell>
                        <TableCell align="center">Τίτλος</TableCell>
                        <TableCell align="center">Περιγραφή</TableCell>
                        <TableCell align="center">Τιμή</TableCell>
                        <TableCell align="center">Διαθεσιμότητα</TableCell>
                        <TableCell align="center">Url προϊόντος</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell component="th" scope="rows">{rows.product_id}</TableCell>
                        <TableCell align="center">{rows.name_product}</TableCell>
                        <TableCell align="center">{rows.descr}</TableCell>
                        <TableCell align="center">{rows.price}</TableCell>
                        <TableCell align="center">{rows.availability_count}</TableCell>
                        <TableCell align="center">{rows.product_link}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Snackbar
                open={open}
                autoHideDuration={1000}
                onClose={snackBarClose}
                TransitionComponent={transition}
                key={transition ? transition.name : ''}
            >
                {snackbarMessage}
            </Snackbar>
        </>
    );
}

export default withRouter(ProductWithId);
