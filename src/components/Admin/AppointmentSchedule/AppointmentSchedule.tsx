import { PDFExport } from '@progress/kendo-react-pdf';
import React, { useEffect, useRef, useState } from 'react'
import { downloadExcel } from 'react-export-table-to-excel';
import "../pdfStyles.css"
import Select from 'react-select'
import MyMap from '../../../container/Map';
import moment from 'moment';

function AppointmentSchedule(props: any) {
    const {
        screen
    } = props
    const [appointmentSchedule, setAppointmentSchedule] = useState<any>()
    const pdfExportComponent = useRef<PDFExport | null>(null);
    const [view, setView] = useState("Both View")
    const [selectedSchedule, setSelectedSchedule] = useState<string>("Yearly")
    const [refresh, setRefresh] = useState<number>(0)

    const optionArr = [
        { label: "Weekly", value: "Weekly" },
        { label: "Monthly", value: "Monthly" },
        { label: "Yearly", value: "Yearly" },
        { label: "Daily", value: "Daily" },
    ];

    const header = ["Time Slot", "Name", "Contact", "Address"];
    // const appointmentSchedule = [
    //     {
    //         time_slot: "10:00 AM",
    //         name: "John",
    //         contact: "123-456-7890",
    //         address: "123 Main St, Anytown, USA",
    //     },
    //     {
    //         time_slot: "11:00 AM",
    //         name: "Jane",
    //         contact: "987-654-3210",
    //         address: "456 Elm St, Othertown, USA",
    //     },
    //     {
    //         time_slot: "12:00 PM",
    //         name: "Alice",
    //         contact: "555-555-5555",
    //         address: "789 Oak St, Sometown, USA",
    //     },
    //     {
    //         time_slot: "1:00 PM",
    //         name: "Bob",
    //         contact: "444-444-4444",
    //         address: "321 Pine St, Anycity, USA",
    //     },
    //     {
    //         time_slot: "2:00 PM",
    //         name: "Eve",
    //         contact: "222-222-2222",
    //         address: "654 Maple St, Yourtown, USA",
    //     }
    // ];

    function handleDownloadExcel() {
        downloadExcel({
            fileName: "Appointment-Schedule",
            sheet: "Appointment",
            tablePayload: {
                header,
                body: appointmentSchedule?.map((item: any) => {
                    return {
                        timeslot:
                            item.timeslot?.split("-")?.length == 2 ?
                                `${moment(item.timeslot?.split("-")[0])?.format("YYYY-MM-DD")} - ${item?.timeslot?.split("-")[1]}` :
                                item.timeslot?.toUpperCase()
                        ,
                        name: item?.name,
                        phone: item?.phone,
                        address: item?.address
                    }
                }) || [],
            },
        });
    }

    const handleDownloadPDF = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
    }

    useEffect(() => {
        const requests = JSON.parse(localStorage.getItem('requests') || '[]');
        if (requests?.length > 0) {
            requests.map((item: any) => {
                return {
                    timeslot: item?.timeslot,
                    name: item?.name,
                    phone: item?.phone,
                    address: item?.address
                }
            })
            setAppointmentSchedule(requests)
        }
    }, [])


    return (
        <div className='h-full divide-y divide-slate-300'>
            <div className='p-5'>
                <p className='font-bold text-xl'>Appointment Request</p>
            </div>
            {appointmentSchedule?.length > 0 ?
                <div className='p-5'>
                    <div className={`flex ${screen <= 425 ? "flex-col align-middle" : ""} justify-between mb-3 text-slate-950`}>
                        <div className={`grid grid-cols-${screen <= 494 ? "1" : "2"} gap-4`}>
                            <Select
                                className='min-w-40'
                                options={optionArr}
                                value={optionArr?.find((item) => item?.value == selectedSchedule)}
                                onChange={(select) => {
                                    if (select?.value) {
                                        setSelectedSchedule(select?.value);
                                    } else {
                                        setSelectedSchedule("");
                                        const requests = JSON.parse(localStorage.getItem('requests') || '[]');
                                        if (requests?.length > 0) {
                                            requests.map((item: any) => {
                                                return {
                                                    timeslot: item?.timeslot,
                                                    name: item?.name,
                                                    phone: item?.phone,
                                                    address: item?.address
                                                }
                                            })
                                            setAppointmentSchedule(requests)
                                        }
                                    }
                                }}
                            />
                            <button
                                onClick={() => {
                                    const now = moment();
                                    const filteredAppointments = appointmentSchedule?.filter((item: any) => {
                                        if (item.timeslot.split("-")?.length === 2) {
                                            const itemDate = moment(item.timeslot.split("-")[0]);

                                            if (selectedSchedule === "Daily") {
                                                return itemDate.isSame(now, 'day');
                                            }
                                            if (selectedSchedule === "Weekly") {
                                                return itemDate.isSame(now, 'week');
                                            }
                                            if (selectedSchedule === "Monthly") {
                                                return itemDate.isSame(now, 'month');
                                            }
                                            if (selectedSchedule === "Yearly") {
                                                return itemDate.isSame(now, 'year');
                                            }
                                        }
                                        return true;
                                    });
                                    setAppointmentSchedule(filteredAppointments)
                                    setRefresh(refresh + 1)
                                }}
                                type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Generate</button>
                        </div>
                        <section className="flex justify-center items-center gap-1">
                            <div className="relative inline-block group">
                                <button
                                    onClick={() => handleDownloadPDF()}
                                    className="hover:cursor-pointer hover:bg-[#7289da] p-2 rounded-full transition-all duration-500"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="25"
                                        height="25"
                                        viewBox="0 0 30 30"
                                    >
                                        <path
                                            fill="white"
                                            d="M7 3a2 2 0 0 0-2 2v21a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V10.5a1 1 0 0 0-.293-.707l-6.5-6.5A1 1 0 0 0 17.5 3zm10 1.904L23.096 11H18a1 1 0 0 1-1-1zM9.568 15.17q.461 0 .907.086.446.084.795.334t.57.705q.219.457.219 1.185 0 .66-.184 1.12a2.1 2.1 0 0 1-.494.75 1.9 1.9 0 0 1-.717.42q-.405.13-.834.13H9.7q-.092 0-.19-.005-.1-.005-.196-.014a1 1 0 0 1-.134-.022v2.41H7.92v-6.93q.36-.078.79-.124.43-.045.858-.045m5.08 0q.83 0 1.385.256.556.255.89.719.336.465.475 1.115.14.65.141 1.45 0 .731-.135 1.395-.134.665-.474 1.17a2.44 2.44 0 0 1-.922.805q-.58.3-1.46.3-.13 0-.35-.01t-.46-.024q-.24-.016-.46-.032a4 4 0 0 1-.34-.035v-7.01q.18-.03.406-.044l.459-.03q.235-.014.455-.02.22-.004.39-.005m3.891.1h3.5v1.16h-2.238v1.82h2.058v1.16h-2.058v2.86h-1.262zm-8.85 1.02q-.308 0-.51.05v2.39q.06.021.225.036.166.014.227.013.219.001.42-.058a.9.9 0 0 0 .353-.205 1 1 0 0 0 .246-.4q.09-.255.09-.645 0-.331-.086-.56a.94.94 0 0 0-.228-.366.9.9 0 0 0-.336-.195q-.19-.06-.4-.06m5.09.04q-.159 0-.324.006-.165.004-.256.023v4.82a.5.5 0 0 0 .106.016l.16.01.158.01q.076.005.106.006.45 0 .74-.211t.455-.56.228-.805q.066-.456.067-.956 0-.459-.057-.888a2.4 2.4 0 0 0-.209-.756 1.3 1.3 0 0 0-.437-.52q-.287-.195-.737-.195"
                                        ></path>
                                    </svg>
                                </button>

                                <div
                                    className="absolute z-50 w-max invisible opacity-0 group-hover:visible group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-2 transition-all duration-300 ease-in-out"
                                >
                                    <div
                                        className="relative px-2 py-1 text-xs text-white bg-[#7289da] rounded-md"
                                    >
                                        Download Pdf
                                    </div>
                                </div>
                            </div>

                            <div className="relative inline-block group">
                                <button
                                    onClick={() => handleDownloadExcel()}
                                    className="hover:cursor-pointer hover:bg-[#7289da] p-2 rounded-full transition-all duration-500"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="25"
                                        height="25"
                                        viewBox="0 0 30 30"
                                    >
                                        <path
                                            fill="white"
                                            d="M15 3a2 2 0 0 0-.4.043l-.002-.002-9.97 1.994-.001.002A2 2 0 0 0 3 7v16a2 2 0 0 0 1.629 1.965l9.969 1.994A2 2 0 0 0 15 27a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m4 2v3h2v2h-2v2h2v2h-2v2h2v2h-2v2h2v2h-2v3h6a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm4 3h1a1 1 0 0 1 0 2h-1zM6.186 10h2.402l1.244 2.99c.101.244.182.527.26.848h.033c.045-.193.134-.486.27-.871L11.785 10h2.188l-2.614 4.955 2.692 5.043h-2.334l-1.504-3.258c-.057-.115-.124-.347-.18-.668h-.021a8 8 0 0 1-.203.696L8.295 20H5.949l2.783-5.006zM23 12h1a1 1 0 0 1 0 2h-1zm0 4h1a1 1 0 0 1 0 2h-1zm0 4h1a1 1 0 0 1 0 2h-1z"
                                        ></path>
                                    </svg>
                                </button>

                                <div
                                    className="absolute z-50 w-max invisible opacity-0 group-hover:visible group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-2 transition-all duration-300 ease-in-out"
                                >
                                    <div
                                        className="relative px-2 py-1 text-xs text-white bg-[#7289da] rounded-md"
                                    >
                                        Download Excel
                                    </div>
                                </div>
                            </div>

                        </section>
                    </div>
                    <div className={`flex justify-${screen <= 425 ? "center" : "end"} mb-2`}>
                        <section className="flex justify-center items-center gap-1">
                            <div className="relative inline-block group">
                                <button
                                    onClick={() => setView("List View")}
                                    className={`hover:cursor-pointer border rounded-md ${view == "List View" ? "bg-[#7289da]" : ""} p-1 transition-all duration-500`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="25"
                                        height="25"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="white"
                                            d="M5 3c-1.093 0-2 .907-2 2v14c0 1.093.907 2 2 2h14c1.093 0 2-.907 2-2V5c0-1.093-.907-2-2-2zm0 4h14v12H5zm2.5 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-4 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"
                                        ></path>
                                    </svg>
                                </button>

                                <div
                                    className="absolute z-50 w-max invisible opacity-0 group-hover:visible group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-2 transition-all duration-300 ease-in-out"
                                >
                                    <div
                                        className="relative px-2 py-1 text-xs text-white bg-[#7289da] rounded-md"
                                    >
                                        List View
                                    </div>
                                </div>
                            </div>

                            <div className="relative inline-block group">
                                <button
                                    onClick={() => setView("Map View")}
                                    className={`hover:cursor-pointer border rounded-md ${view == "Map View" ? "bg-[#7289da]" : ""} p-1 transition-all duration-500`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="25"
                                        height="25"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="white"
                                            d="M18.257 3.685 14.969 5 9.664 3.232a2 2 0 0 0-1.375.04L4.257 4.885A2 2 0 0 0 3 6.742v11.845a2 2 0 0 0 2.743 1.857l3.289-1.315 5.305 1.768a2 2 0 0 0 1.375-.04l4.031-1.613A2 2 0 0 0 21 17.387V5.542a2 2 0 0 0-2.743-1.857M15 17.605a1 1 0 0 1-1.313.95l-4-1.318a1 1 0 0 1-.687-.95V6.524a1 1 0 0 1 1.313-.95l4 1.318a1 1 0 0 1 .687.95z"
                                        ></path>
                                    </svg>
                                </button>

                                <div
                                    className="absolute z-50 w-max invisible opacity-0 group-hover:visible group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-2 transition-all duration-300 ease-in-out"
                                >
                                    <div
                                        className="relative px-2 py-1 text-xs text-white bg-[#7289da] rounded-md"
                                    >
                                        Map View
                                    </div>
                                </div>
                            </div>

                            <div className="relative inline-block group">
                                <button
                                    onClick={() => setView("Both View")}
                                    className={`hover:cursor-pointer border rounded-md ${view == "Both View" ? "bg-[#7289da]" : ""} p-1 transition-all duration-500`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="25"
                                        height="25"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="white"
                                            d="M15 2c-2.791 0-5.2 1.647-6.322 4.016C8.786 6.013 8.89 6 9 6c.639 0 1.262.07 1.863.197A5 5 0 0 1 15 4c2.757 0 5 2.243 5 5a5 5 0 0 1-2.197 4.137c.128.6.197 1.224.197 1.863 0 .109-.013.214-.016.322C20.354 14.2 22 11.791 22 9c0-3.859-3.141-7-7-7m-2.6 5a.4.4 0 0 0-.283.684l1.393 1.392-4.434 4.434-1.392-1.393A.4.4 0 0 0 7 12.4v4.1a.5.5 0 0 0 .5.5h4.1a.4.4 0 0 0 .283-.684l-1.393-1.392 4.434-4.434 1.392 1.393A.4.4 0 0 0 17 11.6V7.5a.5.5 0 0 0-.5-.5zM9 8c-3.859 0-7 3.141-7 7s3.141 7 7 7 7-3.141 7-7c0-.824-.15-1.61-.412-2.346l-1.658 1.657c.032.228.07.453.07.689 0 2.757-2.243 5-5 5s-5-2.243-5-5 2.243-5 5-5c.236 0 .46.038.688.07l1.658-1.658A7 7 0 0 0 9 8"
                                        ></path>
                                    </svg>
                                </button>

                                <div
                                    className="absolute z-50 w-max invisible opacity-0 group-hover:visible group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-2 transition-all duration-300 ease-in-out"
                                >
                                    <div
                                        className="relative px-2 py-1 text-xs text-white bg-[#7289da] rounded-md"
                                    >
                                        Both View
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    {(view == "Both View" || view == "List View") &&
                        <PDFExport
                            paperSize="A4"
                            margin="1.0cm"
                            scale={0.5}
                            fileName={`Appointmnet Request Report`}
                            pageTemplate={null}
                            ref={pdfExportComponent}
                        >
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs uppercase bg-white bgOnPrint text-slate-950">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Time Slot
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Contact
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Address
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appointmentSchedule?.map((item: any, index: number) => (
                                            <tr key={index} className="bg-purple-500 border-b text-white">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {
                                                        item.timeslot?.split("-")?.length == 2 ?
                                                            `${moment(item.timeslot?.split("-")[0])?.format("YYYY-MM-DD")} - ${item?.timeslot?.split("-")[1]}` :
                                                            item.timeslot?.toUpperCase()
                                                    }
                                                    {/* {item?.timeslot?.toUpperCase()} */}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {item?.name?.toUpperCase()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item?.phone}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item?.address?.toUpperCase()}
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </PDFExport>}
                    {(view == "Both View" || view == "Map View") &&
                        <div className='my-2'>
                            <MyMap />
                        </div>
                    }
                </div> :
                <p className="text-black text-center pt-5">No appointment Schedule available.</p>
            }

        </div>
    )
}

export default AppointmentSchedule