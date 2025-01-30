import { padZero } from './helpers';
import MonthConverter from './MonthConverter';

export default class DateService {
	static toSqliteFormat(date: Date): string {
		if (isNaN(date.getTime())) {
			throw new Error('Invalid Date');
		}
		const pad = (num: number) => num.toString().padStart(2, '0');
		return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` + `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
	}

	static fromSqliteFormat(date: string): Date {
		const parsedDate = new Date(date);

		if (isNaN(parsedDate.getTime())) {
			throw new Error('Invalid SQLite date format');
		}

		return parsedDate;
	}

	static toUIFormat(date: string | Date): string {
		if (typeof date === 'string') {
			const uiFormatDateObject = new Date(date);
			if (isNaN(uiFormatDateObject.getTime())) {
				return 'Invalid Date';
			}
			date = uiFormatDateObject;
		}
		return `${padZero(date.getDate())} ${MonthConverter.fromNumberToMonth(date.getMonth() + 1)} ${padZero(date.getHours())}:${padZero(date.getMinutes())}`;
	}
}

