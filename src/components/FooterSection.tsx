import React from 'react';

interface FooterSectionProps {
  totalWorked: number;
  totalOT: number;
  totalActual: number;
}

export default function FooterSection({ totalWorked, totalOT, totalActual }: FooterSectionProps) {
  return (
    <>
      <div className="flex justify-between mt-3 text-xs">
        {/* Signatures Section */}
        <div className="flex-1">
          <div className="flex mb-[18px]">
            <div className="w-[180px]">Store Keeper Sign</div>
            <div className="ml-16">Date:</div>
          </div>
          <div className="flex mb-[18px]">
            <div className="w-[180px]">Labor Sign</div>
            <div className="ml-16">Date:</div>
          </div>
          <div className="flex mb-[18px]">
            <div className="w-[180px]">Foreman/Site Engineer</div>
            <div className="ml-16">Date:</div>
          </div>
          <div className="flex mb-[18px]">
            <div className="w-[180px]">Project Manager Signature</div>
            <div className="ml-16">Date:</div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="w-[320px] text-right">
          <div className="flex justify-end mb-1.5 items-center">
            <div className="mr-2">Minimum Worked Hours</div>
            <div className="font-bold">= {totalWorked || 0}</div>
          </div>
          <div className="flex justify-end mb-1.5 items-center">
            <div className="mr-2">Over Time (+Value)/Less Worked (-Value) =</div>
            <div className="font-bold">{totalOT !== 0 ? totalOT : 'NIL'}</div>
          </div>
          <div className="flex justify-end mb-1.5 items-center">
            <div className="mr-2">TOTAL WORKED HOURS</div>
            <div className="font-bold">= {totalActual || 0}</div>
          </div>
        </div>
      </div>

      <div className="mt-1 text-xs-plus" style={{ fontStyle: 'normal' }}>
        <strong>Note:</strong> Vehicle using more than 01 hrs/day should mention the reason in the remarks column.
      </div>
    </>
  );
}
