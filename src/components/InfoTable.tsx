import React from 'react';
import { MONTH_NAMES } from '@/lib/dateUtils';

interface InfoTableProps {
  month: number;
  year: number;
  laborName: string;
  projectName: string;
  supplierName: string;
  siteEngineerName: string;
  designation: string;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
  onLaborNameChange: (name: string) => void;
  onProjectNameChange: (name: string) => void;
  onSupplierNameChange: (name: string) => void;
  onSiteEngineerNameChange: (name: string) => void;
  onDesignationChange: (designation: string) => void;
}

export default function InfoTable({
  month,
  year,
  laborName,
  projectName,
  supplierName,
  siteEngineerName,
  designation,
  onMonthChange,
  onYearChange,
  onLaborNameChange,
  onProjectNameChange,
  onSupplierNameChange,
  onSiteEngineerNameChange,
  onDesignationChange,
}: InfoTableProps) {
  return (
    <>
      <div className="text-[12px] font-bold mb-1">ALMYAR UNITED TRADING LLC</div>

      <table className="w-full mb-1" style={{ borderCollapse: 'separate', borderSpacing: '20px' }}>
        <tbody>
          {/* Project Name Row */}
          <tr>
            <td className="border border-black p-1 text-sm-minus w-[110px] font-bold">
              PROJECT NAME:
            </td>
            <td className="border border-black p-1 text-sm-minus" colSpan={2}>
              <input
                type="text"
                value={projectName}
                onChange={(e) => onProjectNameChange(e.target.value)}
                className="w-full outline-none bg-transparent text-sm-minus font-bold"
              />
            </td>
            <td className="border border-black p-1 text-sm-minus w-[180px]">
              <div className="font-bold text-sm-minus mb-0.5">Site Engineer/Forman Name</div>
              <input
                type="text"
                value={siteEngineerName}
                onChange={(e) => onSiteEngineerNameChange(e.target.value)}
                className="w-full outline-none bg-transparent text-sm-minus font-bold"
              />
            </td>
          </tr>

          {/* Supplier Name Row */}
          <tr>
            <td className="border border-black p-1 text-sm-minus font-bold">SUPPLIER NAME</td>
            <td className="border border-black p-1 text-sm-minus" colSpan={3}>
              <input
                type="text"
                value={supplierName}
                onChange={(e) => onSupplierNameChange(e.target.value)}
                className="w-full outline-none bg-transparent text-sm-minus font-bold"
              />
            </td>
          </tr>

          {/* Labor Name, Month, Year Row */}
          <tr>
            <td className="border border-black p-1 text-sm-minus font-bold">Labor Name</td>
            <td className="border border-black p-1 text-sm-minus">
              <input
                type="text"
                value={laborName}
                onChange={(e) => onLaborNameChange(e.target.value)}
                className="w-full outline-none bg-transparent text-sm-minus font-bold"
              />
            </td>
            <td className="border border-black p-1 text-sm-minus w-[90px] text-center">
              <div className="text-xs-plus font-bold text-center mb-0.5">Month</div>
              <select
                value={month}
                onChange={(e) => onMonthChange(Number(e.target.value))}
                className="w-full outline-none bg-transparent text-sm-minus font-bold text-center"
              >
                {MONTH_NAMES.map((name, index) => (
                  <option key={index} value={index}>
                    {name}
                  </option>
                ))}
              </select>
            </td>
            <td className="border border-black p-1 text-sm-minus w-[90px] text-center">
              <div className="text-xs-plus font-bold text-center mb-0.5">Year:</div>
              <input
                type="number"
                value={year}
                onChange={(e) => onYearChange(Number(e.target.value))}
                min="2020"
                max="2040"
                className="w-full outline-none bg-transparent text-sm-minus font-bold text-center"
              />
            </td>
          </tr>

          {/* Designation Row */}
          <tr>
            <td className="border border-black p-1 text-sm-minus font-bold">Designation</td>
            <td className="border border-black p-1 text-sm-minus" colSpan={3}>
              <input
                type="text"
                value={designation}
                onChange={(e) => onDesignationChange(e.target.value)}
                className="w-full outline-none bg-transparent text-sm-minus font-bold"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
