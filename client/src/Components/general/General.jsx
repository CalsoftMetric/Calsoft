import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Container, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { TextField, MenuItem, IconButton, FormControl } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid } from '@mui/x-data-grid';
import { Delete } from '@mui/icons-material';





export const UnitDataBase = ({ style }) => {

    const [unitStateId, setUnitStateId] = useState(null)
    const initialUnitData = {
        unitName: "",
    }

    const [errorHandler, setErrorHandler] = useState({})

    const [unitSnackBar, setUnitSnackBar] = useState(false)
    const handleSnackClose = (event, reason) => {
        console.log(reason)
        if (reason === 'clickaway') {
            return;
        }

        setUnitSnackBar(false);
    }

    const [unitData, setUnitData] = useState({
        unitName: "",
    })
    console.log(unitData)


    const [unitDataList, setUnitDataList] = useState([])
    const unitFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/unit/getAllUnits`
            );
            setUnitDataList(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        unitFetchData();
    }, []);

    const [unitSelectedRowIds, setUnitSelectedRowIds] = useState([]);

    const unitColumns = [
        { field: 'id', headerName: 'Si. No', width: 70, renderCell: (params) => params.api.getRowIndexRelativeToVisibleRows(params.id) + 1 },

        { field: 'unitName', headerName: 'UnitName', width: "150" },

        


    ];



    const handleUnitDataBaseChange = (e) => {
        const { name, value } = e.target;
        setUnitData((prev) => ({ ...prev, [name]: value }));

    };

    const unitSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/unit/createUnit`, unitData
            );
            {/*console.log(response.data.message)*/ }
            console.log(response)
            setUnitSnackBar(true)
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
            unitFetchData();
            setUnitData(initialUnitData);
        } catch (err) {
            setUnitSnackBar(true)

            if (err.response && err.response.status === 400) {
                // Handle validation errors
                const errorData400 = err.response.data.errors;
                const errorMessages400 = Object.values(errorData400).join(' | ');
                console.log(errorMessages400)
                setErrorHandler({ status: 0, message: errorMessages400, code: "error" });
            } else if (err.response && err.response.status === 500) {
                // Handle other errors
                const errorData500 = err.response.data.error;
                const errorMessages500 = Object.values(errorData500).join(' | ');
                console.log(errorMessages500)
                setErrorHandler({ status: 0, message: errorMessages500, code: "error" });
            } else {
                console.log(err.response.data.error)
                setErrorHandler({ status: 0, message: "An error occurred", code: "error" });
            }
        }
    };

    const updateUnitData = async () => {
        try {
            const response = await axios.put(
                "http://localhost:3001/unit/updateUnit/" + unitStateId, unitData
            );
            unitFetchData();
            setUnitData({
                unitName: ""
            });
            setUnitSnackBar(true)
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
            console.log(response);
            setUnitStateId(null)
        } catch (err) {
            setUnitSnackBar(true)
            console.log(err)
            if (err.response && err.response.status === 400) {
                // Handle validation errors
                const errorData400 = err.response.data.errors;
                const errorMessages400 = Object.values(errorData400).join(' | ');
                console.log(errorMessages400)
                setErrorHandler({ status: 0, message: errorMessages400, code: "error" });
            } else if (err.response && err.response.status === 500) {
                // Handle other errors
                const errorData500 = err.response.data.error;
                const errorMessages500 = Object.values(errorData500).join('');
                console.log(errorMessages500)
                setErrorHandler({ status: 0, message: errorMessages500, code: "error" });
            } else {
                console.log(err.response.data.error)
                setErrorHandler({ status: 0, message: "An error occurred", code: "error" });
            }
        }
    };
    const deleteUnitData = async () => {
        try {
            const response = await axios.delete(
                "http://localhost:3001/unit/deleteUnit/", {
                data: {
                    unitIds: unitSelectedRowIds
                }
            }


            );
            unitFetchData();
            setUnitData({
                unitName: ""
            });
            setUnitSnackBar(true)
            setErrorHandler({ status: 0, message: response.data.message, code: "success" });
            console.log("Unit delete Successfully");
            setUnitStateId(null)
        } catch (err) {
            setUnitSnackBar(true)

            if (err.response && err.response.status === 400) {
                // Handle validation errors
                const errorData400 = err.response.data.errors;
                const errorMessages400 = Object.values(errorData400).join(' | ');
                console.log(errorMessages400)
                setErrorHandler({ status: 0, message: errorMessages400, code: "error" });
            } else if (err.response && err.response.status === 500) {
                // Handle other errors
                const errorData500 = err.response.data.error;
                const errorMessages500 = Object.values(errorData500).join(' | ');
                console.log(errorMessages500)
                setErrorHandler({ status: 0, message: errorMessages500, code: "error" });
            } else {
                console.log(err.response.data.error)
                setErrorHandler({ status: 0, message: "An error occurred", code: "error" });
            }
        }
    };





    // const handleKeyDown = (event) => {
    //     const { name, value } = event.target
    //     console.log(name)
    //     if (event.key === 'Tab') {
    //         // Prevent default Tab behavior

    //         const formattedValue = value.toLowerCase().
    //             split(' ')
    //             .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    //             .join(' ');
    //         console.log(formattedValue)
    //         // Format the input value (capitalization)
    //         // Update the state to show the formatted value
    //         setUnitData((prev) => ({ ...prev, [name]: formattedValue })); // Update the state with the formatted value


    //     }
    // };



    const updateUnit = async (params) => {
        console.log(params)
        setUnitData(params.row)
        setUnitStateId(params.id)
    }

    console.log(unitStateId)


    const bodycss = {
        borderRadius: "10px",

        padding: "2rem",
        margin: "1rem",
        boxShadow: "0px 0px 10px 0px",
    }

    const [openModal, setOpenModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    return (

        <div >

            <form>
                <Box sx={{ flexGrow: 1, m: 4 }}>
                    <Grid container spacing={2} >


                        <Grid item xs={6} >
                            <Paper sx={{
                                p: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                pb: 5
                            }} >
                                <h6 className='text-center'>Unit DataBase</h6>
                                <div className='row g-2 mb-2'>
                                    <div className="form-floating col-md-2">
                                        <TextField label="Si.No."
                                            id="unitSiId"
                                            defaultValue=""
                                            fullWidth
                                            size="small"
                                            placeholder="unitSi"
                                            onChange={handleUnitDataBaseChange}
                                            //onKeyDown={handleKeyDown}
                                            disabled
                                            value={unitDataList.length + 1}
                                            name="unitSi" ></TextField>

                                    </div>
                                    {unitStateId ? <Dialog
                                        open={openModal}
                                        onClose={() => setOpenModal(false)}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">
                                            {"Unit update confirmation?"}
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Are you sure to update the Unit
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
                                            <Button onClick={() => { updateUnitData(); setOpenModal(false); }} autoFocus>
                                                Update
                                            </Button>
                                        </DialogActions>
                                    </Dialog> : <Dialog
                                        open={openModal}
                                        onClose={() => setOpenModal(false)}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">
                                            {" Unit create confirmation?"}
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Are you sure to add the Unit
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
                                            <Button onClick={(e) => { unitSubmit(e); setOpenModal(false); }} autoFocus>
                                                Add
                                            </Button>
                                        </DialogActions>
                                    </Dialog>}


                                    <div className="form-floating col-md-10">

                                        <TextField label="Unit Name"
                                            id="unitNameId"
                                            defaultValue=""
                                            fullWidth
                                            size="small"
                                            placeholder="unitName"
                                            onChange={handleUnitDataBaseChange}

                                            value={unitData.unitName}
                                            name="unitName" ></TextField>

                                    </div>
                                </div>


                                <div className='col d-flex justify-content-end'>
                                    {unitStateId ? <div className='d-flex justify-content-end'><div className='me-2' >
                                        <button type="button" className='btn btn-secondary' onClick={() => setOpenModal(true)}>Modify</button>
                                    </div>
                                        <div className='me-2' >
                                            <button type="button" className='btn btn-danger' onClick={() => { setUnitStateId(null); setUnitData(initialUnitData) }}>Cancel</button>
                                        </div></div> : <div>
                                        <button type="button" className='btn btn-warning ' onClick={() => setOpenModal(true)}>+ Add UnitDataBase</button>
                                    </div>}


                                </div>
                                <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={unitSnackBar} autoHideDuration={6000} onClose={handleSnackClose}>
                                    <Alert variant="filled" onClose={handleSnackClose} severity={errorHandler.code} sx={{ width: '100%' }}>
                                        {errorHandler.message}
                                    </Alert>
                                </Snackbar>
                            </Paper>
                        </Grid>

                        <Grid item xs={6} >
                            <Paper sx={{
                                p: 3,
                                display: 'flex',
                                flexDirection: 'column',

                            }} >
                                <div>
                                    <h6 className='text-center'>Unit List</h6>
                                    <div className="row mb-2">
                                        <div className="col d-flex justify-content-end">
                                            {unitSelectedRowIds.length !== 0 && <Button variant='contained' type='button' color='error' onClick={() => setDeleteModal(true)}>Delete </Button>}
                                        </div>
                                    </div>

                                    <div style={{ height: 400, width: '100%' }}>
                                        <DataGrid
                                            rows={unitDataList}
                                            columns={unitColumns}
                                            getRowId={(row) => row._id}
                                            initialState={{
                                                pagination: {
                                                    paginationModel: { page: 0, pageSize: 5 },
                                                },
                                            }}
                                            pageSizeOptions={[5, 10]}
                                            onRowSelectionModelChange={(newRowSelectionModel, event) => {
                                                setUnitSelectedRowIds(newRowSelectionModel);
                                                console.log(event)

                                            }}
                                            onRowClick={updateUnit}

                                            checkboxSelection


                                        >

                                        </DataGrid>




                                    </div>



                                    {/* <div style={style} className='table-responsive'>
                                        <table className='table table-bordered text-center'>
                                            <tbody>
                                                <tr>
                                                    <th>Sr.No</th>
                                                    <th>Unit Name</th>
                                                    <th>Delete</th>
                                                </tr>
                                                {unitDataList.map((item, index) => (
                                                    <tr onClick={() => updateUnit(item)}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.unitName}</td>
                                                        <td><button type='button' className='btn btn-danger' onClick={() => setDeleteModal(true)}><i class="bi bi-trash-fill"></i></button></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>*/}
                                    <Dialog
                                        open={deleteModal}
                                        onClose={() => setDeleteModal(false)}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">
                                            {" Unit delete confirmation?"}
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Are you sure to delete the Unit
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={() => setDeleteModal(false)}>Cancel</Button>
                                            <Button onClick={(e) => { deleteUnitData(e); setDeleteModal(false); }} autoFocus>
                                                Delete
                                            </Button>
                                        </DialogActions>
                                    </Dialog>

                                </div>
                            </Paper>
                        </Grid>

                    </Grid>
                </Box>
            </form>


        </div>
    )
}

