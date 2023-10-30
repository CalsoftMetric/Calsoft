import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const UnitDataBase = (unitTableStyle) => {

    const [unitStateId, setUnitStateId] = useState(null)
    const initialUnitData = {
        unitName: "",
    }


    const [unitData, setUnitData] = useState({
        unitName: "",
    })
    console.log(unitData)


    const [uintDataList, setUnitDataList] = useState([])
    const unitFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/unit/getAllUnits`
            );
            setUnitDataList(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        unitFetchData();
    }, []);
    console.log(uintDataList)


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
            unitFetchData();
            setUnitData(initialUnitData);
        } catch (err) {
            console.log(err);
            alert(err);
        }
    };

    const updateUnitData = async (id) => {
        try {
            await axios.put(
                "http://localhost:3001/unit/updateUnit/" + id, unitData
            );
            unitFetchData();
            setUnitData({
                unitName: ""
            });
            console.log("Unit Updated Successfully");
        } catch (err) {
            console.log(err);
        }
    };
    const deleteUnitData = async (id) => {
        try {
            await axios.delete(
                "http://localhost:3001/unit/deleteUnit/" + id, unitData
            );
            unitFetchData();
            setUnitData({
                unitName: ""
            });
            console.log("Unit delete Successfully");
        } catch (err) {
            console.log(err);
        }
    };




    const updateUnit = async (item) => {
        setUnitData(item)
        setUnitStateId(item._id)
    }
    console.log(unitStateId)


    const bodycss = {
        borderRadius: "10px",

        padding: "2rem",
        margin: "1rem",
        boxShadow: "0px 0px 10px 0px",
    }
    return (

        <div className='container'>
            <div style={bodycss} >
                <form>
                    <h1 className='text-center'>Unit DataBase</h1>
                    <div className='row g-2 mb-3'>
                        <div className="form-floating col-2">
                            <input type="text" className="form-control" id="unitSiId" name="unitSi" placeholder="unitSi" disabled value={uintDataList.length + 1} />
                            <label htmlFor="unitSiId">Si.No.</label>
                        </div>
                        <div className="form-floating col-10">
                            <input type="text" className="form-control" id="unitNameId" name="unitName" value={unitData.unitName} onChange={handleUnitDataBaseChange} placeholder="unitName" />
                            <label htmlFor="unitNameId">Unit Name</label>
                        </div>
                    </div>
                    <div className='col d-flex justify-content-end mb-2'>
                        {unitStateId ? <div className='d-flex justify-content-end'><div className='me-2' >
                            <button type="button" className='btn btn-secondary' onClick={() => updateUnitData(unitStateId)}>Modify</button>
                        </div>
                            <div className='me-2' >
                                <button type="button" className='btn btn-danger' onClick={() => { setUnitStateId(null); setUnitData(initialUnitData) }}>Cancel</button>
                            </div></div> : <div>
                            <button type="button" className='btn btn-warning ' onClick={unitSubmit}>+ Add UnitDataBase</button>
                        </div>}


                    </div>
                    <hr />

                    <div>
                        <h3 className='text-center'>Unit List</h3>
                        <div style={unitTableStyle.style} className='table-responsive'>
                            <table className='table table-bordered text-center'>
                                <tbody>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Unit Name</th>
                                        <th>Delete</th>
                                    </tr>
                                    {uintDataList.map((item, index) => (
                                        <tr onClick={() => updateUnit(item)}>
                                            <td>{index + 1}</td>
                                            <td>{item.unitName}</td>
                                            <td><button type='button' className='btn btn-danger' onClick={() => deleteUnitData(item._id)}><i class="bi bi-trash-fill"></i></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>

                </form>
            </div>
        </div>
    )
}

const PartDataBase = ({style, onDataReceived}) => {


    const [partStateId, setPartStateId] = useState("")
    const initialPartData = {

        partNo: "",
        partName: "",
        customer: "",
        operationNo: ""
    }


    const [partData, setPartData] = useState({
        partNo: "",
        partName: "",
        customer: "",
        operationNo: ""
    })
    console.log(partData)


    const [partDataList, setPartDataList] = useState([])
    const partFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/part/getAllParts`
            );
            setPartDataList(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        partFetchData();
    }, []);

    console.log(partDataList)




    const partSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_PORT}/part/createPart`, partData
            );
            {/*console.log(response.data.message)*/ }
            console.log(response)
            partFetchData();
            setPartData(initialPartData);
        } catch (err) {
            console.log(err);
            alert(err);
        }
    };
    const updatePartData = async (id) => {
        try {
            await axios.put(
                "http://localhost:3001/part/updatePart/" + id, partData
            );
            partFetchData();
            setPartData({
                partNo: "",
                partName: "",
                customer: "",
                operationNo: ""
            });
            console.log("Part Updated Successfully");
        } catch (err) {
            console.log(err);
        }
    };

    const deletePartData = async (id) => {
        try {
            await axios.delete(
                "http://localhost:3001/part/deletePart/" + id, partData
            );
            partFetchData();
            setPartData({
                partNo: "",
                partName: "",
                customer: "",
                operationNo: ""
            }); 
            console.log("Part delete Successfully");
        } catch (err) {
            console.log(err);
        }
    };
    console.log()





    const updatePart = async (item) => {
        setPartData(item)
        setPartStateId(item._id)
    }

    const handlePartDataBaseChange = (e) => {
        const { name, value } = e.target;
        setPartData((prev) => ({ ...prev, [name]: value }));

    };
    const bodyModel = {
        borderRadius: "10px",
        padding: "2rem",
        margin: "1rem",
        boxShadow: "0px 0px 10px 0px",
    }

    const sendDataToParent = () => {
        const data = "Data to be sent to parent component";
        onDataReceived(data);
    };
    sendDataToParent()
    return (

        <div className='container'>
            <div style={bodyModel}>
                <form>
                    <h1 className='text-center'>Part DataBase</h1>
                    <div>
                        <div className="row g-2 mb-2">
                            <div className="form-floating col-md-1">
                                <input type="text" className="form-control" id="partDbId" name="partDb" placeholder="partDb" disabled />
                                <label htmlFor="partDbId">Si.No.</label>
                            </div>
                            <div className="form-floating col-md-5">
                                <input type="text" className="form-control" id="partNoId" name="partNo" value={partData.partNo} onChange={handlePartDataBaseChange} placeholder="partNo" />
                                <label htmlFor="partNoId">Part No</label>
                            </div>
                            <div className="form-floating col">
                                <input type="text" className="form-control" id="partNameId" name="partName" value={partData.partName} onChange={handlePartDataBaseChange} placeholder="partName" />
                                <label htmlFor="partNameId">Part Name</label>
                            </div>
                        </div>


                        <div className="row mb-2 g-2">
                            <div className="form-floating col"  >
                                <input type="text" className="form-control" id="partNameId" name="customer" value={partData.customer} onChange={handlePartDataBaseChange} placeholder="customer" />
                                <label htmlFor="customerId">Customer</label>
                            </div>
                            <div className="form-floating col" >
                                <input type="text" className="form-control" id="operationNoId" name="operationNo" value={partData.operationNo} onChange={handlePartDataBaseChange} placeholder="operationNo" />
                                <label htmlFor="operationNoId">Operation No</label>
                            </div>

                        </div>

                    </div>
                    {partStateId ?
                        <div className="d-flex justify-content-end">
                            <div className='me-2'>
                                <button type="button" className='btn btn-secondary' onClick={() => updatePartData(partStateId)}>Modify</button>
                            </div>
                            <div className='me-2'>
                                <button type="button" className='btn btn-danger' onClick={() => { setPartStateId(null); setPartData(initialPartData) }}>Cancel</button>
                            </div>
                        </div> : <div className='col d-flex justify-content-end mb-2' >
                            <div>
                                <button type="button" className='btn btn-warning' onClick={partSubmit}>+ Add PartDataBase</button>
                            </div>
                        </div>}



                    <hr />

                    <div>
                        <h3 className='text-center'>Part List</h3>
                        <div style={style} className='table-responsive'>
                            <table className='table table-bordered'>
                                <tbody>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Part No</th>
                                        <th>Part Name</th>
                                        <th>Customer</th>
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
                                            <td><button type="button" className='btn btn-danger' onClick={() => deletePartData(item._id)}><i class="bi bi-trash-fill"></i></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table></div>

                    </div>
                </form>
            </div>
        </div>
    )
}


const General = () => {

    const tableStyle = {
        maxHeight: "300px",
        cursor: "pointer",
    }
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [errorhandler, setErrorHandler] = useState({})
    const [snackBarOpen, setSnackBarOpen] = useState(true)
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarOpen(false);
    }
    const handleDataReceived = (data) => {
        console.log('Data received from UnitDataBase:', data);
        // You can handle the received data here
    };
    handleDataReceived()
    

    return (
        <div>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Unit" />
                    <Tab label="Part" />
                    {/* <Tab label="Item Three" /> */}
                </Tabs>
            </Box>
            <div >
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBarOpen} autoHideDuration={6000} onClose={handleSnackClose}>
                        <Alert onClose={handleSnackClose} severity={errorhandler.code} sx={{ width: '25%' }}>
                            {errorhandler.message}
                        </Alert>
                    </Snackbar>
                {value === 0 && <div ><UnitDataBase style={tableStyle} /></div>}
                {value === 1 && <div ><PartDataBase style={tableStyle} onDataReceived={handleDataReceived}/></div>}
            </div>

        </div>



    )
}

export default General