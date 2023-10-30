import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { indigo } from '@mui/material/colors';

const Vendor = () => {




    const [vendorStateId, setVendorStateId] = useState("")
    const initialVendorData = {

        vendorCode: "",
        aliasName: "",
        fullName: "",
        dateOfReg: "",
        address: "",
        state: "",
        city: "",
        oem: "",
        customer: "",
        supplier: "",
        subContractor: "",
        vendorContacts: [{ name: "", contactNumber: "", mailId: "", vcStatus: "" }],
        certificate: "",
        certificateValidity: "",
        vendorStatus: "",
    }

    const [vendorData, setVendorData] = useState({
        vendorCode: "",
        aliasName: "",
        fullName: "",
        dateOfReg: "",
        address: "",
        state: "",
        city: "",
        oem: "",
        customer: "",
        supplier: "",
        subContractor: "",
        vendorContacts: [{ name: "", contactNumber: "", mailId: "", vcStatus: "" }],
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




    console.log(vendorData)

    const [vendorDataList, setVendorDataList] = useState([])
    const vendorFetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PORT}/vendor/getAllVendors`
            );
            setVendorDataList(response.data);
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
            vendorFetchData();
            setVendorData(initialVendorData);
        } catch (err) {
            console.log(err);
            alert(err);
        }
    };
    console.log()

    const updateVendorData = async (id) => {
        try {
            await axios.put(
                "http://localhost:3001/vendor/updateVendor/" + id, vendorData
            );
            vendorFetchData();
            setVendorStateId(null)
            setVendorData(initialVendorData);
            console.log("Vendor Updated Successfully");
        } catch (err) {
            console.log(err);
        }
    };

    const deleteVendorData = async (id) => {
        try {
            await axios.delete(
                "http://localhost:3001/vendor/deleteVendor/" + id, vendorData
            );
            vendorFetchData();
            setVendorData(initialVendorData);
            console.log("Vendor delete Successfully");
        } catch (err) {
            console.log(err);
        }
    };



    const updateVendor = async (item) => {
        setVendorData(item)
        setVendorStateId(item._id)
    }




    const handleVendorDataBaseChange = (e) => {
        const { name, checked, type } = e.target;
        let value = e.target.value;
        if (type === "checkbox") {
            value = checked ? "1" : "0";
        }

        setVendorData((prev) => ({ ...prev, [name]: value }));

    };



    const bodyTxt = {
        borderRadius: "10px",

        padding: "2rem",
        margin: "1rem",
        boxShadow: "0px 0px 25px 10px",
    }
    return (
        <div className='container'>
            <div style={bodyTxt}>
                <form>
                    <div className='row g-2'>
                        <div className='col'>
                            <h1 className='text-center'>Vendor DataBase</h1>
                        </div>
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
                    </div>
                    <div className='row mb-2 g-2'>
                        <div className="form-floating col-3">
                            <input type="text" className="form-control" id="vendorCodeId" name="vendorCode" placeholder="vendorCode" value={vendorData.vendorCode} onChange={handleVendorDataBaseChange} />
                            <label htmlFor="vendorCodeId">Vendor Code</label>
                        </div>
                        <div className="form-floating  col">
                            <input type="text" className="form-control" id="aliasNameId" name="aliasName" placeholder="aliasName" value={vendorData.aliasName} onChange={handleVendorDataBaseChange} />
                            <label htmlFor="aliasNameId">Alias Name</label>
                        </div>
                        <div className="form-floating  col">
                            <input type="text" className="form-control" id="fullNameId" name="fullName" placeholder="fullName" value={vendorData.fullName} onChange={handleVendorDataBaseChange} />
                            <label htmlFor="fullNameId">full Name</label>
                        </div>
                        <div className="form-floating  col">
                            <input type="date" className="form-control" id="dateOfRegId" name="dateOfReg" placeholder="dateOfReg" value={vendorData.dateOfReg} onChange={handleVendorDataBaseChange} />
                            <label htmlFor="dateOfRegId">Data Of Reg</label>
                        </div>
                    </div>
                    <div className="row g-2">
                        <div className='col-md-6  '>
                            <div class="form-floating mb-2">
                                <textarea className="form-control" id="addressId" placeholder="address" name="address" value={vendorData.address} style={{ height: "50px" }} onChange={handleVendorDataBaseChange}></textarea>
                                <label htmlFor="addressId">Address</label>
                            </div>
                            <div className='row g-2'>

                                <Autocomplete
                                    id="stateId"
                                    onChange={(event, newValue) => {
                                        setStateName(newValue);
                                        setVendorData((prev) => ({ ...prev, state: newValue }))
                                    }}
                                    // name="state"
                                    options={AllStates}
                                    sx={{ width: 200 }}
                                    value={vendorData.state}
                                    isOptionEqualToValue={(option) => option}
                                    renderInput={(params) => <TextField {...params} label="state" name="state" />} // Set the name attribute to "state"
                                />


                                <Autocomplete
                                    id="cityId"
                                    onChange={(event, newValue) => {
                                        setStateName(newValue);
                                        setVendorData((prev) => ({ ...prev, city: newValue }))
                                    }}
                                    // name="state"
                                    options={cityByState.map((item) => item.name)}
                                    sx={{ width: 200 }}
                                    value={vendorData.city}
                                    isOptionEqualToValue={(option) => option}
                                    renderInput={(params) => <TextField {...params} label="city" name="city" />} // Set the name attribute to "state"
                                />

                                <div className="form-floating mb-2 col">

                                    <select onChange={handleVendorDataBaseChange} value={vendorData.vendorStatus} className="form-select" id="vendorStatusId" name="vendorStatus" >
                                        <option value="">vendor Status</option>
                                        <option value="Active">Active</option>
                                        <option value="InActive">InActive</option>
                                        <option value="Relieved">Relieved</option>
                                    </select>
                                    <label htmlFor="vendorStatusId">vendor Status</label>
                                </div>

                            </div>
                            <div className=" row g-2">

                                <div className="form-floating me-4 mb-4 col-6">
                                    <input type="date" className="form-control" id="certificateValidityId" name="certificateValidity" placeholder="certificateValidity" value={vendorData.certificateValidity} onChange={handleVendorDataBaseChange} />
                                    <label htmlFor="certificateValidityId">Certificate Validity</label>
                                </div>


                                <div className='me-2 col'>
                                    <label className='certificateuplod'>
                                        <input className="form-control certificatedownlod" type="file" id="certificateUpload" />Certificate Upload </label>
                                </div>

                            </div>

                        </div>
                        <div className='col-md-6'>
                            <div>
                                <table className='table table-bordered table-responsive text-center'>
                                    <tbody>
                                        <tr>
                                            <th>Si.No</th>
                                            <th>Name</th>
                                            <th>Contact Number</th>
                                            <th>Mail Id</th>
                                            <th>Status</th>
                                        </tr>
                                        {vendorData.vendorContacts.map((item, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td><input type="text" className='form-control' id="nameId" name="name" value={vendorData.vendorContacts.name} /></td>
                                                <td><input type="text" className='form-control' id="contactNumber" name="contactNumber" value={vendorData.vendorContacts.contactNumber} /></td>
                                                <td><input type="text" className='form-control' id="mailId" name="mailId" value={vendorData.vendorContacts.mailId} /></td>
                                                <td><input type="text" className='form-control' id="vcStatusId" name="vcStatus" value={vendorData.vendorContacts.vcStatus} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
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
                                    <button type="button" className='btn btn-secondary' onClick={() => updateVendorData(vendorStateId)}>Modify</button>
                                </div>
                                <div className='me-2' >
                                    <button type="button" className='btn btn-secondary' onClick={() => { setVendorStateId(null); setVendorData(initialVendorData) }}>Cancel</button>
                                </div>
                            </div>: <div className='col d-flex justify-content-end mb-2'>
                                <div >
                                    <button type="button" className='btn btn-warning' onClick={vendorSubmit}>+ Add Vendor</button>
                                </div>
                            </div>}

                        </div>
                    </div>
                    <hr />
                    <div className='mb-5'>
                        <h3 className='text-center'>Vendor List</h3>
                        <div className='row mb-2  g-2'>
                            <div class="form-floating-sm  col-2">
                                <select className="form-select form-select-sm" id="vendorTypeId" name="vendorType" aria-label="Floating label select example">
                                    <option selected>Vendor Type</option>
                                    <option value="1">OME</option>
                                    <option value="2">Customer</option>
                                    <option value="3">Supplier</option>
                                    <option value="4">SubContractor</option>
                                </select>

                            </div>
                        </div>
                        <table className='table table-bordered text-center'>
                            <tbody>
                                <tr>
                                    <th>Si.No</th>
                                    <th>vendor Code</th>
                                    <th>Vendor Name</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Vendor Type</th>
                                    <th>Status</th>
                                    <th>Delete</th>
                                </tr>
                                {vendorDataList.map((item, index) => (
                                    <tr onClick={() => updateVendor(item)}>
                                        <td>{index + 1}</td>

                                        <td>{item.vendorCode}</td>
                                        <td>{item.fullName}</td>
                                        <td>{item.city}</td>
                                        <td>{item.state}</td>
                                        <td>{`${item.supplier} ${item.oem} ${item.customer} ${item.subContractor}`}</td>

                                        <td>{item.vendorStatus}</td>
                                        <td><button type='button' className='btn btn-danger' onClick={() => deleteVendorData(item._id)} ><i class="bi bi-trash-fill"></i></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>




                </form>
            </div>
        </div>
    )
}

export default Vendor