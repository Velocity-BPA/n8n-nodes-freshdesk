/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import {
	cleanRequestBody,
	formatTimeSpent,
	buildSearchQuery,
} from '../../nodes/Freshdesk/transport/GenericFunctions';

describe('GenericFunctions', () => {
	describe('cleanRequestBody', () => {
		it('should remove undefined and null values', () => {
			const input = {
				name: 'Test',
				email: undefined,
				phone: null,
				active: true,
			};
			const result = cleanRequestBody(input);
			expect(result).toEqual({
				name: 'Test',
				active: true,
			});
		});

		it('should remove empty strings', () => {
			const input = {
				name: 'Test',
				description: '',
			};
			const result = cleanRequestBody(input);
			expect(result).toEqual({
				name: 'Test',
			});
		});

		it('should handle nested objects', () => {
			const input = {
				name: 'Test',
				custom_fields: {
					field1: 'value1',
					field2: 'value2',
				},
			};
			const result = cleanRequestBody(input);
			expect(result).toEqual({
				name: 'Test',
				custom_fields: {
					field1: 'value1',
					field2: 'value2',
				},
			});
		});

		it('should return empty object for all undefined values', () => {
			const input = {
				name: undefined,
				email: null,
			};
			const result = cleanRequestBody(input);
			expect(result).toEqual({});
		});
	});

	describe('formatTimeSpent', () => {
		it('should format minutes to HH:MM format', () => {
			expect(formatTimeSpent('90')).toBe('1:30');
			expect(formatTimeSpent('60')).toBe('1:00');
			expect(formatTimeSpent('30')).toBe('0:30');
			expect(formatTimeSpent('0')).toBe('0:00');
		});

		it('should handle large values', () => {
			expect(formatTimeSpent('600')).toBe('10:00');
			expect(formatTimeSpent('1440')).toBe('24:00');
		});

		it('should preserve HH:MM format', () => {
			expect(formatTimeSpent('01:30')).toBe('01:30');
			expect(formatTimeSpent('2:45')).toBe('2:45');
		});
	});

	describe('buildSearchQuery', () => {
		it('should build a simple search query', () => {
			const params = {
				status: 2,
				priority: 3,
			};
			const result = buildSearchQuery(params);
			expect(result).toContain('status:2');
			expect(result).toContain('priority:3');
		});

		it('should handle string values with spaces using quotes', () => {
			const params = {
				name: 'John Doe',
			};
			const result = buildSearchQuery(params);
			expect(result).toBe("name:'John Doe'");
		});

		it('should handle simple strings without quotes', () => {
			const params = {
				email: 'test@example.com',
			};
			const result = buildSearchQuery(params);
			expect(result).toBe('email:test@example.com');
		});

		it('should return empty string for empty params', () => {
			const result = buildSearchQuery({});
			expect(result).toBe('');
		});

		it('should join multiple conditions with AND', () => {
			const params = {
				status: 2,
				priority: 3,
			};
			const result = buildSearchQuery(params);
			expect(result).toContain(' AND ');
		});
	});
});
