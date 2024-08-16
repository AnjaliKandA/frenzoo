

import React from "react";
import TableCard from './TableCard';


const DashboardTable = () => {
    return (
        <div className='shadow-md border border-gray-200 mt-6'>
            <div className='flex    mt-6 ml-4 mb-4'>
           
            <img src="" alt="Earning Statistics" style={{ width: '48px' ,height: '26px'}} />
            <h1 className=" font-semibold text-lg">Table Booking Today</h1>
                 
            </div>




            <TableCard />
        </div>
    );
}


export default DashboardTable;
