import React from 'react';
import { DayEntry } from '@/types/timesheet';
import { formatDate, isFriday } from '@/lib/dateUtils';

interface WorkTableProps {
  month: number;
  year: number;
  workData: DayEntry[];
  totalWorked: number;
  totalOT: number;
  totalActual: number;
  onUpdateDayEntry: (day: number, field: keyof DayEntry, value: string | number) => void;
}

export default function WorkTable({
  month,
  year,
  workData,
  totalWorked,
  totalOT,
  totalActual,
  onUpdateDayEntry,
}: WorkTableProps) {
  return (
    <table className="w-full border-collapse mb-1">
      <thead>
        <tr>
          <th className="border border-black p-0.5 text-center text-xxs w-[75px] bg-header-bg font-bold leading-tight">
            Date
          </th>
          <th className="border border-black p-0.5 text-center text-xxs w-[32px] bg-header-bg font-bold leading-tight">
            Time<br />In
          </th>
          <th className="border border-black p-0.5 text-center text-xxs w-[42px] bg-header-bg font-bold leading-tight">
            Time Out
          </th>
          <th className="border border-black p-0.5 text-center text-xxs w-[42px] bg-header-bg font-bold leading-tight">
            Lunch Break<br />Time 01:00 to<br />03:00
          </th>
          <th className="border border-black p-0.5 text-center text-xxs w-[32px] bg-header-bg font-bold leading-tight">
            Time<br />In
          </th>
          <th className="border border-black p-0.5 text-center text-xxs w-[32px] bg-header-bg font-bold leading-tight">
            Time<br />Out
          </th>
          <th className="border border-black p-0.5 text-center text-xxs w-[50px] bg-header-bg font-bold leading-tight">
            Total Worked<br />Done(Hrs)
          </th>
          <th className="border border-black p-0.5 text-center text-xxs w-[32px] bg-header-bg font-bold leading-tight">
            Over<br />Time
          </th>
          <th className="border border-black p-0.5 text-center text-xxs w-[45px] bg-header-bg font-bold leading-tight">
            Actual<br />Worked<br />(Hrs)
          </th>
          <th className="border border-black p-0.5 text-center text-xxs w-[48px] bg-header-bg font-bold leading-tight">
            Approver<br />Signature
          </th>
          <th className="border border-black p-0.5 text-center text-xxs w-[42px] bg-header-bg font-bold leading-tight">
            Remarks
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={11} className="border border-black p-0.5 text-center text-[10px] bg-header-bg font-bold">
            WORK SHEET
          </td>
        </tr>
        {workData.map((entry) => {
          const isFridayRow = isFriday(year, month, entry.day);
          const rowClass = isFridayRow ? 'bg-friday-highlight' : '';

          return (
            <tr key={entry.day} className={rowClass}>
              <td className={`border border-black p-0.5 text-left pl-1 text-xs-plus whitespace-nowrap ${rowClass}`}>
                {formatDate(year, month, entry.day)}
              </td>
              <td className={`border border-black p-0.5 text-center text-xxs ${rowClass}`}>
                <input
                  type="text"
                  value={entry.timeIn}
                  onChange={(e) => onUpdateDayEntry(entry.day, 'timeIn', e.target.value)}
                  className="w-full outline-none text-center text-xxs bg-transparent"
                />
              </td>
              <td className={`border border-black p-0.5 text-center text-xxs ${rowClass}`}>
                <input
                  type="text"
                  value={entry.timeOutLunch}
                  onChange={(e) => onUpdateDayEntry(entry.day, 'timeOutLunch', e.target.value)}
                  className="w-full outline-none text-center text-xxs bg-transparent"
                />
              </td>
              <td className={`p-0.5 text-center text-xxs ${rowClass}`} style={{ border: 'none' }}>
                <input
                  type="text"
                  value={entry.lunchBreak}
                  onChange={(e) => onUpdateDayEntry(entry.day, 'lunchBreak', e.target.value)}
                  className="w-full outline-none text-center text-xxs bg-transparent"
                />
              </td>
              <td className={`border border-black p-0.5 text-center text-xxs ${rowClass}`}>
                <input
                  type="text"
                  value={entry.timeIn2}
                  onChange={(e) => onUpdateDayEntry(entry.day, 'timeIn2', e.target.value)}
                  className="w-full outline-none text-center text-xxs bg-transparent"
                />
              </td>
              <td className={`border border-black p-0.5 text-center text-xxs ${rowClass}`}>
                <input
                  type="text"
                  value={entry.timeOut2}
                  onChange={(e) => onUpdateDayEntry(entry.day, 'timeOut2', e.target.value)}
                  className="w-full outline-none text-center text-xxs bg-transparent"
                />
              </td>
              <td className={`border border-black p-0.5 text-center text-xxs ${rowClass}`}>
                <input
                  type="number"
                  value={entry.totalDuration || ''}
                  onChange={(e) => onUpdateDayEntry(entry.day, 'totalDuration', Number(e.target.value))}
                  className="w-full outline-none text-center text-xxs bg-transparent"
                />
              </td>
              <td className={`border border-black p-0.5 text-center text-xxs ${rowClass}`}>
                <input
                  type="number"
                  value={entry.overTime || ''}
                  onChange={(e) => onUpdateDayEntry(entry.day, 'overTime', Number(e.target.value))}
                  className="w-full outline-none text-center text-xxs bg-transparent"
                />
              </td>
              <td className={`border border-black p-0.5 text-center text-xxs ${rowClass}`}>
                <input
                  type="number"
                  value={entry.actualWorked || ''}
                  onChange={(e) => onUpdateDayEntry(entry.day, 'actualWorked', Number(e.target.value))}
                  className="w-full outline-none text-center text-xxs bg-transparent"
                />
              </td>
              <td className={`border border-black p-0.5 text-center text-xxs ${rowClass}`}>
                <input
                  type="text"
                  value={entry.approverSig}
                  onChange={(e) => onUpdateDayEntry(entry.day, 'approverSig', e.target.value)}
                  className="w-full outline-none text-center text-xxs bg-transparent"
                />
              </td>
              <td className={`border border-black p-0.5 text-center text-xxs ${rowClass}`}>
                <input
                  type="text"
                  value={entry.remarks}
                  onChange={(e) => onUpdateDayEntry(entry.day, 'remarks', e.target.value)}
                  className="w-full outline-none text-center text-xxs bg-transparent"
                />
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={6} className="border border-black p-0.5 text-right pr-2 text-xs-plus font-bold">
            TOTAL WORKED HOURS
          </td>
          <td className="border border-black p-0.5 text-center text-xs-plus font-bold">
            {totalWorked || 0}
          </td>
          <td className="border border-black p-0.5 text-center text-xs-plus font-bold">
            {totalOT || 0}
          </td>
          <td className="border border-black p-0.5 text-center text-xs-plus font-bold">
            {totalActual || 0}
          </td>
          <td className="border border-black p-0.5"></td>
          <td className="border border-black p-0.5"></td>
        </tr>
      </tfoot>
    </table>
  );
}
