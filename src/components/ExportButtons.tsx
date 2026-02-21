'use client';

import React, { useState } from 'react';
import { exportToPDF } from '@/lib/pdfExport';
import { exportToExcel } from '@/lib/excelExport';
import { MONTH_NAMES } from '@/lib/dateUtils';
import { DayEntry } from '@/types/timesheet';

interface ExportButtonsProps {
  timesheetRef: React.RefObject<HTMLDivElement>;
  laborName: string;
  month: number;
  year: number;
  projectName: string;
  workData: DayEntry[];
  totalWorked: number;
  totalOT: number;
  totalActual: number;
}

export default function ExportButtons({
  timesheetRef,
  laborName,
  month,
  year,
  projectName,
  workData,
  totalWorked,
  totalOT,
  totalActual,
}: ExportButtonsProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handlePDFExport = async () => {
    if (!timesheetRef.current || isExporting) return;

    setIsExporting(true);
    try {
      const monthName = MONTH_NAMES[month];
      await exportToPDF(timesheetRef.current, laborName, monthName, year);
    } catch (error) {
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExcelExport = () => {
    if (isExporting) return;

    setIsExporting(true);
    try {
      exportToExcel(month, year, laborName, projectName, workData, totalWorked, totalOT, totalActual);
    } catch (error) {
      alert('Failed to export Excel file. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    if (isExporting) return;
    window.print();
  };

  return (
    <div className="text-center mb-4 print:hidden">
      <button
        onClick={handlePDFExport}
        disabled={isExporting}
        className="px-6 py-2.5 mx-2.5 text-sm font-bold border-none rounded-md cursor-pointer bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isExporting ? 'Exporting...' : 'Save as PDF'}
      </button>
      <button
        onClick={handleExcelExport}
        disabled={isExporting}
        className="px-6 py-2.5 mx-2.5 text-sm font-bold border-none rounded-md cursor-pointer bg-green-700 text-white hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Save as Excel
      </button>
      <button
        onClick={handlePrint}
        disabled={isExporting}
        className="px-6 py-2.5 mx-2.5 text-sm font-bold border-none rounded-md cursor-pointer bg-blue-700 text-white hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Print
      </button>
    </div>
  );
}
