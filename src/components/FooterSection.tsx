import React from 'react';

interface FooterSectionProps {
  totalWorked: number;
  totalOT: number;
  totalActual: number;
}

export default function FooterSection({ totalWorked, totalOT, totalActual }: FooterSectionProps) {
  return (
    <>
      <div className="flex justify-between mt-3 text-sm-minus">
        {/* Signatures Section */}
        <div className="flex-1">
          <div className="flex mb-[18px]">
            <div className="w-[180px] font-bold">Store Keeper Sign</div>
            <div className="font-bold">Date:</div>
          </div>
          <div className="flex mb-[18px]">
            <div className="w-[180px] font-bold">Labor Sign</div>
            <div className="font-bold">Date:</div>
          </div>
          <div className="flex mb-[18px]">
            <div className="w-[180px] font-bold">Foreman/Site Engineer</div>
            <div className="font-bold">Date:</div>
          </div>
          <div className="flex mb-[18px]">
            <div className="w-[180px] font-bold">Project Manager Signature</div>
            <div className="font-bold">Date:</div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="w-[320px] text-right">
          <div className="flex justify-end mb-1.5 items-center">
            <div className="mr-2 font-bold">Minimum Worked Hours</div>
            <div className="font-bold">= {totalWorked || 0}</div>
          </div>
          <div className="flex justify-end mb-1.5 items-center">
            <div className="mr-2 font-bold">Over Time (+Value)/Less Worked (-Value) =</div>
            <div className="font-bold">{totalOT !== 0 ? totalOT : 'NIL'}</div>
          </div>
          <div className="flex justify-end mb-1.5 items-center">
            <div className="mr-2 font-bold">TOTAL WORKED HOURS</div>
            <div className="font-bold">= {totalActual || 0}</div>
          </div>
        </div>
      </div>

      <div className="mt-1 text-xxs" style={{ fontStyle: 'normal' }}>
        <strong>Note:</strong> Vehicle using more than 01 hrs/day should mention the reason in the remarks column.
      </div>
    </>
  );
}
