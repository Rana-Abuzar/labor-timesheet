import * as XLSX from 'xlsx';
import { DayEntry } from '@/types/timesheet';
import { formatDate, MONTH_NAMES } from '@/lib/dateUtils';

export function exportToExcel(
  month: number,
  year: number,
  laborName: string,
  projectName: string,
  workData: DayEntry[],
  totalWorked: number,
  totalOT: number,
  totalActual: number
): void {
  try {
    const monthName = MONTH_NAMES[month];
    const wsData: any[][] = [];

    // Title
    wsData.push(['Labor Time Sheet']);
    wsData.push([]);
    wsData.push(['ALMYAR UNITED TRADING LLC']);
    wsData.push([]);
    wsData.push(['PROJECT NAME:', projectName]);
    wsData.push(['Labor Name:', laborName, '', 'Month:', monthName, 'Year:', year]);
    wsData.push([]);

    // Headers
    wsData.push([
      'Date',
      'Time In',
      'Time Out (Lunch)',
      'Lunch Break',
      'Time In',
      'Time Out',
      'Total Worked Done(Hrs)',
      'Over Time',
      'Actual Worked (Hrs)',
      'Approver Signature',
      'Remarks',
    ]);

    // Data rows
    workData.forEach((entry) => {
      const dateStr = formatDate(year, month, entry.day);
      wsData.push([
        dateStr,
        entry.timeIn,
        entry.timeOutLunch,
        entry.lunchBreak,
        entry.timeIn2,
        entry.timeOut2,
        entry.totalDuration || '',
        entry.overTime || '',
        entry.actualWorked || '',
        entry.approverSig,
        entry.remarks,
      ]);
    });

    // Totals
    wsData.push([]);
    wsData.push([
      '',
      '',
      '',
      '',
      '',
      'TOTAL WORKED HOURS',
      totalWorked || 0,
      totalOT || 0,
      totalActual || 0,
    ]);

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Set column widths
    ws['!cols'] = [
      { wch: 18 }, // Date
      { wch: 8 },  // Time In
      { wch: 10 }, // Time Out (Lunch)
      { wch: 10 }, // Lunch Break
      { wch: 8 },  // Time In
      { wch: 8 },  // Time Out
      { wch: 15 }, // Total Worked Done
      { wch: 8 },  // Over Time
      { wch: 12 }, // Actual Worked
      { wch: 12 }, // Approver Signature
      { wch: 10 }, // Remarks
    ];

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'TimeSheet');

    // Save file
    const filename = `TimeSheet_${laborName || 'Labor'}_${monthName}_${year}.xlsx`;
    XLSX.writeFile(wb, filename);
  } catch (error) {
    console.error('Excel export error:', error);
    throw new Error('Failed to export Excel file');
  }
}
