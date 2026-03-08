import React from 'react';

interface FooterSectionProps {
  totalWorked: number;
  totalOT: number;
  totalActual: number;
  vehicleMode?: boolean;
}

export default function FooterSection({ totalWorked, totalOT, totalActual, vehicleMode }: FooterSectionProps) {
  // Vehicle mode: fixed minimum 260, OT = excess over 260, actual = total from table
  const minHours = vehicleMode ? 260 : (totalWorked || 0);
  const overTime = vehicleMode ? (totalWorked > 260 ? totalWorked - 260 : 0) : totalOT;
  const actualHours = vehicleMode ? totalWorked : (totalActual || 0);

  return (
    <div style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
      <div className="flex justify-between mt-1 text-sm" style={{ overflow: 'hidden' }}>
        {/* Signatures Section */}
        <div className="flex-1 min-w-0">
          <div className="flex mb-[8px]">
            <div className="w-[180px]">Store Keeper Sign</div>
            <div className="ml-16">Date:</div>
          </div>
          <div className="flex mb-[8px]">
            <div className="w-[180px]">Labor Sign</div>
            <div className="ml-16">Date:</div>
          </div>
          <div className="flex mb-[8px]">
            <div className="w-[180px]">Foreman/Site Engineer</div>
            <div className="ml-16">Date:</div>
          </div>
          <div className="flex mb-[4px]">
            <div className="w-[180px]"></div>
            <div style={{ marginLeft: '64px', whiteSpace: 'nowrap' }}>Project Manager Signature</div>
            <div style={{ marginLeft: '50px' }}>Date:</div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="text-right" style={{ whiteSpace: 'nowrap' }}>
          <div className="mb-1">
            Minimum Worked Hours <span className="font-bold">= {minHours}</span>
          </div>
          <div className="mb-1">
            Over Time (+Value)/Less Worked (-Value) = <span className="font-bold">{overTime !== 0 ? overTime : 'NIL'}</span>
          </div>
          <div className="mb-1">
            TOTAL WORKED HOURS <span className="font-bold">= {actualHours}</span>
          </div>
        </div>
      </div>

      <div className="mt-1 text-sm-minus" style={{ fontStyle: 'normal', paddingBottom: 8 }}>
        <strong>Note:</strong> Vehicle using more than 01 hrs/day should mention the reason in the remarks column.
      </div>
    </div>
  );
}
