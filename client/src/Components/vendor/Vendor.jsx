import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Autocomplete from '@mui/material/Autocomplete';
import { TextField, MenuItem, styled, Button, ButtonGroup, Chip, FormControl, OutlinedInput, Fab } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Container, Paper } from '@mui/material';
import { Box, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Add, Remove } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const Vendor = () => {


    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarOpen(false);
    }

    const [errorhandler, setErrorHandler] = useState({})
    console.log(errorhandler)

    const [filteredData, setFilteredData] = useState([])

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (value === "all") {
            setFilteredData(vendorDataList)
        } else {
            if (value === "oem") {
                const vendorType = vendorDataList.filter((item) => (item.oem === "1"))
                setFilteredData(vendorType)
            }
            if (value === "customer") {
                const vendorType = vendorDataList.filter((item) => (item.customer === "1"))
                setFilteredData(vendorType)
            }
            if (value === "supplier") {
                const vendorType = vendorDataList.filter((item) => (item.supplier === "1"))
                setFilteredData(vendorType)
            }
            if (value === "subContractor") {
                const vendorType = vendorDataList.filter((item) => (item.subContractor === "1"))
                setFilteredData(vendorType)
            }



        }


    };


    const [vendorStateId, setVendorStateId] = useState("")
    const initialVendorData = {

        vendorCode: "",
        aliasName: "",
        fullName: "",
        dor: "",
        address: "",
        state: "",
        city: "",
        oem: "",
        customer: "",
        supplier: "",
        subContractor: "",
        vendorContacts: [],
        certificate: "",
        certificateValidity: "",
        vendorStatus: "",
    }

    const [vendorData, setVendorData] = useState({
        vendorCode: "",
        aliasName: "",
        fullName: "",
        dor: "",
        address: "",
        state: "",
        city: "",
        oem: "",
        customer: "",
        supplier: "",
        subContractor: "",
        vendorContacts: [],
        certificate: "",
        certificateValidity: "",
        vendorStatus: "",


    })


    const [AllStates, setAllStates] = useState([]);
    const [StateName, setStateName] = useState(null)
    console.log(process.env.REACT_APP_PORT)
    const StateData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/general/getAllStateAndCity`
            );
            console.log(response)
            setAllStates(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        StateData();
    }, []);
    console.log(AllStates)

    const [cityByState, setCityByState] = useState([])
    const cityFetch = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/general/getCityByStateName/${StateName}`
            );
            setCityByState(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    //get Designations
    useEffect(() => {
        if (vendorData.state) {
            cityFetch();
        }


    }, [vendorData.state]);



    const addVendorDataRow = () => {
        setVendorData((prevVendorData) => ({
            ...prevVendorData,
            vendorContacts: [...prevVendorData.vendorContacts, { name: "", contactNumber: "", mailId: "", vcStatus: "" }]
        }))
    }

    const deleteVendorRow = (index) => {
        setVendorData((prevVendorData) => {
            const updateCP = [...prevVendorData.vendorContacts]
            updateCP.splice(index, 1);
            return {
                ...prevVendorData, vendorContacts: updateCP,
            };
        })
    };
    const changeVendorRow = (index, name, value) => {
        const formattedValue = name === 'name'
            ? value.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
            : value;
        setVendorData((prevVendorData) => {
            const updateCP = [...prevVendorData.vendorContacts]
            updateCP[index] = {
                ...updateCP[index], [name]: formattedValue,
            };
            return {
                ...prevVendorData, vendorContacts: updateCP,
            };
        })
    };



    console.log(vendorData)

    const [vendorDataList, setVendorDataList] = useState([])
    const vendorFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getAllVendors`
            );
            setVendorDataList(response.data.result);
            setFilteredData(response.data.result);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        vendorFetchData();
    }, []);
    console.log(vendorDataList)

    const vendorSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/vendor/createVendor`, vendorData
            );
            {/*console.log(response.data.message)*/ }
            console.log(response)
            setSnackBarOpen(true)
            vendorFetchData();
            setVendorData(initialVendorData);
            console.log("Vendor Create successfully");
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
        } catch (err) {



            setSnackBarOpen(true)

            if (err.response && err.response.status === 400) {
                // Handle validation errors
                console.log(err);
                const errorData400 = err.response.data.errors;
                const errorMessages400 = Object.values(errorData400).join(', ');
                console.log(errorMessages400)
                setErrorHandler({ status: 0, message: errorMessages400, code: "error" });
            } else if (err.response && err.response.status === 500) {
                // Handle other errors
                console.log(err);
                const errorData500 = err.response.data.error;
                const errorMessages500 = Object.values(errorData500).join(', ');
                console.log(errorMessages500)
                setErrorHandler({ status: 0, message: errorMessages500, code: "error" });
            } else {
                console.log(err);
                console.log(err.response.data.error)
                setErrorHandler({ status: 0, message: "An error occurred", code: "error" });
            }


            console.log(err);

        }
    };
    console.log()

    const updateVendorData = async () => {
        try {
            const response = await axios.put(
                "http://localhost:3001/vendor/updateVendor/" + vendorStateId, vendorData
            );
            setSnackBarOpen(true)
            vendorFetchData();

            setVendorStateId(null)
            setVendorData(initialVendorData);
            console.log("Vendor Updated Successfully");
            setErrorHandler({ status: response.data.status, message: response.data.message, code: "success" })
        } catch (err) {

            setSnackBarOpen(true)

            if (err.response && err.response.status === 400) {
                // Handle validation errors
                console.log(err);
                const errorData400 = err.response.data.errors;
                const errorMessages400 = Object.values(errorData400).join(', ');
                console.log(errorMessages400)
                setErrorHandler({ status: 0, message: errorMessages400, code: "error" });
            } else if (err.response && err.response.status === 500) {
                // Handle other errors
                console.log(err);
                const errorData500 = err.response.data.error;
                const errorMessages500 = Object.values(errorData500);
                console.log(errorMessages500)
                setErrorHandler({ status: 0, message: errorMessages500, code: "error" });
            } else {
                console.log(err);
                console.log(err.response.data.error)
                setErrorHandler({ status: 0, message: "An error occurred", code: "error" });
            }



            console.log(err);
        }
    };

    const deleteVendorData = async () => {
        try {
            const response = await axios.delete(
                "http://localhost:3001/vendor/deleteVendor/" + vendorStateId, vendorData
            );
            vendorFetchData();
            setVendorStateId(null)
            setVendorData(initialVendorData);
            setSnackBarOpen(true)
            setErrorHandler({ status: response.data.status, message: `${response.data.result.fullName} ${response.data.message}`, code: "success" })
            console.log(response.data);
        } catch (err) {
            setSnackBarOpen(true)

            if (err.response && err.response.status === 400) {
                // Handle validation errors
                console.log(err);
                const errorData400 = err.response.data.errors;
                const errorMessages400 = Object.values(errorData400).join(', ');
                console.log(errorMessages400)
                setErrorHandler({ status: 0, message: errorMessages400, code: "error" });
            } else if (err.response && err.response.status === 500) {
                // Handle other errors
                console.log(err);
                const errorData500 = err.response.data.error;
                const errorMessages500 = Object.values(errorData500).join(', ');
                console.log(errorMessages500)
                setErrorHandler({ status: 0, message: errorMessages500, code: "error" });
            } else {
                console.log(err);
                console.log(err.response.data.error)
                setErrorHandler({ status: 0, message: "An error occurred", code: "error" });
            }



            console.log(err);
        }
    };

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
            setVendorData((prev) => ({ ...prev, [name]: formattedValue })); // Update the state with the formatted value


        }
    };

    // const handleKeyDownForContacts = (event) => {
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
    //         setVendorData((prevVendorData) => ({
    //             ...prevVendorData,
    //             vendorContacts: [{ ...prevVendorData.vendorContacts, [name]: formattedValue }]
    //         }))


    //     }
    // };





    const updateVendor = async (item) => {
        setVendorData(item)
        setVendorStateId(item._id)
    }

    //Dateformat

    const currentDate = new Date();
    console.log(currentDate)
    const currentDay = currentDate.getDate().toString();
    const currentMonth = (currentDate.getMonth() + 1).toString();
    const currentYear = currentDate.getFullYear().toString();
    const DateFormat = currentYear + "-" + currentMonth + "-" + currentDay

    console.log(currentDay + "-" + currentMonth + "-" + currentYear)


    const handleVendorDataBaseChange = (e) => {
        const { name, checked, type } = e.target;
        let value = e.target.value;
        if (type === "checkbox") {
            value = checked ? "1" : "0";
        }

        setVendorData((prev) => ({ ...prev, [name]: value }));

    };

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setVendorData((prev) => ({ ...prev, certificate: e.target.files[0].name }));
    };

    const handleFileUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch("http://localhost:3001/upload/VendorCertificateUpload", {
                method: 'POST',
                body: formData,
            });
            console.log(response)
            if (response.ok) {
                setSnackBarOpen(true);
                console.log('File uploaded successfully');

                setErrorHandler({ status: 1, message: "Vendor Certificate Uploaded Successfully", code: "success" });
            }
        } catch (error) {
            console.error('Error uploading the file:', error);
        }
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const [openModalVendor, setOpenModalVendor] = useState(false);
    const [deleteModalVendor, setDeleteModalVendor] = useState(false);



    return (
        <div >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Container maxWidth="lg" sx={{ mt: 4 }}>
                    <form>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 2
                            }}
                        >



                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }}  >

                                <Grid item xs={2}>

                                    <TextField label="Vendor Code"
                                        id="vendorCodeId"
                                        defaultValue=""
                                        size="small"
                                        sx={{ width: "100%" }}
                                        value={vendorData.vendorCode}
                                        onChange={handleVendorDataBaseChange}
                                        name="vendorCode" />

                                </Grid>
                                <Grid item xs={3}>

                                    <TextField label="Alias Name"
                                        id="aliasNameId"
                                        defaultValue=""
                                        size="small"
                                        sx={{ width: "100%" }}
                                        onKeyDown={handleKeyDown}
                                        value={vendorData.aliasName}
                                        onChange={handleVendorDataBaseChange}
                                        name="aliasName" />

                                </Grid>
                                <Grid item xs={4}>
                                    <TextField label="Full Name"
                                        id="fullNameId"
                                        defaultValue=""
                                        size="small"
                                        sx={{ width: "100%" }}
                                        value={vendorData.fullName}
                                        onKeyDown={handleKeyDown}
                                        onChange={handleVendorDataBaseChange}
                                        name="fullName" />

                                </Grid>

                                <Grid item xs={3}>
                                    <div className="col">
                                        <DatePicker
                                            disableFuture
                                            fullWidth
                                            id="dorId"
                                            name="dor"
                                            value={dayjs(vendorData.dor)}
                                            onChange={(newValue) =>
                                                setVendorData((prev) => ({ ...prev, dor: newValue.format("YYYY-MM-DD") }))
                                            }
                                            label="DOR"

                                            slotProps={{ textField: { size: 'small' } }}
                                            format="DD-MM-YYYY" />
                                    </div>

                                </Grid>


                            </Grid>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} className='mt-1' >

                                <Grid item xs={6}>
                                    <TextField label="Address"
                                        id="addressId"
                                        defaultValue=""
                                        size="small"
                                        sx={{ width: "100%" }}
                                        value={vendorData.address}
                                        onKeyDown={handleKeyDown}
                                        onChange={handleVendorDataBaseChange}
                                        name="address" />

                                </Grid>


                                <Grid item xs={6} >
                                    <div className='col  d-flex justify-content-end '>
                                        <div class="form-check form-check-inline ">
                                            <input className="form-check-input" type="checkbox" checked={vendorData.oem === "1"} onChange={handleVendorDataBaseChange} id="oemId" name="oem" />
                                            <label className="form-check-label" htmlFor="oemId">OEM</label>
                                        </div>
                                        <div class="form-check form-check-inline ">
                                            <input className="form-check-input" type="checkbox" checked={vendorData.customer === "1"} onChange={handleVendorDataBaseChange} id="customerId" name="customer" />
                                            <label className="form-check-label" htmlFor="customerId">Customer</label>
                                        </div>
                                        <div class="form-check form-check-inline ">
                                            <input className="form-check-input" type="checkbox" checked={vendorData.supplier === "1"} onChange={handleVendorDataBaseChange} id="supplierId" name="supplier" />
                                            <label className="form-check-label" htmlFor="supplierId">Supplier</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" checked={vendorData.subContractor === "1"} onChange={handleVendorDataBaseChange} id="subContractorId" name="subContractor" />
                                            <label className="form-check-label" htmlFor="subContractorId">SubContractor</label>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>







                        </Paper>






                        <div className="row g-2 mb-3">

                            <Paper
                                sx={{
                                    p: 2,
                                    marginRight: 2

                                }}
                                className='col'
                            >


                                <div className="row g-2 mb-2">
                                    <Autocomplete
                                        id="stateId"
                                        onChange={(event, newValue) => {
                                            setStateName(newValue);
                                            setVendorData((prev) => ({ ...prev, state: newValue }))
                                        }}
                                        // name="state"
                                        options={AllStates}
                                        fullWidth
                                        size='small'
                                        className='col'

                                        value={vendorData.state}
                                        isOptionEqualToValue={(option) => option}
                                        renderInput={(params) => <TextField {...params} label="State" name="State" />} // Set the name attribute to "state"
                                    />


                                    <Autocomplete
                                        id="cityId"
                                        onChange={(event, newValue) => {
                                            setStateName(newValue);
                                            setVendorData((prev) => ({ ...prev, city: newValue }))
                                        }}
                                        // name="state"
                                        options={cityByState.map((item) => item.name)}

                                        value={vendorData.city}
                                        size='small'
                                        className='col'
                                        fullWidth
                                        isOptionEqualToValue={(option) => option}
                                        renderInput={(params) => <TextField {...params} label="City" name="City" />} // Set the name attribute to "state"
                                    />
                                </div>



                                {/* <select onChange={handleVendorDataBaseChange} value={vendorData.vendorStatus} className="form-select" id="vendorStatusId" name="vendorStatus" >
                                            <option value="">-select-</option>
                                            <option value="Active">Active</option>
                                            <option value="InActive">InActive</option>
                                            <option value="Relieved">Relieved</option>
                                        </select>
                                        <label htmlFor="vendorStatusId">Vendor Status</label>*/}



                                <div className=" row g-2 mb-2">



                                    <div className="col-md-6">
                                        <TextField fullWidth label="VendorStatus" onChange={handleVendorDataBaseChange} value={vendorData.vendorStatus} className="col" select size="small" id="vendorStatusId" name="vendorStatus" defaultValue="" >

                                            <MenuItem value="Active">Active</MenuItem >
                                            <MenuItem value="InActive">InActive</MenuItem >


                                        </TextField>
                                    </div>





                                    <div className='col-md-6'>

                                        <DatePicker
                                            fullWidth
                                            id="certificateValidityId"
                                            name="certificateValidity"
                                            value={dayjs(vendorData.certificateValidity)}
                                            onChange={(newValue) =>
                                                setVendorData((prev) => ({ ...prev, certificateValidity: newValue.format("YYYY-MM-DD") }))
                                            }
                                            label="Certificate Validiy"

                                            slotProps={{ textField: { size: 'small' } }}
                                            format="DD-MM-YYYY" />
                                    </div>



                                    {/*<div className="form-floating me-4 mb-4 col">
                                        <input type="date" className="form-control" id="certificateValidityId" name="certificateValidity" placeholder="certificateValidity" value={vendorData.certificateValidity} onChange={handleVendorDataBaseChange} />
                                        <label htmlFor="certificateValidityId">Certificate Validity</label>
                                    </div>*/}



                                </div>
                                <div className="row">
                                    <ButtonGroup className='col' >

                                        <Button component="label" variant='contained' sx={{ width: "80%" }}>
                                            Certificate
                                            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                                        </Button>

                                        <Button variant='outlined' sx={{ width: "20%" }} startIcon={<CloudUploadIcon />} type='button' className='btn btn-info' onClick={handleFileUpload}>Upload</Button>

                                    </ButtonGroup>




                                </div>

                            </Paper>



                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',

                                }}
                                className='col'
                            >
                                <div style={{ maxHeight: "200px", overflow: "auto" }}>
                                    <table className='table table-sm table-bordered table-responsive text-center align-middle'>
                                        <tbody>
                                            <tr style={{ fontSize: "14px" }}>
                                                <th width={"5%"}>Si.No</th>
                                                <th>Name</th>
                                                <th width={"20%"}>Contact Number</th>
                                                <th>Mail Id</th>
                                                <th width={"15%"}>Status</th>
                                                <th width={"10%"}> <Fab size='small' color="primary" aria-label="add" onClick={() => addVendorDataRow()}>
                                                    <Add />
                                                </Fab></th>
                                            </tr>
                                            {vendorData.vendorContacts ? vendorData.vendorContacts.map((item, index) => (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td><input type="text" className='form-control form-control-sm' id="nameId" name="name" value={item.name} onChange={(e) => changeVendorRow(index, e.target.name, e.target.value)} /></td>
                                                    <td><input type="number" className={`form-control form-control-sm ${item.contactNumber.length !== 10 ? 'is-invalid' : 'is-valid'}`} id="contactNumber" name="contactNumber" value={item.contactNumber} onChange={(e) => changeVendorRow(index, e.target.name, e.target.value)} /></td>
                                                    <td><input type="text" className='form-control form-control-sm' id="mailId" name="mailId" value={item.mailId} onChange={(e) => changeVendorRow(index, e.target.name, e.target.value)} /></td>

                                                    <td> <select className="form-select form-select-sm" id="vcStatusId" name="vcStatus" value={item.vcStatus} onChange={(e) => changeVendorRow(index, e.target.name, e.target.value)} aria-label="Floating label select example">
                                                        <option selected>-select-</option>
                                                        <option value="Active">Active</option>
                                                        <option value="InActive">InActive</option>


                                                    </select></td>
                                                    <td >
                                                        <Fab size='small' color="error" aria-label="add" onClick={() => deleteVendorRow(index)}>
                                                            <Remove />
                                                        </Fab></td>
                                                </tr>
                                            )) : <tr></tr>}
                                        </tbody>
                                    </table>
                                </div>

                            </Paper>

                        </div>

                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                mb: 2
                            }}
                        >
                            <div className='row' >
                                <div className='col  d-flex justify-content-end mb-2'>
                                    <div className='col  d-flex'>
                                        <div className='me-2' >
                                            <label className='upload'>
                                                <input className="form-control download" type="file" id="upload" />Upload</label>
                                        </div>
                                        <div className='me-2'>
                                            <label className='upload'>
                                                <input className="form-control download" type="file" id="download" />Download </label>
                                        </div>
                                    </div>
                                    {vendorStateId ?
                                        <div className='d-flex justify-content-end'>
                                            <div className='me-2' >
                                                <button type="button" className='btn btn-info' onClick={() => setOpenModalVendor(true)}>Modify</button>
                                            </div>
                                            <div className='me-2' >
                                                <button type="button" className='btn btn-danger' onClick={() => { setVendorStateId(null); setVendorData(initialVendorData) }}>Cancel</button>
                                            </div>
                                        </div> : <div className='col d-flex justify-content-end mb-2'>
                                            <div >
                                                <button type="button" className='btn btn-warning' onClick={() => setOpenModalVendor(true)}>+ Add Vendor</button>
                                            </div>
                                        </div>}

                                </div>
                                {vendorStateId ? <Dialog
                                    open={openModalVendor}
                                    onClose={() => setOpenModalVendor(false)}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {" Vendor update confirmation?"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Are you sure to update the Vendor
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => setOpenModalVendor(false)}>Cancel</Button>
                                        <Button onClick={() => { updateVendorData(); setOpenModalVendor(false); }} autoFocus>
                                            Update
                                        </Button>
                                    </DialogActions>
                                </Dialog> :
                                    <Dialog
                                        open={openModalVendor}
                                        onClose={() => setOpenModalVendor(false)}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">
                                            {"Vendor create confirmation?"}
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Are you sure to add the Vendor
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={() => setOpenModalVendor(false)}>Cancel</Button>
                                            <Button onClick={(e) => { vendorSubmit(e); setOpenModalVendor(false); }} autoFocus>
                                                Add
                                            </Button>
                                        </DialogActions>
                                    </Dialog>}

                            </div>
                        </Paper>





                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',

                            }}
                        >

                            <h4 className='text-center'>Vendor List</h4>

                            <div class="col-3 mb-2">
                                <select className="form-select form-select-sm" id="vendorTypeId" name="vendorType" aria-label="Floating label select example" onChange={handleFilterChange} >
                                    <option value="all">All</option>
                                    <option value="oem">OEM</option>
                                    <option value="customer">Customer</option>
                                    <option value="supplier">Supplier</option>
                                    <option value="subContractor">SubContractor</option>
                                </select>

                            </div>

                            <table className='table table-bordered text-center'>
                                <tbody>
                                    <tr>
                                        <th>Si.No</th>
                                        <th>Vendor Code</th>
                                        <th>Vendor Name</th>
                                        <th>City</th>
                                        <th>State</th>
                                        <th>Vendor Type</th>
                                        <th>Status</th>
                                        <th>Delete</th>
                                    </tr>
                                    {filteredData.map((item, index) => (
                                        <tr onClick={() => updateVendor(item)}>
                                            <td>{index + 1}</td>

                                            <td>{item.vendorCode}</td>
                                            <td>{item.fullName}</td>
                                            <td>{item.city}</td>
                                            <td>{item.state}</td>
                                            <td>{`${item.supplier} ${item.oem} ${item.customer} ${item.subContractor}`}</td>

                                            <td>{item.vendorStatus}</td>
                                            <td><button type='button' className='btn btn-danger' onClick={() => setDeleteModalVendor(true)} ><i class="bi bi-trash-fill"></i></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <Dialog
                                open={deleteModalVendor}
                                onClose={() => setDeleteModalVendor(false)}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {" Vendor delete confirmation?"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Are you sure to delete the Vendor
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setDeleteModalVendor(false)}>Cancel</Button>
                                    <Button onClick={(e) => { deleteVendorData(e); setDeleteModalVendor(false); }} autoFocus>
                                        Delete
                                    </Button>
                                </DialogActions>
                            </Dialog>

                            <Snackbar variant="contained" anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBarOpen} autoHideDuration={6000} onClose={handleSnackClose}>
                                <Alert variant="filled" onClose={handleSnackClose} severity={errorhandler.code} sx={{ width: '100%' }}>
                                    {errorhandler.message}
                                </Alert>
                            </Snackbar>
                        </Paper>



                    </form>
                </Container>
            </LocalizationProvider>
        </div>
    )

}

export default Vendor