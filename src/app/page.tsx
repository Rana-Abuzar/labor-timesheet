'use client';

import React, { useRef } from 'react';
import { useTimesheet } from '@/hooks/useTimesheet';
import TimesheetHeader from '@/components/TimesheetHeader';
import InfoTable from '@/components/InfoTable';
import WorkTable from '@/components/WorkTable';
import FooterSection from '@/components/FooterSection';
import ExportButtons from '@/components/ExportButtons';

export default function Home() {
  const timesheetRef = useRef<HTMLDivElement>(null);
  const timesheet = useTimesheet();

  return (
    <main style={{ padding: '10px', background: 'white', minHeight: '100vh' }}>
      <ExportButtons
        timesheetRef={timesheetRef}
        laborName={timesheet.laborName}
        month={timesheet.month}
        year={timesheet.year}
        projectName={timesheet.projectName}
        workData={timesheet.workData}
        totalWorked={timesheet.totalWorked}
        totalOT={timesheet.totalOT}
        totalActual={timesheet.totalActual}
      />

      <div
        ref={timesheetRef}
        className="w-a4 min-h-a4 bg-white border border-black"
        style={{ padding: '7px', margin: '10px auto' }}
      >
        <TimesheetHeader />

        <InfoTable
          month={timesheet.month}
          year={timesheet.year}
          laborName={timesheet.laborName}
          projectName={timesheet.projectName}
          supplierName={timesheet.supplierName}
          siteEngineerName={timesheet.siteEngineerName}
          designation={timesheet.designation}
          onMonthChange={timesheet.setMonth}
          onYearChange={timesheet.setYear}
          onLaborNameChange={timesheet.setLaborName}
          onProjectNameChange={timesheet.setProjectName}
          onSupplierNameChange={timesheet.setSupplierName}
          onSiteEngineerNameChange={timesheet.setSiteEngineerName}
          onDesignationChange={timesheet.setDesignation}
        />

        <WorkTable
          month={timesheet.month}
          year={timesheet.year}
          workData={timesheet.workData}
          totalWorked={timesheet.totalWorked}
          totalOT={timesheet.totalOT}
          totalActual={timesheet.totalActual}
          onUpdateDayEntry={timesheet.updateDayEntry}
        />

        <FooterSection
          totalWorked={timesheet.totalWorked}
          totalOT={timesheet.totalOT}
          totalActual={timesheet.totalActual}
        />
      </div>
    </main>
  );
}
