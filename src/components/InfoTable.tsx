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
  const cellNoTop = 'border border-black border-t-0 p-1 text-sm-minus';

  return (
    <>
      <div className="mb-1" style={{ display: 'flex', gap: '6px' }}>
        {/* Left column: ALMYAR text + 4-row label/value table, pulled up */}
        <div style={{ flex: 1, marginTop: '-32px' }}>
          <div className="text-[12px] font-bold mb-1" style={{ marginLeft: '20px' }}>ALMYAR UNITED TRADING LLC</div>
          <table
            style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '6px 0px' }}
          >
          <colgroup>
            <col style={{ width: '40%' }} />
            <col style={{ width: '60%' }} />
          </colgroup>
          <tbody>
            <tr>
              <td className="border border-black p-1 text-sm-minus font-bold">
                PROJECT NAME:
              </td>
              <td className="border border-black p-1 text-sm-minus">
                <textarea
                  value={projectName}
                  onChange={(e) => onProjectNameChange(e.target.value)}
                  rows={2}
                  className="w-full outline-none bg-transparent text-sm-minus font-bold resize-none leading-tight"
                  style={{ overflow: 'hidden' }}
                />
              </td>
            </tr>
            <tr>
              <td className={`${cellNoTop} font-bold`}>
                SUPPLIER NAME
              </td>
              <td className={cellNoTop}>
                <input
                  type="text"
                  value={supplierName}
                  onChange={(e) => onSupplierNameChange(e.target.value)}
                  className="w-full outline-none bg-transparent text-sm-minus font-bold"
                />
              </td>
            </tr>
            <tr>
              <td className={`${cellNoTop} font-bold`}>
                Labor Name
              </td>
              <td className={cellNoTop}>
                <input
                  type="text"
                  value={laborName}
                  onChange={(e) => onLaborNameChange(e.target.value)}
                  className="w-full outline-none bg-transparent text-sm-minus font-bold"
                />
              </td>
            </tr>
            <tr>
              <td className={`${cellNoTop} font-bold`}>
                Designation
              </td>
              <td className={cellNoTop}>
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
        </div>

        {/* Right column: two groups with 20px gap */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
          {/* Group 1: Site Engineer/Forman Name as text + two bordered cells */}
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <colgroup>
              <col style={{ width: '50%' }} />
              <col style={{ width: '25%' }} />
              <col style={{ width: '25%' }} />
            </colgroup>
            <tbody>
              <tr>
                <td className="p-1 font-bold" style={{ border: 'none', fontSize: '11px' }}>
                  Site Engineer/Forman Name
                </td>
                <td className="border border-black p-1 text-sm-minus">
                  <input
                    type="text"
                    value={siteEngineerName}
                    onChange={(e) => onSiteEngineerNameChange(e.target.value)}
                    className="w-full outline-none bg-transparent text-sm-minus font-bold"
                  />
                </td>
                <td className="border border-black p-1 text-sm-minus">
                </td>
              </tr>
            </tbody>
          </table>

          {/* Group 2: Month / Year */}
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <colgroup>
              <col style={{ width: '50%' }} />
              <col style={{ width: '25%' }} />
              <col style={{ width: '25%' }} />
            </colgroup>
            <tbody>
              <tr>
                <td className="p-1 font-bold text-center" style={{ border: 'none', fontSize: '11px' }}>
                  Month
                </td>
                <td className="border border-black p-1 text-sm-minus text-center font-bold">
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
                <td className="border border-black p-1 text-sm-minus text-center font-bold">
                  <span className="text-xs-plus">Year-</span>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => onYearChange(Number(e.target.value))}
                    min="2020"
                    max="2040"
                    className="w-[35px] outline-none bg-transparent text-sm-minus font-bold text-center inline"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
