import React, {useEffect, useState} from "react";
import MaterialTable from 'material-table'
import axios from "axios";
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

import NewProduct from "./NewProduct";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const useStyles = makeStyles((theme) => ({
    button: {
        background: 'linear-gradient(2deg, #2196f338 30%, #21cbf370 90%)',
        boxShadow: '0 3px 5px 2px rgb(33 203 243 / 19%)',
        borderRadius: 100,
        height: 48,
        width: '100%',
        display: 'flex',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginTop: theme.spacing(6),
        flexDirection: 'column',
        alignItems: 'center',
    },

}));

export default function Product(props) {
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    //άνοιγμα pop-up φόρμας νέου πρϊόντος
    const [openModal, setOpenModal] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [SnackbarMessage, setSnackbarMessage] = useState();
    const [transition, setTransition] = React.useState(undefined);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:3000/products',
            );
            setRows(result.data);
        };

        fetchData();
    }, []);

    //άνοιγμα pop-up φόρμας νέου πρϊόντος
    const handleOpen = () => {
        setOpenModal(true);
    };

    // κλείσιμο pop-up φόρμας νέου πρϊόντος
    const handleClose = () => {
        setOpenModal(false);
    };

    //εμφάνιση όλων των προϊόντων
    function getProduct(){
        axios.get(`http://localhost:3000/products/`,rows)
            .then((result)=>{
                setRows(result.data);
                console.log("Εμφάνιση όλων των προϊόντων");
            })
            .catch((error)=>{
                alert(error);
            });
    }

    //διαγραφή προϊόντος με συγκεκριμένο id
    function deleteProduct(productId){
        axios.delete(`http://localhost:3000/products/${productId}`,rows)
            .then((result)=>{
                snackBarOpen();
                setSnackbarMessage('Έγινε διαγραφή ενός προϊόντος');
            })
            .catch((error)=>{
                alert(error);
            });
    }

    //ενημέρωση προϊόντος
    function updateProduct(newData){
        axios.put(`http://localhost:3000/products/${newData.product_id}`,newData)
                .then((result)=>{
                    snackBarOpen();
                    setSnackbarMessage('Ενημερώθηκε ένα προϊόν');
                })
                .catch((error)=>{
                    alert(error);
                });
    }

    //άνοιγμα pop-up φόρμας νέου πρϊόντος
    const snackBarOpen = () => {
        setOpen(true);
    };

    // κλείσιμο pop-up φόρμας νέου πρϊόντος
    const snackBarClose = () => {
        setOpen(false);
    };

    const [columns, setColumns] = useState([
        {   title: 'Κωδικός',
            field: 'product_id',
            editable: 'never',
            headerStyle: {
                textAlign: "center"
            }
        },
        {
            title: 'Τίτλος',
            field: 'name_product',
            cellStyle: {
                textAlign: "left"
            },
            headerStyle: {
                textAlign: "center"
            }
        },
        {
            title: 'Περιγραφή',
            field: 'descr',
            hidden: 'true',
            cellStyle: {
                textAlign: "left"
            },
            headerStyle: {
                textAlign: "center"
            }
        },
        {   title: 'Τιμή',
            field: 'price',
            cellStyle: {
                textAlign: "center"
            },
            headerStyle: {
                textAlign: "center"
            }
        },
        {   title: 'Διαθεσιμότητα',
            field: 'availability_count',
            cellStyle: {
                textAlign: "center"
            },
            headerStyle: {
                textAlign: "center"
            }
        },
        {   title: 'Url προϊόντος',
            field: 'product_link',
            cellStyle: {
                textAlign: "left"
            },
            headerStyle: {
                textAlign: "center"
            }
        },
    ]);

    return (
    <React.Fragment>
        <MaterialTable
            icons={tableIcons}
            title="Διαχείριση προϊόντων"
            columns={columns}
            data={rows}
            options={{
                rowStyle: {
                    backgroundColor: '#f0fcff',
                }
            }}
            editable={{
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            updateProduct(newData);
                            getProduct();
                            resolve();
                        }, 1000)
                    }),
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            deleteProduct(rows[oldData.tableData.id].product_id);
                            getProduct();
                            resolve()
                        }, 1000)
                    }),
            }}
            detailPanel={[
                {
                    tooltip: 'Δείτε περισσότερα',
                    render: rowData => {
                        return (
                            <div
                                style={{
                                    fontSize: 15,
                                    textAlign: 'left',
                                    backgroundColor: '#eef6ff',
                                    padding: '40px',
                                }}
                            >
                                <b> Περιγραφή προϊόντος:</b> {rowData.descr}
                            </div>
                        )
                    },
                },
            ]}
        />

        <Button className={classes.button} onClick={handleOpen}>
            Προσθήκη νέου προϊόντος
        </Button>
        <NewProduct open={openModal} setOpen={setOpenModal}/>
        <Snackbar
            open={open}
            onClose={handleClose}
            TransitionComponent={transition}
            message={SnackbarMessage}
            key={transition ? transition.name : ''}
        />
    </React.Fragment>

    )
}