export const PartDataBase = ({ style }) => {


    const [customerList, setCustomerList] = useState([])

    const vendorFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getAllVendors`
            );
            console.log(response.data)
            const customersList = response.data.result.filter((item) => item.customer === "1")

            setCustomerList(customersList);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        vendorFetch();
    }, []);




    const [errorHandler, setErrorHandler] = useState({})
    const [partStateId, setPartStateId] = useState("")
    const [partSnackBar, setPartSnackBar] = useState(false)
    const handleSnackClose = (event, reason) => {
        console.log(reason)
        if (reason === 'clickaway') {
            return;
        }

        setPartSnackBar(false);
    }
    const initialPartData = {

        partNo: "",
        partName: "",
        customer: "",
        operationNo: "",
        partStatus: ""
    }


    const [partData, setPartData] = useState({
        partNo: "",
        partName: "",
        customer: "",
        operationNo: "",
        partStatus: ""
    })
    console.log(partData)


    const [partDataList, setPartDataList] = useState([])
    const partFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/part/getAllParts`
            );
            setPartDataList(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        partFetchData();
    }, []);


    const [partSelectedRowIds, setPartSelectedRowIds] = useState([]);
    const partColumns = [
        { field: 'id', headerName: 'Si. No', width: 100, renderCell: (params) => params.api.getRowIndexRelativeToVisibleRows(params.id) + 1 },

        { field: 'partNo', headerName: 'PartNo', width: "210" },
        { field: 'partName', headerName: 'partName', width: "220" },
        { field: 'customer', headerName: 'Customer', width: "230" },
        { field: 'operationNo', headerName: 'Operation No', width: "240" },
        { field: 'partStatus', headerName: 'Part Status', width: "250" },




    ];







    const partSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/part/createPart`, partData
            );
            {/*console.log(response.data.message)*/ }
            console.log(response)
            setPartSnackBar(true)
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
            partFetchData();
            setPartData(initialPartData);
        } catch (err) {
            setPartSnackBar(true)

            if (err.response && err.response.status === 400) {
                // Handle validation errors
                const errorData400 = err.response.data.errors;
                const errorMessages400 = Object.values(errorData400).join(' | ');
                console.log(errorMessages400)
                setErrorHandler({ status: 0, message: errorMessages400, code: "error" });
            } else if (err.response && err.response.status === 500) {
                // Handle other errors
                const errorData500 = err.response.data.error;
                const errorMessages500 = Object.values(errorData500).join(' | ');
                console.log(errorMessages500)
                setErrorHandler({ status: 0, message: errorMessages500, code: "error" });
            } else {
                console.log(err.response.data.error)
                setErrorHandler({ status: 0, message: "An error occurred", code: "error" });
            }

        }
    };
    const updatePartData = async () => {
        try {
            const response = await axios.put(
                "http://localhost:3001/part/updatePart/" + partStateId, partData
            );
            partFetchData();
            setPartData({
                partNo: "",
                partName: "",
                customer: "",
                operationNo: ""
            });
            setPartSnackBar(true)
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
            setPartStateId(null)
            console.log(response);
        } catch (err) {
            console.log(err);
            setPartSnackBar(true)
            if (err.response && err.response.status === 400) {
                // Handle validation errors
                const errorData400 = err.response.data.errors;
                const errorMessages400 = Object.values(errorData400).join(' / ');

                console.log(errorMessages400);
                console.log(err)
                setErrorHandler({ status: 0, message: errorMessages400, code: "error" });
            } else if (err.response && err.response.status === 500) {
                // Handle other errors
                // const errorData500 = err.response.data.error;
                // const errorMessages500 = Object.values(errorData500).join(', ');
                console.log(err)
                setErrorHandler({ status: 0, message: err.response.data.error, code: "error" });
            } else {
                console.log(err)
                setErrorHandler({ status: 0, message: "An error occurred", code: "error" });
            }

        }
    };

    const deletePartData = async (id) => {
        try {
            const response = await axios.delete(
                "http://localhost:3001/part/deletePart/", {
                data: {
                    partIds: partSelectedRowIds
                }
            }


            );
            partFetchData();
            setPartData({
                partNo: "",
                partName: "",
                customer: "",
                operationNo: ""
            });
            setPartStateId(null);
            setPartSnackBar(true);
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" });
            console.log("Part delete Successfully");
        } catch (err) {
            console.log(err);
            setPartSnackBar(true)
            if (err.response && err.response.status === 400) {
                // Handle validation errors
                const errorData400 = err.response.data.errors;
                const errorMessages400 = Object.values(errorData400).join(' / ');

                console.log(errorMessages400);
                console.log(err)
                setErrorHandler({ status: 0, message: errorMessages400, code: "error" });
            } else if (err.response && err.response.status === 500) {
                // Handle other errors
                // const errorData500 = err.response.data.error;
                // const errorMessages500 = Object.values(errorData500).join(', ');
                console.log(err)
                setErrorHandler({ status: 0, message: err.response.data.error, code: "error" });
            } else {
                console.log(err)
                setErrorHandler({ status: 0, message: "An error occurred", code: "error" });
            }


        }
    };
    console.log(errorHandler.message)


    const handleKeyDown = (event) => {
        const { name, value } = event.target
        console.log(name)
        if (event.key === 'Tab') {
            // Prevent default Tab behavior

            const formattedValue = value.toLowerCase().
                split(' ')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            console.log(formattedValue)
            // Format the input value (capitalization)
            // Update the state to show the formatted value
            setPartData((prev) => ({ ...prev, [name]: formattedValue })); // Update the state with the formatted value


        }
    };


    const updatePart = async (params) => {
        console.log(params)
        setPartData(params.row)
        setPartStateId(params.id)
    }




    const handlePartDataBaseChange = (e) => {
        const { name, value } = e.target;
        const formattedValue = name === 'partName'
            ? value.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
            : value;
        setPartData((prev) => ({ ...prev, [name]: formattedValue }));

    };
    const bodyModel = {
        borderRadius: "10px",
        padding: "2rem",
        margin: "1rem",
        boxShadow: "0px 0px 10px 0px",
    }

    const [openModal, setOpenModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);



    return (

        <div  >
            <form>
                <Box sx={{ flexGrow: 1, m: 4 }}>

                    <Grid container spacing={2} >


                        <Grid item xs={12} className="d-flex justify-content-center">
                            <Paper sx={{
                                p: 3,
                                display: 'flex',
                                flexDirection: 'column',

                            }}
                                className="d-flex justify-content-center"
                            >


                                <div>
                                    <div className="row g-2 mb-2">
                                        <div className="form-floating col-md-2">
                                            <TextField label="Si.No."
                                                id="partDbId"
                                                fullWidth
                                                disabled
                                                defaultValue=""
                                                placeholder="partDb"
                                                size="small"
                                                onChange={handlePartDataBaseChange}
                                                value={partDataList.length + 1}
                                                name="partDb" ></TextField>

                                        </div>
                                        <div className="form-floating col d-flex-md-5">
                                            <TextField label="Part No"
                                                id="partNoId"
                                                defaultValue=""

                                                size="small"
                                                onChange={handlePartDataBaseChange}
                                                value={partData.partNo}
                                                name="partNo" />

                                        </div>
                                        <div className="form-floating col-md-6">
                                            <TextField label="Part Name"
                                                id="partNameId"
                                                defaultValue=""
                                                fullWidth
                                                size="small"
                                                onChange={handlePartDataBaseChange}
                                                onKeyDown={handleKeyDown}
                                                value={partData.partName}
                                                name="partName" ></TextField>


                                        </div>
                                    </div>


                                    <div className="row mb-2 g-2">
                                        <div className="form-floating col-md-6"  >
                                            <TextField label="Customer"
                                                select
                                                id="customerId"
                                                defaultValue=""
                                                placeholder="customer"
                                                size="small"
                                                onChange={handlePartDataBaseChange}
                                                onKeyDown={handleKeyDown}
                                                value={partData.customer}
                                                name="customer"
                                                fullWidth>
                                                {customerList.map((item, index) => (
                                                    <MenuItem key={index} value={item.aliasName}>{item.aliasName}</MenuItem>
                                                ))}

                                            </TextField>


                                        </div>
                                        <div className="form-floating col-md-4" >
                                            <TextField label="Operation No"
                                                id="operationNoId"
                                                defaultValue=""
                                                placeholder="operationNo"
                                                size="small"
                                                onChange={handlePartDataBaseChange}
                                                onKeyDown={handleKeyDown}
                                                value={partData.operationNo}
                                                name="operationNo"
                                                fullWidth
                                            ></TextField>

                                        </div>
                                        <div className="form-floating col-md-2">
                                            <TextField label="Status"
                                                id="partStatusId"
                                                fullWidth
                                                select
                                                placeholder="partStatus"
                                                size="small"
                                                onChange={handlePartDataBaseChange}
                                                defaultValue="Active"
                                                value={partData.partStatus}
                                                name="partStatus" >

                                                <MenuItem value="Active">Active</MenuItem>
                                                <MenuItem value="InActive">InActive</MenuItem>
                                            </TextField>

                                        </div>

                                    </div>

                                </div>
                                <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={partSnackBar} autoHideDuration={6000} onClose={handleSnackClose}>
                                    <Alert variant="filled" onClose={handleSnackClose} severity={errorHandler.code} sx={{ width: '100%' }}>
                                        {errorHandler.message}
                                    </Alert>
                                </Snackbar>

                                {partStateId ?
                                    <div className="d-flex justify-content-end">
                                        <div className='me-2'>
                                            <button type="button" className='btn btn-secondary' onClick={() => setOpenModal(true)}>Modify</button>
                                        </div>
                                        <div className='me-2'>
                                            <button type="button" className='btn btn-danger' onClick={() => { setPartStateId(null); setPartData(initialPartData) }}>Cancel</button>
                                        </div>
                                    </div> : <div className='col d-flex justify-content-end mb-2' >
                                        <div>
                                            <button type="button" className='btn btn-warning' onClick={() => setOpenModal(true)}>+ Add PartDataBase</button>
                                        </div>
                                    </div>}
                                {partStateId ? <Dialog
                                    open={openModal}
                                    onClose={() => setOpenModal(false)}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {" Part update confirmation?"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Are you sure to update the Part
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => setOpenModal(false)}>Cancel</Button>
                                        <Button onClick={() => { updatePartData(); setOpenModal(false); }} autoFocus>
                                            Update
                                        </Button>
                                    </DialogActions>
                                </Dialog> :
                                    <Dialog
                                        open={openModal}
                                        onClose={() => setOpenModal(false)}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">
                                            {" Part create confirmation?"}
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Are you sure to add the Part
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
                                            <Button onClick={(e) => { partSubmit(e); setOpenModal(false); }} autoFocus>
                                                Add
                                            </Button>
                                        </DialogActions>
                                    </Dialog>}



                            </Paper>
                        </Grid>



                        <Grid item xs={12} >
                            <Paper sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',

                            }} >
                                <div>
                                    <h5 className='text-center'>Part List</h5>
                                    <div className="row mb-2">
                                        <div className="col d-flex justify-content-end">
                                            {partSelectedRowIds.length !== 0 && <Button variant='contained' type='button' color='error' onClick={() => setDeleteModal(true)}>Delete </Button>}
                                        </div>
                                    </div>

                                    <div style={{ height: 400, width: '100%' }}>
                                        <DataGrid
                                            rows={partDataList}
                                            columns={partColumns}
                                            getRowId={(row) => row._id}
                                            initialState={{
                                                pagination: {
                                                    paginationModel: { page: 0, pageSize: 5 },
                                                },
                                            }}
                                            pageSizeOptions={[5, 10]}
                                            onRowSelectionModelChange={(newRowSelectionModel, event) => {
                                                setPartSelectedRowIds(newRowSelectionModel);
                                                console.log(event)

                                            }}
                                            onRowClick={updatePart}

                                            checkboxSelection


                                        >

                                        </DataGrid>




                                    </div>







                                    {/*<div style={style} className='table-responsive'>
                                        <table className='table table-bordered text-center'>
                                            <tbody>
                                                <tr>
                                                    <th>Sr.No</th>
                                                    <th>Part No</th>
                                                    <th width="20%">Part Name</th>
                                                    <th width="25%">Customer</th>
                                                    <th>Operation No.</th>
                                                    <th>Status</th>
                                                    <th>Delete</th>
                                                </tr>
                                                {partDataList.map((item, index) => (
                                                    <tr onClick={() => updatePart(item)} >
                                                        <td>{index + 1}</td>
                                                        <td>{item.partNo}</td>
                                                        <td>{item.partName}</td>
                                                        <td>{item.customer}</td>
                                                        <td>{item.operationNo}</td>
                                                        <td>{item.partStatus}</td>
                                                        <td><button type="button" className='btn btn-danger' onClick={() => setDeleteModal(true)}><i class="bi bi-trash-fill"></i></button></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table></div>*/}
                                    <Dialog
                                        open={deleteModal}
                                        onClose={() => setDeleteModal(false)}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">
                                            {"Part delete confirmation?"}
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Are you sure to delete the Part
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={() => setDeleteModal(false)}>Cancel</Button>
                                            <Button onClick={() => { deletePartData(); setDeleteModal(false); }} autoFocus>
                                                Delete
                                            </Button>
                                        </DialogActions>
                                    </Dialog>

                                </div>
                            </Paper>
                        </Grid>

                    </Grid>
                </Box>

            </form>
        </div>
    )
}


