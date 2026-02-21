import React from 'react';
import Image from 'next/image';

export default function TimesheetHeader() {
  return (
    <div className="relative mb-1">
      {/* Grid layout for logo and title */}
      <div className="grid grid-cols-[110px_1fr] gap-0 relative">
        {/* Row 1: Logo | Title */}
        <div className="row-span-3">
          <Image
            src="/npclogo.jpeg"
            alt="NPC Logo"
            width={90}
            height={90}
            className="block -ml-5 -mt-5"
            priority
          />
        </div>

        <div className="flex justify-center items-start px-2.5">
          <div className="border-2 border-timesheet-border bg-timesheet-bg py-1.5 px-5 text-[15px] font-bold w-full text-center">
            Labor Time Sheet
          </div>
        </div>

        {/* Row 2: Empty | Labor Working At Site */}
        <div className="flex justify-center items-center mt-[3px]">
          <div className="text-[11px]">Labor Working At Site</div>
        </div>

        {/* Row 3: Empty | LPO */}
        <div className="flex justify-center items-center mt-[2px]">
          <div className="text-[10px] font-bold">LPO</div>
        </div>

        {/* Site Use Boxes - Positioned absolutely on top right */}
        <div className="absolute top-[60px] right-2.5">
          <div className="flex gap-0">
            <div className="border border-black py-1 px-2 text-[10px] font-bold text-center">
              SITE USE
            </div>
            <div className="border border-black border-l-0 py-1 px-[18px] text-[10px] font-bold text-center">
              BOTH
            </div>
          </div>
          <div className="border border-black border-t-0 py-1 px-2 text-[9px] font-bold text-center">
            I069B/Contracts/MSA-001
          </div>
          <div className="border border-black border-t-0 py-1 px-2 text-[9px] font-bold text-center h-[18px]"></div>
        </div>
      </div>
    </div>
  );
}
