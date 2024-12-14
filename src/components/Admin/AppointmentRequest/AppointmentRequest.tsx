import { PDFExport } from '@progress/kendo-react-pdf';
import React, { useEffect, useRef, useState } from 'react'
import { downloadExcel } from 'react-export-table-to-excel';
import "../pdfStyles.css"
import moment from 'moment';

function AppointmentRequest(props: any) {
    const {
        screen
    } = props
    const pdfExportComponent = useRef<PDFExport | null>(null);
    const [appointment, setAppointment] = useState<any>()
    const [refresh, setRefresh] = useState(0)
    const header = ["Name", "Email", "Phone", "Address", "Date & Time", "Status"];
    // const appointments = [
    //     {
    //         name: "John Doe",
    //         email: "john@example.com",
    //         phone: "123-456-7890",
    //         address: "123 Main St, Anytown, USA",
    //         dateTime: "2024-01-15 morning",
    //         status: "pending"
    //     },
    //     {
    //         name: "Jane Smith",
    //         email: "jane@example.com",
    //         phone: "098-765-4321",
    //         address: "456 Oak Ave, Somewhere, USA",
    //         dateTime: "2024-01-15 afternoon",
    //         status: "approved"
    //     }
    // ];

    function handleDownloadExcel() {
        downloadExcel({
            fileName: "Appointment-report",
            sheet: "Appointment",
            tablePayload: {
                header,
                body: appointment?.map((item: any) => {
                    return {
                        ...item,
                        timeslot:
                            item.timeslot?.split("-")?.length == 2 ?
                                `${moment(item.timeslot?.split("-")[0])?.format("YYYY-MM-DD")} - ${item?.timeslot?.split("-")[1]}` :
                                item.timeslot?.toUpperCase()
                        ,
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
            setAppointment(requests)
        }
    }, [refresh])

    return (
        <div className='h-full divide-y divide-slate-300'>
            <div className='p-5'>
                <p className='font-bold text-xl'>Appointment Request</p>
            </div>

            <div className='p-5'>
                {appointment?.length > 0 ?
                    <>
                        <div className={`flex justify-${screen <= 425 ? "center" : "end"} mb-3 text-slate-950`}>
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
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Phone
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Address
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Date & Time
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-3 hideOnPDF">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appointment?.map((item: any, index: number) => (
                                            <tr className="bg-purple-500 border-b text-white">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {item?.name?.toUpperCase()}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {item?.email?.toUpperCase()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item?.phone}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item?.address?.toUpperCase()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {
                                                        item.timeslot?.split("-")?.length == 2 ?
                                                            `${moment(item.timeslot?.split("-")[0])?.format("YYYY-MM-DD")} - ${item?.timeslot?.split("-")[1]}` :
                                                            item.timeslot?.toUpperCase()
                                                    }
                                                    {/* {item?.timeslot?.toUpperCase()} */}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item?.status?.toUpperCase()}
                                                </td>
                                                <td className="px-6 py-4 hideOnPDF">
                                                    <div className='flex gap-3'>
                                                        <svg
                                                            onClick={() => {
                                                                appointment[index] = {
                                                                    ...appointment[index],
                                                                    status: "approved"
                                                                }
                                                                localStorage.setItem('requests', JSON.stringify(appointment));
                                                                setAppointment(appointment)
                                                                setRefresh(refresh + 1)
                                                            }}
                                                            className="h-8 w-8 text-green-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <svg
                                                            onClick={() => {
                                                                appointment[index] = {
                                                                    ...appointment[index],
                                                                    status: "pending"
                                                                }
                                                                localStorage.setItem('requests', JSON.stringify(appointment));
                                                                setAppointment(appointment)
                                                                setRefresh(refresh + 1)
                                                            }}
                                                            className="h-8 w-8 text-red-500 cursor-pointer" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="9" />  <path d="M10 10l4 4m0 -4l-4 4" /></svg>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </PDFExport>
                    </>
                    :
                    <p className="text-black text-center">No appointment requests available.</p>
                }
            </div>

        </div>
    )
}

export default AppointmentRequest